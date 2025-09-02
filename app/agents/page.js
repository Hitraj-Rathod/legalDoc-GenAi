import React from 'react'

const CardData = [
  {title:  "Document Analyzer", desc: "AI agent that scans and analyze your legal documents for important details."},
  {title: "Contract Review", desc: "Automatically drafts contracts based on your requirements." },
  {
    title: "Compliance Checker",
    desc: "Checks your documents for compliance with relevant laws and regulations."
  },
  {
    title: "Clause Extractor",
    desc: "Finds and highlights specific clauses in lengthy documents."
  },
  {
    title: "Risk Detector",
    desc: "Identifies potential risks and red flags in your contracts."
  },
  {
    title: "Summary Bot",
    desc: "Provides concise summaries of long legal documents."
  }
];
const AgentCard = ({title,desc})=>(
  <div className='bg-[#FEE8D9] rounded-lg shadow p-6 text-gray-900 flex flex-col items-center hover:scale-105 transform transition-transform duration-100 hover:shadow-md shadow-gray-100'>
    <h1 className='text-xl font-bold mb-2'>{title}</h1>
    <p className='text-m items-center'>{desc}</p>
  </div>
);

const page = () => {
  return (
    <div className="min-h-screen bg-[#748873]">
      <h1 className='pt-40 text-center font-semibold text-4xl text-white mb-10'>LegalDoc AI Agents</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto pt-10'>
        {CardData.map((card,idx) =>(
          <AgentCard key={idx} title={card.title} desc={card.desc} />
        )
      
      )}
      </div>
    
    </div>
  )
}

export default page
