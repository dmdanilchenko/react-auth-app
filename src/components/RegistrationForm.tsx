import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";

interface User {
    id?: number;
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

const RegistrationForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm<User>({
        mode: "onBlur",
    });

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            navigate("/dashboard");
            return;
        }
    }, [navigate]);

    const onSubmit = async (data: User) => {
        const response = await fetch(`http://localhost:5000/users?email=${data.email}`);
        const existing = await response.json();

        if (existing.length > 0) {
            alert("User already exists!");
            return;
        }

        const newUser = {...data};

        await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser),
        });

        alert("Registration successful!");
        localStorage.setItem("userEmail", newUser.email);
        reset();
        navigate("/dashboard");
    };

    const password = watch("password");

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
                Create Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        id="fullName"
                        autoComplete="name"
                        type="text"
                        {...register("fullName", {required: "Full name is required"})}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="John Doe"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        id="email"
                        autoComplete="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            },
                        })}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="example@email.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <input
                        id="password"
                        autoComplete="new-password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "At least 6 characters required",
                            }
                        })}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="******"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        autoComplete="new-password"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Confirm your password",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="******"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Register
                </button>
            </form>
            <div className="text-center mt-6">
                <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-600 hover:underline">
                        <strong>Login</strong>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;
