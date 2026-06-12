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

  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
    };

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)
    ) {
      newErrors.email = "Enter a valid Gmail address";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password =
        "Password must be at least 5 characters";
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
      const response = await fetch(
        "http://localhost:3000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        // Save JWT Token
        localStorage.setItem(
          "token",
          data.token
        );

        // Save Email
        localStorage.setItem(
          "email",
          data.email
        );

        // Go directly to dashboard
        navigate("/dashboard");
      } else {
        setServerError(
          data.message || "Signup Failed"
        );
      }
    } catch (error) {
      console.log(error);

      setServerError(
        "Server Error. Please try again."
      );
    }
  };

  return (
    <div
      className="bg-gray-200 h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: `url(${signup})`,
      }}
    >
      <div className="bg-white border-2 border-gray-400 rounded-xl p-6 w-[400px] flex flex-col items-center gap-4">
        <img
          src={logo1}
          className="w-28"
          alt="Logo"
        />

        <h1 className="text-3xl font-bold text-blue-600">
          Signup
        </h1>

        {/* Username */}
        <div className="w-full">
          <div className="relative">
            <User
              className="absolute left-3 top-3"
              color="blue"
            />

            <input
              type="text"
              placeholder="Enter Username"
              className="border rounded-full p-3 pl-12 w-full"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  username: "",
                }));

                setServerError("");
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
            <Mail
              className="absolute left-3 top-3"
              color="blue"
            />

            <input
              type="email"
              placeholder="Enter Gmail Address"
              className="border rounded-full p-3 pl-12 w-full"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));

                setServerError("");
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
            <Lock
              className="absolute left-3 top-3"
              color="blue"
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="border rounded-full p-3 pl-12 w-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                }));

                setServerError("");
              }}
            />
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1 ml-2">
              {errors.password}
            </p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <p className="text-red-500 text-sm">
            {serverError}
          </p>
        )}

        {/* Signup Button */}
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