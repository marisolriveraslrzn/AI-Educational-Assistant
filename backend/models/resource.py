from . import db


class Resource(db.Model):
    __tablename__ = "resources"

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)
    type = db.Column(db.String(80), nullable=False)
    file = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    course = db.relationship("Course", backref=db.backref("resources", lazy=True))
