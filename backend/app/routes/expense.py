from flask import Blueprint,request,jsonify
from flask_jwt_extended import get_jwt_identity,jwt_required
from app.extensions import db
from app.models.expense import Expense

expense_bp=Blueprint("Expense",__name__,url_prefix="/expenses")
#adding expense route
@expense_bp.route("",methods=["POST"])
@jwt_required()
def add_expense():
    data=request.get_json(silent=True)

    if not data:
        return jsonify({"error":"invalid json"}),400
    
    title=data.get("title")
    amount=data.get("amount")
    category=data.get("category")

    if not title or not amount or not category:
        return jsonify({"error":"All fields are necessary"}),400
    
    user_id=int(get_jwt_identity())
    expense=Expense(
        title=title,
        amount=amount,
        category=category,
        user_id=user_id
    )

    db.session.add(expense)
    db.session.commit()

    return jsonify({"message":"expense added successfully"}),201

#get  user expense route

@expense_bp.route("",methods=["GET"])
@jwt_required()
def get_expenses():
    user_id=int(get_jwt_identity())

    expenses=Expense.query.filter_by(user_id=user_id).all()
    
    return jsonify([
        {"id":e.id,
        "title":e.title,
        "amount":e.amount,
        "category":e.category,
        "created_at":e.created_at.isoformat()
        }
        for e in expenses
    ]),200
