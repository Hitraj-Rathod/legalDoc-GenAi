import React from 'react'

const cardData = [
  { title: "Contract Review", desc: "Let AI review your contracts for key points." },
  { title: "Summarize Documents", desc: "Get quick summaries of lengthy legal docs." },
  { title: "Legal Q&A", desc: "Ask questions about your documents." },
  { title: "Clause Finder", desc: "Find specific clauses instantly." },
  { title: "Risk Analysis", desc: "AI highlights potential risks in your docs." },
  { title: "Draft Suggestions", desc: "Get suggestions for improving your drafts." },
];

const Card = ({ title, desc }) => (
  <div className="bg-[#FBF3D5] rounded-lg shadow p-6 text-gray-900 flex flex-col items-center hover:scale-105 transform transition-transform duration-100 hover:shadow-md shadow-gray-100">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-m items-center">{desc}</p>
  </div>
);

const page = () => {
  return (
    
    <div className="min-h-screen bg-[#748873] p-10 pt-50">
      <div className="text-3xl font-bold text-white text-center mb-10">
        Explore a variety of use cases to chat with Your Docs <br />using the power of AI.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto pt-10 ">
        {cardData.map((card, idx) => (
          <Card key={idx} title={card.title} desc={card.desc} />
        ))}
      </div>
    </div>

  )
}
export default page
