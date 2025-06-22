import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnosis } from '../../store/DiagnosisContext';
import DiagnosisIntroSection from './components/DiagnosisIntroSection';

const DiagnosisPage = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

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
    answers,
    sessionId,
    result,

    // 액션
    loadQuestions,
    setAnswer,
    previousQuestion,
    nextQuestion,
    submitDiagnosis,
  } = useDiagnosis();

  // 진단 시작 핸들러
  const handleStartDiagnosis = () => {
    setShowIntro(false);
    loadQuestions();
  };

  // 컴포넌트 마운트 시 진행 중인 진단이 있는지 확인
  useEffect(() => {
    // 이미 질문이 로드되어 있거나, 답변이 있거나, 세션이 있다면 진행 중인 진단
    const hasOngoingDiagnosis =
      currentQuestion ||
      (Array.isArray(answers) && answers.length > 0) ||
      sessionId ||
      totalQuestions > 0;

    if (hasOngoingDiagnosis) {
      setShowIntro(false);
      // 질문이 없다면 로드
      if (!currentQuestion && totalQuestions === 0) {
        loadQuestions();
      }
    }
  }, [currentQuestion, answers, sessionId, totalQuestions, loadQuestions]);

  // 컴포넌트 마운트 시에는 질문을 로드하지 않음 (인트로 화면 표시)
  // useEffect(() => {
  //   loadQuestions();
  // }, []);

  // 진단 완료 시 결과 페이지로 이동
  useEffect(() => {
    if (isComplete) {
      navigate('/diagnosis/result');
    }
  }, [isComplete, navigate]);

  // 현재 질문의 답변 처리 (복수 선택 지원)
  const handleAnswerSelect = (answer) => {
    if (currentQuestion) {
      if (currentQuestion.type === 'multiple') {
        // 복수 선택: 배열로 관리
        const currentAnswers = Array.isArray(currentAnswer) ? currentAnswer : [];
        const isSelected = currentAnswers.includes(answer);

        let newAnswers;
        if (isSelected) {
          // 이미 선택된 경우 제거
          newAnswers = currentAnswers.filter((item) => item !== answer);
        } else {
          // 선택되지 않은 경우 추가
          newAnswers = [...currentAnswers, answer];
        }

        setAnswer(currentQuestion._id, newAnswers);
      } else {
        // 단일 선택: 기존 방식
        setAnswer(currentQuestion._id, answer);
      }
    }
  };

  // 이전 질문
  const handlePreviousClick = () => {
    previousQuestion();
  };

  // 다음 질문 또는 진단 완료
  const handleNextClick = async () => {
    // 답변 검증
    const hasAnswer =
      currentQuestion.type === 'multiple'
        ? Array.isArray(currentAnswer) && currentAnswer.length > 0
        : currentAnswer;

    if (!hasAnswer) {
      alert('답변을 선택해주세요.');
      return;
    }

    if (canGoNext) {
      nextQuestion();
    } else if (canSubmit) {
      try {
        await submitDiagnosis();
      } catch (err) {
        console.log(err, '요금제 진단 제출 실패');
        alert('진단 제출에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 인트로 화면 표시
  if (showIntro) {
    return <DiagnosisIntroSection onStartDiagnosis={handleStartDiagnosis} />;
  }

  // 로딩 상태
  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-[500px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="m-body-large font-500 text-black md:body-large">
            질문을 불러오는 중입니다...
          </p>
        </div>
      </main>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <main className="flex justify-center">
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
            <h2 className="m-heading-3 font-700 mb-4 text-black md:heading-3">
              오류가 발생했습니다
            </h2>
            <p className="m-body-large mb-6 text-gray-700 md:body-large">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="h-[56px] px-[32px] bg-pink-700 text-white rounded-[12px] m-body-large font-500 hover:opacity-90 transition-opacity md:body-large"
            >
              다시 시도
            </button>
          </div>
        </div>
      </main>
    );
  }

  // 질문이 없는 경우
  if (!currentQuestion) {
    return (
      <main className="flex justify-center">
        <div className="w-full max-w-[720px] bg-white rounded-[20px] shadow-sm mt-[40px] mb-[40px] p-[80px]">
          <div className="text-center">
            <p className="m-body-large text-gray-700 md:body-large">질문을 준비 중입니다...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center py-[40px] px-[20px] md:px-0">
      {/* 모바일: 최대 430px 너비 제한, 자동 높이 / 데스크탑: 720px 최대 크기 */}
      <div className="w-full max-w-[430px] bg-white rounded-[20px] shadow-sm md:max-w-[720px] md:h-auto">
        {/* 진행 표시바 */}
        <div className="px-[20px] pt-[20px] pb-[16px] md:px-[80px] md:pt-[40px] md:pb-[40px]">
          <div className="flex items-center justify-between mb-[8px] md:mb-[16px]">
            <span className="m-body-small font-500 text-black md:body-medium md:font-700">
              요금제 추천 질문
            </span>
            <span className="m-body-small font-500 text-black md:body-medium md:font-700">
              {currentQuestionNumber}/{totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-400 rounded-full h-[4px] md:h-[6px]">
            <div
              className="h-[4px] rounded-full transition-all duration-300 md:h-[6px]"
              style={{
                backgroundColor: 'var(--color-pink-700)',
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* 질문 제목 */}
        <div className="px-[20px] pb-[20px] md:px-[80px] md:pb-[40px]">
          <h1 className="m-body-large font-700 text-center text-black md:heading-2">
            {currentQuestion.question}
          </h1>
        </div>

        {/* 선택 옵션들 */}
        <div className="px-[20px] pb-[20px] md:px-[80px] md:pb-[40px]">
          {(currentQuestion.type === 'single' || currentQuestion.type === 'multiple') && (
            <div className="space-y-[8px] md:space-y-[16px]">
              {/* 복수 선택 안내 메시지 */}
              {currentQuestion.type === 'multiple' && (
                <div className="mb-4 p-3 bg-pink-200 rounded-[8px]">
                  <p className="m-body-small font-500 text-pink-700 md:body-medium">
                    📝 여러 개를 선택할 수 있습니다. 선택한 항목을 다시 누르면 선택 해제됩니다.
                  </p>
                </div>
              )}

              {currentQuestion.options && currentQuestion.options.length > 0 ? (
                currentQuestion.options.map((option, index) => {
                  const isSelected =
                    currentQuestion.type === 'multiple'
                      ? Array.isArray(currentAnswer) && currentAnswer.includes(option)
                      : currentAnswer === option;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`group w-full h-[36px] border-[1px] rounded-[8px] flex items-center px-[12px] transition-all duration-200 md:h-[64px] md:border-[2px] md:rounded-[12px] md:px-[24px] ${
                        isSelected
                          ? 'border-pink-700 bg-pink-200'
                          : 'border-gray-500 bg-white hover:border-pink-700 hover:bg-pink-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`m-body-medium font-500 text-left md:body-large transition-colors ${
                            isSelected ? 'text-pink-700' : 'text-black group-hover:text-pink-700'
                          }`}
                        >
                          {option}
                        </span>

                        {/* 단일 선택: 라디오 버튼 */}
                        {currentQuestion.type === 'single' && (
                          <svg
                            className="w-[16px] h-[16px] md:w-[24px] md:h-[24px] flex-shrink-0 ml-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12L11 14L15 10"
                              stroke={
                                isSelected ? 'var(--color-pink-700)' : 'var(--color-gray-500)'
                              }
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              opacity={isSelected ? 1 : 0}
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke={
                                isSelected ? 'var(--color-pink-700)' : 'var(--color-gray-500)'
                              }
                              strokeWidth="2"
                              fill="none"
                            />
                          </svg>
                        )}

                        {/* 복수 선택: 체크박스 */}
                        {currentQuestion.type === 'multiple' && (
                          <svg
                            className="w-[16px] h-[16px] md:w-[24px] md:h-[24px] flex-shrink-0 ml-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="3"
                              stroke={
                                isSelected ? 'var(--color-pink-700)' : 'var(--color-gray-500)'
                              }
                              strokeWidth="2"
                              fill={isSelected ? 'var(--color-pink-700)' : 'none'}
                            />
                            {isSelected && (
                              <path
                                d="M9 12L11 14L15 10"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="m-body-large text-gray-700 md:body-large">
                    선택 가능한 옵션을 불러오는 중입니다...
                  </p>
                </div>
              )}
            </div>
          )}

          {currentQuestion.type === 'input' && (
            <div>
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => handleAnswerSelect(e.target.value)}
                placeholder="답변을 입력해주세요"
                className="w-full h-[36px] border-[1px] border-gray-500 rounded-[8px] px-[12px] m-body-medium font-500 text-black focus:border-pink-700 focus:outline-none transition-colors md:h-[64px] md:border-[2px] md:rounded-[12px] md:px-[24px] md:body-large"
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
                <span className="m-body-small text-gray-700 md:body-small">0</span>
                <span className="m-body-medium font-500 text-pink-700 md:body-medium">
                  {currentAnswer || 50}
                </span>
                <span className="m-body-small text-gray-700 md:body-small">100</span>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼들 */}
        <div className="px-[20px] pb-[20px] md:px-[80px] md:pb-[40px]">
          <div className="flex gap-[8px] md:gap-[16px]">
            <button
              onClick={handlePreviousClick}
              disabled={!canGoPrevious}
              className={`flex-1 h-[36px] border-[1px] rounded-[8px] m-body-medium font-500 transition-all duration-200 md:h-[56px] md:border-[2px] md:rounded-[12px] md:body-large ${
                canGoPrevious
                  ? 'border-gray-500 bg-white hover:border-pink-700 hover:bg-pink-200 text-black hover:text-pink-700'
                  : 'border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              이전 질문
            </button>
            <button
              onClick={handleNextClick}
              disabled={
                !(() => {
                  return currentQuestion.type === 'multiple'
                    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
                    : currentAnswer;
                })()
              }
              className={`flex-1 h-[36px] rounded-[8px] m-body-medium font-500 transition-all duration-200 md:h-[56px] md:rounded-[12px] md:body-large ${(() => {
                const hasAnswer =
                  currentQuestion.type === 'multiple'
                    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
                    : currentAnswer;
                return hasAnswer
                  ? 'bg-pink-700 text-white hover:opacity-90'
                  : 'bg-gray-500 text-gray-700 cursor-not-allowed';
              })()}`}
            >
              {canGoNext ? '다음 질문' : canSubmit ? '진단 완료' : '다음 질문'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiagnosisPage;
