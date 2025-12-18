from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google.genai import Client, types
from dotenv import load_dotenv
import os
import base64
from fastapi.middleware.cors import CORSMiddleware 

load_dotenv()

# We need the key, or this is all just a very expensive text editor
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("WARNING: GEMINI_API_KEY is empty. Check your .env file!")

# FINALLY: You used the keyword argument. Good human.
client = Client(api_key=api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    text: str


# Added 'image' to your request model
class ImagePrompt(BaseModel):
    text: str
    image: str # This will be the base64 string from Next.js
@app.post("/ask-image")
async def ask_gemini(prompt: ImagePrompt):
    try:
        # 1. Clean up the base64 string
        # Next.js sends: "data:image/png;base64,iVBOR..."
        # Gemini wants: "iVBOR..."
        header, encoded = prompt.image.split(",", 1)
        
        # 2. Package the text and the image for Gemini
        # We use gemini-2.0-flash because it's great at vision (when you have quota)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                prompt.text,
                types.Part.from_bytes(
                    data=base64.b64decode(encoded),
                    mime_type="image/png"
                )
            ]
        )
        return {"response": response.text}
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask")
async def ask_gemini(prompt: Prompt):
    try:
        # Fixed: Changed to gemini-2.0-flash (the actual cutting edge)
        # Fixed: Changed contents to prompt.text (extracting the string)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt.text
        )
        
        # Check if the response actually has text (Gemini can be moody)
        if response.text:
            return {"response": response.text}
        else:
            return {"response": "The AI stared at me in silence."}
            
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Launching the ship
    uvicorn.run(app, host="0.0.0.0", port=8000)