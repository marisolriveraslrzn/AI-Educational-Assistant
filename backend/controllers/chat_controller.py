from flask import jsonify, request
from services.chat_service import ChatService

chat_service = ChatService()


MODE_TO_SPECIALIST = {
    "exam": "generador_examenes",
    "summary": "resumidor",
    "sheet": "generador_rubricas",
    "infographic": "profesor_ia",
}


def chat():
    payload = request.get_json(silent=True) or {}
    question = (payload.get("prompt") or payload.get("question") or "").strip()
    mode = (payload.get("mode") or payload.get("specialist") or "exam").strip().lower()
    specialist = MODE_TO_SPECIALIST.get(mode, "profesor_ia")

    if not question:
        return jsonify({"message": "La pregunta es obligatoria"}), 400

    result = chat_service.answer(question, specialist=specialist)
    return jsonify({
        **result,
        "mode": mode,
    })


def history():
    return jsonify({"history": []})


def templates():
    return jsonify({
        "templates": [
            {"id": "exam", "label": "Examen"},
            {"id": "summary", "label": "Resumen"},
            {"id": "sheet", "label": "Planilla"},
            {"id": "infographic", "label": "Infografía"},
        ]
    })
