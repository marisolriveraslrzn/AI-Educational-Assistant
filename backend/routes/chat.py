from flask import Blueprint, request
from controllers.chat_controller import chat as chat_action, history as history_action, templates as templates_action

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return "", 200
    return chat_action()


@chat_bp.route("/history", methods=["GET", "OPTIONS"])
def history():
    if request.method == "OPTIONS":
        return "", 200
    return history_action()


@chat_bp.route("/templates", methods=["GET", "OPTIONS"])
def templates():
    if request.method == "OPTIONS":
        return "", 200
    return templates_action()
