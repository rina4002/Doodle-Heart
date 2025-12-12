from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
# Load .env
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

# --- CORS Configuration ---
origins = [
    # Allow all origins for development. 
    # For production, replace '*' with your frontend URL (e.g., "https://yourfrontend.com")
    "*", 
    # Or, if running on port 3000: "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # List of origins that are allowed to make requests
    allow_credentials=True, # Allow cookies/authentication headers
    allow_methods=["*"], # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"], # Allow all headers
)
# --- End CORS Configuration ---

# Request model
class Prompt(BaseModel):
    text: str

@app.post("/ask")
async def ask_gemini(prompt: Prompt):
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt.text)
    return {"response": response.text}
