import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CloseIcon from '@/assets/svg/closeIcon.svg';

const quickTags = ['#시니어', '#유쓰', '#청소년', '#복지', '#전체'];

const filterSections = {
  요금범위: ['~5만원대', '6~8만원대', '9만원대~', '상관 없어요'],
  데이터: ['완전 무제한', '다쓰면 속도제한', '상관 없어요'],
  연령대: ['전체대상', '만 65세 이상', '만 34세 이하', '만 18세 이하', '만 12세 이하'],
  혜택: [
    '헬로렌탈 구독',
    '넷플릭스',
    '일리커피 구독',
    '디즈니+',
    '신한카드 Air',
    '유튜브 프리미엄',
    '우리집지킴이',
    '우리집돌봄이',
    '티빙',
    '삼성팩',
    '폰교체',
    '멀티팩',
    '밀리의서재',
    '유플레이',
    '아이들나라',
    '바이브',
    '지니뮤직',
  ],
};

const Filter = ({ isOpen, onClose, onFilter, activeCategory }) => {
  const [activeQuick, setActiveQuick] = useState('');
  const [selected, setSelected] = useState(
    Object.fromEntries(Object.keys(filterSections).map((key) => [key, []]))
  );
  const [count, setCount] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const toggleQuick = (tag) => {
    setActiveQuick((prev) => (prev === tag ? '' : tag));
  };

  const toggleOption = (section, option) => {
    setSelected((prev) => {
      const arr = prev[section];
      return {
        ...prev,
        [section]: arr.includes(option) ? arr.filter((item) => item !== option) : [...arr, option],
      };
    });
  };

  useEffect(() => {
    if (isFirstRender) {
      setCount(0);
      setIsFirstRender(false);
      return;
    }

    const params = new URLSearchParams();
    params.append('category', activeCategory || 'all');

    params.append('page', 1);
    params.append('limit', 0);

    selected['요금범위'].forEach((r) => {
      if (r === '~5만원대') {
        params.append('minPrice', 0);
        params.append('maxPrice', 50000);
      } else if (r === '6~8만원대') {
        params.append('minPrice', 60000);
        params.append('maxPrice', 80000);
      } else if (r === '9만원대~') {
        params.append('minPrice', 90000);
      }
    });

    if (selected['데이터']?.length) {
      params.append('dataOption', selected['데이터'].join(','));
    }

    if (selected['연령대']?.length) {
      params.append('ageRange', selected['연령대'].join(','));
    }

    if (selected['혜택']?.length) {
      selected['혜택'].forEach((r) => {
        params.append('brands[]', r);
      });
    }

    if (activeQuick && activeQuick !== '#전체') {
      params.append('quickTag', activeQuick);
    }

    fetch(`/api/plans?${params.toString()}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setCount(data.pagination.totalCount);
      })
      .catch(() => {
        setCount(0);
      });
  }, [selected, activeQuick, activeCategory]);

  const applyFilter = () => {
    onFilter({
      ...selected,
      quickTag: activeQuick,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      overlayClassName="fixed inset-0 flex items-start justify-center pt-16 z-50"
      className="
        z-50 
        w-full md:w-[797px] 
        max-h-[80vh] 
        bg-white 
        rounded-[20px] 
        outline-none 
        flex flex-col 
        overflow-hidden
        py-6 px-4 md:py-[40px] md:px-[30px] 
      "
      bodyOpenClassName="overflow-hidden"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between md:mb-4 border-b border-gray-500 pb-[2px] md:pb-[35px]">
        <h2 className="m-heading-2 md:heading-2 font-semibold text-black">
          어떤 요금제를 찾으시나요?
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <img src={CloseIcon} alt="닫기" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto space-y-px-[30px] md:py-[35px]">
        {/* 퀵태그 행 */}
        <div className="grid grid-cols-3 mt-2 md:grid-cols-5 md:gap-[25px] mb-[13px] md:mb-[90px] gap-[10px]">
          {quickTags.map((tag) => {
            const isActive = activeQuick === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleQuick(tag)}
                className={`cursor-pointer w-[106px] h-[34px] gap-[13px] text-[13px] md:w-[123px] md:h-[45px] md:px-[0px] border rounded-[16px] md:body-large md:font-[500] 
                  ${
                    isActive
                      ? 'border-pink-600 text-pink-600'
                      : 'border-gray-500 bg-white text-gray-700 hover:border-pink-600 hover:text-pink-600'
                  }
                `}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* 섹션별 옵션 */}
        <div className="flex flex-col space-y-[13px] md:space-y-[90px] [&>*:last-child]:mb-0">
          {Object.entries(filterSections).map(([section, options]) => (
            <div key={section}>
              <h3 className="m-heading-3 md:heading-3 font-700 text-black mb-3">{section}</h3>
              <div className="grid grid-cols-3  md:grid-cols-5  md:flex-wrap gap-[10px] md:gap-[20px]">
                {options.map((opt) => {
                  const isActive = selected[section].includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleOption(section, opt)}
                      className={`cursor-pointer w-[106px] h-[34px] gap-[13px] text-[13px] md:w-[123px] md:h-[45px] border rounded-[16px] md:body-large md:font-[500] 
                        ${
                          isActive
                            ? 'border-pink-600 text-pink-600'
                            : 'border-gray-500 bg-white text-gray-700 hover:border-pink-600 hover:text-pink-600'
                        }
                      `}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 푸터 */}
        <div className="flex flex-row justify-end items-center gap-4 mt-[35px]">
          <button
            onClick={() => {
              setSelected(Object.fromEntries(Object.keys(filterSections).map((key) => [key, []])));
              setActiveQuick(''); // quickTag 도 초기화!
            }}
            className="
 cursor-pointer w-[106px] h-[34px] gap-[13px] text-[13px] md:w-[140px] md:h-[45px]  md:body-large md:font-[500]
 flex items-center justify-center
 text-gray-600
 border border-gray-500
 rounded-full
 md:body-large md:font-500
"
          >
            전체해제
          </button>

          <button
            onClick={applyFilter}
            disabled={count === 0}
            className={`
    cursor-pointer w-[106px] h-[34px] gap-[13px] text-[13px] md:w-[140px] md:h-[45px] md:body-large md:font-[500]
    flex items-center justify-center
    rounded-full
    ${count === 0 ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-pink-600 text-white'}
  `}
          >
            {count > 0 ? `${count}개 요금제 보기` : '요금제 보기'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Filter;
