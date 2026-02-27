import {useState} from "react";
import{useNavigate, Link} from "react-router-dom";
import API from "../services/api.js";

export default function Register(){
    const [formData,setFormData] =useState({
        username:"",
        email:"",
        password:"",
    });
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value,
        });
        };
        const handleSubmit=(e)=>{
            e.preventDefault();
            API.post("/auth/register",formData)
            .then(()=>{
                alert("Registration Successful");
                navigate("/login");
            })
            .catch((err)=>{
                 console.log(err.response?.data || err.message);
                 alert("Registration failed");
            });
        };
        return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#0a1628]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl w-[400px]"
      >
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white text-black"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white text-black"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white text-black"
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400">
            Login
          </Link>
        </p>
      </form>
    </div>
        )
    }
    
