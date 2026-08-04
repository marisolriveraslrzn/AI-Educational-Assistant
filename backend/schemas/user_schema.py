from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=True)
    apellido = fields.Str(required=True)
    email = fields.Email(required=True)
    rol = fields.Str(required=True)
    fecha_creacion = fields.DateTime(dump_only=True)
