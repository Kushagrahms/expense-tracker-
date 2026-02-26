import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Transactions from "./pages/transactions";
import Settings from "./pages/settings";
import Reports from "./pages/reports";
import Budgets from "./pages/budgets";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./components/protectedroute";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>

        <Route path="/" element={<Dashboard />}/>
        <Route path="/transactions" element={<Transactions />}/>
        <Route path="/budgets" element={<Budgets />}/>
        <Route path="/reports" element={<Reports />}/>
        <Route path="/settings" element={<Settings />}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;