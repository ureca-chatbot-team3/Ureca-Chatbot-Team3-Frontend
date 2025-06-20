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
  ],
};

const Filter = ({ isOpen, onClose, onFilter, activeCategory }) => {
  const [activeQuick, setActiveQuick] = useState('');
  const [selected, setSelected] = useState(
    Object.fromEntries(Object.keys(filterSections).map((key) => [key, []]))
  );
  const [count, setCount] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const toggleQuick = (tag) => setActiveQuick(tag);
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
    params.append('category', activeCategory);
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
      params.append('brands', selected['혜택'].join(','));
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
      className="z-50 py-[40px] px-[30px]  bg-white  w-[797px] max-h-[80vh] rounded-[20px] outline-none flex flex-col overflow-hidden"
      bodyOpenClassName="overflow-hidden"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4  border-b border-gray-500 pb-[35px] ">
        <h2 className="heading-2  font-semibold text-black">어떤 요금제를 찾으시나요?</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <img src={CloseIcon} alt="닫기" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto space-y-px-[30px] py-[35px] ">
        {/* 퀵태그 행 */}
        <div className="flex gap-[25px] mb-[90px]">
          {quickTags.map((tag) => {
            const isActive = activeQuick === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleQuick(tag)}
                className={`cursor-pointer 
          w-[124px] h-[45px] px-[20px] border rounded-[16px]  body-large font-500 
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
        <div className="flex flex-col space-y-[90px] [&>*:last-child]:mb-0">
          {Object.entries(filterSections).map(([section, options]) => (
            <div key={section}>
              <h3 className="heading-3 font-700 text-black mb-2">{section}</h3>
              <div className="flex flex-wrap gap-[25px] ">
                {options.map((opt) => {
                  const isActive = selected[section].includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleOption(section, opt)}
                      className={` cursor-pointer 
                    w-[124px] h-[45px] px-[5px] border rounded-[16px]  body-large  font-500 
                    ${
                      isActive
                        ? 'border-pink-600 text-pink-600   '
                        : 'border-gray-500 bg-white text-gray-700  hover:border-pink-600 hover:text-pink-600'
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
        <div className="flex justify-end items-center ">
          <button
            onClick={() =>
              setSelected(Object.fromEntries(Object.keys(filterSections).map((key) => [key, []])))
            }
            className=" cursor-pointer
      w-[201px] h-[45px]
      flex items-center justify-center 
      text-gray-600
      border border-gray-500
      rounded-full
      body-large font-500
      mr-4 mt-[35px]
    "
          >
            전체해제
          </button>

          <button
            onClick={applyFilter}
            className="cursor-pointer w-[201px] h-[45px] flex items-center justify-center bg-pink-600 text-white rounded-full body-large font-500 mt-[35px]"
          >
            {count > 0 ? `${count}개 요금제 보기` : '요금제 보기'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Filter;
