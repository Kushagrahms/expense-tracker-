import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Transactions from "./pages/transactions";
import Settings from "./pages/settings";
import Reports from "./pages/reports"
import Budgets from "./pages/budgets";
function App(){
  return(
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/transactions" element={<Transactions />}/>
        <Route path="/budgets" element={<Budgets />}/>
        <Route path="/reports" element={<Reports />}/>
        <Route path="/settings" element={<Settings />}/>
      </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;