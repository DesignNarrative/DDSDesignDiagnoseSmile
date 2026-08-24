"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Globe, BarChart2, ShieldAlert, Key, Check, Loader2, Search,
  ArrowLeft, RefreshCw, AlertTriangle, AlertCircle, Edit, ExternalLink,
  Trash2, Plus, Info, Image as ImageIcon, Link as LinkIcon, History, FileText, CheckCircle, FilePlus
} from "lucide-react";
import Link from "next/link";

interface PageMeta {
  key: string;
  url: string;
  title: string;
  description: string;
  keywords: string;
  focusKeyword?: string;
  searchIntent?: string;
  notes?: string;
  indexing?: { noindex: boolean; nofollow: boolean; noarchive: boolean };
  canonical?: { mode: "self" | "custom" | "disabled"; customUrl: string };
  social?: {
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
  };
  schema?: any[];
  seoScore?: number;
  lastUpdated?: string;
}

interface SeoSettings {
  websiteName: string;
  websiteUrl: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  facebookPixelId: string;
  defaultOgImage: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  defaultRobotsBehavior?: string;
  organizationName?: string;
  organizationTelephone?: string;
  streetAddress?: string;
  addressLocality?: string;
  postalCode?: string;
  addressCountry?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[] | string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  indexing?: { noindex: boolean; nofollow: boolean };
}

export default function SeoAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "pages" | "blogs" | "redirects" | "404" | "technical" | "images" | "history"
  >("dashboard");

  // Load SEO database state
  const [pages, setPages] = useState<{ [key: string]: PageMeta }>({});
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [redirects, setRedirects] = useState<any[]>([]);
  const [logs404, setLogs404] = useState<any[]>([]);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    websiteName: "", websiteUrl: "", googleAnalyticsId: "", googleTagManagerId: "", facebookPixelId: "", defaultOgImage: "", googleSiteVerification: "", bingSiteVerification: ""
  });
  const [imageAlts, setImageAlts] = useState<{ [key: string]: { alt: string; title: string; src?: string } }>({});
  const [uploadingImages, setUploadingImages] = useState<{ [key: string]: boolean }>({});
  const [seoIssues, setSeoIssues] = useState<any[]>([]);
  const [seoAudits, setSeoAudits] = useState<any[]>([]);
  const [seoVersions, setSeoVersions] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Editor states
  const [editingPage, setEditingPage] = useState<PageMeta | null>(null);
  const [editorSchemaFields, setEditorSchemaFields] = useState<string>("{\n  \"name\": \"DDS Dental Clinic\"\n}");
  const [editorSchemaActive, setEditorSchemaActive] = useState<boolean>(true);

  // Blog Editor states
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("Dr. Priti Munde");
  const [blogImage, setBlogImage] = useState("/images/blog_banner_73696.jpg");
  const [blogSeoTitle, setBlogSeoTitle] = useState("");
  const [blogSeoDesc, setBlogSeoDesc] = useState("");
  const [blogSeoKeywords, setBlogSeoKeywords] = useState("");
  const [blogNoIndex, setBlogNoIndex] = useState(false);
  
  // Page Manager search / filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("key");

  // Technical Directives Editor states
  const [robotsDisallows, setRobotsDisallows] = useState<string>("/admin/\n/private/");
  const [sitemapRegenSuccess, setSitemapRegenSuccess] = useState(false);

  // Redirect addition states
  const [newRedirectSource, setNewRedirectSource] = useState("");
  const [newRedirectDest, setNewRedirectDest] = useState("");
  const [newRedirectCode, setNewRedirectCode] = useState("301");
  const [redirectError, setRedirectError] = useState("");

  // Target Key images list for Alt SEO tag management
  const publicImages = [
    { src: "/images/blog_banner_73696.jpg", label: "Blog Listing Banner" },
    { src: "/images/about_gallery_1_v3.jpg", label: "Clinic Gallery Image 1" },
    { src: "/images/about_gallery_2.jpg", label: "Clinic Gallery Image 2" },
    { src: "/images/about_gallery_3.jpg", label: "Clinic Gallery Image 3" },
    { src: "/images/pm_4437.jpg", label: "Philosophy - Diagnose" },
    { src: "/images/pm_4449.jpg", label: "Philosophy - Design" },
    { src: "/images/gemini_generated_smile.png", label: "Philosophy - Smile / Patient Smile" },
    { src: "/images/website-4k-camera.jpg", label: "Zeiss Microscope Technology" },
    { src: "/images/aqucare-4000x4000-11th-march-5-e1765274428125.jpg", label: "Aquacare Cleaning Technology" },
    { src: "/images/indilase-Pro-1.webp", label: "Laser Therapy Machine" },
    { src: "/images/dentsply-cerec-digital-chairside-dentistry.jpg", label: "Cerec Milling Machine" }
  ];

  // Check auth session
  useEffect(() => {
    fetch("/api/seo/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadDatabase();
        } else {
          setCheckingSession(false);
        }
      })
      .catch(() => setCheckingSession(false));
  }, []);

  const loadDatabase = () => {
    setIsLoading(true);
    fetch("/api/seo")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load settings.");
        return res.json();
      })
      .then((data) => {
        setPages(data.pages || {});
        setBlogs(data.blogs || []);
        setRedirects(data.redirects || []);
        setLogs404(data.logs_404 || []);
        setSeoSettings(data.seo_settings || {});
        setImageAlts(data.image_alts || {});
        setSeoIssues(data.seo_issues || []);
        setSeoAudits(data.seo_audits || []);
        setSeoVersions(data.seo_versions || []);
        setIsLoading(false);
        setCheckingSession(false);
      })
      .catch((err) => {
        setSaveError("Error retrieving SEO config database: " + err.message);
        setIsLoading(false);
        setCheckingSession(false);
      });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/seo/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Login credentials authentication failed.");
      }

      setIsAuthenticated(true);
      loadDatabase();
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/seo/logout", { method: "POST" });
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const handleSaveConfig = async (
    updatedPages = pages,
    updatedSettings = seoSettings,
    updatedRedirects = redirects,
    updatedBlogs = blogs,
    updatedAlts = imageAlts
  ) => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    const payload = {
      pages: updatedPages,
      blogs: updatedBlogs,
      redirects: updatedRedirects,
      logs_404: logs404,
      seo_settings: updatedSettings,
      image_alts: updatedAlts,
      seo_issues: seoIssues,
      seo_audits: seoAudits,
      seo_versions: seoVersions
    };

    try {
      const response = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Could not sync configurations to server.");
      }
      setSaveSuccess(true);
      loadDatabase();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Failed to update configurations.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRunAudit = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      const response = await fetch("/api/seo/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Audit crawl failed.");
      setSaveSuccess(true);
      loadDatabase();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "SEO Crawler execution failed.");
    } finally {
      setIsSaving(false);
    }
  };

  // Page Editor Save
  const handleEditorSave = () => {
    if (!editingPage) return;

    let parsedSchema = [];
    try {
      parsedSchema = JSON.parse(editorSchemaFields);
      if (!Array.isArray(parsedSchema)) {
        parsedSchema = [parsedSchema];
      }
    } catch (e) {
      setSaveError("Invalid Schema JSON markup structure! Please verify JSON syntax.");
      return;
    }

    const pageKey = editingPage.key;
    const updatedPage: PageMeta = {
      ...editingPage,
      schema: parsedSchema.map((s: any) => ({
        type: s.type || s["@type"] || "LocalBusiness",
        active: editorSchemaActive,
        fields: s
      }))
    };

    const newPages = {
      ...pages,
      [pageKey]: updatedPage
    };

    setPages(newPages);
    setEditingPage(null);
    handleSaveConfig(newPages);
  };

  // Blog Editor Save
  const handleBlogSave = () => {
    if (!blogTitle.trim() || !blogSlug.trim()) {
      setSaveError("Title and Slug path are required to publish dynamic blogs.");
      return;
    }

    const cleanSlug = blogSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

    const contentArray = blogContent.split("\n").filter((p) => p.trim() !== "");

    const newPost: BlogPost = {
      id: editingBlog?.id || `blog-${Date.now()}`,
      title: blogTitle.trim(),
      slug: cleanSlug,
      date: blogDate || new Date().toLocaleDateString("en-GB"),
      image: blogImage || "/images/blog_banner_73696.jpg",
      excerpt: blogExcerpt.trim(),
      content: contentArray,
      author: blogAuthor.trim(),
      seoTitle: blogSeoTitle.trim() || undefined,
      seoDescription: blogSeoDesc.trim() || undefined,
      seoKeywords: blogSeoKeywords.trim() || undefined,
      indexing: { noindex: blogNoIndex, nofollow: blogNoIndex }
    };

    let updatedBlogs = [];
    if (isCreatingBlog) {
      updatedBlogs = [newPost, ...blogs];
    } else {
      updatedBlogs = blogs.map((b) => (b.id === newPost.id ? newPost : b));
    }

    setBlogs(updatedBlogs);
    setEditingBlog(null);
    setIsCreatingBlog(false);
    handleSaveConfig(pages, seoSettings, redirects, updatedBlogs);
  };

  // Delete Blog Post
  const handleBlogDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post permanently?")) {
      const updatedBlogs = blogs.filter((b) => b.id !== id);
      setBlogs(updatedBlogs);
      handleSaveConfig(pages, seoSettings, redirects, updatedBlogs);
    }
  };

  // Redirect addition check
  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedirectError("");

    if (!newRedirectSource.startsWith("/") || !newRedirectDest.startsWith("/")) {
      setRedirectError("Paths must be absolute, starting with '/' (e.g., /old-page)");
      return;
    }

    try {
      const response = await fetch("/api/seo/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          redirect: {
            source: newRedirectSource,
            destination: newRedirectDest,
            statusCode: newRedirectCode
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to create redirect.");
      }

      setNewRedirectSource("");
      setNewRedirectDest("");
      setSaveSuccess(true);
      loadDatabase();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setRedirectError(err.message);
    }
  };

  const handleDeleteRedirect = async (r: any) => {
    try {
      await fetch("/api/seo/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", redirect: r })
      });
      loadDatabase();
    } catch (e) {}
  };

  const handleToggleRedirect = async (r: any) => {
    try {
      await fetch("/api/seo/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle", redirect: r })
      });
      loadDatabase();
    } catch (e) {}
  };

  const handleResolve404 = (log: any) => {
    setNewRedirectSource(log.url);
    setNewRedirectDest("/");
    setActiveTab("redirects");
  };

  // Image Alt SEO updates
  const handleImageAltChange = (src: string, field: "alt" | "title" | "src", value: string) => {
    const updated = {
      ...imageAlts,
      [src]: {
        alt: field === "alt" ? value : (imageAlts[src]?.alt || ""),
        title: field === "title" ? value : (imageAlts[src]?.title || ""),
        src: field === "src" ? value : (imageAlts[src]?.src || "")
      }
    };
    setImageAlts(updated);
  };

  const handleImageUpload = async (originalSrc: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImages((prev) => ({ ...prev, [originalSrc]: true }));
    setSaveError("");

    try {
      // 1. Read file as Base64 string
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64Content = result.split(",")[1];
          resolve(base64Content);
        };
        reader.onerror = (err) => reject(err);
      });

      reader.readAsDataURL(file);
      const fileBase64 = await base64Promise;

      // 2. POST to upload API endpoint
      const res = await fetch("/api/seo/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileBase64
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image file.");
      }

      // 3. Update imageAlts map with the newly uploaded file path
      handleImageAltChange(originalSrc, "src", data.path);
    } catch (err: any) {
      console.error(err);
      setSaveError(err.message || "Failed to upload image file.");
    } finally {
      setUploadingImages((prev) => ({ ...prev, [originalSrc]: false }));
    }
  };

  // Yoast Content Analysis Helper
  const runSeoAnalysis = (title: string, desc: string, keyword: string) => {
    const alerts = [];
    const cleanKeyword = keyword?.toLowerCase().trim();

    // 1. Title Checks
    if (!title) {
      alerts.push({ text: "SEO Title is missing.", status: "red" });
    } else if (title.length < 35) {
      alerts.push({ text: "SEO Title is too short (ideal: 40-60 chars).", status: "orange" });
    } else if (title.length > 65) {
      alerts.push({ text: "SEO Title is too long (ideal: 40-60 chars).", status: "orange" });
    } else {
      alerts.push({ text: "SEO Title length is optimal.", status: "green" });
    }

    // 2. Description Checks
    if (!desc) {
      alerts.push({ text: "Meta Description is missing.", status: "red" });
    } else if (desc.length < 100) {
      alerts.push({ text: "Meta Description is too short (ideal: 110-160 chars).", status: "orange" });
    } else if (desc.length > 165) {
      alerts.push({ text: "Meta Description is too long (ideal: 110-160 chars).", status: "orange" });
    } else {
      alerts.push({ text: "Meta Description length is optimal.", status: "green" });
    }

    // 3. Keyword Checks
    if (!cleanKeyword) {
      alerts.push({ text: "Focus keyword is not defined.", status: "orange" });
    } else {
      // Keyword in Title
      if (title.toLowerCase().includes(cleanKeyword)) {
        alerts.push({ text: "Focus keyword found in SEO Title.", status: "green" });
      } else {
        alerts.push({ text: "Focus keyword was not found in SEO Title.", status: "red" });
      }

      // Keyword in Description
      if (desc.toLowerCase().includes(cleanKeyword)) {
        alerts.push({ text: "Focus keyword found in Meta Description.", status: "green" });
      } else {
        alerts.push({ text: "Focus keyword was not found in Meta Description.", status: "orange" });
      }
    }

    return alerts.sort((a, b) => {
      const rank = { red: 0, orange: 1, green: 2 };
      return rank[a.status as keyof typeof rank] - rank[b.status as keyof typeof rank];
    });
  };

  const getPagesList = () => {
    return Object.values(pages)
      .filter((page) => {
        const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          page.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
          page.key.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (filterType === "all") return true;
        if (filterType === "noindex") return page.indexing?.noindex;
        if (filterType === "indexed") return !page.indexing?.noindex;
        if (filterType === "low_score") return (page.seoScore || 100) < 70;
        if (filterType === "missing_desc") return !page.description;
        
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "score") return (a.seoScore || 0) - (b.seoScore || 0);
        return a.key.localeCompare(b.key);
      });
  };

  const getOverallScore = () => {
    const list = Object.values(pages);
    if (list.length === 0) return 100;
    const scoreSum = list.reduce((sum, p) => sum + (p.seoScore || 100), 0);
    return Math.round(scoreSum / list.length);
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-light/30">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-light/30 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-border-neutral flex flex-col space-y-6"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-[#380920]/10 p-4 rounded-full">
              <ShieldAlert className="w-10 h-10 text-[#380920]" />
            </div>
            <h1 className="font-caudex font-bold text-2xl text-primary">SEO Management System</h1>
            <p className="font-instrument text-sm text-text-muted">
              Log in to save production metadata, verification codes, alt text descriptions, and publish articles.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="font-instrument font-semibold text-xs text-text-dark">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="seo_admin"
                className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="font-instrument font-semibold text-xs text-text-dark">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full font-instrument text-sm border border-border-neutral rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                />
                <Key className="w-4 h-4 text-text-light absolute left-3.5 top-3.5" />
              </div>
              {authError && (
                <p className="text-red-500 text-xs mt-1 font-instrument">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="bg-[#380920] hover:bg-[#380920]/90 disabled:opacity-50 text-white font-instrument text-sm font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Authenticate & Unlock
            </button>
          </form>

          <Link href="/" className="flex items-center justify-center text-xs text-text-muted hover:text-primary transition-colors gap-1.5 pt-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-light/10 py-10 px-6 md:px-12 font-instrument">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8">
        
        {/* Top bar info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-neutral/40 pb-6">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary animate-spin-slow" />
              <span className="text-xs font-semibold tracking-widest text-[#62826B] uppercase tracking-wider font-montserrat">
                SEO EXPERT CONSOLE
              </span>
            </div>
            <h1 className="font-caudex font-bold text-3xl text-primary">DDS Dentistry SEO Suite</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAudit}
              disabled={isSaving}
              className="px-4 py-2.5 border border-[#62826B]/40 hover:bg-[#62826B]/10 rounded-xl text-xs font-bold text-[#304838] transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSaving ? "animate-spin" : ""}`} />
              Run Site Audit
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border border-border-neutral hover:bg-red-50 hover:text-red-600 rounded-xl text-xs font-semibold transition-colors"
            >
              Lock Console
            </button>
          </div>
        </div>

        {/* Action feedback notifications */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-green-600" />
              SEO Configurations synced and committed to repository successfully! Queued for live deployment.
            </motion.div>
          )}
          {saveError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-600" />
              {saveError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Console tab navigation */}
        <div className="flex flex-wrap gap-2 border-b border-border-neutral/30 pb-4">
          <button
            onClick={() => { setActiveTab("dashboard"); setEditingPage(null); setEditingBlog(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "dashboard" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => { setActiveTab("pages"); setEditingBlog(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pages" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
            }`}
          >
            Pages Meta Tags
          </button>
          <button
            onClick={() => { setActiveTab("blogs"); setEditingPage(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "blogs" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
            }`}
          >
            Blog Publisher CMS
          </button>
          <button
            onClick={() => { setActiveTab("images"); setEditingPage(null); setEditingBlog(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "images" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
            }`}
          >
            Image SEO (Alt tags)
          </button>
          <button
            onClick={() => { setActiveTab("redirects"); setEditingPage(null); setEditingBlog(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "redirects" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
            }`}
          >
            301 Redirects
          </button>
          <button
            onClick={() => { setActiveTab("404"); setEditingPage(null); setEditingBlog(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "404" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
            }`}
          >
            404 Logs
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === "404" ? "bg-white text-[#380920]" : "bg-red-500 text-white"}`}>
              {logs404.length}
            </span>
          </button>
          <button
            onClick={() => { setActiveTab("technical"); setEditingPage(null); setEditingBlog(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "technical" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
            }`}
          >
            Technical & Verification
          </button>
          <button
            onClick={() => { setActiveTab("history"); setEditingPage(null); setEditingBlog(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "history" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
            }`}
          >
            Version History
          </button>
        </div>

        {/* Tab content wrappers */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-border-neutral/30 shadow-sm min-h-[500px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm font-semibold text-text-muted">Loading SEO Configurations...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === "dashboard" && (
                <div className="flex flex-col space-y-8">
                  {/* Grid metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 flex flex-col space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#62826B] font-bold">SEO Health Score</span>
                      <span className="font-caudex font-bold text-4xl text-primary">{getOverallScore()}%</span>
                      <div className="w-full bg-gray-150 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#62826B] h-full" style={{ width: `${getOverallScore()}%` }}></div>
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 flex flex-col space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#62826B] font-bold">Configured Pages</span>
                      <span className="font-caudex font-bold text-4xl text-primary">{Object.keys(pages).length}</span>
                      <span className="text-xs text-text-light">Paths indexed by search console</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 flex flex-col space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#62826B] font-bold">Published Blogs</span>
                      <span className="font-caudex font-bold text-4xl text-primary">{blogs.length}</span>
                      <span className="text-xs text-text-light">Active dynamic articles</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 flex flex-col space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-red-500 font-bold">Critical SEO Issues</span>
                      <span className="font-caudex font-bold text-4xl text-red-600">{seoIssues.filter((i) => i.status === "open").length}</span>
                      <span className="text-xs text-text-light">Requiring meta optimization</span>
                    </div>
                  </div>

                  {/* Sitemap & Robots Status bar */}
                  <div className="p-5 rounded-2xl border border-border-neutral/30 bg-cream-light/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[#62826B]" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-text-dark">Dynamic XML Sitemap & Robots.txt is active</p>
                        <p className="text-[10px] text-text-light">Connected to search indexers. Autogenerated daily.</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a href="/sitemap.xml" target="_blank" className="px-3 py-1.5 rounded-lg border border-border-neutral hover:bg-white text-xs font-bold flex items-center gap-1.5 transition-colors">
                        Sitemap <ExternalLink className="w-3 h-3" />
                      </a>
                      <a href="/robots.txt" target="_blank" className="px-3 py-1.5 rounded-lg border border-border-neutral hover:bg-white text-xs font-bold flex items-center gap-1.5 transition-colors">
                        Robots <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Audit Logs list */}
                  <div className="flex flex-col space-y-4">
                    <h2 className="font-caudex font-bold text-lg text-primary">SEO Crawler Audit Feed</h2>
                    {seoIssues.filter((i) => i.status === "open").length === 0 ? (
                      <div className="p-6 rounded-2xl bg-green-50 border border-green-100 text-green-800 text-xs font-bold flex items-center gap-2.5">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        No meta tags issues found! All configurations pass search crawling standards.
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-3">
                        {seoIssues.filter((i) => i.status === "open").map((issue) => (
                          <div key={issue.id} className="p-4 rounded-xl border border-red-200/60 bg-red-50/20 flex items-start gap-3">
                            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-grow space-y-1">
                              <p className="text-xs font-bold text-text-dark flex items-center gap-2">
                                <span className="uppercase text-[9px] tracking-wide bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-extrabold">{issue.severity}</span>
                                Page: /{issue.pageKey}
                              </p>
                              <p className="text-xs text-text-muted leading-relaxed">{issue.description}</p>
                              <p className="text-[10px] font-bold text-primary">Recommendation: {issue.recommendedAction}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: PAGE META tags editor list */}
              {activeTab === "pages" && !editingPage && (
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-neutral/30">
                    <h2 className="font-caudex font-bold text-xl text-primary">Meta Configuration Matrix</h2>
                    
                    {/* Search & Sort filters */}
                    <div className="flex flex-wrap gap-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search pages..."
                          className="pl-8 pr-4 py-2 border border-border-neutral rounded-xl text-xs bg-white text-text-dark outline-none focus:border-[#62826B] w-48"
                        />
                        <Search className="w-3.5 h-3.5 text-text-light absolute left-2.5 top-3" />
                      </div>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-border-neutral rounded-xl text-xs bg-white text-text-dark outline-none"
                      >
                        <option value="all">All Pages</option>
                        <option value="indexed">Indexed Only</option>
                        <option value="noindex">Noindex Only</option>
                        <option value="low_score">Score Below 70%</option>
                        <option value="missing_desc">Missing Description</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-border-neutral/30">
                    <table className="min-w-full divide-y divide-border-neutral/20 text-left font-instrument">
                      <thead className="bg-cream-light/20 text-xs text-text-muted font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3">Page Name / Slug</th>
                          <th className="px-6 py-3">Meta Page Title</th>
                          <th className="px-6 py-3 text-center">Score</th>
                          <th className="px-6 py-3 text-center">Indexing</th>
                          <th className="px-6 py-3 text-right">Edit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-neutral/20 bg-white text-xs">
                        {getPagesList().map((p) => (
                          <tr key={p.key} className="hover:bg-cream-light/5 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-bold text-text-dark uppercase tracking-wider text-[10px]">{p.key}</p>
                              <p className="text-[10px] text-text-light font-mono">{p.url}</p>
                            </td>
                            <td className="px-6 py-4 font-bold text-text-muted truncate max-w-xs">{p.title}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                (p.seoScore || 100) >= 80 ? "bg-green-100 text-green-800" : (p.seoScore || 100) >= 60 ? "bg-orange-100 text-orange-850" : "bg-red-100 text-red-800"
                              }`}>
                                {p.seoScore || 100}%
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              {p.indexing?.noindex ? (
                                <span className="bg-red-50 border border-red-200 text-red-700 px-2 py-0.5 rounded font-extrabold text-[9px]">NOINDEX</span>
                              ) : (
                                <span className="bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded font-extrabold text-[9px]">INDEXED</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => {
                                  setEditingPage(p);
                                  setEditorSchemaFields(p.schema && p.schema.length > 0 ? JSON.stringify(p.schema.map((s) => s.fields || s), null, 2) : "{\n  \"name\": \"DDS Dental Clinic\"\n}");
                                  setEditorSchemaActive(p.schema && p.schema.length > 0 ? p.schema[0].active !== false : true);
                                }}
                                className="p-1.5 text-primary hover:bg-[#380920]/5 rounded-lg transition-colors inline-flex"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2 EDIT PAGE MODE: Yoast Editor with previews */}
              {activeTab === "pages" && editingPage && (
                <div className="flex flex-col space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-border-neutral/30 pb-4">
                    <button
                      onClick={() => setEditingPage(null)}
                      className="text-xs font-bold text-text-muted hover:text-primary flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Page List
                    </button>
                    <h2 className="font-caudex font-bold text-xl text-primary">SEO Settings: /{editingPage.key}</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Fields Form */}
                    <div className="lg:col-span-7 flex flex-col space-y-5">
                      
                      {/* Focus Keyword */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider flex items-center gap-1.5">
                          Focus Keyword
                          <span title="Word or phrase that you want your page to rank for.">
                            <Info className="w-3.5 h-3.5 text-text-light cursor-help" />
                          </span>
                        </label>
                        <input
                          type="text"
                          value={editingPage.focusKeyword || ""}
                          onChange={(e) => setEditingPage((prev: any) => ({ ...prev, focusKeyword: e.target.value }))}
                          placeholder="e.g. dental clinic Pune"
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                        />
                      </div>

                      {/* SEO Title with progress bar */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">SEO Page Title</label>
                        <input
                          type="text"
                          value={editingPage.title}
                          onChange={(e) => setEditingPage((prev: any) => ({ ...prev, title: e.target.value }))}
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark font-semibold"
                        />
                        {/* Title Length Indicator */}
                        <div className="w-full h-1 bg-gray-150 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full transition-all duration-300 ${
                              editingPage.title.length < 35 || editingPage.title.length > 65 ? "bg-orange-500" : "bg-green-600"
                            }`}
                            style={{ width: `${Math.min(100, (editingPage.title.length / 75) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-text-light">
                          <span>Ideal: 40-60 characters</span>
                          <span className={editingPage.title.length > 65 ? "text-red-500 font-bold" : ""}>
                            {editingPage.title.length} characters
                          </span>
                        </div>
                      </div>

                      {/* Meta Description with progress bar */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Meta Description</label>
                        <textarea
                          rows={4}
                          value={editingPage.description}
                          onChange={(e) => setEditingPage((prev: any) => ({ ...prev, description: e.target.value }))}
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark resize-none leading-relaxed"
                        />
                        {/* Desc Length Indicator */}
                        <div className="w-full h-1 bg-gray-150 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full transition-all duration-300 ${
                              editingPage.description.length < 100 || editingPage.description.length > 165 ? "bg-orange-500" : "bg-green-600"
                            }`}
                            style={{ width: `${Math.min(100, (editingPage.description.length / 190) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-text-light">
                          <span>Ideal: 110-160 characters</span>
                          <span className={editingPage.description.length > 165 ? "text-red-500 font-bold" : ""}>
                            {editingPage.description.length} characters
                          </span>
                        </div>
                      </div>

                      {/* Keywords & Indexing Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">General Keywords</label>
                          <input
                            type="text"
                            value={editingPage.keywords}
                            onChange={(e) => setEditingPage((prev: any) => ({ ...prev, keywords: e.target.value }))}
                            placeholder="comma, separated, tags"
                            className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Indexing Directive</label>
                          <select
                            value={editingPage.indexing?.noindex ? "noindex" : "index"}
                            onChange={(e) => setEditingPage((prev: any) => ({
                              ...prev,
                              indexing: {
                                ...prev.indexing,
                                noindex: e.target.value === "noindex"
                              }
                            }))}
                            className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                          >
                            <option value="index">Index, Follow (Standard Google Indexing)</option>
                            <option value="noindex">Noindex, Nofollow (Hide Page from Crawlers)</option>
                          </select>
                        </div>
                      </div>

                      {/* Canonical and Schema */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Canonical Link Override</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <select
                            value={editingPage.canonical?.mode || "self"}
                            onChange={(e) => setEditingPage((prev: any) => ({
                              ...prev,
                              canonical: {
                                ...prev.canonical,
                                mode: e.target.value as any
                              }
                            }))}
                            className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                          >
                            <option value="self">Self-Referencing (Recommended)</option>
                            <option value="custom">Custom URL Override</option>
                            <option value="disabled">Disabled</option>
                          </select>
                          {editingPage.canonical?.mode === "custom" && (
                            <input
                              type="text"
                              value={editingPage.canonical?.customUrl || ""}
                              placeholder="https://alternative-domain.com/path"
                              onChange={(e) => setEditingPage((prev: any) => ({
                                ...prev,
                                canonical: {
                                  ...prev.canonical,
                                  customUrl: e.target.value
                                }
                              }))}
                              className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                            />
                          )}
                        </div>
                      </div>

                      {/* Structured schema metadata */}
                      <div className="flex flex-col space-y-2 border-t border-border-neutral/20 pt-4">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Structured JSON-LD Schema (Schema.org)</label>
                          <label className="inline-flex items-center gap-1.5 text-xs text-text-dark font-semibold">
                            <input
                              type="checkbox"
                              checked={editorSchemaActive}
                              onChange={(e) => setEditorSchemaActive(e.target.checked)}
                              className="rounded border-border-neutral/30 text-primary focus:ring-primary/20"
                            />
                            Inject Schema Active
                          </label>
                        </div>
                        <textarea
                          rows={6}
                          value={editorSchemaFields}
                          onChange={(e) => setEditorSchemaFields(e.target.value)}
                          className="w-full font-mono text-xs border border-border-neutral rounded-xl p-4 bg-gray-50 text-text-dark resize-none focus:border-[#62826B] outline-none"
                        />
                      </div>

                      <div className="pt-2 flex gap-3">
                        <button
                          onClick={handleEditorSave}
                          className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:scale-[1.02]"
                        >
                          Save & Queue Deploy
                        </button>
                        <button
                          onClick={() => setEditingPage(null)}
                          className="border border-border-neutral hover:bg-cream-light/40 text-text-dark font-instrument text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>

                    </div>

                    {/* Previews & Analysis Sidebar (Yoast Columns) */}
                    <div className="lg:col-span-5 flex flex-col space-y-6">
                      
                      {/* Previews wrapper */}
                      <div className="flex flex-col space-y-4 p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 text-left">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#62826B]">
                          <Search className="w-3.5 h-3.5" />
                          <span>Google Search Snippet Preview</span>
                        </div>
                        
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border-neutral/20 flex flex-col space-y-1 font-sans">
                          <div className="text-[11px] text-[#202124] flex items-center gap-1">
                            <span>{seoSettings.websiteUrl || "https://ddspune.com"}</span>
                            <span className="text-[#5f6368]">• {editingPage.key}</span>
                          </div>
                          <h2 className="text-[#1a0dab] text-lg hover:underline cursor-pointer font-medium leading-tight line-clamp-2">
                            {editingPage.title || "Please enter title"}
                          </h2>
                          <p className="text-xs text-[#4d5156] leading-snug line-clamp-3">
                            {editingPage.description || "Enter meta description to preview snippet."}
                          </p>
                        </div>
                      </div>

                      {/* Yoast Checklist analysis */}
                      <div className="p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 flex flex-col space-y-4">
                        <h3 className="font-caudex font-bold text-base text-primary flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#62826B]" />
                          Yoast Live SEO Scorecard
                        </h3>
                        
                        <div className="flex flex-col space-y-2 text-xs">
                          {runSeoAnalysis(editingPage.title, editingPage.description, editingPage.focusKeyword || "").map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-text-dark font-medium">
                              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                item.status === "green" ? "bg-green-500" : item.status === "orange" ? "bg-yellow-500" : "bg-red-500"
                              }`} />
                              <span>{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Social og card preview */}
                      <div className="p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 flex flex-col space-y-4">
                        <h3 className="text-xs font-bold text-text-dark uppercase tracking-wider">Social Share Preview</h3>
                        <div className="border border-border-neutral/20 rounded-xl overflow-hidden shadow-sm bg-white">
                          <div className="aspect-[1.91/1] bg-card-bg relative overflow-hidden flex items-center justify-center border-b border-border-neutral/15">
                            {editingPage.social?.ogImage ? (
                              <img src={editingPage.social.ogImage} className="object-cover w-full h-full" alt="OG Tag preview" />
                            ) : (
                              <span className="text-[10px] text-text-light">No share card image defined</span>
                            )}
                          </div>
                          <div className="p-4 flex flex-col space-y-1 text-left">
                            <span className="text-[10px] uppercase font-bold text-[#62826B]">
                              {(seoSettings.websiteUrl || "https://ddspune.com").replace(/^https?:\/\//i, "").toUpperCase()}
                            </span>
                            <h4 className="text-sm font-bold text-text-dark line-clamp-1">{editingPage.title}</h4>
                            <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">{editingPage.description}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: BLOG PUBLISHER CMS */}
              {activeTab === "blogs" && !editingBlog && !isCreatingBlog && (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                    <div className="space-y-1">
                      <h2 className="font-caudex font-bold text-xl text-primary">Dynamic Blog CMS Console</h2>
                      <p className="text-xs text-text-muted">Create, edit, delete articles and customize page-level indexing parameters.</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCreatingBlog(true);
                        setEditingBlog(null);
                        setBlogTitle("");
                        setBlogSlug("");
                        setBlogDate(new Date().toLocaleDateString("en-GB"));
                        setBlogExcerpt("");
                        setBlogContent("");
                        setBlogAuthor("Dr. Priti Munde");
                        setBlogImage("/images/blog_banner_73696.jpg");
                        setBlogSeoTitle("");
                        setBlogSeoDesc("");
                        setBlogSeoKeywords("");
                        setBlogNoIndex(false);
                      }}
                      className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <FilePlus className="w-4 h-4" /> Create Blog Post
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {blogs.length === 0 ? (
                      <div className="py-12 text-center text-text-light text-xs font-semibold">
                        No articles published yet. Click Create Blog Post to begin.
                      </div>
                    ) : (
                      blogs.map((b) => (
                        <div key={b.id} className="p-5 rounded-2xl border border-border-neutral/30 bg-cream-light/5 hover:bg-cream-light/10 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-grow">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-150 flex-shrink-0">
                              <img src={b.image} className="object-cover w-full h-full" alt={b.title} />
                            </div>
                            <div className="space-y-1 text-left">
                              <h3 className="font-bold text-text-dark text-sm leading-snug">{b.title}</h3>
                              <p className="text-xs text-text-light flex items-center gap-2">
                                <span>Slug: /blog/{b.slug}</span>
                                <span>•</span>
                                <span>Date: {b.date}</span>
                                {b.indexing?.noindex && (
                                  <>
                                    <span>•</span>
                                    <span className="text-red-500 font-bold uppercase tracking-wider text-[9px]">NOINDEX</span>
                                  </>
                                )}
                              </p>
                              <p className="text-xs text-text-muted line-clamp-1 italic max-w-xl">{b.excerpt}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 self-end md:self-auto">
                            <button
                              onClick={() => {
                                setEditingBlog(b);
                                setIsCreatingBlog(false);
                                setBlogTitle(b.title);
                                setBlogSlug(b.slug);
                                setBlogDate(b.date);
                                setBlogExcerpt(b.excerpt);
                                setBlogContent(Array.isArray(b.content) ? b.content.join("\n\n") : b.content || "");
                                setBlogAuthor(b.author || "Dr. Priti Munde");
                                setBlogImage(b.image);
                                setBlogSeoTitle(b.seoTitle || "");
                                setBlogSeoDesc(b.seoDescription || "");
                                setBlogSeoKeywords(b.seoKeywords || "");
                                setBlogNoIndex(!!b.indexing?.noindex);
                              }}
                              className="px-3 py-1.5 rounded-lg border border-border-neutral bg-white hover:bg-cream-light/20 text-xs font-semibold flex items-center gap-1 transition-all"
                            >
                              <Edit className="w-3.5 h-3.5 text-primary" /> Edit
                            </button>
                            <button
                              onClick={() => handleBlogDelete(b.id)}
                              className="px-3 py-1.5 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-xs font-semibold flex items-center gap-1 transition-all text-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* BLOG EDITOR PANEL (When editing / creating a post) */}
              {(activeTab === "blogs" && (editingBlog || isCreatingBlog)) && (
                <div className="flex flex-col space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-border-neutral/30 pb-4">
                    <button
                      onClick={() => { setEditingBlog(null); setIsCreatingBlog(false); }}
                      className="text-xs font-bold text-text-muted hover:text-primary flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Dashboard list
                    </button>
                    <h2 className="font-caudex font-bold text-xl text-primary">
                      {isCreatingBlog ? "Create New Article" : `Edit Article: ${editingBlog?.title}`}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Content Fields */}
                    <div className="lg:col-span-8 flex flex-col space-y-5">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Article Title</label>
                        <input
                          type="text"
                          required
                          value={blogTitle}
                          onChange={(e) => {
                            setBlogTitle(e.target.value);
                            if (isCreatingBlog) {
                              setBlogSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                            }
                          }}
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark font-bold text-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Slug (URL path)</label>
                          <input
                            type="text"
                            required
                            value={blogSlug}
                            onChange={(e) => setBlogSlug(e.target.value)}
                            placeholder="my-custom-slug"
                            className="w-full font-instrument text-xs border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Publish Date</label>
                          <input
                            type="text"
                            value={blogDate}
                            onChange={(e) => setBlogDate(e.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full font-instrument text-xs border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Author Name</label>
                          <input
                            type="text"
                            value={blogAuthor}
                            onChange={(e) => setBlogAuthor(e.target.value)}
                            className="w-full font-instrument text-xs border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Featured Image Path</label>
                          <input
                            type="text"
                            value={blogImage}
                            onChange={(e) => setBlogImage(e.target.value)}
                            className="w-full font-instrument text-xs border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Short Excerpt (Teaser Description)</label>
                        <textarea
                          rows={3}
                          value={blogExcerpt}
                          onChange={(e) => setBlogExcerpt(e.target.value)}
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark resize-none"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider flex items-center justify-between">
                          <span>Article Body Content</span>
                          <span className="text-[10px] text-text-light lowercase font-normal">Press Enter to separate paragraphs</span>
                        </label>
                        <textarea
                          rows={12}
                          required
                          value={blogContent}
                          onChange={(e) => setBlogContent(e.target.value)}
                          placeholder="Write article details here..."
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl p-4 outline-none focus:border-[#62826B] bg-white text-text-dark leading-relaxed"
                        />
                      </div>

                      {/* Dynamic Blog SEO Customisation Fields */}
                      <div className="p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 flex flex-col space-y-4">
                        <h3 className="font-caudex font-bold text-base text-primary">Article Page-Level Metadata Customisation</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-1">
                            <label className="text-[10px] font-bold text-text-dark uppercase">SEO Title Override</label>
                            <input
                              type="text"
                              value={blogSeoTitle}
                              onChange={(e) => setBlogSeoTitle(e.target.value)}
                              placeholder="Defaults to article title"
                              className="font-instrument text-xs border border-border-neutral rounded-xl px-4 py-2 bg-white text-text-dark outline-none"
                            />
                          </div>
                          <div className="flex flex-col space-y-1">
                            <label className="text-[10px] font-bold text-text-dark uppercase">SEO Focus Keyword</label>
                            <input
                              type="text"
                              value={blogSeoKeywords}
                              onChange={(e) => setBlogSeoKeywords(e.target.value)}
                              placeholder="e.g. orthodontic treatment, damon braces"
                              className="font-instrument text-xs border border-border-neutral rounded-xl px-4 py-2 bg-white text-text-dark outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-bold text-text-dark uppercase">SEO Description Override</label>
                          <textarea
                            rows={3}
                            value={blogSeoDesc}
                            onChange={(e) => setBlogSeoDesc(e.target.value)}
                            placeholder="Defaults to teaser excerpt"
                            className="font-instrument text-xs border border-border-neutral rounded-xl p-4 bg-white text-text-dark outline-none resize-none"
                          />
                        </div>

                        <label className="inline-flex items-center gap-1.5 text-xs text-text-dark font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={blogNoIndex}
                            onChange={(e) => setBlogNoIndex(e.target.checked)}
                            className="rounded border-border-neutral/30 text-primary focus:ring-primary/20"
                          />
                          Hide article from Google search indexing (Noindex)
                        </label>
                      </div>

                      <div className="pt-2 flex gap-3">
                        <button
                          onClick={handleBlogSave}
                          className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md hover:scale-[1.02]"
                        >
                          Publish & Deploy Article
                        </button>
                        <button
                          onClick={() => { setEditingBlog(null); setIsCreatingBlog(false); }}
                          className="border border-border-neutral hover:bg-cream-light/40 text-text-dark font-instrument text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>

                    </div>

                    {/* Previews Panel */}
                    <div className="lg:col-span-4 flex flex-col space-y-5">
                      <div className="p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 flex flex-col space-y-4 text-left">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#62826B]">
                          <Search className="w-3.5 h-3.5" />
                          <span>Google Search Snippet Preview</span>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border-neutral/20 flex flex-col space-y-1.5 font-sans">
                          <div className="text-[11px] text-[#202124]">
                            <span>{(seoSettings.websiteUrl || "https://ddspune.com").replace(/\/$/, "")}/blog/</span>
                            <span className="font-mono text-gray-500">{blogSlug || "slug-url"}</span>
                          </div>
                          <h2 className="text-[#1a0dab] text-lg font-medium leading-tight hover:underline cursor-pointer">
                            {blogSeoTitle || blogTitle || "Please enter title"}
                          </h2>
                          <p className="text-xs text-[#4d5156] leading-snug line-clamp-3">
                            {blogSeoDesc || blogExcerpt || "Meta Description matches excerpt by default."}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-cream-light/10 border border-border-neutral/30 flex flex-col space-y-4 text-left">
                        <h3 className="text-xs font-bold text-text-dark uppercase tracking-wider">Social share card preview</h3>
                        <div className="border border-border-neutral/20 rounded-xl overflow-hidden shadow-sm bg-white">
                          <div className="aspect-[1.91/1] bg-card-bg relative overflow-hidden flex items-center justify-center">
                            {blogImage ? (
                              <img src={blogImage} className="object-cover w-full h-full" alt="Feature preview" />
                            ) : (
                              <span className="text-[10px] text-text-light">No image path selected</span>
                            )}
                          </div>
                          <div className="p-4 flex flex-col space-y-1 text-left">
                            <span className="text-[10px] uppercase font-bold text-[#62826B]">
                              {(seoSettings.websiteUrl || "https://ddspune.com").replace(/^https?:\/\//i, "").toUpperCase()}
                            </span>
                            <h4 className="text-sm font-bold text-text-dark line-clamp-1">{blogSeoTitle || blogTitle || "Article Title"}</h4>
                            <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">{blogSeoDesc || blogExcerpt || "Teaser text summary"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 4: REDIRECT MANAGER */}
              {activeTab === "redirects" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                    <h2 className="font-caudex font-bold text-xl text-primary">Dynamic Redirects</h2>
                    <span className="text-xs text-text-muted">Manage 301/302/307/308 status route forwarding</span>
                  </div>

                  <form onSubmit={handleAddRedirect} className="p-5 rounded-2xl bg-cream-light/25 border border-border-neutral/30 flex flex-col space-y-4">
                    <h3 className="text-xs font-bold text-text-dark uppercase tracking-wider text-left">Create Route Redirect</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-bold text-text-muted">Source Path (e.g. /pricing)</label>
                        <input
                          type="text"
                          required
                          value={newRedirectSource}
                          onChange={(e) => setNewRedirectSource(e.target.value)}
                          placeholder="/old-path"
                          className="font-instrument text-sm border border-border-neutral rounded-xl px-4 py-2 bg-white text-text-dark outline-none focus:border-[#62826B]"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-bold text-text-muted">Destination Path (e.g. /services)</label>
                        <input
                          type="text"
                          required
                          value={newRedirectDest}
                          onChange={(e) => setNewRedirectDest(e.target.value)}
                          placeholder="/new-destination"
                          className="font-instrument text-sm border border-border-neutral rounded-xl px-4 py-2 bg-white text-text-dark outline-none focus:border-[#62826B]"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-bold text-text-muted">HTTP Status Code</label>
                        <select
                          value={newRedirectCode}
                          onChange={(e) => setNewRedirectCode(e.target.value)}
                          className="font-instrument text-sm border border-border-neutral rounded-xl px-4 py-2 bg-white text-text-dark outline-none focus:border-[#62826B]"
                        >
                          <option value="301">301 - Permanent</option>
                          <option value="302">302 - Temporary</option>
                          <option value="307">307 - Temp Redirect</option>
                          <option value="308">308 - Permanent Redirect</option>
                        </select>
                      </div>
                    </div>
                    {redirectError && (
                      <p className="text-red-500 text-xs font-semibold text-left">{redirectError}</p>
                    )}
                    <div className="text-left">
                      <button
                        type="submit"
                        className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Create Redirect
                      </button>
                    </div>
                  </form>

                  <div className="overflow-x-auto rounded-2xl border border-border-neutral/30">
                    {redirects.length === 0 ? (
                      <div className="py-12 text-center text-text-light text-xs font-semibold">
                        No custom redirect paths defined.
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-border-neutral/20 text-left font-instrument">
                        <thead className="bg-cream-light/20 text-xs text-text-muted font-semibold uppercase tracking-wider">
                          <tr>
                            <th className="px-6 py-3">Source Route</th>
                            <th className="px-6 py-3">Destination Route</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center">Active</th>
                            <th className="px-6 py-3 text-right">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-neutral/20 bg-white text-xs">
                          {redirects.map((r) => (
                            <tr key={r.id} className="hover:bg-cream-light/5 transition-colors">
                              <td className="px-6 py-4 font-bold text-text-dark">{r.source}</td>
                              <td className="px-6 py-4 font-bold text-text-muted">{r.destination}</td>
                              <td className="px-6 py-4 text-center">
                                <span className="px-2 py-0.5 rounded bg-cream-light/60 border border-border-neutral/30 font-bold">
                                  {r.statusCode}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <input
                                  type="checkbox"
                                  checked={r.active !== false}
                                  onChange={() => handleToggleRedirect(r)}
                                  className="rounded text-primary focus:ring-primary/20 cursor-pointer"
                                />
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => handleDeleteRedirect(r)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: 404 HIT MONITOR */}
              {activeTab === "404" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                    <h2 className="font-caudex font-bold text-xl text-primary">404 Error Log Tracker</h2>
                    <span className="text-xs text-text-muted">Real-time broken links hits captured on live server</span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-border-neutral/30">
                    {logs404.length === 0 ? (
                      <div className="py-12 text-center text-text-light text-xs font-semibold">
                        No 404 errors logged. Your link hierarchy is fully healthy!
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-border-neutral/20 text-left font-instrument">
                        <thead className="bg-cream-light/20 text-xs text-text-muted font-semibold uppercase tracking-wider">
                          <tr>
                            <th className="px-6 py-3">Missing URL Route</th>
                            <th className="px-6 py-3 text-center">Hits</th>
                            <th className="px-6 py-3">First Detected</th>
                            <th className="px-6 py-3">Last Detected</th>
                            <th className="px-6 py-3 text-right">Fix Link</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-neutral/20 bg-white text-xs">
                          {logs404.map((log, idx) => (
                            <tr key={idx} className="hover:bg-cream-light/5 transition-colors">
                              <td className="px-6 py-4 font-mono font-bold text-red-600">{log.url}</td>
                              <td className="px-6 py-4 text-center font-bold">{log.hits}</td>
                              <td className="px-6 py-4 text-text-muted">{new Date(log.firstDetected).toLocaleString()}</td>
                              <td className="px-6 py-4 text-text-muted">{new Date(log.lastDetected).toLocaleString()}</td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => handleResolve404(log)}
                                  className="px-3 py-1 bg-[#380920] hover:bg-[#380920]/90 text-white rounded-lg text-[10px] font-bold transition-all shadow-sm"
                                >
                                  Redirect Path
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: IMAGE ALT EDITOR */}
              {activeTab === "images" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                    <h2 className="font-caudex font-bold text-xl text-primary">Image Alt Text Manager</h2>
                    <span className="text-xs text-text-muted">Edit image screen reader descriptors and search crawl context</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    {publicImages.map((img) => (
                      <div key={img.src} className="p-4 rounded-xl border border-border-neutral/30 flex items-start gap-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-border-neutral/20">
                          <img src={imageAlts[img.src]?.src || img.src} alt="Source thumbnail" className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-grow flex flex-col space-y-2">
                          <span className="text-xs font-bold text-primary">{img.label}</span>
                          <span className="text-[10px] font-mono text-text-light truncate block max-w-[200px]" title={img.src}>{img.src}</span>
                          <div className="flex flex-col space-y-1">
                            <label className="text-[9px] uppercase font-bold text-text-muted">Image Source URL Override</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={imageAlts[img.src]?.src || ""}
                                onChange={(e) => handleImageAltChange(img.src, "src", e.target.value)}
                                placeholder="Default path: e.g. /images/... or enter external url"
                                className="font-instrument text-xs border border-border-neutral rounded-lg px-2.5 py-1.5 bg-white outline-none flex-grow text-text-dark"
                              />
                              <label className="cursor-pointer px-3 py-1.5 bg-cream-light/60 border border-border-neutral/30 rounded-lg text-[10px] font-bold hover:bg-cream-light/95 transition-all shadow-sm flex items-center justify-center shrink-0">
                                {uploadingImages[img.src] ? "Uploading..." : "Upload from PC"}
                                <input
                                  type="file"
                                  accept="image/*"
                                  disabled={!!uploadingImages[img.src]}
                                  onChange={(e) => handleImageUpload(img.src, e)}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <label className="text-[9px] uppercase font-bold text-text-muted">Alt Text (Crawl Description)</label>
                            <input
                              type="text"
                              value={imageAlts[img.src]?.alt || ""}
                              onChange={(e) => handleImageAltChange(img.src, "alt", e.target.value)}
                              placeholder="Describe what is shown in the image"
                              className="font-instrument text-xs border border-border-neutral rounded-lg px-2.5 py-1.5 bg-white outline-none w-full text-text-dark"
                            />
                          </div>
                          <div className="flex flex-col space-y-1">
                            <label className="text-[9px] uppercase font-bold text-text-muted">Title Tag (Tooltip Description)</label>
                            <input
                              type="text"
                              value={imageAlts[img.src]?.title || ""}
                              onChange={(e) => handleImageAltChange(img.src, "title", e.target.value)}
                              placeholder="Title description tooltip"
                              className="font-instrument text-xs border border-border-neutral rounded-lg px-2.5 py-1.5 bg-white outline-none w-full text-text-dark"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-left pt-4">
                    <button
                      onClick={() => handleSaveConfig(pages, seoSettings, redirects, blogs, imageAlts)}
                      className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md"
                    >
                      Save Image SEO Alt Tags
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 7: TECHNICAL SETTINGS */}
              {activeTab === "technical" && (
                <div className="flex flex-col space-y-8 text-left">
                  {/* Google Tag Manager, GA, Facebook Pixels integrations */}
                  <div className="flex flex-col space-y-4">
                    <div className="pb-2 border-b border-border-neutral/30">
                      <h2 className="font-caudex font-bold text-xl text-primary font-bold">Analytics & Global Site Settings</h2>
                      <p className="text-xs text-text-muted">Configure display domain settings and inject global tracking scripts.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-2">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Website Display Name</label>
                        <input
                          type="text"
                          value={seoSettings.websiteName || ""}
                          onChange={(e) => setSeoSettings((prev: any) => ({ ...prev, websiteName: e.target.value }))}
                          placeholder="e.g. DDS Dental Clinic"
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none bg-white text-text-dark"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Website Root URL (Address)</label>
                        <input
                          type="text"
                          value={seoSettings.websiteUrl || ""}
                          onChange={(e) => setSeoSettings((prev: any) => ({ ...prev, websiteUrl: e.target.value }))}
                          placeholder="e.g. https://ddspune.com"
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none bg-white text-text-dark"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Google Analytics 4 ID (GA4)</label>
                        <input
                          type="text"
                          value={seoSettings.googleAnalyticsId || ""}
                          onChange={(e) => setSeoSettings((prev: any) => ({ ...prev, googleAnalyticsId: e.target.value }))}
                          placeholder="e.g. G-XXXXXXXXXX"
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none bg-white text-text-dark"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Google Tag Manager ID (GTM)</label>
                        <input
                          type="text"
                          value={seoSettings.googleTagManagerId || ""}
                          onChange={(e) => setSeoSettings((prev: any) => ({ ...prev, googleTagManagerId: e.target.value }))}
                          placeholder="e.g. GTM-XXXXXXX"
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none bg-white text-text-dark"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Facebook/Meta Pixel ID</label>
                        <input
                          type="text"
                          value={seoSettings.facebookPixelId || ""}
                          onChange={(e) => setSeoSettings((prev: any) => ({ ...prev, facebookPixelId: e.target.value }))}
                          placeholder="e.g. FB-XXXXXXXXX"
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none bg-white text-text-dark"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Webmaster verification keys */}
                  <div className="flex flex-col space-y-4">
                    <div className="pb-2 border-b border-border-neutral/30">
                      <h2 className="font-caudex font-bold text-xl text-primary font-bold">Search Engine Site Verification</h2>
                      <p className="text-xs text-text-muted">Verify site ownership to unlock search console dashboard crawling analytics.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Google Search Console Tag</label>
                        <input
                          type="text"
                          value={seoSettings.googleSiteVerification || ""}
                          onChange={(e) => setSeoSettings((prev: any) => ({ ...prev, googleSiteVerification: e.target.value }))}
                          placeholder="google-site-verification token content string"
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none bg-white text-text-dark"
                        />
                        <span className="text-[10px] text-text-light">Inserts &lt;meta name=&quot;google-site-verification&quot; content=&quot;TOKEN&quot; /&gt; tag in layout head</span>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Bing Webmaster verification</label>
                        <input
                          type="text"
                          value={seoSettings.bingSiteVerification || ""}
                          onChange={(e) => setSeoSettings((prev: any) => ({ ...prev, bingSiteVerification: e.target.value }))}
                          placeholder="msvalidate.01 token content string"
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none bg-white text-text-dark"
                        />
                        <span className="text-[10px] text-text-light">Inserts &lt;meta name=&quot;msvalidate.01&quot; content=&quot;TOKEN&quot; /&gt; tag in layout head</span>
                      </div>
                    </div>
                  </div>

                  {/* Robots disallow settings */}
                  <div className="flex flex-col space-y-4 pt-4 border-t border-border-neutral/20">
                    <div className="pb-2 border-b border-border-neutral/30">
                      <h2 className="font-caudex font-bold text-xl text-primary">Robots.txt Rules (Disallows)</h2>
                      <p className="text-xs text-text-muted">Paths hidden from crawlers (e.g. /admin/)</p>
                    </div>
                    <textarea
                      rows={4}
                      value={robotsDisallows}
                      onChange={(e) => setRobotsDisallows(e.target.value)}
                      className="w-full font-mono text-xs border border-border-neutral rounded-xl p-4 bg-gray-50 text-text-dark resize-none outline-none"
                    />
                  </div>

                  <div>
                    <button
                      onClick={() => handleSaveConfig(pages, seoSettings)}
                      className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md"
                    >
                      Save Global Integrations & Verification
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 8: HISTORY VERSIONING */}
              {activeTab === "history" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                    <h2 className="font-caudex font-bold text-xl text-primary font-bold">Metadata Revision Change Logs</h2>
                    <span className="text-xs text-text-muted">Track edits and rollback parameters changes</span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-border-neutral/30">
                    {seoVersions.length === 0 ? (
                      <div className="py-12 text-center text-text-light text-xs font-semibold">
                        No revisions logged. Edit metadata configuration settings to populate change history.
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-border-neutral/20 text-left font-instrument">
                        <thead className="bg-cream-light/20 text-xs text-text-muted font-semibold uppercase tracking-wider">
                          <tr>
                            <th className="px-6 py-3">Timestamp</th>
                            <th className="px-6 py-3">Page</th>
                            <th className="px-6 py-3">Field</th>
                            <th className="px-6 py-3">Before Change</th>
                            <th className="px-6 py-3">After Change</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-neutral/20 bg-white text-xs">
                          {seoVersions.map((v) => (
                            <tr key={v.id} className="hover:bg-cream-light/5 transition-colors">
                              <td className="px-6 py-4 text-text-muted">{new Date(v.timestamp).toLocaleString()}</td>
                              <td className="px-6 py-4 font-bold text-text-dark">/{v.pageKey}</td>
                              <td className="px-6 py-4 text-[#62826B] font-bold">{v.field}</td>
                              <td className="px-6 py-4 max-w-xs truncate text-red-700 bg-red-50/20">{v.before || "[empty]"}</td>
                              <td className="px-6 py-4 max-w-xs truncate text-green-700 bg-green-50/20">{v.after || "[empty]"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
