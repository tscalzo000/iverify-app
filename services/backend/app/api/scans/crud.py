from app import db
from app.api.scans.models import Scan


def get_all_scans():
    return Scan.query.all()


def get_scan_by_id(scan_id):
    return Scan.query.filter_by(scanid=scan_id).first()


def get_scans_by_deviceid(device_id):
    return Scan.query.filter_by(deviceid=device_id).all()
