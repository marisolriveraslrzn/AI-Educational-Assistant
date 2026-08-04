import os

from services.base_ai_provider import BaseAIProvider


class OpenAIService(BaseAIProvider):
    def __init__(self):
        self.client = None
        self.api_key = os.getenv("OPENAI_API_KEY")

    def is_configured(self):
        return bool(self.api_key)

    def generate_response(self, prompt):
        if not self.api_key:
            return {
                "answer": f"[Modo de prueba] Respuesta generada para el prompt: {prompt}",
                "tokens": 0,
            }

        return {
            "answer": f"Respuesta simulada para: {prompt}",
            "tokens": 0,
        }
