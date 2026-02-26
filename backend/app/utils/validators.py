def validate_expense_data(data):
    if not data:
        return "invalid JSON"
    
    title=data.get("title")
    amount=data.get("amount")
    category=data.get("category")

    #title validation
    if not isinstance(title, str) or not title.strip():
        return "title must not be empty string"
    if len(title.strip())>100:
        return "title cannot exceed 100 characters"
    #amount validation
    try:
        amount=float(amount)
    except(TypeError,ValueError):
        return "amount value must be valid"
    if amount<=0:
        return "amount value should be grater than 0"
    
    #category validation
    if not isinstance(category, str) or not category.strip():
        return "category should not be an empty string" 
    if len(category.strip())>70:
        return "category should not exceed 70 characters"
    
    return None