import React, { useState } from 'react';
import toggleDownIcon from '@/assets/svg/downIcon.svg';

const DetailAccordion = () => {
  const items = [
    '데이터',
    '공유데이터',
    '음성통화',
    '문자메세지',
    '현역 병사 혜택',
    '유쓰 5G 공유데이터 혜택',
    '청소년 보호 정책',
  ];

  const [expandedItems, setExpandedItems] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleItem = (label) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleToggleAll = () => {
    const newState = {};
    items.forEach((label) => {
      newState[label] = !allExpanded;
    });
    setExpandedItems(newState);
    setAllExpanded((prev) => !prev);
  };

  return (
    <div className="w-full bg-white rounded-[20px] mt-20 p-6 shadow-soft-black">
      {/* 전체 펼치기 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleToggleAll}
          className="flex items-center gap-1.5 text-gray-700 hover:text-black body-large font-500"
        >
          {allExpanded ? '전체 접기' : '전체 펼치기'}
          <img
            src={toggleDownIcon}
            alt="전체 펼치기 아이콘"
            className={`w-[16px] h-[16px] transition-transform duration-200 ${
              allExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      {/* 드롭다운 항목들 */}
      <div className="divide-y divide-gray-200">
        {items.map((label, index) => (
          <div key={index} className="py-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleItem(label)}
            >
              <span className="text-black heading-2 font-500">{label}</span>
              <img
                src={toggleDownIcon}
                alt={`${label} 토글`}
                className={`w-[16px] h-[16px] transition-transform duration-200 ${
                  expandedItems[label] ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </div>
            {expandedItems[label] && (
              <div className="mt-4 text-gray-700 body-small font-300">
                {/* 실제 내용 들어갈 자리 */}
                {label}에 대한 상세한 내용입니다.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailAccordion;
