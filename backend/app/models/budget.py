from app.extensions import db;
from datetime import datetime;

class Budget(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    amount=db.Column(db.Integer, nullable=False)
    month=db.Column(db.Integer,nullable=False)
    year=db.Column(db.Integer,nullable=False)

    user_id=db.Column(db.Integer, db.ForeignKey("users.id") ,nullable=False)
    created_at=db.Column(db.DateTime,default=datetime.utcnow)


