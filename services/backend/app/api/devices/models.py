import datetime
import os
from sqlalchemy.orm import relation, backref
from app.api.users.models import User

from app import db


class Device(db.Model):
    __tablename__ = "tbldevice"

    deviceid = db.Column(db.BigInteger,primary_key=True,autoincrement=True)
    userid = db.Column(db.BigInteger,db.ForeignKey('tbluser.userid'))
    name = db.Column(db.Text())
    model = db.Column(db.Text())

    user = relation(User, backref=backref('tbldevice', lazy="subquery"))

    def to_json(self):
        return dict(deviceid=self.deviceid,
                    name=self.name,
                    model=self.model,
                    user=self.user.to_json())
