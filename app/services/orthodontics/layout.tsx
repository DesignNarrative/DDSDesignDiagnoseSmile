import { Metadata } from "next";
import { getSeoMetadata, getSeoSchemaJson } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("orthodontics");
}

export default function OrthodonticsLayout({ children }: { children: React.ReactNode }) {
  const schemaJson = getSeoSchemaJson("orthodontics");
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
