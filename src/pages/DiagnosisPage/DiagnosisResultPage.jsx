import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiagnosis } from '../../store/DiagnosisContext';

const DiagnosisResultPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { result, isLoading, error, getResult, resetDiagnosis } = useDiagnosis();

  useEffect(() => {
    if (sessionId) {
      getResult(sessionId);
    } else if (!result) {
      // 결과가 없고 sessionId도 없으면 진단 페이지로 리다이렉트
      navigate('/diagnosis');
    }
  }, [sessionId, result, getResult, navigate]);

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
            <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[80px] mb-[80px] p-[80px]">
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
            <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[80px] mb-[80px] p-[80px]">
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

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="max-w-[1440px] mx-auto px-[40px]">
        <div className="flex justify-center">
          <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[80px] mb-[80px]">
            {/* 헤더 */}
            <div className="px-[80px] pt-[80px] pb-[40px] text-center">
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  style={{ color: 'var(--color-pink-700)' }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="heading-2 font-700 mb-2" style={{ color: 'var(--color-black)' }}>
                진단이 완료되었습니다!
              </h1>
              <p className="body-large" style={{ color: 'var(--color-gray-700)' }}>
                고객님께 맞는 요금제를 추천해드립니다.
              </p>
            </div>

            {/* 분석 결과 */}
            {result.analysisResult && (
              <div className="px-[80px] pb-[40px]">
                <h2 className="heading-3 font-700 mb-4" style={{ color: 'var(--color-black)' }}>
                  분석 결과
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {result.analysisResult.budget && (
                    <div className="bg-gray-200 rounded-[12px] p-4">
                      <p
                        className="body-medium font-500 mb-1"
                        style={{ color: 'var(--color-gray-700)' }}
                      >
                        예산
                      </p>
                      <p className="body-large font-700" style={{ color: 'var(--color-black)' }}>
                        {result.analysisResult.budget.toLocaleString()}원
                      </p>
                    </div>
                  )}
                  {result.analysisResult.dataUsage && (
                    <div className="bg-gray-200 rounded-[12px] p-4">
                      <p
                        className="body-medium font-500 mb-1"
                        style={{ color: 'var(--color-gray-700)' }}
                      >
                        예상 데이터 사용량
                      </p>
                      <p className="body-large font-700" style={{ color: 'var(--color-black)' }}>
                        {result.analysisResult.dataUsage}GB
                      </p>
                    </div>
                  )}
                  {result.analysisResult.age && (
                    <div className="bg-gray-200 rounded-[12px] p-4">
                      <p
                        className="body-medium font-500 mb-1"
                        style={{ color: 'var(--color-gray-700)' }}
                      >
                        연령대
                      </p>
                      <p className="body-large font-700" style={{ color: 'var(--color-black)' }}>
                        {result.analysisResult.age}세
                      </p>
                    </div>
                  )}
                  {result.totalScore && (
                    <div className="bg-gray-200 rounded-[12px] p-4">
                      <p
                        className="body-medium font-500 mb-1"
                        style={{ color: 'var(--color-gray-700)' }}
                      >
                        매칭 점수
                      </p>
                      <p className="body-large font-700" style={{ color: 'var(--color-pink-700)' }}>
                        {result.totalScore}점
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 추천 요금제 */}
            <div className="px-[80px] pb-[80px]">
              <h2 className="heading-3 font-700 mb-4" style={{ color: 'var(--color-black)' }}>
                추천 요금제
              </h2>

              {result.recommendedPlans && result.recommendedPlans.length > 0 ? (
                <div className="space-y-4">
                  {result.recommendedPlans.map((recommendation, index) => (
                    <div
                      key={index}
                      className="border-[2px] border-gray-500 rounded-[12px] p-6 hover:border-pink-700 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3
                            className="heading-3 font-700 mb-1"
                            style={{ color: 'var(--color-black)' }}
                          >
                            {recommendation.plan?.name || `추천 요금제 ${index + 1}`}
                          </h3>
                          {recommendation.plan?.price && (
                            <p
                              className="body-large font-700"
                              style={{ color: 'var(--color-pink-700)' }}
                            >
                              월 {recommendation.plan.price.toLocaleString()}원
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="bg-pink-200 rounded-[8px] px-3 py-1">
                            <span
                              className="body-small font-700"
                              style={{ color: 'var(--color-pink-700)' }}
                            >
                              매칭률 {recommendation.matchScore}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {recommendation.reasons && recommendation.reasons.length > 0 && (
                        <div>
                          <p
                            className="body-medium font-500 mb-2"
                            style={{ color: 'var(--color-gray-700)' }}
                          >
                            추천 이유:
                          </p>
                          <ul className="space-y-1">
                            {recommendation.reasons.map((reason, reasonIndex) => (
                              <li key={reasonIndex} className="body-medium flex items-start">
                                <span className="w-1 h-1 bg-gray-700 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                <span style={{ color: 'var(--color-black)' }}>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="body-large" style={{ color: 'var(--color-gray-700)' }}>
                    조건에 맞는 요금제를 찾을 수 없습니다.
                  </p>
                </div>
              )}
            </div>

            {/* 하단 버튼들 */}
            <div className="px-[80px] pb-[80px]">
              <div className="flex gap-[16px]">
                <button
                  onClick={handleRetryDiagnosis}
                  className="flex-1 h-[56px] border-[2px] border-gray-500 bg-white rounded-[12px] body-large font-500 transition-all duration-200 hover:border-pink-700 hover:bg-pink-200"
                  style={{ color: 'var(--color-black)' }}
                >
                  다시 진단하기
                </button>
                <button
                  onClick={handleGoHome}
                  className="flex-1 h-[56px] bg-pink-700 text-white rounded-[12px] body-large font-500 hover:opacity-90 transition-opacity"
                >
                  홈으로 가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiagnosisResultPage;
