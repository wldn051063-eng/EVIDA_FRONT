import { useState } from 'react';
import Layout from '../components/Layout';
import { Edit2, Phone, Mail, Building, User, Bell, CreditCard } from 'lucide-react';
import './MyInfo.css';

export default function MyInfo() {
  const [notifications, setNotifications] = useState({
    receiptApproval: true,
    cardUsage: false,
    resolutionStatus: true,
  });

  const toggleNotif = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">내 정보</h1>
            <p className="page-subtitle">개인 정보 및 관련 설정을 관리하세요</p>
          </div>
        </div>

        {/* Profile */}
        <div className="myinfo-profile-card">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">김</div>
          </div>
          <div className="profile-details">
            <div className="profile-name">김담당
              <span className="profile-badge admin">관리자</span>
            </div>
            <div className="profile-email">kim.damdang@evida-corp.com</div>
            <div className="profile-dept">경리팀 · 대리</div>
          </div>
          <button className="btn-edit">
            <Edit2 size={14} />
            프로필 수정
          </button>
        </div>

        <div className="myinfo-grid">
          {/* Basic Info */}
          <div className="myinfo-card">
            <h3 className="myinfo-section-title">기본 정보</h3>
            <div className="info-list">
              <div className="info-item">
                <div className="info-icon-wrap">
                  <User size={15} />
                </div>
                <div>
                  <div className="info-label">이름</div>
                  <div className="info-value">김담당</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-wrap">
                  <Phone size={15} />
                </div>
                <div>
                  <div className="info-label">전화번호</div>
                  <div className="info-value">010-1234-5678</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-wrap">
                  <Mail size={15} />
                </div>
                <div>
                  <div className="info-label">이메일</div>
                  <div className="info-value">kim.damdang@evida-corp.com</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-wrap">
                  <Building size={15} />
                </div>
                <div>
                  <div className="info-label">부서</div>
                  <div className="info-value">경리팀</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-wrap">
                  <User size={15} />
                </div>
                <div>
                  <div className="info-label">직급</div>
                  <div className="info-value">대리</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="myinfo-card">
            <h3 className="myinfo-section-title">보유한 카드</h3>
            <div className="card-list">
              <div className="my-card-item">
                <div className="my-card-icon">
                  <CreditCard size={18} color="#2563eb" />
                </div>
                <div className="my-card-info">
                  <div className="my-card-name">캠퍼니카드 A</div>
                  <div className="my-card-num">**** **** **** 1234</div>
                </div>
                <span className="my-card-status active">사용중</span>
              </div>
              <div className="my-card-item">
                <div className="my-card-icon">
                  <CreditCard size={18} color="#8b5cf6" />
                </div>
                <div className="my-card-info">
                  <div className="my-card-name">캠퍼니카드 B</div>
                  <div className="my-card-num">**** **** **** 5678</div>
                </div>
                <span className="my-card-status active">사용중</span>
              </div>
              <button className="add-card-btn">
                + 카드 추가
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="myinfo-card">
          <div className="notif-header">
            <h3 className="myinfo-section-title">
              <Bell size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              알림
            </h3>
          </div>
          <div className="notif-list">
            {[
              { key: 'receiptApproval', label: '영수증 승인 알림', desc: '영수증이 승인되거나 반려될 때 알림을 받습니다' },
              { key: 'cardUsage', label: '카드 사용 알림', desc: '법인카드 사용 시 즉시 알림을 받습니다' },
              { key: 'resolutionStatus', label: '결의서 상태 알림', desc: '결의서 처리 상태 변경 시 알림을 받습니다' },
            ].map((n) => (
              <div key={n.key} className="notif-item">
                <div>
                  <div className="notif-label">{n.label}</div>
                  <div className="notif-desc">{n.desc}</div>
                </div>
                <button
                  className={`toggle-btn ${notifications[n.key] ? 'on' : 'off'}`}
                  onClick={() => toggleNotif(n.key)}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
