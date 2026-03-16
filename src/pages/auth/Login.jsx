import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            if (email === "admin@brebselgo.id" && password === "admin123") {
                navigate("/dashboard");
            } else {
                alert("Email atau password salah");
            }

            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-b from-[#c7d2fe] via-[#93c5fd] to-[#60a5fa]">

            <div className="bg-white p-10 rounded-2xl shadow-xl w-[380px] 
            animate-[fadeIn_.6s_ease]">

                {/* ICON */}
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-600 p-5 rounded-xl shadow-lg">
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/12220/12220991.png"
                            alt="logo"
                            className="w-8 h-8"
                        />
                    </div>
                </div>

                <h2 className="text-center text-xl font-semibold mb-2">
                    Admin Dashboard
                </h2>

                <p className="text-center text-gray-500 mb-6 text-sm">
                    Masuk untuk mengelola BrebselGO
                </p>

                <form onSubmit={handleLogin} className="space-y-4">

                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="admin@brebesgo.id"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="******"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        {loading ? "Memproses..." : "Masuk sebagai Admin"}
                    </button>

                </form>

                <div className="bg-blue-50 text-sm p-3 rounded-lg mt-6">
                    <p className="font-semibold mb-1">Demo Credentials:</p>
                    <p>Email: admin@brebselgo.id</p>
                    <p>Password: admin123</p>
                </div>

            </div>

        </div>
    );
};

export default Login;