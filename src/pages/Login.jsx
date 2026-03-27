import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <aside className="auth-sidebar">
        <span className="auth-logo">EVIDA</span>
        <div className="auth-sidebar-bottom">
          <Link to="/login" className="auth-sidebar-link active">로그인</Link>
        </div>
      </aside>

      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-card-logo">EVIDA</div>
          <h1 className="auth-card-title">로그인</h1>
          <p className="auth-card-subtitle">아이디 또는 이메일로 로그인하세요</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <Mail size={16} className="auth-input-icon" />
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="auth-input"
              />
            </div>

            <div className="auth-input-group">
              <Lock size={16} className="auth-input-icon" />
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="auth-input"
              />
            </div>

            <button type="submit" className="auth-btn">로그인</button>
          </form>

          <div className="auth-links">
            <Link to="/login" className="auth-link">아이디를 잊으셨나요?</Link>
            <span className="auth-divider">|</span>
            <Link to="/register" className="auth-link">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
