from flask import jsonify, request
from flask_jwt_extended import create_access_token
from models import db
from models.user import User


def register_user():
    payload = request.get_json(silent=True) or {}

    name = (payload.get("name") or "").strip()
    apellido = (payload.get("apellido") or "").strip()
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""
    role = (payload.get("role") or "student").strip().lower()

    if not all([name, apellido, email, password]):
        return jsonify({"message": "Faltan campos obligatorios"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "El email ya está registrado"}), 409

    user = User(name=name, apellido=apellido, email=email, role=role)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))
    return jsonify({"message": "Usuario registrado", "token": token}), 201


def login_user():
    payload = request.get_json(silent=True) or {}
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Credenciales inválidas"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"message": "Inicio de sesión correcto", "token": token}), 200
