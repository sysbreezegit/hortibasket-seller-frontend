"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Leaf, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { axiosAdmin } from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shopName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.shopName || !formData.password) {
      setError("Please fill in all required fields (Name, Email, Phone, Shop Name, Password)");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosAdmin.post("/auth/register", formData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          background: #0a0f09;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ─── LEFT PANEL ─── */
        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 56px;
          background: #0a0f09;
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          top: -120px;
          left: -120px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(0,199,37,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .brand-icon {
          width: 38px;
          height: 38px;
          background: #00c725;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #f2f0ea;
          letter-spacing: -0.3px;
        }

        .brand-name span {
          color: #00c725;
        }

        .left-content {
          position: relative;
          z-index: 1;
        }

        .left-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,199,37,0.1);
          border: 1px solid rgba(0,199,37,0.25);
          border-radius: 999px;
          padding: 4px 14px 4px 8px;
          margin-bottom: 32px;
        }

        .left-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00c725;
          animation: pulse 1.8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .left-tag span {
          font-size: 11px;
          font-weight: 500;
          color: #00c725;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .left-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 4.5vw, 60px);
          line-height: 1.08;
          color: #f2f0ea;
          letter-spacing: -1.5px;
          margin-bottom: 20px;
        }

        .left-headline em {
          font-style: italic;
          color: #00c725;
        }

        .left-sub {
          font-size: 15px;
          color: rgba(242,240,234,0.5);
          line-height: 1.7;
          max-width: 340px;
          font-weight: 300;
        }

        /* ─── RIGHT PANEL ─── */
        .login-right {
          width: 520px;
          flex-shrink: 0;
          background: #111a0f;
          border-left: 1px solid rgba(242,240,234,0.06);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 52px;
          position: relative;
          overflow-y: auto;
        }

        .login-right::-webkit-scrollbar {
          width: 4px;
        }
        .login-right::-webkit-scrollbar-thumb {
          background: rgba(0,199,37,0.2);
          border-radius: 10px;
        }

        .login-right::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00c725 0%, rgba(0,199,37,0.2) 100%);
        }

        .form-overline {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #00c725;
          margin-bottom: 12px;
        }

        .form-title {
          font-family: 'DM Serif Display', serif;
          font-size: 34px;
          color: #f2f0ea;
          letter-spacing: -0.8px;
          margin-bottom: 6px;
          line-height: 1.1;
        }

        .form-subtitle {
          font-size: 13px;
          color: rgba(242,240,234,0.4);
          margin-bottom: 24px;
          font-weight: 300;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .form-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(242,240,234,0.5);
        }

        .input-wrap {
          position: relative;
        }

        .form-input {
          width: 100%;
          background: rgba(242,240,234,0.04);
          border: 1px solid rgba(242,240,234,0.1);
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 14px;
          color: #f2f0ea;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .form-input::placeholder {
          color: rgba(242,240,234,0.15);
        }

        .form-input:focus {
          border-color: #00c725;
          background: rgba(0,199,37,0.04);
          box-shadow: 0 0 0 3px rgba(0,199,37,0.08);
        }

        .form-input.has-icon {
          padding-right: 46px;
        }

        .input-icon-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(242,240,234,0.35);
          display: flex;
          align-items: center;
          padding: 4px;
          transition: color 0.2s;
        }

        .error-box {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: rgba(229,92,92,0.08);
          border: 1px solid rgba(229,92,92,0.25);
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 20px;
        }

        .error-box p {
          font-size: 13px;
          color: #e55c5c;
          line-height: 1.5;
          margin: 0;
        }

        .success-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0,199,37,0.08);
          border: 1px solid rgba(0,199,37,0.25);
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 20px;
          color: #00c725;
        }

        .success-box p {
          font-size: 14px;
          margin: 0;
          font-weight: 500;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #00c725;
          color: #0a0f09;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(0,199,37,0.2);
          margin-top: 6px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #00e02a;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(0,199,37,0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-prompt {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: rgba(242,240,234,0.4);
        }

        .login-link {
          color: #00c725;
          font-weight: 500;
          text-decoration: none;
          margin-left: 6px;
          transition: color 0.2s;
        }

        .login-link:hover {
          color: #00e02a;
          text-decoration: underline;
        }

        /* ─── GRID DECORATION ─── */
        .grid-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.025;
        }

        .grid-lines::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(242,240,234,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(242,240,234,1) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ─── ENTRANCE ANIMATION ─── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .anim {
          opacity: 0;
          animation: fadeUp 0.55s ease forwards;
        }
        .anim-1 { animation-delay: 0.05s; }
        .anim-2 { animation-delay: 0.12s; }
        .anim-3 { animation-delay: 0.18s; }
        .anim-4 { animation-delay: 0.24s; }
        .anim-5 { animation-delay: 0.30s; }
        .anim-6 { animation-delay: 0.36s; }

        @media (max-width: 900px) {
          .login-left { display: none; }
          .login-right {
            width: 100%;
            border-left: none;
            padding: 40px 24px;
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <div className="login-root">
        {/* ─── LEFT ─── */}
        <div className="login-left">
          <div className="grid-lines" />

          <div className="brand">
            <div className="brand-icon">
              <Leaf size={18} color="#0a0f09" strokeWidth={2.5} />
            </div>
            <span className="brand-name">Horti<span>Basket</span></span>
          </div>

          <div className="left-content">
            <div className="left-tag">
              <div className="left-tag-dot" />
              <span>Partner with us</span>
            </div>
            <h1 className="left-headline">
              Start your <em>journey</em><br />
              with us today.
            </h1>
            <p className="left-sub">
              Expand your reach, reach more customers, and grow your business with the most trusted platform in the green industry.
            </p>
          </div>

          <div className="left-footer">
            <p style={{ fontSize: '12px', color: 'rgba(242,240,234,0.2)' }}>
              © 2024 HortiBasket Seller Network. All rights reserved.
            </p>
          </div>
        </div>

        {/* ─── RIGHT ─── */}
        <div className="login-right">
          <div className="form-overline anim anim-1">New Seller Application</div>
          <h2 className="form-title anim anim-2">Create Account</h2>
          <p className="form-subtitle anim anim-3">Join our thriving community of sellers</p>

          {success ? (
            <div className="success-box anim anim-3">
              <CheckCircle2 size={24} />
              <div>
                <p>Registration Successful!</p>
                <p style={{ fontSize: '13px', opacity: 0.8, marginTop: '4px' }}>
                  Redirecting to login...
                </p>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="error-box anim anim-3">
                  <AlertCircle size={16} style={{ color: '#e55c5c', marginTop: '2px' }} />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group anim anim-3">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group anim anim-4">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group anim anim-4">
                    <label className="form-label" htmlFor="phone">Mobile Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="form-group anim anim-5">
                  <label className="form-label" htmlFor="shopName">Shop / Business Name</label>
                  <input
                    id="shopName"
                    name="shopName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Green Valley Nursery"
                    value={formData.shopName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="form-group anim anim-5">
                  <label className="form-label" htmlFor="password">Password</label>
                  <div className="input-wrap">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="form-input has-icon"
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      className="input-icon-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-btn anim anim-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating Account…
                    </>
                  ) : (
                    "Register as Seller"
                  )}
                </button>
              </form>

              <div className="login-prompt anim anim-6">
                Already have an account? 
                <Link href="/" className="login-link">
                  Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
