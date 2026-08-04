import os

from services.gemini_service import GeminiService
from services.openai_service import OpenAIService


class AIService:
    PROVIDERS = {
        "openai": OpenAIService,
        "gemini": GeminiService,
    }

    def __init__(self, provider=None):
        self.provider_name = (provider or os.getenv("AI_PROVIDER") or "gemini").strip().lower()
        self.provider = self._build_provider(self.provider_name)

    def _build_provider(self, provider_name):
        provider_class = self.PROVIDERS.get(provider_name, OpenAIService)
        return provider_class()

    def _get_fallback_provider(self):
        for name, provider_class in self.PROVIDERS.items():
            if name == self.provider_name:
                continue
            provider = provider_class()
            if provider.is_configured():
                return provider
        return self.provider

    def generate_response(self, prompt):
        if self.provider.is_configured():
            return self.provider.generate_response(prompt)

        fallback_provider = self._get_fallback_provider()
        return fallback_provider.generate_response(prompt)
