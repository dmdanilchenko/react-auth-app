import {useForm} from "react-hook-form";
import {useNavigate, Link} from "react-router-dom";
import {useEffect} from "react";

interface LoginData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginData>();
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            navigate("/dashboard");
            return;
        }
    }, [navigate]);

    const onSubmit = async (data: LoginData) => {
        const res = await fetch(`http://localhost:5000/users?email=${data.email}`);
        const users = await res.json();

        if (users.length === 0) {
            alert("User not found");
            return;
        }

        const user = users[0];

        if (user.password !== data.password) {
            alert("Invalid password");
            return;
        }

        localStorage.setItem("userEmail", user.email);

        navigate("/dashboard");
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email", {required: "Email is required"})}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="example@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        {...register("password", {required: "Password is required"})}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="******"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2"
                >
                    Login
                </button>
            </form>
            <div className="text-center mt-6">
                <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        <strong>Register</strong>
                    </Link>
                </p>
            </div>
        </div>

    );
}