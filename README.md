# LegalDoc AI

**LegalDoc AI** is a web application that uses Generative AI to demystify complex legal documents, making them accessible and understandable for everyone.  
This project features an **AI-powered Document Analyzer** and a **Guidance Chatbot** to help users navigate their legal queries.

_A preview of the AI Guidance Chatbot and the Document Analyzer interfaces._

## The Problem
Legal documents are filled with dense jargon and complex language, creating a barrier for the average person.  
This often leads to people signing contracts they don't fully understand, overlooking significant risks, and feeling unable to access affordable, immediate legal guidance.  

**LegalDoc AI** aims to bridge this gap by providing an accessible first point of contact for legal document analysis and general queries.

## Features
Our platform offers two core, user-centric features:

### 1. AI Document Analyzer
- **Secure File Upload**: Supports common document formats like `.pdf` and `.docx`.  
- **Automated Summary**: Instantly generates a concise, easy-to-read summary of the document's purpose.  
- **Key Point Extraction**: Identifies and lists the most critical information, such as parties, effective dates, core obligations, and terms.  
- **Risk Assessment**: Scans for potentially unfavorable clauses or ambiguities and assigns a clear **Low, Medium, or High** risk rating.  

### 2. LegalDoc Guidance Chatbot
- **Conversational Interface**: An intuitive chat window for users to ask general legal questions in natural language.  
- **Simplified Explanations**: Provides clear, simple explanations of complex legal topics.  
- **Built-in Safeguards**: Includes a disclaimer to ensure users understand the information is for **educational purposes only** and **not a substitute for professional legal advice**.  

## Architecture
Our application uses a modern, scalable, and decoupled architecture:

- **Frontend (Client)**: A Next.js application that provides a responsive and interactive user interface.  
- **Backend (Server)**: A Python (Flask) server that handles business logic, including file processing, text extraction, and secure communication with the AI model.  
- **AI Service (API)**: We leverage the **OpenAI GPT-4o-mini API** for all generative AI tasks, including document analysis and chat responses.  

## Technology Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS  
- **Backend**: Python, Flask, Flask-CORS  
- **AI Model**: OpenAI (GPT-4o-mini)  
- **Document Processing**: PyPDF2, python-docx  
- **Development Environment**: Node.js, Python 3.11  

## Setup and Installation
To get this project running locally, you'll need to set up both the backend and the frontend.

### Prerequisites
- Node.js (v18 or later)  
- Python (v3.8 or later) and pip  
- An OpenAI API Key  

### How to Run the Application
You must have both the backend and frontend servers running simultaneously in two separate terminals.

#### 1. Start the Backend Server:
```bash
# (Inside the backend folder)
python app.py
```
####Create Environment File:
####  2.Create a file named .env inside the backend folder and add your OpenAI API key:
```bash
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx"
```
3. Frontend Setup (Next.js)
In a new terminal, navigate to the root of the project to set up the frontend.

# Make sure you are in the root directory 'legaldoc-ai'
```bash
npm install
```
**How to Run the Application**

You must have both the backend and frontend servers running simultaneously in two separate terminals.

1. Start the Backend Server:

Open a terminal, navigate to the backend directory.
Run the Flask app:
```bash
# (Inside the backend folder with venv active)
python app.py
```
The backend will be running at http://localhost:5001.

2. Start the Frontend Server:

Open a second terminal and navigate to the project's root directory.

Run the Next.js development server:
```bash
npm run dev
```
The frontend will be running at http://localhost:3000.

Open your browser and visit http://localhost:3000 to use the application. conver this in readme form
