import { useState } from 'react';
import Layout from '../components/Layout';
import { Search, Plus, Building2, ArrowRight } from 'lucide-react';
import './VendorInquiry.css';

const vendorStats = [
  { label: '전체 거래처', value: '162건', color: '#2563eb' },
  { label: '이번 달 거래', value: '34건', color: '#10b981' },
  { label: '승인 완료', value: '34건', color: '#8b5cf6' },
  { label: '최근 거래', value: '34건', color: '#f59e0b' },
];

const vendors = [
  { id: 1, name: '스타벅스', category: '식비', total: '1,025,000', count: 12, lastDate: '2026.03.15', icon: '☕' },
  { id: 2, name: '카카오T', category: '교통', total: '660,000', count: 8, lastDate: '2026.03.14', icon: '🚕' },
  { id: 3, name: '직원 식당', category: '식비', total: '014,000', count: 3, lastDate: '2026.03.12', icon: '🍽️' },
  { id: 4, name: '김담당', category: '기타', total: '254,000', count: 5, lastDate: '2026.03.11', icon: '👤' },
  { id: 5, name: '포항 클로다이스', category: '기타', total: '1,250,000', count: 7, lastDate: '2026.03.10', icon: '🏢' },
  { id: 6, name: '주유소 강남', category: '교통', total: '380,000', count: 4, lastDate: '2026.03.09', icon: '⛽' },
];

export default function VendorInquiry() {
  const [search, setSearch] = useState('');

  const filtered = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">거래처 조회</h1>
            <p className="page-subtitle">등록된 거래처 내역을 확인하세요</p>
          </div>
          <button className="btn-primary">
            <Plus size={14} />
            거래처 등록
          </button>
        </div>

        {/* Stats */}
        <div className="vendor-stats">
          {vendorStats.map((s, i) => (
            <div key={i} className="vendor-stat-card">
              <div className="vs-value" style={{ color: s.color }}>{s.value}</div>
              <div className="vs-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="table-toolbar" style={{ marginBottom: '20px' }}>
          <div className="search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="거래처명 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Vendor Grid */}
        <div className="vendor-grid">
          {filtered.map((v) => (
            <div key={v.id} className="vendor-card">
              <div className="vendor-card-header">
                <div className="vendor-icon">{v.icon}</div>
                <div className="vendor-info">
                  <div className="vendor-name">{v.name}</div>
                  <div className="vendor-category">{v.category}</div>
                </div>
              </div>
              <div className="vendor-stats-row">
                <div className="vendor-stat-item">
                  <span className="vsi-label">총 거래금액</span>
                  <span className="vsi-value">{v.total}원</span>
                </div>
                <div className="vendor-stat-item">
                  <span className="vsi-label">거래 건수</span>
                  <span className="vsi-value">{v.count}건</span>
                </div>
                <div className="vendor-stat-item">
                  <span className="vsi-label">최근 거래일</span>
                  <span className="vsi-value">{v.lastDate}</span>
                </div>
              </div>
              <div className="vendor-card-footer">
                <button className="vendor-detail-btn">
                  상세보기 <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
