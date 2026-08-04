from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity
from middleware.auth_middleware import require_auth

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/profile", methods=["GET"])
@require_auth
def profile():
    user_id = get_jwt_identity()
    return jsonify({"user_id": user_id, "message": "Perfil disponible"})
