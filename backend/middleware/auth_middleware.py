from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity


def require_auth(fn):
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            return fn(*args, **kwargs)
        except Exception:
            return jsonify({"message": "Token inválido o inexistente"}), 401

    wrapper.__name__ = fn.__name__
    return wrapper
