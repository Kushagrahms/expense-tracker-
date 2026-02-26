from flask import Blueprint,request,jsonify
from flask_jwt_extended import get_jwt_identity,jwt_required
from app.extensions import db
from app.models.expense import Expense
from datetime import datetime
from sqlalchemy import func
from app.utils.response import success_response,error_response
from app.utils.validators import validate_expense_data

expense_bp=Blueprint("Expense",__name__,url_prefix="/expenses")
#adding expense route
@expense_bp.route("",methods=["POST"])
@jwt_required()
def add_expense():
    user_id=int(get_jwt_identity())
    data=request.get_json(silent=True)
#vslidation logic
    error = validate_expense_data(data)
    if error:
        return error_response(error, 400)

    expense = Expense(
        title=data.get("title").strip(),
        amount=float(data.get("amount")),
        category=data.get("category").strip(),
        user_id=user_id
    )

    db.session.add(expense)
    db.session.commit()

    return success_response("Expense added successfully", None, 201)

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

    #expenses=query.all()
    page=request.args.get("page",1,type=int)
    limit=request.args.get("limit",5,type=int)

    pagination=query.paginate(page=page, per_page=limit, error_out=False)
    expenses=pagination.items


    #printing the whole updated entry:
    return success_response(
        "Expense fetched successfully",
        {
        "page":page,
        "limit":limit,
        "total_records":pagination.total,
        "total_pages":pagination.pages,
        "expenses":[
            {"id":e.id,
             "title":e.title,
             "amount":e.amount,
             "category":e.category,
            "created_at":e.created_at.isoformat()
            }
            for e in expenses
            ]}, 200)

#deleting an expense of a user

@expense_bp.route("/<int:expense_id>",methods=["DELETE"])
@jwt_required()
def delete_expense(expense_id):
    
    user_id=int(get_jwt_identity())
    expense=Expense.query.filter_by(id=expense_id,user_id=user_id).first()
    
    if not expense:
        return error_response("Expense not found",404)
    
    db.session.delete(expense)
    db.session.commit()

    return success_response("Expense delted successfully",None,200)

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
        return error_response("expense not found",404)
    
    title=data.get("title")
    amount=data.get("amount")
    category=data.get("category")

    #title validation
    if not isinstance(title, str) or not title.strip():
        return error_response("Title should have a non empty string",400)
    if len(title.strip())>100:
        return error_response("title cannot exceed 100 characters",400)
    #amount validation
    try:
        amount=float(amount)
    except(TypeError,ValueError):
        return error_response("amount must be a valid number",400)
    if amount <= 0:
        return error_response("amount must be greater than 0",400)
    #category validation
    if not isinstance(category, str) or not category.strip():
        return error_response("Category should be a non empty string",400)
    if len(category.strip())>70:
        return error_response("category cannot exceed 70 characters",400)
    
    #applying these updates
    expense.title=title.strip()
    expense.amount=amount
    expense.category=category.strip()
    
    db.session.commit()
    return success_response("Expense updated successfully",None,200)

#generating summary

@expense_bp.route("/summary",methods=["GET"])
@jwt_required()

def expense_summary():
    user_id=int(get_jwt_identity())
    month=request.args.get("month",type=int)
    year=request.args.get("year",type=int)

    query=db.session.query(
        Expense.category,
        func.sum(Expense.amount).label("total")
        ).filter(Expense.user_id==user_id)
    
    if month and year:
        query=query.filter(
            func.extract("month",Expense.created_at)==month,
            func.extract("year",Expense.created_at)==year
        )
    results=query.group_by(Expense.category).all()

    total_spent=0
    category_breakdown={}

    for category,total in results:
        category_breakdown[category]=float(total)
        total_spent += float(total)
    
    return success_response(
        "Expense summary fetched successfully",
        {"total_spent":total_spent,
        "category_breakdown":category_breakdown},
    200)

#fetching a single records from the data of a user
@expense_bp.route("/<int:expense_id>",methods=["GET"])
@jwt_required()

def get_expense_by_id(expense_id):
    user_id=int(get_jwt_identity())

    expense=Expense.query.filter_by(id=expense_id,user_id=user_id).first()
    if not expense:
        return error_response("Expense not found",404)
    
    return success_response(
        "Expense fetcched successfully",
        {
            "id":expense.id,
            "title":expense.title,
            "amount":expense.amount,
            "category":expense.category,
            "created_at":expense.created_at.isoformat()
        },200  )

