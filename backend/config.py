import os
from pathlib import Path
from dotenv import load_dotenv

backend_dir = Path(__file__).resolve().parent
load_dotenv(dotenv_path=backend_dir / ".env")

print("=" * 50)
print("DATABASE_URL:", os.getenv("DATABASE_URL"))
print("SECRET_KEY:", os.getenv("SECRET_KEY"))
print("=" * 50)

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    AI_PROVIDER = os.getenv("AI_PROVIDER", "gemini")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")