from datetime  import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db

class User(db.Model):
    __tablename__="users"
#desc of table columns contsraints
    id=db.Column(db.Integer,primary_key=True)

    username=db.Column(db.String(50), unique=True, nullable=False)
    email=db.Column(db.String(30), unique=True, nullable=False)
    password_hash=db.Column(db.String(255), nullable=True)

    is_active=db.Column(db.Boolean, default=True)
    created_at=db.Column(db.DateTime, default=datetime.utcnow)

    expenses=db.relationship("Expense",backref="user",lazy=True,cascade="all,delete-orphan")


    def set_password(self,password:str):
        self.password_hash = generate_password_hash(password)

    def check_password(self,password=str)->bool:
        return check_password_hash(self.password_hash,password)
    
    def __repr__(self):
        return f"<user {self.username}>"
    


