import {
User,
Lock,
Facebook,
Mail,
Phone,
Twitter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bgImage from "./assets/bg.png";
import logo from "./assets/download.png";

export default function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const [errors, setErrors] = useState({
username: "",
password: "",
});

const navigate = useNavigate();

const handleLogin = async () => {
const newErrors = {
username: "",
password: "",
};


if (!username.trim()) {
  newErrors.username = "Username is required";
}

if (!password.trim()) {
  newErrors.password = "Password is required";
}

setErrors(newErrors);

if (newErrors.username || newErrors.password) {
  return;
}

try {
  const response = await fetch(
    "http://localhost:3000/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const data = await response.json();

  console.log("Login Response:", data);

  if (data.success) {
    localStorage.setItem(
      "email",
      data.email
    );

    localStorage.setItem(
      "token",
      data.token
    );

    console.log(
      "Saved Email:",
      localStorage.getItem("email")
    );

    console.log(
      "Saved Token:",
      localStorage.getItem("token")
    );

    navigate("/dashboard");
  } else {
    setErrors({
      username: "",
      password:
        data.message ||
        "Invalid Username or Password",
    });
  }
} catch (error) {
  console.log(error);

  setErrors({
    username: "",
    password:
      "Server error. Please try again.",
  });
}


};

return (
<> <div className="bg-black h-10"></div>

  <div
    className="bg-cover pb-20 pt-20 flex items-center justify-center"
    style={{
      backgroundImage: `url(${bgImage})`,
    }}
  >
    <div className="flex border border-blue-800 w-96 rounded-xl items-center p-5 flex-col gap-3 pb-10 bg-white">
      <img
        className="h-40 w-auto"
        src={logo}
        alt="Logo"
      />

      <span className="text-4xl font-semibold">
        Login
      </span>

      <div className="w-80">
        <div className="relative">
          <input
            type="text"
            className="border border-gray-900 rounded-3xl p-2 w-full"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);

              setErrors((prev) => ({
                ...prev,
                username: "",
              }));
            }}
          />

          <span className="absolute right-4 top-2">
            <User color="blue" />
          </span>
        </div>

        {errors.username && (
          <p className="text-red-500 text-sm mt-1 ml-2">
            {errors.username}
          </p>
        )}
      </div>

      <div className="w-80">
        <div className="relative">
          <input
            type="password"
            className="border border-gray-900 rounded-3xl p-2 w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

              setErrors((prev) => ({
                ...prev,
                password: "",
              }));
            }}
          />

          <span className="absolute right-4 top-2">
            <Lock color="blue" />
          </span>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mt-1 ml-2">
            {errors.password}
          </p>
        )}
      </div>

      <button
        className="rounded-3xl p-2 w-80 bg-blue-500 text-white"
        onClick={handleLogin}
      >
        Login
      </button>

      <div className="text-gray-500 flex gap-1">
        <span>
          Don't have an account?
        </span>

        <span
          className="font-bold cursor-pointer text-blue-500"
          onClick={() => navigate("/signup")}
        >
          Register
        </span>
      </div>

      <div className="text-gray-600">
        (or)
      </div>

      <div className="flex gap-3">
        <Facebook
          color="white"
          className="rounded-full p-1 bg-violet-600 w-8 h-8"
        />

        <Mail
          color="white"
          className="rounded-full p-1 bg-red-600 w-8 h-8"
        />

        <Phone
          color="white"
          className="rounded-full p-1 bg-green-600 w-8 h-8"
        />

        <Twitter
          color="white"
          className="rounded-full p-1 bg-blue-600 w-8 h-8"
        />
      </div>
    </div>
  </div>

  <div className="bg-black h-10"></div>
</>


);
}
