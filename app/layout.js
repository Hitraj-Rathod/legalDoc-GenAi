import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navabar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LegalDoc",
  description: "AI-Powered Legal Document Helper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navabar/>
        {children}
       
      </body>
      
    </html>
    
  );
}
