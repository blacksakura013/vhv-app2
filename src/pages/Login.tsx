// src/pages/Login.tsx
import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      const user = login(phone, password);

      if (user.role === "admin") navigate("/dashboard");
      else navigate("/patient");

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
          Login
        </h2>

        <input placeholder="เบอร์โทร" className="input"
          onChange={(e)=>setPhone(e.target.value)} />

        <input type="password" placeholder="รหัสผ่าน" className="input"
          onChange={(e)=>setPassword(e.target.value)} />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-2">
          Login
        </button>

        <p className="text-center mt-3 text-sm">
          <Link to="/register" className="text-blue-600">
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}