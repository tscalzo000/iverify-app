from app import db
from app.api.devices.models import Device


def get_all_devices():
    return Device.query.all()


def get_device_by_id(device_id):
    return Device.query.filter_by(deviceid=device_id).first()


def get_devices_by_userid(user_id):
    return Device.query.filter_by(userid=user_id).all()
