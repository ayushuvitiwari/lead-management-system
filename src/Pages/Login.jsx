import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/Data/User.json");
            const users = await response.json();

            const user = users.find(
                (item) =>
                    item.email === email &&
                    item.password === password
            );

            if (user) {
                localStorage.setItem("isLogin", "true");
                navigate("/dashboard");
            } else {
                alert("Invalid Email or Password!");
            }
        } catch (error) {
            console.error("Error loading users:", error);
            alert("Unable to load user data!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Please login to your account
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end items-center text-sm">
                        <a href="#" className="text-indigo-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?
                    <a href="#" className="text-indigo-600 font-semibold ml-1">
                        Sign Up
                    </a>
                </p>

            </div>
        </div>
    );
};

export default Login;
