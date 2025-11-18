import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f0f7fa 60%, #e5eff5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 32px rgba(32,74,123,0.14)",
          padding: "38px 36px 32px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* LOGO or ICON */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(37,99,235,0.35)",
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#fff"
            }}
          >
            SS
          </div>
        </div>
        
        <h2
          style={{
            margin: 0,
            marginBottom: 26,
            fontSize: "2.1rem",
            fontWeight: "bold",
            color: "#2563eb",
            letterSpacing: "-1px"
          }}
        >
          Login to SplitSmart
        </h2>

        {error && (
          <div
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: 16,
              background: "#fee",
              border: "1px solid #fcc",
              borderRadius: 8,
              color: "#c33",
              fontSize: "0.95rem"
            }}
          >
            {error}
          </div>
        )}

        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <label style={{ fontWeight: 600, fontSize: "1rem", display: "block", margin: "14px 0 6px" }}>
            Email
          </label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@email.com"
            style={{
              width: "100%",
              padding: "13px",
              border: "1px solid #cdd8f0",
              borderRadius: 9,
              background: "#f6f8fc",
              fontSize: "1rem",
              marginBottom: 16
            }}
          />

          <label style={{ fontWeight: 600, fontSize: "1rem", display: "block", margin: "2px 0 6px" }}>
            Password
          </label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            style={{
              width: "100%",
              padding: "13px",
              border: "1px solid #cdd8f0",
              borderRadius: 9,
              background: "#f6f8fc",
              fontSize: "1rem",
              marginBottom: 22
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: loading ? "#93c5fd" : "#2563eb",
              color: "#fff",
              fontWeight: 700,
              border: "none",
              borderRadius: 9,
              fontSize: "1.1rem",
              marginBottom: 4,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 2px 10px rgba(37,99,235,0.25)",
              transition: "background 0.2s"
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        
        <p style={{ marginTop: 20, fontSize: "1rem", color: "#555" }}>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;