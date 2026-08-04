from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from models import db
from models.user import User

auth_bp = Blueprint("auth", __name__)


def serialize_user(user):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
    }


@auth_bp.route("/test")
def test():
    return {"message": "Auth OK"}


@auth_bp.route("/register", methods=["POST"])
def register():
    payload = request.get_json(silent=True) or {}

    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""
    role = (payload.get("role") or "student").strip().lower()

    if not all([name, email, password]):
        return jsonify({"message": "Faltan datos obligatorios"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "El email ya está registrado"}), 409

    user = User(name=name, email=email, role=role)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Usuario registrado correctamente",
        "token": token,
        "user": serialize_user(user),
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    payload = request.get_json(silent=True) or {}

    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""

    if not all([email, password]):
        return jsonify({"message": "Email y contraseña son obligatorios"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Credenciales inválidas"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Inicio de sesión correcto",
        "token": token,
        "user": serialize_user(user),
    }), 200


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    return jsonify({"user": serialize_user(user)}), 200