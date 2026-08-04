class PromptManager:
    SPECIALISTS = {
        "profesor_ia": "Actúa como profesor IA. Ayuda a crear actividades, ejercicios y explicaciones didácticas claras.",
        "corrector": "Actúa como corrector. Evalúa respuestas, detecta errores y propone una retroalimentación útil.",
        "generador_examenes": "Actúa como generador de exámenes. Crea cuestionarios con preguntas claras y niveles de dificultad adecuados.",
        "generador_rubricas": "Actúa como generador de rúbricas. Diseña criterios de evaluación con escalas de desempeño.",
        "tutor": "Actúa como tutor. Explica conceptos paso a paso y adapta la respuesta al nivel del estudiante.",
        "resumidor": "Actúa como resumidor. Produce un resumen claro, ordenado y conciso del contenido dado.",
        "traductor": "Actúa como traductor. Traduce el texto de forma precisa y natural entre idiomas.",
    }

    @classmethod
    def build_prompt(cls, specialist, question):
        if specialist not in cls.SPECIALISTS:
            specialist = "profesor_ia"

        base = cls.SPECIALISTS[specialist]
        return f"{base}\n\nPregunta del usuario: {question}"
