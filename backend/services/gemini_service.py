import os

from services.base_ai_provider import BaseAIProvider


class GeminiService(BaseAIProvider):
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
        self.client = None

        if self.api_key:
            try:
                from google import genai

                self.client = genai.Client(api_key=self.api_key)
            except Exception:
                self.client = None

    def is_configured(self):
        return bool(self.api_key and self.client)

    def _extract_text(self, response):
        if response is None:
            return ""

        if hasattr(response, "text") and response.text:
            return response.text.strip()

        if hasattr(response, "candidates"):
            parts = []
            for candidate in response.candidates:
                if hasattr(candidate, "content") and hasattr(candidate.content, "parts"):
                    for part in candidate.content.parts:
                        if hasattr(part, "text") and part.text:
                            parts.append(part.text)
            if parts:
                return "\n".join(parts).strip()

        return str(response).strip()

    def generate_response(self, prompt):
        if not self.api_key:
            return {
                "answer": f"[Modo de prueba con Gemini] Respuesta generada para el prompt: {prompt}",
                "tokens": 0,
            }

        if not self.client:
            return {
                "answer": "No se pudo inicializar Gemini. Verifica la clave y la instalación del SDK.",
                "tokens": 0,
            }

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
            )
            answer = self._extract_text(response)
            return {
                "answer": answer or "Gemini devolvió una respuesta vacía.",
                "tokens": 0,
            }
        except Exception as exc:
            return {
                "answer": f"No se pudo completar la solicitud con Gemini: {exc}",
                "tokens": 0,
            }
