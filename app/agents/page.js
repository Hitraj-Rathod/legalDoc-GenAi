import React from 'react'
import Link from 'next/link'

const CardData = [
  {
    title: "Document Analyzer",
    desc: "AI agent that scans and analyzes your legal documents for important details.",
    path: "/analyze" // Links to the analyzer page
  },
  {
    title: "AI Guidance",
    desc: "Chat with an AI for general legal information and guidance.",
    path: "/guidance" // Links to the new guidance page
  },
  {
    title: "Contract Review",
    desc: "Automatically drafts contracts based on your requirements.",
    path: "/guidance" // Links to guidance as requested
  },
  {
    title: "Compliance Checker",
    desc: "Checks your documents for compliance with relevant laws and regulations.",
    path: "/guidance" // Links to guidance as requested
  },
  {
    title: "Clause Extractor",
    desc: "Finds and highlights specific clauses in lengthy documents.",
    path: "/guidance" // Links to guidance as requested
  },
  {
    title: "Risk Detector",
    desc: "Identifies potential risks and red flags in your contracts.",
    path: "/guidance" // Links to guidance as requested
  },
];

const AgentCard = ({title,desc})=>(
  <div className='bg-[#FEE8D9] cursor-pointer rounded-lg shadow p-6 text-gray-900 flex flex-col items-center hover:scale-105 transform transition-transform duration-100 hover:shadow-md shadow-gray-100'>
    <h1 className='text-xl font-bold mb-2'>{title}</h1>
    <p className='text-m items-center'>{desc}</p>
  
  </div>
);

const page = () => {
  return (
    <div className="min-h-screen bg-[#748873]">
      <h1 className='pt-40 text-center font-semibold text-5xl text-white mb-10'>LegalDoc AI Agents
      <p className='text-sm flex items-center justify-center pt-2 font-serif'>LegalDoc Guide you for your legal problems</p></h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto pt-10'>
        {CardData.map((card,idx) =>(
          <a href={card.path} key={idx} className="block">
          <AgentCard key={idx} title={card.title} desc={card.desc} />
          </a>
        )
        
      
      )}
    
      </div>
    
    </div>
  )
}

export default page
