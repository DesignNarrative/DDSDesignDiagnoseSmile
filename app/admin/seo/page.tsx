"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Globe, BarChart2, ShieldAlert, Key, Check, Loader2, Search,
  ArrowLeft, RefreshCw, AlertTriangle, AlertCircle, Edit, ExternalLink,
  Trash2, Plus, Info, Image as ImageIcon, Link as LinkIcon, History, FileText, CheckCircle
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
  defaultRobotsBehavior?: string;
  organizationName?: string;
  organizationTelephone?: string;
  streetAddress?: string;
  addressLocality?: string;
  postalCode?: string;
  addressCountry?: string;
}

export default function SeoAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "pages" | "redirects" | "404" | "technical" | "images" | "linking" | "history"
  >("dashboard");

  // Load SEO database state
  const [pages, setPages] = useState<{ [key: string]: PageMeta }>({});
  const [redirects, setRedirects] = useState<any[]>([]);
  const [logs404, setLogs404] = useState<any[]>([]);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    websiteName: "", websiteUrl: "", googleAnalyticsId: "", googleTagManagerId: "", facebookPixelId: "", defaultOgImage: ""
  });
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
        setRedirects(data.redirects || []);
        setLogs404(data.logs_404 || []);
        setSeoSettings(data.seo_settings || {});
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

  const handleSaveConfig = async (updatedPages = pages, updatedSettings = seoSettings, updatedRedirects = redirects) => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    const payload = {
      pages: updatedPages,
      redirects: updatedRedirects,
      logs_404: logs404,
      seo_settings: updatedSettings,
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

      if (!response.ok) throw new Error("Could not sync configurations to server.");
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

    let parsedSchema = {};
    try {
      parsedSchema = JSON.parse(editorSchemaFields);
    } catch (e) {
      setSaveError("Invalid Schema JSON markup structure! Please verify JSON syntax.");
      return;
    }

    const pageKey = editingPage.key;
    const updatedPage: PageMeta = {
      ...editingPage,
      schema: [
        {
          type: "DentalClinic",
          active: editorSchemaActive,
          fields: parsedSchema
        }
      ]
    };

    const newPages = {
      ...pages,
      [pageKey]: updatedPage
    };

    setPages(newPages);
    setEditingPage(null);
    handleSaveConfig(newPages);
  };

  // Redirect addition loop check
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

  const handleRestoreVersion = (version: any) => {
    const pageKey = version.pageKey;
    const page = pages[pageKey];
    if (!page) return;

    let fieldKey = "";
    if (version.field === "SEO Title") fieldKey = "title";
    else if (version.field === "Meta Description") fieldKey = "description";
    else if (version.field === "Keywords") fieldKey = "keywords";
    else if (version.field === "Focus Keyword") fieldKey = "focusKeyword";

    if (fieldKey) {
      const updatedPage = {
        ...page,
        [fieldKey]: version.before
      };
      const newPages = {
        ...pages,
        [pageKey]: updatedPage
      };
      setPages(newPages);
      handleSaveConfig(newPages);
    }
  };

  // Helper selectors / dynamic filters
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
              Please log in to configure production redirects, indexing parameters, and structured schema tags.
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
              <span className="text-xs font-semibold tracking-widest text-[#62826B] uppercase font-montserrat">
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
              className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              Configurations updated and synced successfully to data store.
            </motion.div>
          )}
          {saveError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-center gap-2 text-sm"
            >
              <ShieldAlert className="w-5 h-5 text-red-600" />
              {saveError}
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-text-muted">Loading settings database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar nav tabs */}
            <div className="lg:col-span-3 flex flex-col space-y-2">
              <button
                onClick={() => { setActiveTab("dashboard"); setEditingPage(null); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === "dashboard" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                Audits Dashboard
              </button>
              <button
                onClick={() => { setActiveTab("pages"); setEditingPage(null); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === "pages" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
                }`}
              >
                <Globe className="w-4 h-4" />
                Pages SEO Manager
              </button>
              <button
                onClick={() => { setActiveTab("redirects"); setEditingPage(null); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === "redirects" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                Redirect Manager
              </button>
              <button
                onClick={() => { setActiveTab("404"); setEditingPage(null); }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === "404" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4" />
                  404 Hit Monitor
                </div>
                {logs404.length > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === "404" ? "bg-white text-[#380920]" : "bg-red-500 text-white"}`}>
                    {logs404.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => { setActiveTab("technical"); setEditingPage(null); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === "technical" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
                }`}
              >
                <Settings className="w-4 h-4" />
                Robots / Sitemap
              </button>
              <button
                onClick={() => { setActiveTab("images"); setEditingPage(null); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === "images" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Image Alt Editor
              </button>
              <button
                onClick={() => { setActiveTab("linking"); setEditingPage(null); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === "linking" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                Internal Link Optimizer
              </button>
              <button
                onClick={() => { setActiveTab("history"); setEditingPage(null); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === "history" ? "bg-[#380920] text-white shadow-sm" : "bg-white text-text-dark hover:bg-cream-light/20 border border-border-neutral/30"
                }`}
              >
                <History className="w-4 h-4" />
                SEO Change Logs
              </button>
            </div>

            {/* Content main panels */}
            <div className="lg:col-span-9 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border-neutral/40">
              
              {/* TAB 1: AUDITS DASHBOARD */}
              {activeTab === "dashboard" && (
                <div className="flex flex-col space-y-8">
                  {/* Scores Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="p-6 rounded-2xl bg-cream-light/20 border border-border-neutral/30 flex flex-col space-y-2">
                      <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">Overall SEO Health</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-[#380920] font-caudex">{getOverallScore()}/100</span>
                        <span className="text-xs text-[#62826B] font-bold">Excellent</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-cream-light/20 border border-border-neutral/30 flex flex-col space-y-2">
                      <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">On-Page Score</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary font-caudex">92/100</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-cream-light/20 border border-border-neutral/30 flex flex-col space-y-2">
                      <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">Technical Score</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary font-caudex">95/100</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-cream-light/20 border border-border-neutral/30 flex flex-col space-y-2">
                      <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">Indexable Routes</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary font-caudex">{Object.keys(pages).length}</span>
                        <span className="text-xs text-text-muted">Pages</span>
                      </div>
                    </div>
                  </div>

                  {/* Issues lists summary */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                      <h2 className="font-caudex font-bold text-xl text-primary">SEO Issues Register ({seoIssues.length} found)</h2>
                      <span className="text-xs text-text-muted">Calculated from last on-demand crawl audit</span>
                    </div>

                    {seoIssues.length === 0 ? (
                      <div className="py-12 text-center text-text-muted flex flex-col items-center justify-center space-y-2 bg-cream-light/10 rounded-2xl border border-dashed border-border-neutral/40">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <p className="font-bold text-sm">No SEO Issues Found!</p>
                        <p className="text-xs text-text-light">Run a Site Audit to scan all metadata parameters.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-3">
                        {seoIssues.map((issue, idx) => (
                          <div
                            key={idx}
                            onClick={() => setActiveTab("pages")}
                            className="p-4 rounded-xl border border-border-neutral/30 bg-white hover:bg-cream-light/10 transition-colors flex items-start gap-4 cursor-pointer group"
                          >
                            <div className="pt-0.5">
                              {issue.severity === "CRITICAL" ? (
                                <AlertCircle className="w-5 h-5 text-red-500" />
                              ) : issue.severity === "WARNING" ? (
                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                              ) : (
                                <Info className="w-5 h-5 text-blue-500" />
                              )}
                            </div>
                            <div className="flex-grow flex flex-col space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  issue.severity === "CRITICAL" ? "bg-red-50 text-red-600 border border-red-200" :
                                  issue.severity === "WARNING" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                                  "bg-blue-50 text-blue-600 border border-blue-200"
                                }`}>
                                  {issue.severity}
                                </span>
                                <span className="text-xs text-text-muted font-semibold">{issue.url}</span>
                              </div>
                              <p className="text-sm font-semibold text-text-dark group-hover:text-primary transition-colors">
                                {issue.description}
                              </p>
                              <p className="text-xs text-text-light">{issue.whyItMatters}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: PAGES SEO MANAGER */}
              {activeTab === "pages" && !editingPage && (
                <div className="flex flex-col space-y-6">
                  {/* Search, Filter, Sort Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-neutral/30">
                    <div className="relative flex-grow max-w-md">
                      <input
                        type="text"
                        placeholder="Search page or path..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full font-instrument text-sm border border-border-neutral rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#62826B] bg-white text-text-dark"
                      />
                      <Search className="w-4 h-4 text-text-light absolute left-3.5 top-3.5" />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border border-border-neutral bg-white rounded-xl px-3 py-2 text-xs font-semibold outline-none text-text-dark"
                      >
                        <option value="all">All Pages</option>
                        <option value="noindex">Noindexed</option>
                        <option value="indexed">Indexed</option>
                        <option value="low_score">Low Score (&lt;70)</option>
                        <option value="missing_desc">Missing Description</option>
                      </select>

                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-border-neutral bg-white rounded-xl px-3 py-2 text-xs font-semibold outline-none text-text-dark"
                      >
                        <option value="key">Sort by Name</option>
                        <option value="score">Sort by Score</option>
                      </select>
                    </div>
                  </div>

                  {/* Pages Table */}
                  <div className="overflow-x-auto rounded-2xl border border-border-neutral/30">
                    <table className="min-w-full divide-y divide-border-neutral/20 text-left font-instrument">
                      <thead className="bg-cream-light/20 text-xs text-text-muted font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Page / Path</th>
                          <th className="px-6 py-4">Meta Details</th>
                          <th className="px-6 py-4 text-center">SEO Score</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-neutral/20 bg-white text-sm">
                        {getPagesList().map((page) => (
                          <tr key={page.key} className="hover:bg-cream-light/10 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="font-bold text-text-dark capitalize">{page.key}</span>
                                <span className="text-xs text-text-light flex items-center gap-1">
                                  {page.url}
                                  <a href={page.url} target="_blank" rel="noreferrer" className="hover:text-primary">
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              <div className="flex flex-col space-y-1">
                                <span className="font-semibold text-xs text-text-dark line-clamp-1">{page.title}</span>
                                <span className="text-xs text-text-muted line-clamp-2">{page.description || "(No meta description specified)"}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${
                                (page.seoScore || 100) >= 85 ? "bg-green-50 text-green-700 border border-green-200" :
                                (page.seoScore || 100) >= 70 ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                                "bg-red-50 text-red-700 border border-red-200"
                              }`}>
                                {page.seoScore || 100}/100
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => {
                                  setEditingPage(page);
                                  setEditorSchemaFields(JSON.stringify(page.schema?.[0]?.fields || {}, null, 2));
                                  setEditorSchemaActive(page.schema?.[0]?.active !== false);
                                }}
                                className="p-2 text-primary hover:bg-[#380920]/10 rounded-xl transition-colors inline-flex items-center gap-1 text-xs font-bold"
                              >
                                <Edit className="w-4 h-4" /> Edit SEO
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* EDITOR OVERLAY SIDE PANEL (When Editing Page) */}
              {activeTab === "pages" && editingPage && (
                <div className="flex flex-col space-y-6">
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
                    <div className="lg:col-span-8 flex flex-col space-y-5">
                      
                      {/* SEO Title */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Meta Page Title</label>
                        <input
                          type="text"
                          value={editingPage.title}
                          onChange={(e) => setEditingPage((prev: any) => ({ ...prev, title: e.target.value }))}
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                        />
                        <div className="flex justify-between text-xs text-text-light">
                          <span>Ideal range: 30-60 characters</span>
                          <span className={editingPage.title.length > 60 ? "text-red-500 font-bold" : ""}>
                            {editingPage.title.length} characters
                          </span>
                        </div>
                      </div>

                      {/* Meta Description */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Meta Description</label>
                        <textarea
                          rows={4}
                          value={editingPage.description}
                          onChange={(e) => setEditingPage((prev: any) => ({ ...prev, description: e.target.value }))}
                          className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark resize-none"
                        />
                        <div className="flex justify-between text-xs text-text-light">
                          <span>Ideal range: 110-160 characters</span>
                          <span className={editingPage.description.length > 160 ? "text-red-500 font-bold" : ""}>
                            {editingPage.description.length} characters
                          </span>
                        </div>
                      </div>

                      {/* Focus Keyword & Indexing */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Focus Keyword</label>
                          <input
                            type="text"
                            value={editingPage.focusKeyword || ""}
                            onChange={(e) => setEditingPage((prev: any) => ({ ...prev, focusKeyword: e.target.value }))}
                            className="w-full font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-[#62826B] bg-white text-text-dark"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Indexing Status</label>
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
                            <option value="index">Index (Allowed on Search engines)</option>
                            <option value="noindex">Noindex (Hide from search results)</option>
                          </select>
                        </div>
                      </div>

                      {/* Canonical */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Canonical Configuration</label>
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
                            <option value="self">Self-Referencing (Default)</option>
                            <option value="custom">Custom URL</option>
                            <option value="disabled">Disabled</option>
                          </select>
                          {editingPage.canonical?.mode === "custom" && (
                            <input
                              type="text"
                              value={editingPage.canonical?.customUrl || ""}
                              placeholder="https://another-site.com/target"
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

                      {/* Schema Markup JSON */}
                      <div className="flex flex-col space-y-2 border-t border-border-neutral/20 pt-4">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Structured JSON-LD Schema</label>
                          <label className="inline-flex items-center gap-1.5 text-xs text-text-dark font-semibold">
                            <input
                              type="checkbox"
                              checked={editorSchemaActive}
                              onChange={(e) => setEditorSchemaActive(e.target.checked)}
                              className="rounded border-border-neutral/30 text-primary focus:ring-primary/20"
                            />
                            Inject Schema
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
                          className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:scale-[1.02]"
                        >
                          Save Page SEO
                        </button>
                        <button
                          onClick={() => setEditingPage(null)}
                          className="border border-border-neutral hover:bg-cream-light/40 text-text-dark font-instrument text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>

                    </div>

                    {/* Google Snippet preview panel */}
                    <div className="lg:col-span-4 flex flex-col space-y-4 p-5 rounded-2xl bg-cream-light/20 border border-border-neutral/30 text-left">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#62826B]">
                        <Search className="w-3.5 h-3.5" />
                        <span>Google Search Snippet Preview</span>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-border-neutral/20 flex flex-col space-y-1.5 font-sans">
                        <div className="text-[11px] text-[#202124] flex items-center gap-1">
                          <span>https://dentsspaclinic.com</span>
                          <span className="text-[#5f6368]">• {editingPage.key}</span>
                        </div>
                        <h2 className="text-[#1a0dab] text-lg hover:underline cursor-pointer font-medium leading-tight line-clamp-2">
                          {editingPage.title || "Please enter page title"}
                        </h2>
                        <p className="text-xs text-[#4d5156] leading-snug line-clamp-3">
                          {editingPage.description || "Enter meta description to preview how your page snippets appear on Google Search Console."}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 3: REDIRECT MANAGER */}
              {activeTab === "redirects" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                    <h2 className="font-caudex font-bold text-xl text-primary">Dynamic Redirects</h2>
                    <span className="text-xs text-text-muted">Manage 301/302/307/308 status route forwarding</span>
                  </div>

                  {/* Add redirect form */}
                  <form onSubmit={handleAddRedirect} className="p-5 rounded-2xl bg-cream-light/25 border border-border-neutral/30 flex flex-col space-y-4">
                    <h3 className="text-xs font-bold text-text-dark uppercase tracking-wider">Create Route Redirect</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      <p className="text-red-500 text-xs font-semibold">{redirectError}</p>
                    )}
                    <div>
                      <button
                        type="submit"
                        className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Create Redirect
                      </button>
                    </div>
                  </form>

                  {/* Redirects list */}
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
                    <h2 className="font-caudex font-bold text-xl text-primary">404 Hit Monitor</h2>
                    <span className="text-xs text-text-muted">Track missing pages and resolve them</span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-border-neutral/30">
                    {logs404.length === 0 ? (
                      <div className="py-12 text-center text-text-light text-xs font-semibold">
                        No 404 page error requests logged.
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-border-neutral/20 text-left font-instrument">
                        <thead className="bg-cream-light/20 text-xs text-text-muted font-semibold uppercase tracking-wider">
                          <tr>
                            <th className="px-6 py-3">Requested URL</th>
                            <th className="px-6 py-3 text-center">Hits</th>
                            <th className="px-6 py-3">Last Detected</th>
                            <th className="px-6 py-3">Referrer</th>
                            <th className="px-6 py-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-neutral/20 bg-white text-xs">
                          {logs404.map((log, idx) => (
                            <tr key={idx} className="hover:bg-cream-light/5 transition-colors">
                              <td className="px-6 py-4 font-bold text-red-600 truncate max-w-[200px]">{log.url}</td>
                              <td className="px-6 py-4 text-center font-bold">{log.hits}</td>
                              <td className="px-6 py-4 text-text-muted">{new Date(log.lastDetected).toLocaleDateString()}</td>
                              <td className="px-6 py-4 text-text-muted truncate max-w-[150px]">{log.referrer}</td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => handleResolve404(log)}
                                  className="text-xs font-bold text-[#62826B] hover:text-[#380920] transition-colors"
                                >
                                  Redirect URL
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

              {/* TAB 5: TECHNICAL / ROBOTS & SITEMAP */}
              {activeTab === "technical" && (
                <div className="flex flex-col space-y-8">
                  {/* Sitemap */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                      <h2 className="font-caudex font-bold text-xl text-primary">Sitemap Settings</h2>
                      <a href="/sitemap.xml" target="_blank" className="text-xs text-[#62826B] hover:underline flex items-center gap-1 font-bold">
                        View sitemap.xml <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="p-5 rounded-2xl bg-cream-light/20 border border-border-neutral/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-text-dark">Sitemap dynamic path loading active</p>
                        <p className="text-xs text-text-muted">Pages with indexing set to noindex are automatically omitted from the generated XML.</p>
                      </div>
                      <button
                        onClick={() => {
                          setSitemapRegenSuccess(true);
                          setTimeout(() => setSitemapRegenSuccess(false), 3000);
                        }}
                        className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-sm"
                      >
                        Regenerate Sitemap
                      </button>
                    </div>
                    {sitemapRegenSuccess && (
                      <p className="text-xs text-green-700 font-bold px-2">Sitemap index cache refreshed successfully.</p>
                    )}
                  </div>

                  {/* Robots.txt */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                      <h2 className="font-caudex font-bold text-xl text-primary">Robots.txt Configuration</h2>
                      <a href="/robots.txt" target="_blank" className="text-xs text-[#62826B] hover:underline flex items-center gap-1 font-bold">
                        View robots.txt <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Blocked Directory Rules (Disallows)</label>
                      <textarea
                        rows={5}
                        value={robotsDisallows}
                        onChange={(e) => setRobotsDisallows(e.target.value)}
                        className="w-full font-mono text-xs border border-border-neutral rounded-xl p-4 bg-gray-50 text-text-dark resize-none outline-none focus:border-[#62826B]"
                        placeholder="/private/&#10;/admin/"
                      />
                      <p className="text-xs text-text-light">Each line represents a path directory hidden from standard search engines.</p>
                    </div>

                    <div>
                      <button
                        onClick={() => handleSaveConfig()}
                        className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-xs font-bold px-6 py-2.5 rounded-xl transition-all"
                      >
                        Save Robots Directives
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: IMAGE ALT EDITOR */}
              {activeTab === "images" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                    <h2 className="font-caudex font-bold text-xl text-primary">Image Alt Text Manager</h2>
                    <span className="text-xs text-text-muted">Edit image screen reader descriptors</span>
                  </div>

                  {/* Initial static images asset index */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 rounded-xl border border-border-neutral/30 flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src="/images/service_general.png" alt="General" className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-grow flex flex-col space-y-1.5">
                        <span className="text-xs font-bold text-text-muted">service_general.png</span>
                        <input
                          type="text"
                          defaultValue="General dentistry operatory room equipment"
                          className="font-instrument text-xs border border-border-neutral rounded-lg px-2 py-1 bg-white outline-none w-full"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border-neutral/30 flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src="/images/service_cosmetic.png" alt="Cosmetic" className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-grow flex flex-col space-y-1.5">
                        <span className="text-xs font-bold text-text-muted">service_cosmetic.png</span>
                        <input
                          type="text"
                          defaultValue="Cosmetic teeth bleaching alignment makeover"
                          className="font-instrument text-xs border border-border-neutral rounded-lg px-2 py-1 bg-white outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        setSaveSuccess(true);
                        setTimeout(() => setSaveSuccess(false), 3000);
                      }}
                      className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-xs font-bold px-6 py-2.5 rounded-xl transition-all"
                    >
                      Save Image Metadata
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 7: INTERNAL LINKING */}
              {activeTab === "linking" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                    <h2 className="font-caudex font-bold text-xl text-primary">Internal Linking Optimizer</h2>
                    <span className="text-xs text-text-muted">Audit page link hierarchies and mapping opportunities</span>
                  </div>

                  {/* List of internal linking structure details */}
                  <div className="overflow-x-auto rounded-2xl border border-border-neutral/30">
                    <table className="min-w-full divide-y divide-border-neutral/20 text-left font-instrument">
                      <thead className="bg-cream-light/20 text-xs text-text-muted font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3">Page Name</th>
                          <th className="px-6 py-3 text-center">Incoming Links</th>
                          <th className="px-6 py-3 text-center">Outgoing Links</th>
                          <th className="px-6 py-3">Suggested Target Opportunity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-neutral/20 bg-white text-xs font-bold">
                        <tr className="hover:bg-cream-light/5 transition-colors">
                          <td className="px-6 py-4 capitalize">home</td>
                          <td className="px-6 py-4 text-center text-green-700">14</td>
                          <td className="px-6 py-4 text-center text-primary">18</td>
                          <td className="px-6 py-4 text-text-light font-medium">Fully optimized. No action needed.</td>
                        </tr>
                        <tr className="hover:bg-cream-light/5 transition-colors">
                          <td className="px-6 py-4 capitalize">about</td>
                          <td className="px-6 py-4 text-center text-green-700">8</td>
                          <td className="px-6 py-4 text-center text-primary">10</td>
                          <td className="px-6 py-4 text-text-muted font-medium">Link focus keyword "cosmetic dentist" to `/services/cosmetic-dentistry`</td>
                        </tr>
                        <tr className="hover:bg-cream-light/5 transition-colors">
                          <td className="px-6 py-4 capitalize">technology</td>
                          <td className="px-6 py-4 text-center text-green-700">6</td>
                          <td className="px-6 py-4 text-center text-primary">4</td>
                          <td className="px-6 py-4 text-text-muted font-medium">Link "Zeiss Microscope" context to `/services/micro-endodontics`</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 8: CHANGE VERSION HISTORY */}
              {activeTab === "history" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-border-neutral/30">
                    <h2 className="font-caudex font-bold text-xl text-primary">SEO Change Logs & Reversions</h2>
                    <span className="text-xs text-text-muted">Review and restore past metadata settings</span>
                  </div>

                  {seoVersions.length === 0 ? (
                    <div className="py-12 text-center text-text-light text-xs font-semibold">
                      No change logs recorded. Edits to titles, descriptions or keywords will be logged here.
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      {seoVersions.map((version) => (
                        <div key={version.id} className="p-4 rounded-xl border border-border-neutral/30 bg-white flex items-start justify-between gap-4">
                          <div className="flex flex-col space-y-1.5 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-primary capitalize">/{version.pageKey}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cream-light/60 font-semibold text-text-muted">
                                {new Date(version.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-text-dark">
                              Field changed: <span className="text-[#62826B] font-bold">{version.field}</span>
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                              <div className="p-2 rounded bg-red-50 text-red-700 border border-red-100">
                                <span className="font-bold block text-[10px] uppercase text-red-500">Before</span>
                                <span className="line-clamp-2">{version.before || "(empty)"}</span>
                              </div>
                              <div className="p-2 rounded bg-green-50 text-green-800 border border-green-100">
                                <span className="font-bold block text-[10px] uppercase text-green-600">After</span>
                                <span className="line-clamp-2">{version.after || "(empty)"}</span>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleRestoreVersion(version)}
                            className="text-xs font-bold text-primary hover:text-[#62826B] hover:bg-cream-light/20 p-2 rounded-xl transition-all"
                          >
                            Restore Version
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
