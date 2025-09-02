import Image from "next/image";
import PDFReader from "../components/PDFReader";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <PDFReader/>
    </main>
  );
}
