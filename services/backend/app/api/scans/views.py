from flask import Blueprint, request
from flask_restx import Api, Namespace, Resource, fields

from app.api.scans.crud import (  # isort:skip
    get_all_scans,
    get_scan_by_id,
    get_scans_by_deviceid,
)

scans_blueprint = Blueprint("scans", __name__)
api = Api(scans_blueprint)
scans_namespace = Namespace("tblscan")


scan = scans_namespace.model(
    "Scan",
    {
        "scanid": fields.Integer(readOnly=True),
        "osversion": fields.String(required=True),
        "appversion": fields.String(required=True),
        "secure": fields.Boolean(),
        "threats": fields.String(),
        "device.deviceid": fields.Integer(readOnly=True),
        "device.model": fields.String(required=True),
        "device.name": fields.String(required=True),
        "device.user.userid": fields.Integer(readOnly=True),
        "device.user.name": fields.String(required=True),
        "device.user.email": fields.String(required=True),
    },
)


class ScansList(Resource):
    @scans_namespace.marshal_with(scan, as_list=True)
    def get(self):
        """Returns all scans"""
        return get_all_scans(), 200


class Scans(Resource):
    @scans_namespace.marshal_with(scan)
    @scans_namespace.response(200, "Success")
    @scans_namespace.response(404, "Scan <scan_id> does not exist")
    def get(self, scan_id):
        """Returns a single scan"""
        scan = get_scan_by_id(scan_id)
        if not scan:
            scans_namespace.abort(404, f"Scan {scan_id} does not exist")

        return device, 200


scans_namespace.add_resource(ScansList, "")
scans_namespace.add_resource(Scans, "/<int:scan_id>")
