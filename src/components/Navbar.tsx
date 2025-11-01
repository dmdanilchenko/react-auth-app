import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        setLoggedIn(Boolean(userEmail));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        setLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link to="/" className="font-bold text-lg">
                    AuthApp
                </Link>
                <div className="flex gap-4 items-center">
                    {loggedIn ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-transparent border-none p-0 text-white hover:underline"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/" className="hover:underline">
                            Login / Register
                        </Link>
                    )}
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                </div>
            </div>
        </nav>
    );
}