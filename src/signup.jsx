import signup from "./assets/bg.png";
import logo1 from "./assets/logo.png";
import { User, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
    };

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

   if (!email.trim()) {
  newErrors.email = "Email is required";
} else if (
  !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)
) {
  newErrors.email = "Enter a valid Gmail address";
}

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length !== 5) {
      newErrors.password = "Password must be 5 characters";
    }

    setErrors(newErrors);

    if (
      newErrors.username ||
      newErrors.email ||
      newErrors.password
    ) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("email", email);
        navigate("/dashboard");
      } else {
        alert("Signup Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-gray-200 h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="bg-white border-2 border-gray-400 rounded-xl p-6 w-[400px] flex flex-col items-center gap-4">
        <img src={logo1} className="w-28" alt="Logo" />

        {/* Username */}
        <div className="w-full">
          <div className="relative">
            <User className="absolute left-3 top-3" color="blue" />
            <input
              type="text"
              placeholder="Enter username"
              className="border rounded-full p-3 pl-12 w-full"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  username: "",
                }));
              }}
            />
          </div>

          {errors.username && (
            <p className="text-red-500 text-sm mt-1 ml-2">
              {errors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="w-full">
          <div className="relative">
            <Mail className="absolute left-3 top-3" color="blue" />
            <input
              type="email"
              placeholder="Enter email"
              className="border rounded-full p-3 pl-12 w-full"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              }}
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm mt-1 ml-2">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="w-full">
          <div className="relative">
            <Lock className="absolute left-3 top-3" color="blue" />
            <input
              type="password"
              placeholder="Enter password"
              className="border rounded-full p-3 pl-12 w-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                }));
              }}
            />
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1 ml-2">
              {errors.password}
            </p>
          )}
        </div>

        <button
          onClick={handleSignup}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full p-3"
        >
          Signup
        </button>

        <div className="flex gap-2">
          <span>Already have an account?</span>
          <span
            className="text-blue-500 font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}