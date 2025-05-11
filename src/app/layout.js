import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NFSU Mock Test Analyzer",
  description: "Analyze your NFSU mock test results",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="small"
      >
        {children}
        {/* <footer className="bg-[#0c0c0c] small text-white py-6 ">
        <div className="container mx-auto px-4 text-center">
          <p>NFSU Program Analyzer &copy; {new Date().getFullYear()}</p>
          <p className="text-sm text-gray-400 mt-1">Note: This application uses sample program data for demonstration.</p>
        </div>
      </footer> */}
      </body>
    </html>
  );
}
