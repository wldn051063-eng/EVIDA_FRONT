import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, FileText, CreditCard, FileCheck, Building2,
  ClipboardList, User, LogOut, ChevronDown
} from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { icon: Home, label: '홈', path: '/dashboard' },
  { icon: FileText, label: '영수증 작성', path: '/receipt-create' },
  { icon: CreditCard, label: '카드 조회', path: '/card-inquiry' },
  { icon: FileCheck, label: '결의서 작성', path: '/resolution-create' },
  { icon: Building2, label: '거래처 조회', path: '/vendor-inquiry' },
  { icon: ClipboardList, label: '영수증 통합 조회', path: '/receipt-inquiry' },
  { icon: User, label: '내 정보', path: '/my-info' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link to="/dashboard">
          <span className="logo-text">EVIDA</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">김</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">김담당</span>
            <span className="sidebar-user-role">경리팀</span>
          </div>
          <ChevronDown size={14} className="sidebar-user-chevron" />
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={16} />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
