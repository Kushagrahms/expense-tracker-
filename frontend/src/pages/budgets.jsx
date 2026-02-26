import { useState, useEffect } from "react";
import API from "../services/api";

export default function Budgets() {
  const [budget, setBudget] = useState(0);
  const [inputAmount, setInputAmount] = useState("");

  // Fetch current month budget
  useEffect(() => {
    API.get("/budgets/")
      .then((res) => {
        setBudget(res.data.amount);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });
  }, []);

  const handleSave = () => {
    if (!inputAmount) return;

    API.post("/budgets/", { amount: Number(inputAmount) })
      .then(() => {
        setBudget(Number(inputAmount));
        setInputAmount("");
        alert("Budget saved!");
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6 font-bold">Budgets</h1>

      <div className="bg-[#1e293b] p-6 rounded-xl w-[400px]">
        <p className="mb-2 text-gray-400">Current Month Budget:</p>
        <h2 className="text-3xl text-cyan-400 mb-6">${budget}</h2>

        <input
          type="number"
          placeholder="Enter new budget"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
        />

        <button
          onClick={handleSave}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg"
        >
          Save Budget
        </button>
      </div>
    </div>
  );
}