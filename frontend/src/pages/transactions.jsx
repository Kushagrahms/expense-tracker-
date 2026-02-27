import { useEffect, useState} from "react";
import API from "../services/api.js";

export default function Transactions(){
    const[expenses,setExpenses]=useState([]);
    const[loading,setLoading]=useState(true);
    const [formData,setFormData]=useState({
        title:"",
        amount:"",
        category:""
    });
    const[editingId,setEditingId]=useState(null);
    const [filters,setFilters]=useState({
        search:"",
        category:"",
        sort:""
    });

    useEffect(() =>
    { fetchExpenses();
        }, [filters]);

        const fetchExpenses=() =>{
            const params={};

            if (filters.category) params.category=filters.category;
            if(filters.sort) params.sort=filters.sort;

            API.get("/expenses",{params}).then((res) =>{
                console.log("full response",res.data);

                const fetched=Array.isArray(res.data?.data?.expenses)?res.data.data.expenses : [];
                console.log("fetched array",fetched);

                let filtered=fetched;

                if(filters.search){
                    filtered=fetched.filter((e)=>
                        e.title.toLowerCase().includes(filters.search.toLowerCase()));
                }
                setExpenses(filtered);
                setLoading(false);
            })
            .catch((err)=>{
                console.log("Error",err.response?.data || err.message);
                setExpenses([]);
                setLoading(false);

            });
        };
        const handleDelete=(id)=>{
            API.delete(`/expenses/${id}`)
            .then(()=>{
                fetchExpenses();
            })
            .catch((err)=>{
                console.log("Delete error",err.response?.data || err.message);
            });
        };
        const handleChange=(e)=>{
            setFormData({...formData,[e.target.name]:e.target.value});
        };
        const handleAddExpense=(e)=>{
            e.preventDefault();
            API.post("/expenses",formData)
            .then(()=>{
                setFormData({title: "",amount: "" ,category: ""});
                fetchExpenses();
            })
            .catch((err)=>{
                console.log("Add error:", err.response?.data || err.message);

            });
        };
        const handleSubmit=(e)=>{
            e.preventDefault();
            if(!formData.title || !formData.amount || !formData.category) return;

            if(editingId){
                //update
                API.put(`/expenses/${editingId}`, formData)
                .then(()=>{
                    fetchExpenses();
                    setEditingId(null);
                    setFormData({
                        title:"",
                        amount:"",
                        category:"",
                    });
                })
                .catch((err)=>{
                    console.log("update error",err.response?.data || err.message);
                });
            }else{                
            //create
            API.post("/expenses",formData)
            .then(()=>{
                fetchExpenses();
                setFormData({
                    title:"",
                    amount:"",
                    category:""
                });
            })
            .catch((err)=>{
                console.log("Add error", err.response?.data || err.message);
            });
        }
        };
        const handleEdit=(expense)=>{
            setFormData({
                title:expense.title,
                amount:expense.amount,
                category:expense.category,
            });
            setEditingId(expense.id);
        };
        const uniquecategories=[...new Set(expenses.map((e)=>e.category)),];

        if(loading){
            return <p className="text-textSecondary">Laoding..</p>}

        return (
            <div>
                <h1 className="text-3xl text-textPrimary font-bold mb-8"> Transactions</h1>

    {/*Form card*/}            
    <form onSubmit={handleSubmit} className="bg-bgCard rounded-xl p-6 mb-8">
     <div className="bg-bgCard rounded-xl p-6 mb-8 max-w-3xl">

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

    {/* Title */}
    <div className="flex flex-col">
      <label className="text-gray-300 text-sm mb-1">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"/>
    </div>

    {/* Amount */}
    <div className="flex flex-col">
      <label className="text-gray-300 text-sm mb-1">Amount</label>
      <input
        type="number"
        name="amount"
        value={formData.amount || ""}
        onChange={handleChange}
        required
        className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"/>
    </div>

    {/* Category */}
    <div className="flex flex-col">
      <label className="text-gray-300 text-sm mb-1">Category</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"/>
    </div>
  </div>

  <button
    onClick={handleSubmit}
    className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition">
    {editingId ? "Update":"Add"}
  </button>
  
</div>                  
 </form>  
 {/*filter ui*/}
 <div className="flex gap-4 mb-6">
    <input type="text" placeholder="search title" className="bg-white text-gray-900 px-4 py-2 rounded-lg"
    onChange={(e)=>setFilters({...filters,search: e.target.value}) } />
 <select className="bg-white text-gray-900 px-4 py-2 rounded-lg"
 onChange={(e)=>setFilters({...filters,category: e.target.value}) }>
    <option value="">All categories</option>
    {uniquecategories.map((cat)=>(
        <option key={cat} value={cat}>{cat}</option>        
    ))}
 </select>
 <select className="bg-white text-gray-900 px-4 py-2 rounded-lg"
 onChange={(e)=>setFilters({...filters,sort: e.target.value}) }>
    <option value="">Sort</option>
    <option value="amount_asc">Amount ↑</option>
    <option value="amount_desc">Amount ↓</option>
    <option value="date_asc">Date ↑</option>
    <option value="date_desc">Date ↓</option>
 </select>

 </div>



{/*transaction list*/}
                <div className="bg-bgCard rounded-xl p-6">
                {expenses.length === 0?(
                    <p className="text-textSeconadry">
                        O expense found
                    </p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {expenses.map((expense)=>
                        (
                            <div key={expense.id}
                            className="flex justify-between items-center bg-bgSidebar rounded-lg px-6 py-4 hover:opacity-90 transition"
              >
              <div>
                <p className="text-textPrimary font-semibold">
                    {expense.title};
                </p>
                <p className="text-textSecondary text-sm">
                    {expense.category} .{" "}
                    {new Date(expense.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-accent font-semibold">
                    {expense.amount};
                </p>
                <button onClick={()=>handleDelete(expense.id)} className="text-danger hover:opacity-80 transition">
                    Delete
                </button>
                <button onClick={()=>handleEdit(expense)} className="text-yellow-400 hover:opacity-80 transition">
                    Edit
                </button>
              </div>
              </div>
               ))}
             </div>
            )}
         </div>
         </div>
        );
}