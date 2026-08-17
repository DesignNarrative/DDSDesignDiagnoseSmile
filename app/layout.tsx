import type { Metadata } from "next";
import { Alex_Brush, Caudex, Instrument_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSeoMetadata, getSeoSchemaJson } from "@/lib/seo";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex",
  display: "swap",
});

const caudex = Caudex({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-caudex",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("home");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaJson = getSeoSchemaJson("home");

  return (
    <html
      lang="en"
      className={`${alexBrush.variable} ${caudex.variable} ${instrumentSans.variable} ${montserrat.variable} h-full scroll-smooth`}
    >
      <head>
        {schemaJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schemaJson }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col font-instrument bg-white text-text-dark antialiased">
        <Navbar />
        {/* Padding top to offset the fixed navbar */}
        <main className="flex-grow pt-[80px]">
          {children}
        </main>
        <Footer />

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919673004407"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-[#25D366]/30 group"
          aria-label="Contact us on WhatsApp"
        >
          <svg
            className="w-7 h-7 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436.002 9.851-4.409 9.854-9.842.002-2.632-1.02-5.106-2.882-6.97-1.864-1.864-4.343-2.888-6.977-2.89-5.437 0-9.852 4.411-9.855 9.843-.002 1.706.442 3.376 1.287 4.848l-.988 3.604 3.738-.981zm11.238-7.06c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-.892-.796-1.493-1.78-1.668-2.08-.175-.3-.018-.463.13-.61.134-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.076-2.593-.3-.725-.6-.625-.8-.625-.2 0-.425-.008-.65-.008-.225 0-.58.085-.88.412-.3.325-1.15 1.12-1.15 2.73s1.175 3.167 1.338 3.393c.163.225 2.3 3.52 5.58 4.94.78.337 1.387.538 1.86.687.784.249 1.497.214 2.062.13.629-.094 1.772-.725 2.022-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
