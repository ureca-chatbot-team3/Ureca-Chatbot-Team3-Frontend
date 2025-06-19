import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiagnosis } from '../../store/DiagnosisContext';
import PlanCard from '../../components/PlanCard';
import confetti from 'canvas-confetti';

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

  const handleGoHome = () => {
    navigate('/');
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
    <main className="bg-gray-200 relative overflow-hidden">
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
        <div className="flex justify-center items-end gap-[30px] mb-[60px] flex-wrap">
          {/* 순서 재배치: 데스크탑(2등-1등-3등), 모바일(1등-2등-3등) */}
          {topThreePlans.map((recommendation, index) => {
            const plan = recommendation.planId || recommendation.plan || recommendation;
            const isWinner = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;

            // 배치 순서 결정
            let order = 0;
            if (isSecond) order = -1; // 2등을 왼쪽으로
            if (isWinner) order = 0; // 1등을 중앙으로
            if (isThird) order = 1; // 3등을 오른쪽으로

            return (
              <div
                key={plan._id || index}
                className={`relative ${
                  isWinner
                    ? 'order-1 md:order-2'
                    : isSecond
                      ? 'order-2 md:order-1'
                      : 'order-3 md:order-3'
                }`}
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
    </main>
  );
};

export default DiagnosisResultPage;
