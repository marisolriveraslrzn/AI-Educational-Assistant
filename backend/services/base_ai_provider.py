from abc import ABC, abstractmethod


class BaseAIProvider(ABC):
    @abstractmethod
    def generate_response(self, prompt):
        raise NotImplementedError

    def is_configured(self):
        return True
