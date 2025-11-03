import React, { useState } from "react";
import Dashboard from "./Dashboard";


export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Signup successful! You can now log in.");
      setIsSignup(false);
    } else {
      // Login: check if user exists
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        alert(`Welcome back, ${storedUser.firstName}!`);
        setLoggedIn(true);
      } else {
        alert("Invalid email or password!");
      }
    }
  };

  if (loggedIn) {
    return (
     <Dashboard />
    );
  }

  return (
    <>
    <div className="h-screen w-full overflow-hidden flex items-center justify-center bg-[#F1F4FF]">
      <div className="bg-[#4B3CF1] bg-opacity-20 backdrop-blur-md border border-purple-500 shadow-lg rounded-2xl p-8 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="p-3 rounded-lg bg-[#F1F4FF] text-purple-900 border border-purple-700 focus:outline-none focus:border-purple-400"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="p-3 rounded-lg bg-[#F1F4FF] text-purple-900 border border-purple-700 focus:outline-none focus:border-purple-400"
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#F1F4FF] text-purple-900 border border-purple-700 focus:outline-none focus:border-purple-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#F1F4FF] text-purple-900 border border-purple-700 focus:outline-none focus:border-purple-400"
            required
          />
          <button
            type="submit"
            className="p-3 rounded-lg bg-purple-900 text-[#F1F4FF] border border-purple-700 focus:outline-none focus:border-purple-400"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-purple-400 text-center mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-purple-300 font-semibold hover:underline"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
    </>
  );
}