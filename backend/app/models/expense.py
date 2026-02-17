from app.extensions import db
from datetime import datetime

class Expense(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    title=db.Column(db.String(100),nullable=False)
    amount=db.Column(db.Float,nullable=False)
    category=db.Column(db.String(70), nullable=False)
    created_at=db.Column(db.DateTime, default=datetime.utcnow)

    user_id=db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    
