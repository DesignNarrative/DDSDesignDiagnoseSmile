import { Metadata } from "next";
import { getSeoMetadata, getSeoSchemaJson } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("dental-implants");
}

export default function DentalImplantsLayout({ children }: { children: React.ReactNode }) {
  const schemaJson = getSeoSchemaJson("dental-implants");
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
