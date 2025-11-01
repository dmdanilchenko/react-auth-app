import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div className="min-h-screen bg-slate-100 text-gray-800">
            <Navbar />
            <main className="container mx-auto p-6">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
