# Aquí se importarán los modelos de la base de datos.
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .conversation import Conversation
from .message import Message
from .course import Course
from .resource import Resource

__all__ = [
    "db",
    "User",
    "Conversation",
    "Message",
    "Course",
    "Resource",
]