from app import db
from app.api.users.models import User


def get_all_users():
    return User.query.all()


def get_user_by_id(user_id):
    return User.query.filter_by(userid=user_id).first()


def get_user_by_email(email):
    return User.query.filter_by(email=email).first()


def add_user(name, email, password):
    user = User(name=name, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return user
