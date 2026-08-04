from flask import Blueprint, jsonify
from middleware.auth_middleware import require_auth

courses_bp = Blueprint("courses", __name__)


@courses_bp.route("/courses", methods=["GET"])
@require_auth
def list_courses():
    return jsonify({"courses": []})
