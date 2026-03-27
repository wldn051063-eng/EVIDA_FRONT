import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import './Home.css';

// 홈1 - 서비스 소개 히어로
function Home1() {
  return (
    <div className="home1-content">
      <div className="home1-hero">
        <span className="home1-badge">AI 추천</span>
        <h1 className="home1-headline">
          반복적인 경비 처리,<br />
          <span className="home1-highlight">AI가 자동으로</span> 처리합니다
        </h1>
        <p className="home1-desc">
          영수증을 촬영하면 AI가 자동으로 정보를 추출하고<br />
          분류까지 한 번에 처리해드립니다
        </p>
        <div className="home1-stats">
          <div className="home1-stat">
            <span className="home1-stat-value">99.2%</span>
            <span className="home1-stat-label">인식 성공률</span>
          </div>
          <div className="home1-stat">
            <span className="home1-stat-value">3초</span>
            <span className="home1-stat-label">평균 처리 시간</span>
          </div>
          <div className="home1-stat">
            <span className="home1-stat-value">85%</span>
            <span className="home1-stat-label">업무 시간 절약</span>
          </div>
        </div>
      </div>
      <div className="home1-mockup">
        <div className="receipt-mockup">
          <div className="receipt-header">
            <span className="receipt-label">영수증</span>
            <span className="receipt-status green">완료</span>
          </div>
          <div className="receipt-item">
            <span className="receipt-name">스타벅스 강남점</span>
            <span className="receipt-price">34,000원</span>
          </div>
          <div className="receipt-item">
            <span className="receipt-name">카카오T 택시</span>
            <span className="receipt-price">17,800원</span>
          </div>
          <div className="receipt-item">
            <span className="receipt-name">점심 식당</span>
            <span className="receipt-price">175,000원</span>
          </div>
          <div className="receipt-total">
            <span>합계</span>
            <span className="receipt-total-price">226,800원</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 홈2 - CTA 슬라이드
function Home2() {
  return (
    <div className="home2-content">
      <div className="home2-logo">EVIDA</div>
      <h2 className="home2-title">지금 바로 시작하세요!</h2>
      <p className="home2-desc">
        더 이상 수작업 경비 처리에 시간을 낭비하지 마세요.<br />
        EVIDA에 맡기고 시작부터 경영까지 관리를 경험해보세요.
      </p>
      <Link to="/login" className="home2-cta">
        로그인하고 시작하기 <ChevronRight size={16} />
      </Link>
      <div className="home2-features">
        <div className="home2-feature">
          <CheckCircle size={16} className="check-icon" />
          <span>무료 체험 가능</span>
        </div>
        <div className="home2-feature">
          <CheckCircle size={16} className="check-icon" />
          <span>설치 필요없음</span>
        </div>
        <div className="home2-feature">
          <CheckCircle size={16} className="check-icon" />
          <span>24시간 지원</span>
        </div>
      </div>
    </div>
  );
}

// 홈3 - 주요 기능 소개
function Home3() {
  const features = [
    {
      title: '영수증 자동 인식',
      desc: 'EVIDA AI가 영수증을 찍으면 자동으로 내역을 인식하고 분류해줍니다.'
    },
    {
      title: '카드 내역 피드',
      desc: '등록한 법인카드의 사용 내역을 실시간으로 확인하고 관리합니다.'
    },
    {
      title: '반복적인 데이터 관리',
      desc: '자동으로 반복 처리로 손쉽게 자주 사용하는 경비항목을 관리합니다.'
    },
    {
      title: '결재단 관리',
      desc: '쉽게 기성을 올리고 손쉽게 결재단을 구성하여 효율적으로 관리합니다.'
    },
  ];

  return (
    <div className="home3-content">
      <h2 className="home3-title">EVIDA <span className="blue">주요 기능</span></h2>
      <p className="home3-desc">가장 자주묻는 기능 단계에 대해서 빠르게 알려드립니다.</p>
      <div className="home3-grid">
        {features.map((f, i) => (
          <div key={i} className="home3-card">
            <div className="home3-card-num">{String(i + 1).padStart(2, '0')}</div>
            <h3 className="home3-card-title">{f.title}</h3>
            <p className="home3-card-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const slides = [
  { id: 1, component: <Home1 /> },
  { id: 2, component: <Home2 /> },
  { id: 3, component: <Home3 /> },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <div className="home-page">
      <aside className="home-sidebar">
        <span className="home-sidebar-logo">EVIDA</span>
        <div className="home-sidebar-bottom">
          <Link to="/login" className="home-sidebar-link">로그인</Link>
        </div>
      </aside>

      <div className="home-slider-wrapper">
        <button className="slider-arrow left" onClick={prev}>
          <ChevronLeft size={22} />
        </button>

        <div className="home-slide">
          {slides[current].component}
        </div>

        <button className="slider-arrow right" onClick={next}>
          <ChevronRight size={22} />
        </button>

        <div className="slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slider-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
