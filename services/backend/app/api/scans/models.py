import datetime
import os
from sqlalchemy.orm import relation, backref
from app.api.devices.models import Device

from app import db


class Scan(db.Model):
    __tablename__ = "tblscan"

    scanid = db.Column(db.BigInteger,primary_key=True,autoincrement=True)
    deviceid = db.Column(db.BigInteger,db.ForeignKey('tbldevice.deviceid'))
    osversion = db.Column(db.Text())
    appversion = db.Column(db.Text())
    secure = db.Column(db.Boolean)
    threats = db.Column(db.Text())

    device = relation(Device, backref=backref('tblscan', lazy="subquery"))

    def to_json(self):
        return dict(scanid=self.scanid,
                    osversion=self.osversion,
                    appversion=self.appversion,
                    secure=self.secure,
                    threats=self.threats,
                    device=self.device.to_json())
