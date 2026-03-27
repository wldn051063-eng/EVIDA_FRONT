import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  TrendingUp, FileText, Clock, CreditCard,
  Upload, Search, Send, LayoutList, ArrowRight, MoreHorizontal
} from 'lucide-react';
import './Dashboard.css';

const stats = [
  {
    label: '이번 달 지출',
    value: '1,524,800원',
    sub: '전월 대비',
    change: '+13%',
    positive: false,
    icon: <TrendingUp size={20} />,
    color: '#2563eb'
  },
  {
    label: '대기 중 영수증',
    value: '34건',
    sub: '처리 필요',
    icon: <FileText size={20} />,
    color: '#8b5cf6'
  },
  {
    label: '승인 대기',
    value: '12건',
    sub: '결의서 기준',
    icon: <Clock size={20} />,
    color: '#f59e0b'
  },
  {
    label: '법인카드 잔액',
    value: '4,250,000원',
    sub: '한도 대비',
    change: '+43,00원',
    positive: true,
    icon: <CreditCard size={20} />,
    color: '#10b981'
  },
];

const quickActions = [
  { icon: <Upload size={22} />, label: '영수증 일괄 업로드', desc: '여러 영수증을 한 번에 올립니다', path: '/receipt-create', color: '#eff6ff', iconColor: '#2563eb' },
  { icon: <CreditCard size={22} />, label: '카드 내역 조회', desc: '최근 카드, 내역을 확인합니다', path: '/card-inquiry', color: '#f0fdf4', iconColor: '#10b981' },
  { icon: <Send size={22} />, label: '결의서 제출', desc: '쌓인 경비를 결의서로 제출합니다', path: '/resolution-create', color: '#fff7ed', iconColor: '#f59e0b' },
  { icon: <Search size={22} />, label: '통합 조회', desc: '모든 경비 내역을 한번에 확인합니다', path: '/receipt-inquiry', color: '#fdf4ff', iconColor: '#8b5cf6' },
];

const recentTransactions = [
  { id: 1, icon: '☕', name: '스타벅스 강남점', tag: '카드', date: '2026.03.15 · 거래 · 간담회의 034번', amount: '34,000', status: 'approved' },
  { id: 2, icon: '🚕', name: '카카오T 택시', tag: '교통', date: '2026.03.14 · 교통 · 카카오T PD 043번', amount: '17,800', status: 'approved' },
  { id: 3, icon: '🍽️', name: '점심 식당', tag: '식비', date: '2026.03.14 · 식비 · 점식의 모임 034번', amount: '175,000', status: 'pending' },
  { id: 4, icon: '🅿️', name: '파킹 요금', tag: '주차', date: '2026.03.14 · 주차 · 주차 요금 046번', amount: '41,200', status: 'approved' },
  { id: 5, icon: '🏢', name: '포항 클로다이스', tag: '미처리', date: '2026.03.13 · 세비 · 비용 청구서 034번', amount: '290,000', status: 'unprocessed' },
];

const statusMap = {
  approved: { label: '완료', className: 'tag-green' },
  pending: { label: '대기', className: 'tag-orange' },
  unprocessed: { label: '미처리', className: 'tag-red' },
};

export default function Dashboard() {
  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2 className="dashboard-greeting">안녕하세요, 김담당님</h2>
          <p className="dashboard-subtitle">오늘도 효율적인 경비 관리를 시작하세요</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-card-top">
                <span className="stat-label">{s.label}</span>
                <div className="stat-icon" style={{ background: s.color + '20', color: s.color }}>
                  {s.icon}
                </div>
              </div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-sub">
                <span>{s.sub}</span>
                {s.change && (
                  <span className={`stat-change ${s.positive ? 'positive' : 'negative'}`}>
                    {s.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="section">
          <h3 className="section-title">빠른 찾기</h3>
          <div className="quick-actions-grid">
            {quickActions.map((a, i) => (
              <Link key={i} to={a.path} className="quick-action-card">
                <div className="quick-action-icon" style={{ background: a.color, color: a.iconColor }}>
                  {a.icon}
                </div>
                <div>
                  <div className="quick-action-label">{a.label}</div>
                  <div className="quick-action-desc">{a.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="section">
          <div className="section-header">
            <div>
              <h3 className="section-title">최근 지출 내역</h3>
              <p className="section-subtitle">최근 5 건 내역</p>
            </div>
            <Link to="/receipt-inquiry" className="view-all-btn">
              전체보기 <ArrowRight size={14} />
            </Link>
          </div>

          <div className="transactions-table">
            <div className="table-header">
              <span>거래처</span>
              <span>날짜</span>
              <span>상태</span>
              <span className="text-right">금액</span>
              <span></span>
            </div>
            {recentTransactions.map((t) => (
              <div key={t.id} className="table-row">
                <div className="table-cell-name">
                  <div className="tx-icon">{t.icon}</div>
                  <div>
                    <div className="tx-name">{t.name}</div>
                    <div className="tx-date">{t.date}</div>
                  </div>
                </div>
                <div className="table-cell">
                  <span className={`status-tag ${statusMap[t.status].className}`}>
                    {statusMap[t.status].label}
                  </span>
                </div>
                <div></div>
                <div className="table-cell text-right tx-amount">
                  {t.amount}원
                </div>
                <div className="table-cell">
                  <button className="more-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
