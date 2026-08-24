import { Metadata } from "next";
import { getSeoMetadata, getSeoSchemaJson } from "@/lib/seo";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return getSeoMetadata("blog_" + resolvedParams.slug);
}

export default async function BlogSlugLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const schemaJson = getSeoSchemaJson("blog_" + resolvedParams.slug);
  return (
    <>
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}
      {children}
    </>
  );
}
