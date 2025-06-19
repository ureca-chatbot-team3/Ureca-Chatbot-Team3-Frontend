import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiagnosis } from '../../store/DiagnosisContext';
import PlanCard from '../../components/PlanCard';

const DiagnosisResultPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { result, isLoading, error, getResult, resetDiagnosis } = useDiagnosis();
  const [showConfetti, setShowConfetti] = useState(false);

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
    }
  }, [result]);

  const handleRetryDiagnosis = () => {
    resetDiagnosis();
    navigate('/diagnosis');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-200">
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
      <main className="min-h-screen bg-gray-200">
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
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleRetryDiagnosis}
                    className="h-[56px] px-[32px] bg-pink-700 text-white rounded-[12px] body-large font-500 hover:opacity-90 transition-opacity"
                  >
                    새로 진단하기
                  </button>
                  <button
                    onClick={handleGoHome}
                    className="h-[56px] px-[32px] border-[2px] border-gray-500 bg-white rounded-[12px] body-large font-500 hover:border-pink-700 hover:bg-pink-200 transition-all"
                    style={{ color: 'var(--color-black)' }}
                  >
                    홈으로
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
      <main className="min-h-screen bg-gray-200">
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

  // 디버깅용 로그 추가
  console.log('진단 결과 데이터:', result);
  console.log('추천 요금제들:', topThreePlans);
  if (topThreePlans.length > 0) {
    console.log(
      '첫 번째 요금제 이미지 경로:',
      topThreePlans[0]?.planId?.imagePath ||
        topThreePlans[0]?.plan?.imagePath ||
        topThreePlans[0]?.imagePath
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 relative overflow-hidden">
      {/* 폭죽 효과 */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(80)].map((_, i) => {
            return (
              <div
                key={i}
                className="confetti"
                style={{
                  '--confetti-color': ['#FF0080', '#FF6EC7', '#FFD93D', '#6EC7FF', '#72FA93'][
                    i % 5
                  ],
                  '--confetti-delay': `${Math.random() * 2}s`,
                  '--confetti-duration': `${2 + Math.random() * 1}s`,
                  '--confetti-x': `${Math.random() * 100}vw`,
                  '--confetti-drift': Math.random() * 50 - 25,
                  '--confetti-rotate': `${Math.random() * 180}deg`,
                }}
              />
            );
          })}
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-[40px] py-[40px]">
        {/* 헤더 섹션 */}
        <div className="text-center mb-[60px]">
          <h1 className="heading-1 font-500 mb-4" style={{ color: 'var(--color-pink-700)' }}>
            진단 결과
          </h1>
          <p className="heading-3 font-500" style={{ color: 'var(--color-black)' }}>
            다음과 같은 요금제를 추천드립니다!
          </p>
        </div>

        {/* 추천 요금제 카드 섹션 */}
        <div className="flex justify-center gap-[30px] mb-[60px] flex-wrap">
          {topThreePlans.map((recommendation, index) => {
            // 데이터 구조 확인 및 처리
            const plan = recommendation.planId || recommendation.plan || recommendation;
            const isWinner = index === 0;

            return (
              <div key={plan._id || index} className="relative">
                {/* 순위 메달 */}
                {isWinner && (
                  <div className="absolute -top-[30px] left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-[60px] h-[60px] bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl font-bold">1</span>
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute -top-[25px] left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-[50px] h-[50px] bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl font-bold">2</span>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute -top-[25px] left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-[50px] h-[50px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl font-bold">3</span>
                    </div>
                  </div>
                )}

                {/* 1등 카드 강조 효과 */}
                <div
                  className={`${isWinner ? 'transform scale-105 ring-4 ring-pink-400 ring-opacity-50 rounded-[20px]' : ''}`}
                >
                  <PlanCard
                    imagePath={plan?.imagePath}
                    name={plan?.name || `추천 요금제 ${index + 1}`}
                    infos={plan?.infos || ['데이터 정보 없음']}
                    plan_speed={plan?.plan_speed || ''}
                    price={plan?.price || null}
                    sale_price={plan?.sale_price || null}
                    price_value={plan?.price_value || null}
                    sale_price_value={plan?.sale_price_value || null}
                    benefits={plan?.benefits}
                    rank={index + 1}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleRetryDiagnosis}
            className="h-[56px] px-[40px] border-[2px] border-gray-500 bg-white rounded-[12px] body-large font-500 hover:border-pink-700 hover:bg-pink-200 transition-all"
            style={{ color: 'var(--color-black)' }}
          >
            다시 진단하기
          </button>
          <button
            onClick={handleGoHome}
            className="h-[56px] px-[40px] bg-pink-700 text-white rounded-[12px] body-large font-500 hover:opacity-90 transition-opacity"
          >
            홈으로 가기
          </button>
        </div>
      </div>

      <style jsx>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .confetti {
          position: absolute;
          top: 130px;
          left: var(--confetti-x);
          width: 8px;
          height: 8px;
          background-color: var(--confetti-color);
          animation: confetti-rain var(--confetti-duration) linear var(--confetti-delay) infinite;
          transform-origin: center;
        }

        @keyframes confetti-rain {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(calc(var(--confetti-drift) * 1px))
              rotate(var(--confetti-rotate));
            opacity: 0;
          }
        }

        .confetti:nth-child(odd) {
          width: 6px;
          height: 12px;
          animation-name: confetti-rain-odd;
        }

        @keyframes confetti-rain-odd {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(calc(var(--confetti-drift) * 1px))
              rotate(calc(var(--confetti-rotate) * 0.5)) scale(0.6);
            opacity: 0;
          }
        }

        .confetti:nth-child(3n) {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          animation-duration: calc(var(--confetti-duration) * 1.1);
        }

        .confetti:nth-child(4n) {
          width: 10px;
          height: 3px;
          animation-timing-function: ease-in;
        }

        .confetti:nth-child(5n) {
          width: 7px;
          height: 7px;
          transform: rotate(45deg);
          animation-name: confetti-rain-rotate;
        }

        @keyframes confetti-rain-rotate {
          0% {
            transform: translateY(-20px) translateX(0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(calc(var(--confetti-drift) * 1px))
              rotate(calc(var(--confetti-rotate) + 225deg));
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
};

export default DiagnosisResultPage;
