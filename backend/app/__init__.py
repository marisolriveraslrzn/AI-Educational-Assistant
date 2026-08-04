from pathlib import Path
import sys

if __package__ in (None, ""):
    backend_root = Path(__file__).resolve().parents[1]
    if str(backend_root) not in sys.path:
        sys.path.insert(0, str(backend_root))

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

from routes.auth import auth_bp
from routes.chat import chat_bp
from routes.courses import courses_bp
from routes.profile import profile_bp
from models import db

jwt = JWTManager()


def create_app():

    app = Flask(__name__)

    app.config.from_object("config.Config")

    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    )

    db.init_app(app)
    jwt.init_app(app)
    migrate = Migrate(app, db)

    @app.route("/")
    def home():
        return {
            "project": "AI Educational Assistant",
            "version": "1.0",
            "status": "Running 🚀"
        }

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(chat_bp, url_prefix="/api")
    app.register_blueprint(courses_bp, url_prefix="/api")
    app.register_blueprint(profile_bp, url_prefix="/api")
    return app