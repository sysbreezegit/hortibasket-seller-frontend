"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Leaf, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Static mode: no API call, just redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
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

        .login-left::after {
          content: '';
          position: absolute;
          bottom: -80px;
          right: -60px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(0,199,37,0.07) 0%, transparent 70%);
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

        .left-stats {
          display: flex;
          gap: 40px;
          position: relative;
          z-index: 1;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-num {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #f2f0ea;
          letter-spacing: -0.5px;
        }

        .stat-num span {
          color: #00c725;
        }

        .stat-label {
          font-size: 11px;
          color: rgba(242,240,234,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
        }

        /* ─── RIGHT PANEL ─── */
        .login-right {
          width: 480px;
          flex-shrink: 0;
          background: #111a0f;
          border-left: 1px solid rgba(242,240,234,0.06);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 52px;
          position: relative;
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
          margin-bottom: 40px;
          font-weight: 300;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
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
          padding: 13px 16px;
          font-size: 14px;
          color: #f2f0ea;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .form-input::placeholder {
          color: rgba(242,240,234,0.2);
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

        .input-icon-btn:hover {
          color: rgba(242,240,234,0.7);
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

        .error-box svg {
          flex-shrink: 0;
          margin-top: 1px;
          color: #e55c5c;
        }

        .error-box p {
          font-size: 13px;
          color: #e55c5c;
          line-height: 1.5;
          margin: 0;
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
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(0,199,37,0.25);
          margin-top: 10px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #00e02a;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(0,199,37,0.35);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .divider-line {
          height: 1px;
          background: rgba(242,240,234,0.07);
          margin: 32px 0;
        }

        .footer-note {
          text-align: center;
          font-size: 12px;
          color: rgba(242,240,234,0.25);
          line-height: 1.6;
        }

        .footer-note strong {
          color: rgba(242,240,234,0.45);
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

        @media (max-width: 800px) {
          .login-left { display: none; }
          .login-right {
            width: 100%;
            border-left: none;
            padding: 40px 28px;
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
              <span>Admin Control Center</span>
            </div>
            <h1 className="left-headline">
              Grow smarter,<br />
              manage <em>better.</em>
            </h1>
            <p className="left-sub">
              Your centralized command panel for orders, products, and operations — all in one place.
            </p>
          </div>

          <div className="left-stats">
            <div className="stat">
              <div className="stat-num">98<span>%</span></div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat">
              <div className="stat-num">24<span>h</span></div>
              <div className="stat-label">Support</div>
            </div>
            <div className="stat">
              <div className="stat-num">∞</div>
              <div className="stat-label">Scalable</div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT ─── */}
        <div className="login-right">
          <div className="form-overline anim anim-1">Secure Access</div>
          <h2 className="form-title anim anim-2">Welcome back</h2>
          <p className="form-subtitle anim anim-3">Sign in to your admin account</p>

          <form onSubmit={handleSubmit} noValidate>
              <div className="form-group anim anim-3">
              <label className="form-label" htmlFor="admin-email">Email Address</label>
              <div className="input-wrap">
                <input
                  id="admin-email"
                  type="email"
                  className="form-input"
                  placeholder="admin@hortibasket.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group anim anim-4">
              <label className="form-label" htmlFor="admin-password">Password</label>
              <div className="input-wrap">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className="form-input has-icon"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="input-icon-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="admin-login-btn"
              className="submit-btn anim anim-5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          <div className="divider-line" />

          <p className="footer-note anim anim-6">
            This portal is restricted to <strong>authorized administrators</strong> only.<br />
            Unauthorized access is strictly prohibited.
          </p>
        </div>
      </div>
    </>
  );
}
