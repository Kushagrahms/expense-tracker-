import { useEffect,useState } from "react";
import API from "../services/api";
import {PieChart,Pie,Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Reports(){
  const[expenses,setExpenses]=useState([]);
  useEffect(()=>{
      const token = localStorage.getItem("token");
      if (!token) return;
    API.get("/expenses/")
    .then((res)=>{
      setExpenses(res.data.data.expenses || [] );
  })
  .catch((err)=>{
    console.log("Error", err.response?.data || err.message);
  });
  }, []);

  //monthly calculations
  const now= new Date();
  const currMonth= now.getMonth();
  const currYear= now.getFullYear();

  const monthlyExpenses=expenses.filter((expenses)=>{
    const expenseDate= new Date(expenses.created_at);
    return (
      expenseDate.getMonth() === currMonth && expenseDate.getFullYear() === currYear
    );
  });

  const monthTotal= monthlyExpenses.reduce((sum,expense)=>sum+Number(expense.amount),0);

  const categoryTotals={} ;
  monthlyExpenses.forEach((expense)=>{
    categoryTotals[expense.category]=(categoryTotals[expense.category] || 0)+Number(expense.amount);
  });
  
  let topcategory= "NA";
  let topamount=0;

  for(const category in categoryTotals){
    if(categoryTotals[category]>topamount){
      topcategory=category;
      topamount=categoryTotals[category];
    }
  }
  //pie chart
  const pieData= Object.entries(categoryTotals).map(
    ([category,amount])=>({
      name:category,
      value:amount,
    })
  );
//monthly trendy data
const trendmap={};
monthlyExpenses.forEach((expense)=>{
  const date = new Date(expense.created_at).toLocaleDateString();
  trendmap[date]=(trendmap[date] || 0) + Number(expense.amount);
});
const trendData=Object.entries(trendmap).map(([date,amount])=>({date,amount,}));
//progress bar
const [monthlyBudget,setMonthlyBudget]=useState(0);
useEffect(()=>{
  API.get("/budgets/")
  .then((res)=>{
    setMonthlyBudget(res.data.amount);
  })
  .catch((err)=>{
    console.log(err.response?.data || err.message);
  });
}, []);
const budgetPercentage =
  monthlyBudget > 0
    ? Math.min((monthTotal / monthlyBudget) * 100, 100)
    : 0;const colors=["#1dd5f5", "#32b150", "#8b5cf6", "#f59e0b", "#ef4444"];

console.log("Month total:", monthTotal);
console.log("Monthly budget:", monthlyBudget);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl text-textPrimary font-bold mb-8">
        Reports
      </h1>
      {/*summary cards*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bgCard p-6 rounded-xl">
          <p className="text-textSecondary">This Month's total</p>
          <h3 className="text-2xl text-textPrimary font-bold">${monthTotal}</h3>
        </div>
         <div className="bg-bgCard p-6 rounded-xl">
          <p className="text-textSecondary">Top category</p>
          <h3 className="text-2xl text-textPrimary font-bold">{topcategory}</h3>
        </div>
         <div className="bg-bgCard p-6 rounded-xl">
          <p className="text-textSecondary">Expense count</p>
          <h3 className="text-2xl text-textPrimary font-bold">{monthlyExpenses.length}</h3>
        </div>        
      </div>
      {/*progress bar*/}
      <div className="bg-bgCard p-6 rounded-xl mt-8">
        <h2 className="text-xl text-textPrimary font-semibold mb-4">
    Budget vs Actual
        </h2>
        <div className="w-full bg-bgSidebar rounded-full h-4">
          <div className="h-4 rounded-full transition-all duration-700" style={{width: `${budgetPercentage}%`,
           background: "linear-gradient(90deg, #06b6d4, #3b82f6)", }}/>
        </div>
        <p className="text-textSecondary mt-2">
          ${monthTotal} of ${monthlyBudget} used
        </p>
        </div>
      {/*catgeory breakdown*/}
      <div className="bg-bgCard p-6 rounded-xl">
        <h2 className="text-xl text-textPrimary font-semibold mb-4">
          Category Breakdown 
        </h2>
        {Object.keys(categoryTotals).length===0 ?(
          <p className="text-textSecondary"> No expenses this month</p>
        ) : (
          <div className="flex flex-col gap-3">
            {Object.entries(categoryTotals).map(([category,amount])=>(
              <div key={category} className="flex justify-between bg-bgSidebar px-4 py-3 rounded-lg">
                <span className="text-textPrimary">
                  {category}
                </span>
                <span className="text-accent font-semibold">
                  ${amount}
                </span>
                </div>
            ))}
            </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
      {/*pie ui*/}
      <div className="bg-bgCard p-6 rounded-xl mt-8">
        <h2 className="text-xl text-textPrimary font-semibold mb-4">Spending Distribution</h2>
        {pieData.length === 0 ?(
          <p className="text-textSecondary">NO data available</p>
        ) : (
          <div style={{width:"100%",height:300}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={50}
                paddingAngle={3}
                label>
                {pieData.map((entry, index)=>(
                  <Cell key={`cell-${index}`} fill={colors[index%colors.length]} />
                ))}
                </Pie> 
                <Tooltip 
                contentStyle={{
                  backgroundColor:"#cfd8e6",
                  border:"none",
                  borderRadius:"10px",
                }} 
                labelStyle={{color:"#fff"}}/>
                <Legend wrapperStyle={{ color: "#cbd5e1" }} />
              </PieChart>
            </ResponsiveContainer></div>
        )}
      </div>
      {/*trend line chart*/}
      <div className="bg-bgCard p-6 rounded-xl mt-8">
        <h2 className="text-xl text-textPrimary font-semibold mb-4">
          Spending trend
        </h2>
        {trendData.length === 0 ?(
          <p className="text-textSecondary">NO data available</p>
          ):(
            <div style={{width:"100%",height:300}}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3"/>
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip 
                  contentStyle={{
                  backgroundColor:"#1e293b",
                  border:"none",
                  borderRadius:"10px",
                }} 
                labelStyle={{color:"#fff"}}/>
                  <Line type="monotone" dataKey="amount" stroke="#67d926" strokeWidth={3} dot={{ r: 5 }}
                  activeDot={{ r: 8 }}/>
                </LineChart>
              </ResponsiveContainer>
              </div>
          )}
      </div>
      </div>
    </div>
  );
  }