import { Metadata } from "next";
import { getSeoMetadata, getSeoSchemaJson } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("invisalign");
}

export default function InvisalignLayout({ children }: { children: React.ReactNode }) {
  const schemaJson = getSeoSchemaJson("invisalign");
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
