from flask import Blueprint, request
from flask_restx import Api, Namespace, Resource, fields

from app.api.devices.crud import (  # isort:skip
    get_all_devices,
    get_device_by_id,
    get_devices_by_userid,
)

devices_blueprint = Blueprint("devices", __name__)
api = Api(devices_blueprint)
devices_namespace = Namespace("tbldevice")


device = devices_namespace.model(
    "Device",
    {
        "deviceid": fields.Integer(readOnly=True),
        "model": fields.String(required=True),
        "name": fields.String(required=True),
        "user.userid": fields.Integer(readOnly=True),
        "user.name": fields.String(required=True),
        "user.email": fields.String(required=True),
    },
)


class DevicesList(Resource):
    @devices_namespace.marshal_with(device, as_list=True)
    def get(self):
        """Returns all devices"""
        return get_all_devices(), 200


class Devices(Resource):
    @devices_namespace.marshal_with(device)
    @devices_namespace.response(200, "Success")
    @devices_namespace.response(404, "Device <device_id> does not exist")
    def get(self, device_id):
        """Returns a single device"""
        device = get_device_by_id(device_id)
        if not device:
            devices_namespace.abort(404, f"Device {device_id} does not exist")

        return device, 200


devices_namespace.add_resource(DevicesList, "")
devices_namespace.add_resource(Devices, "/<int:device_id>")
