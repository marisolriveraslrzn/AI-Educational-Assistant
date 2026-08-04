from flask import jsonify


def list_courses():
    return jsonify({"courses": []})
