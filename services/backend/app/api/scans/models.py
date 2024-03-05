import datetime
import os
from sqlalchemy.orm import relation, backref
from app.api.devices.models import Device

from app import db


class Scan(db.Model):
    __tablename__ = "tblscan"

    scanid = db.Column(db.BigInteger,primary_key=True,autoincrement=True)
    deviceid = db.Column(db.BigInteger,db.ForeignKey('tbldevice.deviceid'))
    osversion = db.Column(db.String(128), nullable=False)
    appversion = db.Column(db.String(128), nullable=False)
    secure = db.Column(db.Boolean, nullable=False)
    threats = db.Column(db.String(255), nullable=False)

    device = relation(Device, backref=backref('tblscan', lazy="subquery"))

    def to_json(self):
        return dict(scanid=self.scanid,
                    osversion=self.osversion,
                    appversion=self.appversion,
                    secure=self.secure,
                    threats=self.threats,
                    device=self.device.to_json())
