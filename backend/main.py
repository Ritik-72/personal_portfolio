from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import os
from dotenv import load_dotenv
import google.generativeai as genai
import urllib.request
import json

# Load environment variables
load_dotenv()

# Configure Google Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash')

app = FastAPI(title="Portfolio Backend API", version="1.0.0")

# CORS Configuration
# Allow all origins for development; in production, restrict to frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class AnalyticsData(BaseModel):
    page: str
    timestamp: str
    device: Optional[str] = "unknown"

class AIChatRequest(BaseModel):
    message: str
    mode: str = "general" # general, resume, projects
    history: Optional[List[dict]] = []

AYUSMAN_BIO = """
You are the personal AI assistant of Ayusman, a highly skilled Python Developer.
Your goal is to represent Ayusman professionally and help visitors understand his expertise, projects, and background.

Ayusman's Details:
- Current Role: Python Developer at Bipros.
- Major Project: Ama Sathi WhatsApp Chatbot for Odisha Government services (FastAPI, PostgreSQL, WhatsApp API).
- Education: 
    - Master of Computer Applications (MCA) from IGIT Sarang (2023-2025).
    - B.Sc. Computer Science Honours from Dhenkanal Autonomous College (2020-2023).
- Technical Skills: 
    - Frontend: React.js, JavaScript, Tailwind CSS, Framer Motion, Redux.
    - Backend: Python, FastAPI, Java, Go, REST APIs, GraphQL.
    - Database: PostgreSQL, MongoDB, Redis.
- Stats: 1+ Years Experience, 10+ Projects, 15K+ Happy Clients.
- Location: Joranda, Dhenkanal, Odisha, 759014.
- Email: goodmorningritik@gmail.com
- Intersts: Gamer, Cricketer.

Guidelines:
- Be professional, friendly, and concise.
- If asked about projects, recommend 'Ama Sathi', 'AI Market Intelligence', or 'EcoSphere Dashboard'.
- If you don't know an answer, politely ask the visitor to contact Ayusman directly via the contact form.
"""

# Endpoints
@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio Backend API"}

async def save_to_google_sheet(form: ContactForm):
    script_url = os.getenv("GOOGLE_SCRIPT_URL")
    if not script_url:
        print("GOOGLE_SCRIPT_URL not configured. Skipping Google Sheets integration.")
        return
        
    try:
        data = json.dumps({
            "name": form.name,
            "email": form.email,
            "subject": form.subject,
            "message": form.message
        }).encode("utf-8")
        
        req = urllib.request.Request(
            script_url, 
            data=data, 
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                print("Successfully saved to Google Sheet")
            else:
                print(f"Failed to save to Google Sheet. Status: {response.status}")
    except Exception as e:
        print(f"Google Sheet save error: {e}")

@app.post("/contact")
async def contact_me(form: ContactForm, background_tasks: BackgroundTasks):
    # Log the contact request
    print(f"Received message from {form.name} ({form.email}): {form.subject}")
    
    # Save to Google Sheets in the background
    background_tasks.add_task(save_to_google_sheet, form)
    
    return {"status": "success", "message": "Thank you! Your message has been received."}

@app.get("/analytics")
async def get_analytics():
    # Placeholder for analytics data
    return {
        "views": 1240,
        "unique_visitors": 850,
        "contact_requests": 15
    }

@app.post("/track")
async def track_view(data: AnalyticsData):
    # Placeholder for tracking logic
    print(f"Tracking view for page: {data.page} at {data.timestamp}")
    return {"status": "tracked"}

@app.post("/ai/chat")
@app.post("/api/chat")
async def ai_chat(request: AIChatRequest):
    try:
        msg_lower = request.message.lower().strip()
        
        # Intercept common greetings
        greetings = ["hi", "hii", "hello", "hey", "good morning", "good afternoon", "good evening", "yo", "greetings"]
        is_greeting = False
        for g in greetings:
            if msg_lower == g or msg_lower.startswith(g + " ") or msg_lower.startswith(g + "!") or msg_lower.startswith(g + ","):
                is_greeting = True
                break
                
        if is_greeting:
            greeting_msg = (
                "Hello! I am the AI Assistant for Ayusman. How can I help you today?\n\n"
                "You can ask me about his **Skills**, **Projects**, **Education**, or **Contact details**!"
            )
            return {"response": greeting_msg}

        # Prepare context based on mode
        system_prompt = AYUSMAN_BIO
        if request.mode == "resume":
            system_prompt += "\nFocus specifically on Ayusman's educational background and professional experience."
        elif request.mode == "projects":
            system_prompt += "\nFocus on recommending and explaining Ayusman's technical projects."

        # Start chat with history
        chat = model.start_chat(history=[])
        
        # We send the system prompt as a preliminary context if it's the first message
        # For simplicity in this implementation, we prepend it to the current message
        full_prompt = f"{system_prompt}\n\nUser Message: {request.message}"
        
        response = chat.send_message(full_prompt)
        return {"response": response.text}
    except Exception as e:
        print(f"AI Error: {str(e)}")
        print("Activating local smart fallback responder...")
        
        # Local keyword-matching smart fallback
        msg_lower = request.message.lower()
        
        if "project" in msg_lower or "work" in msg_lower or "portfolio" in msg_lower:
            fallback_response = (
                "Here are some of Ayusman's standout projects:\n\n"
                "🔹 **Ama Sathi**: A high-impact WhatsApp Chatbot built for the Odisha Government "
                "enabling citizens to access government services. Tech: FastAPI, PostgreSQL, WhatsApp API.\n"
                "🔹 **AI Market Intelligence**: An AI-powered dashboard offering real-time market data analysis.\n"
                "🔹 **EcoSphere Dashboard**: An interactive environmental metrics tracker built with React and Tailwind CSS.\n\n"
                "Which one would you like to know more about?"
            )
        elif "skill" in msg_lower or "tech" in msg_lower or "stack" in msg_lower or "languages" in msg_lower:
            fallback_response = (
                "Ayusman's technical expertise spans across frontend, backend, and databases:\n\n"
                "💻 **Frontend**: React.js, JavaScript, Tailwind CSS, Framer Motion, Redux\n"
                "⚙️ **Backend**: Python, FastAPI, Java, Go, REST APIs, GraphQL\n"
                "🗄️ **Databases**: PostgreSQL, MongoDB, Redis\n\n"
                "He specializes in crafting high-performance APIs and sleek, animated user interfaces!"
            )
        elif "contact" in msg_lower or "email" in msg_lower or "reach" in msg_lower or "hire" in msg_lower or "phone" in msg_lower:
            fallback_response = (
                "You can reach out to Ayusman directly through the following channels:\n\n"
                "📧 **Email**: goodmorningritik@gmail.com\n"
                "📍 **Location**: Joranda, Dhenkanal, Odisha, India\n\n"
                "Alternatively, you can send him a message directly using the **Contact Form** on this website! He is currently open to new opportunities."
            )
        elif "education" in msg_lower or "college" in msg_lower or "mca" in msg_lower or "degree" in msg_lower or "study" in msg_lower:
            fallback_response = (
                "Ayusman has a solid academic background in Computer Science:\n\n"
                "🎓 **Master of Computer Applications (MCA)**\n"
                "   IGIT Sarang | 2023 - 2025\n\n"
                "🎓 **B.Sc. Computer Science (Honours)**\n"
                "   Dhenkanal Autonomous College | 2020 - 2023"
            )
        elif "about" in msg_lower or "who is" in msg_lower or "ayusman" in msg_lower or "bio" in msg_lower:
            fallback_response = (
                "Ayusman is a talented Python Developer currently working at **Bipros**.\n\n"
                "With over **1+ years of experience** and **10+ completed projects**, he excels at bridging the gap "
                "between complex backend logic and gorgeous, premium user interfaces. In his free time, he is an "
                "avid gamer and cricketer!"
            )
        else:
            fallback_response = (
                "Hello! I am the AI Assistant for Ayusman. How can I help you today?\n\n"
                "Ayusman is a professional Python Developer specialized in FastAPI, PostgreSQL, and React.js. "
                "He recently built the official 'Ama Sathi' WhatsApp Chatbot for Odisha Government services.\n\n"
                "You can ask me about his **Skills**, **Projects**, **Education**, or **Contact details**!"
            )
            
        return {"response": fallback_response}

# Mock function for email sending
async def send_email_notification(form: ContactForm):
    # This is where you would integrate SMTP or an email service provider
    # Example using environment variables for credentials:
    # smtp_user = os.getenv("SMTP_USER")
    # smtp_pass = os.getenv("SMTP_PASS")
    pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
