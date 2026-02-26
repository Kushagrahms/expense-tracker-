import {useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import API from "../services/api";

export default function Login(){
    const[formData,setFormData]=useState({
        username:"",
        password:"",
    });
    const navigate= useNavigate();
    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value,
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        API.post("/auth/login",formData)
        .then((res)=>{
            console.log("Login response",res.data);
            
            const token=res.data.access_token || res.data.token || res.data.data?.access_token;
            console.log("Token:",token);
            localStorage.setItem("token",token);
            navigate("/");
        })
        .catch((err)=>{
            console.log(err.response?.data || err.message);
        alert("Invalid credentials");
          });
        };

    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0b1b34] to-[#0a1628]">
    
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl w-[400px] shadow-2xl">
      
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Login
        </button>

      </form>

      <p className="text-center text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-cyan-400 hover:underline">
          Register
        </Link>
      </p>

    </div>
  </div>
);
    }

