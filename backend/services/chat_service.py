from services.ai_service import AIService
from services.prompt_manager import PromptManager


class ChatService:
    def __init__(self, provider=None):
        self.ai = AIService(provider=provider)

    def answer(self, question, specialist="profesor_ia"):
        prompt = PromptManager.build_prompt(specialist, question)
        result = self.ai.generate_response(prompt)
        return {
            "question": question,
            "answer": result["answer"],
            "tokens": result["tokens"],
            "specialist": specialist,
        }
