import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnosis } from '../../store/DiagnosisContext';

const DiagnosisPage = () => {
  const navigate = useNavigate();
  const {
    // 상태
    currentQuestion,
    currentAnswer,
    currentQuestionNumber,
    totalQuestions,
    progress,
    isLoading,
    error,
    canGoPrevious,
    canGoNext,
    canSubmit,
    isComplete,

    // 액션
    loadQuestions,
    setAnswer,
    previousQuestion,
    nextQuestion,
    submitDiagnosis,
  } = useDiagnosis();

  // 컴포넌트 마운트 시 질문 로드
  useEffect(() => {
    loadQuestions();
  }, []);

  // 진단 완료 시 결과 페이지로 이동
  useEffect(() => {
    if (isComplete) {
      navigate('/diagnosis/result');
    }
  }, [isComplete, navigate]);

  // 현재 질문의 답변 처리
  const handleAnswerSelect = (answer) => {
    if (currentQuestion) {
      setAnswer(currentQuestion._id, answer);
    }
  };

  // 이전 질문
  const handlePreviousClick = () => {
    previousQuestion();
  };

  // 다음 질문 또는 진단 완료
  const handleNextClick = async () => {
    if (!currentAnswer) {
      alert('답변을 선택해주세요.');
      return;
    }

    if (canGoNext) {
      nextQuestion();
    } else if (canSubmit) {
      try {
        await submitDiagnosis();
      } catch (error) {
        console.error('진단 제출 실패:', error);
        alert('진단 제출에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-200 pt-[112px]">
        <div className="max-w-[1440px] mx-auto px-[40px]">
          <div className="flex justify-center items-center h-[500px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-pink-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="body-large font-500" style={{ color: 'var(--color-black)' }}>
                질문을 불러오는 중입니다...
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
      <main className="min-h-screen bg-gray-200 pt-[112px]">
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
                  오류가 발생했습니다
                </h2>
                <p className="body-large mb-6" style={{ color: 'var(--color-gray-700)' }}>
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="h-[56px] px-[32px] bg-pink-700 text-white rounded-[12px] body-large font-500 hover:opacity-90 transition-opacity"
                >
                  다시 시도
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 질문이 없는 경우
  if (!currentQuestion) {
    return (
      <main className="min-h-screen bg-gray-200 pt-[112px]">
        <div className="max-w-[1440px] mx-auto px-[40px]">
          <div className="flex justify-center">
            <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[80px] mb-[80px] p-[80px]">
              <div className="text-center">
                <p className="body-large" style={{ color: 'var(--color-gray-700)' }}>
                  질문을 준비 중입니다...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 pt-[112px]">
      <div className="max-w-[1440px] mx-auto px-[40px]">
        <div className="flex justify-center">
          <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[80px] mb-[80px]">
            {/* 진행 표시바 */}
            <div className="px-[80px] pt-[80px] pb-[60px]">
              <div className="flex items-center justify-between mb-[8px]">
                <span className="body-medium font-500" style={{ color: 'var(--color-pink-700)' }}>
                  요금제 추천 질문
                </span>
                <span className="body-medium font-500" style={{ color: 'var(--color-black)' }}>
                  {currentQuestionNumber}/{totalQuestions}
                </span>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-[6px]">
                <div
                  className="h-[6px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-pink-700)',
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* 질문 제목 */}
            <div className="px-[80px] pb-[60px]">
              <h1
                className="heading-2 font-700 text-center"
                style={{ color: 'var(--color-black)' }}
              >
                {currentQuestion.question}
              </h1>
            </div>

            {/* 선택 옵션들 */}
            <div className="px-[80px] pb-[80px]">
              {currentQuestion.type === 'single' && (
                <div className="space-y-[16px]">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full h-[64px] border-[2px] rounded-[12px] flex items-center px-[24px] transition-all duration-200 ${
                        currentAnswer === option
                          ? 'border-pink-700 bg-pink-200'
                          : 'border-gray-500 bg-white hover:border-pink-700 hover:bg-pink-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className="body-large font-500"
                          style={{
                            color:
                              currentAnswer === option
                                ? 'var(--color-pink-700)'
                                : 'var(--color-black)',
                          }}
                        >
                          {option}
                        </span>
                        <svg
                          className="w-[24px] h-[24px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 12L11 14L15 10"
                            stroke={
                              currentAnswer === option
                                ? 'var(--color-pink-700)'
                                : 'var(--color-gray-500)'
                            }
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity={currentAnswer === option ? 1 : 0}
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke={
                              currentAnswer === option
                                ? 'var(--color-pink-700)'
                                : 'var(--color-gray-500)'
                            }
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'input' && (
                <div>
                  <input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                    placeholder="답변을 입력해주세요"
                    className="w-full h-[64px] border-[2px] border-gray-500 rounded-[12px] px-[24px] body-large font-500 focus:border-pink-700 focus:outline-none transition-colors"
                    style={{ color: 'var(--color-black)' }}
                  />
                </div>
              )}

              {currentQuestion.type === 'range' && (
                <div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentAnswer || 50}
                    onChange={(e) => handleAnswerSelect(Number(e.target.value))}
                    className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="body-small" style={{ color: 'var(--color-gray-700)' }}>
                      0
                    </span>
                    <span
                      className="body-medium font-500"
                      style={{ color: 'var(--color-pink-700)' }}
                    >
                      {currentAnswer || 50}
                    </span>
                    <span className="body-small" style={{ color: 'var(--color-gray-700)' }}>
                      100
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 하단 버튼들 */}
            <div className="px-[80px] pb-[80px]">
              <div className="flex gap-[16px]">
                <button
                  onClick={handlePreviousClick}
                  disabled={!canGoPrevious}
                  className={`flex-1 h-[56px] border-[2px] rounded-[12px] body-large font-500 transition-all duration-200 ${
                    canGoPrevious
                      ? 'border-gray-500 bg-white hover:border-pink-700 hover:bg-pink-200 text-black'
                      : 'border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  이전 질문
                </button>
                <button
                  onClick={handleNextClick}
                  disabled={!currentAnswer}
                  className={`flex-1 h-[56px] rounded-[12px] body-large font-500 transition-all duration-200 ${
                    currentAnswer
                      ? 'bg-pink-700 text-white hover:opacity-90'
                      : 'bg-gray-500 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  {canGoNext ? '다음 질문' : canSubmit ? '진단 완료' : '다음 질문'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiagnosisPage;
