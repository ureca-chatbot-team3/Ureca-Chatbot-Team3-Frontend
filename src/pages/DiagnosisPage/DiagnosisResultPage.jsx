import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiagnosis } from '../../store/DiagnosisContext';
import PlanCard from '../../components/PlanCard';
import MobilePlanCard from '../../components/MobilePlanCard';
import confetti from 'canvas-confetti';

// 메달 이미지 import
import medal1 from '../../assets/svg/1-medal.svg';
import medal2 from '../../assets/svg/2-medal.svg';
import medal3 from '../../assets/svg/3-medal.svg';

// 순위별 빛나는 테두리 효과를 위한 인라인 스타일
const createAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes goldGlow {
      0%, 100% {
        box-shadow: 0 0 23px rgba(255, 215, 0, 0.8), 0 0 45px rgba(255, 215, 0, 0.6), 0 0 68px rgba(255, 215, 0, 0.3);
      }
      50% {
        box-shadow: 0 0 32px rgba(255, 215, 0, 1), 0 0 63px rgba(255, 215, 0, 0.8), 0 0 90px rgba(255, 215, 0, 0.5);
      }
    }

    @keyframes silverGlow {
      0%, 100% {
        box-shadow: 0 0 18px rgba(192, 192, 192, 0.7), 0 0 36px rgba(192, 192, 192, 0.5), 0 0 54px rgba(192, 192, 192, 0.3);
      }
      50% {
        box-shadow: 0 0 27px rgba(192, 192, 192, 0.9), 0 0 54px rgba(192, 192, 192, 0.7), 0 0 81px rgba(192, 192, 192, 0.5);
      }
    }

    @keyframes bronzeGlow {
      0%, 100% {
        box-shadow: 0 0 7px rgba(180, 83, 9, 0.3), 0 0 14px rgba(180, 83, 9, 0.2);
      }
      50% {
        box-shadow: 0 0 11px rgba(180, 83, 9, 0.4), 0 0 22px rgba(180, 83, 9, 0.3);
      }
    }

    /* 모바일 후광 효과 - 데스크톱과 동일한 크기 */
    @keyframes mobileGoldGlow {
      0%, 100% {
        box-shadow: 0 0 25px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.6), 0 0 75px rgba(255, 215, 0, 0.3);
      }
      50% {
        box-shadow: 0 0 35px rgba(255, 215, 0, 1), 0 0 70px rgba(255, 215, 0, 0.8), 0 0 100px rgba(255, 215, 0, 0.5);
      }
    }

    @keyframes mobileSilverGlow {
      0%, 100% {
        box-shadow: 0 0 20px rgba(192, 192, 192, 0.7), 0 0 40px rgba(192, 192, 192, 0.5), 0 0 60px rgba(192, 192, 192, 0.3);
      }
      50% {
        box-shadow: 0 0 30px rgba(192, 192, 192, 0.9), 0 0 60px rgba(192, 192, 192, 0.7), 0 0 90px rgba(192, 192, 192, 0.5);
      }
    }

    @keyframes mobileBronzeGlow {
      0%, 100% {
        box-shadow: 0 0 8px rgba(180, 83, 9, 0.3), 0 0 16px rgba(180, 83, 9, 0.2);
      }
      50% {
        box-shadow: 0 0 12px rgba(180, 83, 9, 0.4), 0 0 24px rgba(180, 83, 9, 0.3);
      }
    }

    /* 스크롤바 숨기기 */
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
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
const getRankStyles = (rank, isMobile = false) => {
  const baseStyles = {
    1: {
      container: {
        position: 'relative',
        borderRadius: isMobile ? '16px' : '20px',
        animation: isMobile
          ? 'mobileGoldGlow 1.5s ease-in-out infinite'
          : 'goldGlow 1.5s ease-in-out infinite',
      },
      inner: {
        position: 'relative',
        background: 'white',
        borderRadius: isMobile ? '16px' : '20px',
        zIndex: 1,
        overflow: 'hidden',
      },
    },
    2: {
      container: {
        position: 'relative',
        borderRadius: isMobile ? '16px' : '20px',
        animation: isMobile
          ? 'mobileSilverGlow 2s ease-in-out infinite'
          : 'silverGlow 2s ease-in-out infinite',
      },
      inner: {
        position: 'relative',
        background: 'white',
        borderRadius: isMobile ? '16px' : '20px',
        zIndex: 1,
        overflow: 'hidden',
      },
    },
    3: {
      container: {
        position: 'relative',
        borderRadius: isMobile ? '16px' : '20px',
        animation: isMobile
          ? 'mobileBronzeGlow 3s ease-in-out infinite'
          : 'bronzeGlow 3s ease-in-out infinite',
      },
      inner: {
        position: 'relative',
        background: 'white',
        borderRadius: isMobile ? '16px' : '20px',
        zIndex: 1,
        overflow: 'hidden',
      },
    },
  };

  return (
    baseStyles[rank] || {
      container: {
        position: 'relative',
        borderRadius: isMobile ? '16px' : '20px',
      },
      inner: {
        background: 'white',
        borderRadius: isMobile ? '16px' : '20px',
      },
    }
  );
};

const DiagnosisResultPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { result, isLoading, error, getResult, resetDiagnosis } = useDiagnosis();
  const [showConfetti, setShowConfetti] = useState(false);
  const mobileScrollRef = useRef(null);

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

      // 모바일에서 1등 카드로 스크롤 포커싱
      setTimeout(() => {
        if (mobileScrollRef.current && window.innerWidth < 768) {
          // 1등 카드는 두 번째 위치(2등-1등-3등 순서)
          const cardWidth = 220; // 확대된 카드 너비
          const gap = 16; // 카드 간격
          const padding = 80; // 좌우 패딩
          const firstCardPosition = padding + cardWidth + gap + 18; // 1등 카드 위치
          const containerWidth = window.innerWidth;
          const scrollPosition = firstCardPosition - containerWidth / 2 + cardWidth / 2;

          mobileScrollRef.current.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: 'smooth',
          });
        }
      }, 800);
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
        <div className="max-w-[1440px] mx-auto md:px-[40px]">
          <div className="flex justify-center items-center h-[500px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-pink-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="m-body-large font-500 text-black md:body-large">
                진단 결과를 불러오는 중입니다...
              </p>
            </div>
          </div>

          {/* 모바일 다시 진단하기 버튼 */}
          <div className="flex justify-center mt-[20px]">
            <button
              onClick={handleRetryDiagnosis}
              className="h-[48px] px-[32px] border-[2px] border-gray-500 bg-white rounded-[12px] m-body-medium font-500 text-black hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-all"
            >
              다시 진단하기
            </button>
          </div>
        </div>
      </main>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <main className="bg-gray-200">
        <div className="max-w-[1440px] mx-auto md:px-[40px]">
          <div className="flex justify-center">
            <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[40px] mb-[40px] p-[40px] md:p-[80px]">
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
                <h2 className="m-body-large font-700 mb-4 text-black md:heading-3">
                  결과를 불러올 수 없습니다
                </h2>
                <p className="m-body-medium mb-6 text-gray-700 md:body-large">
                  {error}
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={handleRetryDiagnosis}
                    className="h-[48px] px-[24px] bg-pink-700 text-white rounded-[12px] m-body-medium font-500 hover:opacity-90 transition-opacity md:h-[56px] md:px-[32px] md:body-large"
                  >
                    새로 진단하기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 모바일 다시 진단하기 버튼 */}
          <div className="flex justify-center mt-[30px]">
            <button
              onClick={handleRetryDiagnosis}
              className="h-[48px] border-[2px] border-gray-500 bg-white rounded-[12px] m-body-medium font-500 text-black hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-all"
            >
              다시 진단하기
            </button>
          </div>
        </div>
      </main>
    );
  }

  // 결과가 없는 경우
  if (!result) {
    return (
      <main className="bg-gray-200">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px]">
          <div className="flex justify-center">
            <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[40px] mb-[40px] p-[40px] md:p-[80px]">
              <div className="text-center">
                <h2 className="m-body-large font-700 mb-4 text-black md:heading-3">
                  진단 결과가 없습니다
                </h2>
                <p className="m-body-medium mb-6 text-gray-700 md:body-large">
                  먼저 요금제 진단을 받아보세요.
                </p>
                <button
                  onClick={handleRetryDiagnosis}
                  className="h-[48px] px-[24px] bg-pink-700 text-white rounded-[12px] m-body-medium font-500 hover:opacity-90 transition-opacity md:h-[56px] md:px-[32px] md:body-large"
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
      <div className="max-w-[1440px] mx-auto py-[30px] md:px-[40px] md:py-[40px]">
        {/* 헤더 섹션 */}
        <div className="text-center relative md:mb-[10px]">
          {/* 다시 진단하기 버튼 - 데스크톱에서만 오른쪽 상단 */}
          <button
            onClick={handleRetryDiagnosis}
            className="hidden md:block absolute top-0 right-0 h-[48px] px-[24px] border-[2px] border-gray-500 bg-white rounded-[12px] body-medium font-500 text-black hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-all"
          >
            다시 진단하기
          </button>

          <h1 className="m-heading-2 font-500 mb-5 text-pink-700 md:heading-1 md:mb-6">
            진단 결과
          </h1>
          <p className="m-body-large font-500 text-black md:heading-3">
            다음과 같은 요금제를 추천드립니다!
          </p>
        </div>

        {/* 데스크톱: 기존 방식 (고정 레이아웃) */}
        <div
          className="hidden md:flex md:justify-center md:items-end md:gap-[49px] md:flex-wrap"
          style={{ transform: 'scale(0.9)', transformOrigin: 'center' }}
        >
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
                  <div className="absolute -top-[18px] -left-[9px] z-10">
                    <img
                      src={medal1}
                      alt="1등 메달"
                      className="w-[72px] h-[72px]"
                      style={{
                        imageRendering: 'crisp-edges',
                        shapeRendering: 'crispEdges',
                        WebkitFontSmoothing: 'antialiased',
                      }}
                    />
                  </div>
                )}
                {isSecond && (
                  <div className="absolute -top-[7px] -left-[7px] z-10">
                    <img
                      src={medal2}
                      alt="2등 메달"
                      className="w-[72px] h-[63px]"
                      style={{
                        imageRendering: 'crisp-edges',
                        shapeRendering: 'crispEdges',
                        WebkitFontSmoothing: 'antialiased',
                      }}
                    />
                  </div>
                )}
                {isThird && (
                  <div className="absolute -top-[7px] -left-[7px] z-10">
                    <img
                      src={medal3}
                      alt="3등 메달"
                      className="w-[72px] h-[63px]"
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

        {/* 모바일: 좌우 스크롤 가능한 카드 */}
        <div className="md:hidden">
          <div className="overflow-x-auto scrollbar-hide" ref={mobileScrollRef}>
            <div
              className="flex gap-[16px] px-[80px] py-[60px] pb-[40px]"
              style={{ width: 'max-content' }}
            >
              {/* 모바일에서도 2등-1등-3등 순서로 배치 */}
              {[1, 0, 2]
                .map((originalIndex) => {
                  if (originalIndex >= topThreePlans.length) return null;

                  const recommendation = topThreePlans[originalIndex];
                  const plan = recommendation.planId || recommendation.plan || recommendation;
                  const planId =
                    plan?._id ||
                    plan?.id ||
                    recommendation?._id ||
                    recommendation?.id ||
                    recommendation?.planId?._id ||
                    recommendation?.planId?.id;
                  const rank = originalIndex + 1;
                  const isWinner = originalIndex === 0;
                  const isSecond = originalIndex === 1;
                  const isThird = originalIndex === 2;
                  const rankStyles = getRankStyles(rank, true); // 모바일용

                  return (
                    <div
                      key={plan._id || originalIndex}
                      className={`flex-shrink-0 relative`}
                      style={{
                        ...rankStyles.container,
                      }}
                    >
                      {/* 모바일 메달 */}
                      {isWinner && (
                        <div className="absolute -top-[12px] -left-[6px] z-10">
                          <img
                            src={medal1}
                            alt="1등 메달"
                            className="w-[48px] h-[48px]"
                            style={{
                              imageRendering: 'crisp-edges',
                              shapeRendering: 'crispEdges',
                              WebkitFontSmoothing: 'antialiased',
                            }}
                          />
                        </div>
                      )}
                      {isSecond && (
                        <div className="absolute -top-[4px] -left-[4px] z-10">
                          <img
                            src={medal2}
                            alt="2등 메달"
                            className="w-[48px] h-[42px]"
                            style={{
                              imageRendering: 'crisp-edges',
                              shapeRendering: 'crispEdges',
                              WebkitFontSmoothing: 'antialiased',
                            }}
                          />
                        </div>
                      )}
                      {isThird && (
                        <div className="absolute -top-[4px] -left-[4px] z-10">
                          <img
                            src={medal3}
                            alt="3등 메달"
                            className="w-[48px] h-[42px]"
                            style={{
                              imageRendering: 'crisp-edges',
                              shapeRendering: 'crispEdges',
                              WebkitFontSmoothing: 'antialiased',
                            }}
                          />
                        </div>
                      )}

                      {/* 모바일 카드 래핑 */}
                      <div
                        style={{
                          ...rankStyles.inner,
                          transform: isWinner ? 'scale(1.05)' : 'scale(1)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <MobilePlanCard
                          id={planId}
                          imagePath={plan?.imagePath}
                          name={plan?.name || `추천 요금제 ${originalIndex + 1}`}
                          infos={plan?.infos || ['데이터 정보 없음']}
                          plan_speed={plan?.plan_speed || ''}
                          price={plan?.price || null}
                          sale_price={plan?.sale_price || null}
                          price_value={plan?.price_value || null}
                          sale_price_value={plan?.sale_price_value || null}
                          benefits={plan?.benefits}
                          rank={rank}
                          isLarge={true}
                        />
                      </div>
                    </div>
                  );
                })
                .filter(Boolean)}
            </div>
          </div>

          {/* 모바일 다시 진단하기 버튼 */}
          <div className="flex justify-center px-[20px] mt-[30px]">
            <button
              onClick={handleRetryDiagnosis}
              className="w-full max-w-[300px] h-[48px] border-[2px] border-gray-500 bg-white rounded-[12px] m-body-medium font-500 text-black hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-all"
            >
              다시 진단하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiagnosisResultPage;
