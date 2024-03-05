from flask_restx import Api
from app.api.devices.views import devices_namespace
from app.api.scans.views import scans_namespace
from app.api.auth import auth_namespace
from app.api.users.views import users_namespace

api = Api(version="1.0",title="APIs",doc="/docs/")

api.add_namespace(users_namespace,"/users")
api.add_namespace(devices_namespace,"/devices")
api.add_namespace(scans_namespace,"/scans")
api.add_namespace(auth_namespace,"/auth")
