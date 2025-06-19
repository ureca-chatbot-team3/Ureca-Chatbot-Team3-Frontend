import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiagnosis } from '../../store/DiagnosisContext';
import PlanCard from '../../components/PlanCard';
import confetti from 'canvas-confetti';

// 순위별 빛나는 테두리 효과를 위한 인라인 스타일
const createAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes goldGlow {
      0%, 100% {
        box-shadow: 0 0 25px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.6), 0 0 75px rgba(255, 215, 0, 0.3);
      }
      50% {
        box-shadow: 0 0 35px rgba(255, 215, 0, 1), 0 0 70px rgba(255, 215, 0, 0.8), 0 0 100px rgba(255, 215, 0, 0.5);
      }
    }

    @keyframes silverGlow {
      0%, 100% {
        box-shadow: 0 0 20px rgba(192, 192, 192, 0.7), 0 0 40px rgba(192, 192, 192, 0.5), 0 0 60px rgba(192, 192, 192, 0.3);
      }
      50% {
        box-shadow: 0 0 30px rgba(192, 192, 192, 0.9), 0 0 60px rgba(192, 192, 192, 0.7), 0 0 90px rgba(192, 192, 192, 0.5);
      }
    }

    @keyframes bronzeGlow {
      0%, 100% {
        box-shadow: 0 0 8px rgba(180, 83, 9, 0.3), 0 0 16px rgba(180, 83, 9, 0.2);
      }
      50% {
        box-shadow: 0 0 12px rgba(180, 83, 9, 0.4), 0 0 24px rgba(180, 83, 9, 0.3);
      }
    }
  `;

  // 기존 스타일이 있다면 제거하고 새로 추가
  const existingStyle = document.getElementById('rank-animations');
  if (existingStyle) {
    existingStyle.remove();
  }

  style.id = 'rank-animations';
  document.head.appendChild(style);
};

// 순위별 스타일 객체
const getRankStyles = (rank) => {
  const baseStyles = {
    1: {
      container: {
        position: 'relative',
        borderRadius: '20px',
        animation: 'goldGlow 1.5s ease-in-out infinite', // 황금 후광만
      },
      inner: {
        position: 'relative',
        background: 'white',
        borderRadius: '20px',
        zIndex: 1,
        overflow: 'hidden',
      },
    },
    2: {
      container: {
        position: 'relative',
        borderRadius: '20px',
        animation: 'silverGlow 2s ease-in-out infinite', // 더 빠른 은색 후광
      },
      inner: {
        position: 'relative',
        background: 'white',
        borderRadius: '20px',
        zIndex: 1,
        overflow: 'hidden',
      },
    },
    3: {
      container: {
        position: 'relative',
        borderRadius: '20px',
        animation: 'bronzeGlow 3s ease-in-out infinite', // 동색 후광만
      },
      inner: {
        position: 'relative',
        background: 'white',
        borderRadius: '20px',
        zIndex: 1,
        overflow: 'hidden',
      },
    },
  };

  return (
    baseStyles[rank] || {
      container: {
        position: 'relative',
        borderRadius: '20px',
      },
      inner: {
        background: 'white',
        borderRadius: '20px',
      },
    }
  );
};

const DiagnosisResultPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { result, isLoading, error, getResult, resetDiagnosis } = useDiagnosis();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // 애니메이션 스타일 생성
    createAnimationStyles();

    // 컴포넌트 언마운트 시 스타일 정리
    return () => {
      const existingStyle = document.getElementById('rank-animations');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (sessionId) {
      getResult(sessionId);
    } else if (!result) {
      navigate('/diagnosis');
    }
  }, [sessionId, result, getResult, navigate]);

  useEffect(() => {
    if (result && result.recommendedPlans && result.recommendedPlans.length > 0) {
      setShowConfetti(true);

      // 색종이 효과 1번만 실행
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.4, x: 0.5 },
          colors: ['#FF0080', '#FF6EC7', '#FFD93D', '#6EC7FF', '#72FA93', '#FFA500', '#FF69B4'],
        });
      }, 500);
    }
  }, [result]);

  const handleRetryDiagnosis = () => {
    resetDiagnosis();
    navigate('/diagnosis');
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <main className="bg-gray-200">
        <div className="max-w-[1440px] mx-auto px-[40px]">
          <div className="flex justify-center items-center h-[500px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-pink-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="body-large font-500" style={{ color: 'var(--color-black)' }}>
                진단 결과를 불러오는 중입니다...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <main className="bg-gray-200">
        <div className="max-w-[1440px] mx-auto px-[40px]">
          <div className="flex justify-center">
            <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[40px] mb-[40px] p-[80px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="heading-3 font-700 mb-4" style={{ color: 'var(--color-black)' }}>
                  결과를 불러올 수 없습니다
                </h2>
                <p className="body-large mb-6" style={{ color: 'var(--color-gray-700)' }}>
                  {error}
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={handleRetryDiagnosis}
                    className="h-[56px] px-[32px] bg-pink-700 text-white rounded-[12px] body-large font-500 hover:opacity-90 transition-opacity"
                  >
                    새로 진단하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 결과가 없는 경우
  if (!result) {
    return (
      <main className="bg-gray-200">
        <div className="max-w-[1440px] mx-auto px-[40px]">
          <div className="flex justify-center">
            <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[40px] mb-[40px] p-[80px]">
              <div className="text-center">
                <h2 className="heading-3 font-700 mb-4" style={{ color: 'var(--color-black)' }}>
                  진단 결과가 없습니다
                </h2>
                <p className="body-large mb-6" style={{ color: 'var(--color-gray-700)' }}>
                  먼저 요금제 진단을 받아보세요.
                </p>
                <button
                  onClick={handleRetryDiagnosis}
                  className="h-[56px] px-[32px] bg-pink-700 text-white rounded-[12px] body-large font-500 hover:opacity-90 transition-opacity"
                >
                  진단 시작하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 상위 3개 요금제만 추출
  const topThreePlans = result.recommendedPlans?.slice(0, 3) || [];

  return (
    <main className="bg-gray-200 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[40px] py-[40px]">
        {/* 헤더 섹션 */}
        <div className="text-center mb-[60px] relative">
          {/* 다시 진단하기 버튼 - 오른쪽 상단 고정 */}
          <button
            onClick={handleRetryDiagnosis}
            className="absolute top-0 right-0 h-[48px] px-[24px] border-[2px] border-gray-500 bg-white rounded-[12px] body-medium font-500 text-black hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-all"
          >
            다시 진단하기
          </button>

          <h1 className="heading-1 font-500 mb-4" style={{ color: 'var(--color-pink-700)' }}>
            진단 결과
          </h1>
          <p className="heading-3 font-500" style={{ color: 'var(--color-black)' }}>
            다음과 같은 요금제를 추천드립니다!
          </p>
        </div>

        {/* 추천 요금제 카드 섹션 */}
        <div className="flex justify-center items-end gap-[60px] flex-wrap">
          {topThreePlans.map((recommendation, index) => {
            const plan = recommendation.planId || recommendation.plan || recommendation;
            const planId =
              plan?._id ||
              plan?.id ||
              recommendation?._id ||
              recommendation?.id ||
              recommendation?.planId?._id ||
              recommendation?.planId?.id;
            const rank = index + 1;
            const isWinner = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;
            const rankStyles = getRankStyles(rank);

            return (
              <div
                key={plan._id || index}
                className={`${
                  isWinner
                    ? 'order-1 md:order-2'
                    : isSecond
                      ? 'order-2 md:order-1'
                      : 'order-3 md:order-3'
                }`}
                style={rankStyles.container}
              >
                {/* 순위 메달 */}
                {isWinner && (
                  <div className="absolute -top-[20px] -left-[10px] z-10">
                    <img
                      src="/src/assets/svg/1-medal.svg"
                      alt="1등 메달"
                      className="w-[80px] h-[80px]"
                      style={{
                        imageRendering: 'crisp-edges',
                        shapeRendering: 'crispEdges',
                        WebkitFontSmoothing: 'antialiased',
                      }}
                    />
                  </div>
                )}
                {isSecond && (
                  <div className="absolute -top-[8px] -left-[8px] z-10">
                    <img
                      src="/src/assets/svg/2-medal.svg"
                      alt="2등 메달"
                      className="w-[80px] h-[70px]"
                      style={{
                        imageRendering: 'crisp-edges',
                        shapeRendering: 'crispEdges',
                        WebkitFontSmoothing: 'antialiased',
                      }}
                    />
                  </div>
                )}
                {isThird && (
                  <div className="absolute -top-[8px] -left-[8px] z-10">
                    <img
                      src="/src/assets/svg/3-medal.svg"
                      alt="3등 메달"
                      className="w-[80px] h-[70px]"
                      style={{
                        imageRendering: 'crisp-edges',
                        shapeRendering: 'crispEdges',
                        WebkitFontSmoothing: 'antialiased',
                      }}
                    />
                  </div>
                )}

                {/* 순위별 카드 래핑 */}
                <div
                  style={{
                    ...rankStyles.inner,
                    transform: isWinner ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <PlanCard
                    id={planId}
                    imagePath={plan?.imagePath}
                    name={plan?.name || `추천 요금제 ${index + 1}`}
                    infos={plan?.infos || ['데이터 정보 없음']}
                    plan_speed={plan?.plan_speed || ''}
                    price={plan?.price || null}
                    sale_price={plan?.sale_price || null}
                    price_value={plan?.price_value || null}
                    sale_price_value={plan?.sale_price_value || null}
                    benefits={plan?.benefits}
                    rank={rank}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default DiagnosisResultPage;
