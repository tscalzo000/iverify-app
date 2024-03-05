# import datetime
# import os
# from sqlalchemy.sql import func
# # from sqlalchemy.orm import relation, backref
# from flask_sqlalchemy import SQLAlchemy
# from app import db
#
# class User(db.Model):
#
#     __tablename__ = "tbluser"
#
#     userid = db.Column(db.BigInteger,primary_key=True,autoincrement=True)
#     name = db.Column(db.Text())
#     email = db.Column(db.Text())
#     password = db.Column(db.Text())
#
#     def to_json(self):
#         return dict(userid=self.userid,
#                     name=self.name,
#                     email=self.email)
#
# class Device(db.Model):
#
#     __tablename__ = "tbldevice"
#
#     deviceid = db.Column(db.BigInteger,primary_key=True,autoincrement=True)
#     userid = db.Column(db.BigInteger,db.ForeignKey('tbluser.userid'))
#     name = db.Column(db.Text())
#     model = db.Column(db.Text())
#
#     # user = relation(User, backref=backref('tbldevice', lazy="subquery"))
#
#     def to_json(self):
#         return dict(deviceid=self.deviceid,
#                     name=self.name,
#                     model=self.model,
#                     user=self.user.to_json())
#
# class Scan(db.Model):
#
#     __tablename__ = "tblscan"
#
#     scanid = db.Column(db.BigInteger,primary_key=True,autoincrement=True)
#     deviceid = db.Column(db.BigInteger,db.ForeignKey('tbldevice.deviceid'))
#     osversion = db.Column(db.Text())
#     appversion = db.Column(db.Text())
#     secure = db.Column(db.Boolean)
#     threats = db.Column(db.Text())
#
#     # device = relation(Device, backref=backref('tblscan', lazy="subquery"))
#
#     def to_json(self):
#         return dict(scanid=self.scanid,
#                     osversion=self.osversion,
#                     appversion=self.appversion,
#                     secure=self.secure,
#                     threats=self.threats,
#                     device=self.device.to_json())
