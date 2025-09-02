import Image from "next/image";


export default function Home() {
  return (
    <div className="bg-[#748873] w-full  min-h-screen pt-70 p-10 justify-center items-center text-center">
      <h1 className="text-6xl font-bold mb-8 text-center text-white">
        Welcome to LegalDoc
        </h1>
    <div className="text-2xl  text-center text-white ">
      <p>From normal documents to all your Legal documents,<br></br> LegalDoc brings your documents to life.<br></br> You can ask questions, get summaries, find information,take legal guidance, <br></br>and many more.</p>
    </div>
    </div>
    
  );

}
