from . import db


class Conversation(db.Model):
    __tablename__ = "conversations"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    user = db.relationship("User", backref=db.backref("conversations", lazy=True))
