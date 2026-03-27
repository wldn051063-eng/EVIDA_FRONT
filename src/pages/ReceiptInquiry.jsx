import { useState } from 'react';
import Layout from '../components/Layout';
import { Search, SlidersHorizontal, Download, FileText } from 'lucide-react';
import './ReceiptInquiry.css';

const receipts = [
  { id: '001', date: '2026.03.15', vendor: '스타벅스 강남점', category: '식비', amount: '34,000', status: 'approved' },
  { id: '002', date: '2026.03.14', vendor: '카카오T 택시', category: '교통', amount: '7,800', status: 'approved' },
  { id: '003', date: '2026.03.14', vendor: '점심의 모임', category: '식비', amount: '176,000', status: 'pending' },
  { id: '004', date: '2026.03.13', vendor: '파킹 회사', category: '주차', amount: '44,000', status: 'approved' },
  { id: '005', date: '2026.03.13', vendor: '포항 클로다이스', category: '기타', amount: '200,000', status: 'unprocessed' },
  { id: '006', date: '2026.03.12', vendor: '200C 하신경', category: '교육', amount: '8,000', status: 'rejected' },
];

const statusMap = {
  approved: { label: '완료', className: 'tag-green' },
  pending: { label: '대기', className: 'tag-orange' },
  unprocessed: { label: '미처리', className: 'tag-orange' },
  rejected: { label: '반려', className: 'tag-red' },
};

export default function ReceiptInquiry() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);

  const filtered = receipts.filter((r) =>
    r.vendor.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = filtered.reduce((acc, r) => acc + parseInt(r.amount.replace(/,/g, '')), 0);
  const totalCount = filtered.length;
  const pendingCount = filtered.filter((r) => r.status === 'unprocessed' || r.status === 'pending').length;

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map((r) => r.id));
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">영수증 통합 조회</h1>
            <p className="page-subtitle">모든 영수증을 한 곳에서 확인할 수 있습니다</p>
          </div>
          <button className="btn-outline-blue">
            <Download size={14} />
            엑셀 다운로드
          </button>
        </div>

        {/* Summary Cards */}
        <div className="ri-summary">
          <div className="ri-summary-card blue">
            <FileText size={20} />
            <div>
              <div className="ri-summary-value">{totalCount}건</div>
              <div className="ri-summary-label">스크랩 건수</div>
            </div>
          </div>
          <div className="ri-summary-card green">
            <div className="ri-summary-value">{totalAmount.toLocaleString()}원</div>
            <div className="ri-summary-label">총 금액</div>
          </div>
          <div className="ri-summary-card orange">
            <div className="ri-summary-value">{pendingCount}건</div>
            <div className="ri-summary-label">미처리</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="거래처, 분류 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="toolbar-right">
            <select className="filter-select">
              <option>전체 금액</option>
              <option>5만원 이하</option>
              <option>5만원 ~ 50만원</option>
            </select>
            <select className="filter-select">
              <option>전체 날짜</option>
              <option>이번 달</option>
              <option>지난 달</option>
            </select>
            <button className="filter-btn">
              <SlidersHorizontal size={14} />
              날짜 기준
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="data-table">
          <div className="ri-table-header">
            <span>
              <input type="checkbox" checked={selected.length === filtered.length} onChange={toggleAll} />
            </span>
            <span>영수증 번호</span>
            <span>날짜</span>
            <span>거래처</span>
            <span>분류</span>
            <span className="text-right">금액</span>
            <span>상태</span>
            <span>선택</span>
          </div>
          {filtered.map((r) => (
            <div key={r.id} className="ri-table-row">
              <span>
                <input
                  type="checkbox"
                  checked={selected.includes(r.id)}
                  onChange={() => toggleSelect(r.id)}
                />
              </span>
              <span className="col-id">{r.id}</span>
              <span className="col-date">{r.date}</span>
              <span className="col-vendor">{r.vendor}</span>
              <span className="col-category">{r.category}</span>
              <span className="col-amount text-right">{r.amount}원</span>
              <span>
                <span className={`status-tag ${statusMap[r.status].className}`}>
                  {statusMap[r.status].label}
                </span>
              </span>
              <span>
                <button className="row-action-btn">→</button>
              </span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <span className="page-info">1 / 1 페이지</span>
          <div className="page-btns">
            <button className="page-btn">이전</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">다음</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
