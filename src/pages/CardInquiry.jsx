import { useState } from 'react';
import Layout from '../components/Layout';
import { Search, SlidersHorizontal, Plus, CreditCard } from 'lucide-react';
import './CardInquiry.css';

const cards = [
  { id: 'all', name: '전체 카드', sub: '모든 카드', limit: null, used: null, isAll: true },
  { id: 'A', name: '캠퍼니카드 A', sub: '한도 · 4,200,000원', limit: 4200000, used: 3100000 },
  { id: 'B', name: '캠퍼니카드 B', sub: '한도 · 2,000,000원', limit: 2000000, used: 850000 },
];

const allTransactions = [
  { id: 1, date: '2026.03.15', vendor: '스타벅스 강남점', category: '카드', amount: '34,000', status: 'approved', card: 'A' },
  { id: 2, date: '2026.03.15', vendor: '카카오T 택시', category: '교통', amount: '17,800', status: 'approved', card: 'B' },
  { id: 3, date: '2026.03.14', vendor: '점심의 모임', category: '세비', amount: '175,000', status: 'pending', card: 'A' },
  { id: 4, date: '2026.03.14', vendor: '나탁할인', category: '쇼핑', amount: '8,900', status: 'approved', card: 'B' },
  { id: 5, date: '2026.03.13', vendor: '주류', category: '식비', amount: '46,200', status: 'approved', card: 'A' },
  { id: 6, date: '2026.03.12', vendor: '포항 클로다이스', category: '기타', amount: '200,000', status: 'unprocessed', card: 'B' },
];

const statusMap = {
  approved: { label: '완료', className: 'tag-green' },
  pending: { label: '미처리', className: 'tag-orange' },
  unprocessed: { label: '미처리', className: 'tag-orange' },
};

export default function CardInquiry() {
  const [selectedCard, setSelectedCard] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = allTransactions.filter((t) => {
    const matchCard = selectedCard === 'all' || t.card === selectedCard;
    const matchSearch = t.vendor.toLowerCase().includes(search.toLowerCase());
    return matchCard && matchSearch;
  });

  const total = filtered.reduce((acc, t) => acc + parseInt(t.amount.replace(/,/g, '')), 0);

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">카드 조회</h1>
            <p className="page-subtitle">법인카드 사용 내역을 조회하세요</p>
          </div>
        </div>

        {/* Card Selection */}
        <div className="card-selection">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card-item ${selectedCard === card.id ? 'selected' : ''} ${card.isAll ? 'card-item-all' : ''}`}
              onClick={() => setSelectedCard(card.id)}
            >
              {card.isAll ? (
                <div className="card-all-content">
                  <CreditCard size={22} className="card-all-icon" />
                  <div className="card-all-text">전체 카드 조회</div>
                </div>
              ) : (
                <>
                  <div className="card-chip">
                    <div className="chip-rect" />
                  </div>
                  <div className="card-info">
                    <div className="card-name">{card.name}</div>
                    <div className="card-sub">{card.sub}</div>
                  </div>
                  <div className="card-progress-bar">
                    <div
                      className="card-progress-fill"
                      style={{ width: `${(card.used / card.limit) * 100}%` }}
                    />
                  </div>
                  <div className="card-used">
                    현재 사용 {card.used.toLocaleString()}원
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="card-add">
            <Plus size={20} />
            <span>카드 추가</span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="거래처 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="toolbar-right">
            <select className="filter-select">
              <option>전체 기간</option>
              <option>이번 달</option>
              <option>지난 달</option>
            </select>
            <button className="filter-btn">
              <SlidersHorizontal size={14} />
              필터
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="table-summary">
          <span className="summary-text">총 {filtered.length}건</span>
          <span className="summary-amount">합계 {total.toLocaleString()}원</span>
        </div>

        {/* Transactions Table */}
        <div className="data-table">
          <div className="data-table-header">
            <span>날짜</span>
            <span>가맹점</span>
            <span>분류</span>
            <span className="text-right">금액</span>
            <span>처리</span>
          </div>
          {filtered.map((t) => (
            <div key={t.id} className="data-table-row">
              <span className="col-date">{t.date}</span>
              <span className="col-vendor">{t.vendor}</span>
              <span className="col-category">{t.category}</span>
              <span className="col-amount text-right">{t.amount}원</span>
              <span>
                <span className={`status-tag ${statusMap[t.status].className}`}>
                  {statusMap[t.status].label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
