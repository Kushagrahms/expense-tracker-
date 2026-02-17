from flask import Blueprint,request,jsonify
from flask_jwt_extended import get_jwt_identity,jwt_required
from app.extensions import db
from app.models.expense import Expense
from datetime import datetime

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

    if title is None or amount is None or category is None:
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
    query = Expense.query.filter_by(user_id=user_id)
    #querying parameters :
    category=request.args.get("category")
    min_amt=request.args.get("min_amt",type=float)
    max_amt=request.args.get("max_amt",type=float)
    start_date=request.args.get("star_date")
    end_date=request.args.get("end_date")
    sort=request.args.get("sort")

    #actual filtering

    if category:
        query=query.filter(Expense.category==category)
    
    if min_amt  is not None:
        query=query.filter(Expense.amount >= min_amt)
    if max_amt is not None:
        query=query.filter(Expense.amount <= max_amt)

    if start_date:
        try:
            start=datetime.strptime(start_date,"%Y-%m-%d")
            query=query.filter(Expense.created_at >= start)
        except ValueError:
            return jsonify({"error": "Invalid start_date format (YYYY-MM-DD required)"}), 400
    if end_date:
        try:
            end=datetime.strptime(end_date,"%Y-%m-%d")
            query=query.filter(Expense.created_at <= end)
        except ValueError:
            return jsonify({"error": "Invalid end_date format (YYYY-MM-DD required)"}), 400
        
    #sorting:

    if sort=="amount_asc":
        query=query.order_by(Expense.amount.asc())
    elif sort=="amount_desc":
        query=query.order_by(Expense.amount.desc())
    elif sort=="date_asc":
        query=query.order_by(Expense.created_at.asc())
    elif sort=="date_desc":
        query=query.order_by(Expense.created_at.desc())

    expenses=query.all()
    #printing the whole updated entry:
    return jsonify([
        {"id":e.id,
        "title":e.title,
        "amount":e.amount,
        "category":e.category,
        "created_at":e.created_at.isoformat()
        }
        for e in expenses
    ]),200

#deleting an expense of a user

@expense_bp.route("/<int:expense_id>",methods=["DELETE"])
@jwt_required()
def delete_expense(expense_id):
    
    user_id=int(get_jwt_identity())
    expense=Expense.query.filter_by(id=expense_id,user_id=user_id).first()
    
    if not expense:
        return jsonify({"error":"expense not found"}),404
    
    db.session.delete(expense)
    db.session.commit()

    return jsonify({"message":"expense delted successfully"}),200

#updating the entries
@expense_bp.route("/<int:expense_id>",methods=["PUT"])
@jwt_required()

def update_expense(expense_id):
    user_id=int(get_jwt_identity())
    data=request.get_json(silent=True)

    if not data:
        return jsonify({"error":"invalid JSON"}),400
    
    expense=Expense.query.filter_by(id=expense_id,user_id=user_id).first()

    if not expense:
        return jsonify({"error":"expense not found"}),404
    
    expense.title=data.get("title",expense.title)
    expense.amount=data.get("amount",expense.amount)
    expense.category=data.get("category",expense.category)

    db.session.commit()
    return jsonify({"message":"Expense entry updated successfully"}),200
