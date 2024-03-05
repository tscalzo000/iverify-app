from flask import Blueprint, request
from flask_restx import Api, Namespace, Resource, fields

from app.api.users.crud import (  # isort:skip
    get_all_users,
    get_user_by_id,
    get_user_by_email,
    add_user,
)

users_blueprint = Blueprint("users", __name__)
api = Api(users_blueprint)
users_namespace = Namespace("tbluser")


user = users_namespace.model(
    "User",
    {
        "userid": fields.Integer(readOnly=True),
        "name": fields.String(required=True),
        "email": fields.String(required=True),
        "created_date": fields.DateTime,
    },
)

user_post = users_namespace.inherit(
    "User post",
    user,
    {
        "password": fields.String(required=True),
    },
)


class UsersList(Resource):
    @users_namespace.marshal_with(user, as_list=True)
    def get(self):
        """Returns all users"""
        return get_all_users(), 200

    @users_namespace.expect(user_post, validate=True)
    @users_namespace.response(201, "<user_email> was added!")
    @users_namespace.response(400, "Sorry. That email already exists.")
    def post(self):
        """Creates a new user"""
        post_data = request.get_json()
        username = post_data.get("username")
        email = post_data.get("email")
        password = post_data.get("password")
        response = {}

        user = get_user_by_email(email)
        if user:
            response["message"] = "Sorry. That email already exists."
            return response, 400

        add_user(username, email, password)

        response["message"] = f"{email} was added!"

        return response, 201


class Users(Resource):
    @users_namespace.marshal_with(user)
    @users_namespace.response(200, "Success")
    @users_namespace.response(404, "User <user_id> does not exist")
    def get(self, user_id):
        """Returns a single user"""
        user = get_user_by_id(user_id)
        if not user:
            users_namespace.abort(404, f"User {user_id} does not exist")

        return user, 200


users_namespace.add_resource(UsersList, "")
users_namespace.add_resource(Users, "/<int:user_id>")
