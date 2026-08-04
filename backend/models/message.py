from . import db


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey("conversations.id"), nullable=False)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    tokens = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    conversation = db.relationship("Conversation", backref=db.backref("messages", lazy=True))
