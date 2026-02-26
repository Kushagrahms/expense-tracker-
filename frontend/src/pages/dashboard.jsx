import {useEffect,useState} from "react";
import API from "../services/api";
export default function Dashboard(){

    const[expenses,setExpenses]=useState([]);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        API.get("/expenses")
           .then(res=>{
            console.log("Full Response",res.data);
            const expenseArray=res.data.data.expenses;
            console.log("Actual Array",expenseArray);
            setExpenses(expenseArray || []);
            setLoading(false);
           })
           .catch(err=>{
            console.log("Error:" ,err.response?.data || err.message);
            setLoading(false);
           });
    },[]);

    const total_spent=(expenses || []).reduce((sum,exp)=>sum+Number(exp.amount),0);
    const latest_expense=expenses.length>0?expenses.reduce((latest,current)=>
    new Date(current.created_at)> new Date(latest.created_at)?current:latest) :null;

    return(
        <div>
            <h1 className="text-3xl text-textPrimary font-bold mb-8">
                Dashboard
            </h1>
            {loading ? (
                <p className="text-textSecondary">Loading.....</p>
                ) : (
                    <>
                
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-bgCard p-6 rounded-xl">
                    <p className="text-textSecondary">Total Spent</p>
                    <h3 className="text-2xl text-textPrimary">${total_spent.toFixed(2)}</h3>
                </div>

                <div className="bg-bgCard p-6 rounded-xl">
                    <p className="text-textSecondary">Total Exepnses</p>
                    <h3 className="text-2xl text-textPrimary">{expenses.length}</h3>
                </div>

                <div className="bg-bgCard p-6 rounded-xl">
                    <p className="text-textSecondary">Latest Expense</p>
                    <h3 className="text-2xl text-textPrimary">{latest_expense?latest_expense.title:"NA"}</h3>
                </div>

                <div className="bg-bgCard p-6 rounded-xl">
                    <p className="text-textSecondary">Highest Exepense</p>
                    <h3 className="text-2xl text-textPrimary">${expenses.length
                    ?Math.max(...expenses.map(e=>e.amount)).toFixed(2):'0.00'}</h3>
                </div>
            </div>
            {/*expense list*/}
            <div className="mt-10">
                <h2 className="text-xl text-textPrimary mb-4">Recent Expenses</h2>

                <div className="bg-bgCard rounded-xl p-6 space-y-4">
                    {expenses.map(exp=>(
                        <div key={exp.id} className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-textPrimary">
                                {exp.title}
                            </span>
                            <span className="text-accent">
                                ${exp.amount}
                            </span>
                            </div>
                       ))}
                </div>
        </div>
        </>
    )}
    </div>
    );
}