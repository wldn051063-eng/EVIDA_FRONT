import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Upload, Save } from 'lucide-react';
import './ReceiptCreate.css';

export default function ReceiptCreate() {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState({
    vendor: '',
    payment: '',
    amount: '',
    date: '',
    memo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert('영수증이 저장되었습니다.');
    navigate('/receipt-inquiry');
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">영수증 작성</h1>
            <p className="page-subtitle">지출 영수증을 쉽고 빠르게 저장할 수 있습니다</p>
          </div>
        </div>

        <div className="receipt-create-grid">
          {/* Upload Area */}
          <div
            className={`upload-area ${dragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
          >
            <div className="upload-icon">
              <Upload size={36} color="#2563eb" />
            </div>
            <p className="upload-title">파일을 드래그하거나 클릭하여 업로드하세요</p>
            <p className="upload-sub">JPG, PNG, PDF 파일 지원 (최대 10MB)</p>
            <label className="upload-btn">
              파일 선택
              <input type="file" accept="image/*,.pdf" style={{ display: 'none' }} />
            </label>
          </div>

          {/* Form Area */}
          <div className="receipt-form-area">
            <h3 className="form-section-title">영수증 정보 입력</h3>
            <p className="form-section-sub">영수증 정보를 직접 입력하거나 AI가 자동으로 채워드립니다</p>

            <div className="form-fields">
              <div className="form-group">
                <label className="form-label">거래처명</label>
                <select
                  name="vendor"
                  value={form.vendor}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">거래처를 선택하세요</option>
                  <option>스타벅스 강남점</option>
                  <option>카카오T 택시</option>
                  <option>점심 식당</option>
                  <option>포항 클로다이스</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">결제 수단</label>
                <input
                  type="text"
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  placeholder="예) 캠퍼니카드 A"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">금액</label>
                <input
                  type="text"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="금액을 입력하세요"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">날짜</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">메모</label>
                <textarea
                  name="memo"
                  value={form.memo}
                  onChange={handleChange}
                  placeholder="메모를 입력하세요"
                  className="form-textarea"
                  rows={3}
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-outline">
                <Save size={14} />
                임시 저장
              </button>
              <button className="btn-primary" onClick={handleSave}>
                영수증 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
