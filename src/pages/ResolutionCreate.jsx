import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Download, X } from 'lucide-react';
import './ResolutionCreate.css';

const expenseItems = [
  { id: 1, vendor: '스타벅스 강남점', date: '2026.03.15', amount: '24,000', category: '식비' },
  { id: 2, vendor: '카카오T 택시', date: '2026.03.14', amount: '7,800', category: '교통' },
  { id: 3, vendor: '점심의 모임', date: '2026.03.14', amount: '116,000', category: '식비' },
  { id: 4, vendor: '포항클로다이스', date: '2026.03.13', amount: '200,000', category: '기타' },
];

export default function ResolutionCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    manager: '김담당',
    rank: '대리',
    date: '2026-03-27',
    memo: '',
  });
  const [selected, setSelected] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleItem = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const selectedItems = expenseItems.filter((i) => selected.includes(i.id));
  const totalAmount = selectedItems.reduce((acc, i) => acc + parseInt(i.amount.replace(/,/g, '')), 0);

  const handleSubmit = () => {
    alert('결의서가 제출되었습니다.');
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">결의서 작성</h1>
            <p className="page-subtitle">결재 결의서를 이곳에서 쉽게 작성할 수 있습니다</p>
          </div>
        </div>

        <div className="resolution-grid">
          {/* Left: Form + Items */}
          <div className="resolution-left">
            {/* Basic Info */}
            <div className="resolution-section">
              <h3 className="section-title2">기본 정보</h3>
              <div className="res-form-group">
                <label className="form-label">결의서 제목</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="결의서 제목을 입력하세요"
                  className="form-input"
                />
              </div>
              <div className="res-form-row">
                <div className="res-form-group">
                  <label className="form-label">담당자</label>
                  <input type="text" name="manager" value={form.manager} onChange={handleChange} className="form-input" />
                </div>
                <div className="res-form-group">
                  <label className="form-label">직급</label>
                  <input type="text" name="rank" value={form.rank} onChange={handleChange} className="form-input" />
                </div>
              </div>
              <div className="res-form-group">
                <label className="form-label">날짜</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className="form-input" />
              </div>
              <div className="res-form-group">
                <label className="form-label">메모</label>
                <textarea
                  name="memo"
                  value={form.memo}
                  onChange={handleChange}
                  placeholder="총 선택된 경비를 결의서 항목에 자동으로 채웁니다"
                  className="form-textarea"
                  rows={2}
                />
              </div>
            </div>

            {/* Expense Item Selection */}
            <div className="resolution-section">
              <div className="items-header">
                <h3 className="section-title2">경비내역 선택</h3>
                <span className="items-count">{selected.length}개 선택</span>
              </div>
              <div className="expense-items">
                {expenseItems.map((item) => (
                  <div
                    key={item.id}
                    className={`expense-item ${selected.includes(item.id) ? 'selected' : ''}`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => {}}
                      className="item-checkbox"
                    />
                    <div className="item-icon">🧾</div>
                    <div className="item-info">
                      <div className="item-vendor">{item.vendor}</div>
                      <div className="item-meta">{item.date} · {item.category}</div>
                    </div>
                    <div className="item-amount">{item.amount}원</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="resolution-right">
            <div className="resolution-summary">
              <h3 className="section-title2">결의서 요약</h3>
              <div className="summary-items">
                {selectedItems.length === 0 ? (
                  <p className="summary-empty">경비 항목을 선택해주세요</p>
                ) : (
                  selectedItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <span className="summary-item-name">{item.vendor}</span>
                      <div className="summary-item-right">
                        <span className="summary-item-amount">{item.amount}원</span>
                        <button className="remove-btn" onClick={() => toggleItem(item.id)}>
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {selectedItems.length > 0 && (
                <div className="summary-total">
                  <span>총 합계</span>
                  <span className="summary-total-amount">{totalAmount.toLocaleString()}원</span>
                </div>
              )}

              <div className="summary-input-group">
                <label className="form-label">금액 합계</label>
                <input
                  type="text"
                  value={totalAmount > 0 ? totalAmount.toLocaleString() + '원' : ''}
                  readOnly
                  placeholder="선택한 항목 합계"
                  className="form-input"
                />
              </div>

              <div className="summary-actions">
                <button className="btn-primary-full" onClick={handleSubmit}>
                  <Download size={14} />
                  결의서 양식 받기
                </button>
                <button className="btn-outline-full">
                  담당 박아
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
