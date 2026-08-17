import { Metadata } from "next";
import { getSeoMetadata, getSeoSchemaJson } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("gum-aesthetic-gum-care");
}

export default function GumAestheticGumCareLayout({ children }: { children: React.ReactNode }) {
  const schemaJson = getSeoSchemaJson("gum-aesthetic-gum-care");
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
