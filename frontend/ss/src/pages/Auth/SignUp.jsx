import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
          maxWidth: 420,
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
          Sign Up for SplitSmart
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
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
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
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
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
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            style={{
              width: "100%",
              padding: "13px",
              border: "1px solid #cdd8f0",
              borderRadius: 9,
              background: "#f6f8fc",
              fontSize: "1rem",
              marginBottom: 20
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        
        <p style={{ marginTop: 20, fontSize: "1rem", color: "#555" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;