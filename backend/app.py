import os
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import docx
import PyPDF2
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Allow requests from your Next.js app's origin
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# --- FIX 1: CORRECT AND SECURE API KEY HANDLING ---
# This correctly and safely loads your key from the .env file.
# Do NOT paste your key directly here.
try:
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
except Exception as e:
    print(f"Error initializing OpenAI client: {e}")
    client = None

def extract_text_from_docx(file_stream):
    """Extracts text from a .docx file stream."""
    doc = docx.Document(file_stream)
    return "\n".join([paragraph.text for paragraph in doc.paragraphs])

def extract_text_from_pdf(file_stream):
    """Extracts text from a .pdf file stream."""
    reader = PyPDF2.PdfReader(file_stream)
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted
    return text

@app.route('/api/analyze', methods=['POST'])
def analyze_document():
    if not client:
        return jsonify({"error": "OpenAI client not initialized. Check your API key in the .env file."}), 500

    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    text = ""
    try:
        file_stream = io.BytesIO(file.read())
        
        if file.filename.endswith('.docx'):
            text = extract_text_from_docx(file_stream)
        elif file.filename.endswith('.pdf'):
            text = extract_text_from_pdf(file_stream)
        else:
            return jsonify({"error": "Unsupported file type"}), 400

        if not text.strip():
             return jsonify({"error": "Could not extract text from the document. The file might be empty or unreadable."}), 400

    except Exception as e:
        return jsonify({"error": f"Error processing file: {str(e)}"}), 500
    
    try:
        # --- FIX 2: IMPROVED PROMPT FOR RELIABLE JSON ---
        # This new prompt explicitly tells the AI the exact nested structure
        # that the frontend expects, preventing crashes.
        system_prompt = """
        You are a highly skilled AI legal assistant. Your task is to analyze a legal document and provide a clear, concise, and structured analysis.
        The user is not a lawyer, so avoid overly technical jargon.
        You MUST respond in a valid JSON format with the following structure:
        {
          "summary": "A brief, one-paragraph overview of the document's purpose.",
          "key_points": [
            "A bullet point of a critical element.",
            "Another bullet point of a critical element (e.g., parties, dates, obligations)."
          ],
          "risk_analysis": {
            "rating": "Low",
            "points": [
              "A bullet point identifying a potential risk or ambiguity.",
              "Another bullet point about an unfavorable clause."
            ]
          }
        }
        The 'rating' in 'risk_analysis' must be one of 'Low', 'Medium', or 'High'.
        """
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Please analyze the following legal document text:\n\n{text}"}
            ]
        )
        
        analysis_result = response.choices[0].message.content
        return analysis_result, 200, {'Content-Type': 'application/json'}

    except Exception as e:
        # This will now give a more detailed error if the OpenAI call fails
        print(f"Error during OpenAI API call: {e}") 
        return jsonify({"error": f"Error during OpenAI API call: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
