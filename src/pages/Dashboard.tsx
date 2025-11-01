import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface User {
    id: number;
    fullName: string;
    email: string;
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            navigate("/");
            return;
        }

        fetch(`http://localhost:5000/users?email=${userEmail}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    navigate("/");
                    return;
                }

                setUser(data[0]);
            });
    }, [navigate]);

    const handleLogout = async () => {
        if (!user) return;

        localStorage.removeItem("userEmail");
        navigate("/");
    };

    if (!user) return null;

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Welcome, {user.fullName} 👋</h1>
            <p>Email: {user.email}</p>
            <p className="mt-2 text-gray-600">You’ve successfully registered!</p>
            <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
}
