import React, { useState, useEffect } from 'react';
import SearchIcon from '@/assets/svg/searchIcon.svg';
import FilterIcon from '@/assets/svg/filterIcon.svg';
import ToggleDownIcon from '@/assets/svg/toggleDownIcon.svg';
import ToggleUpIcon from '@/assets/svg/toggleUpIcon.svg';
import SearchOff from '@/assets/svg/SearchOff.svg';
import FilterOff from '@/assets/svg/FilterOff.svg';
import Notice from '@/assets/svg/notice.svg';
import Filter from './Filter';
import PlanCard from '@/components/PlanCard';
import MobilePlanCard from '@/components/MobilePlanCard';

// API 기본 URL 가져오기
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getDailyDataGB = (infos) => {
  for (const info of infos) {
    const m = info.match(/데이터\s*일\s*(\d+)GB/i);
    if (m) return parseInt(m[1], 10);
  }
  return 0;
};

const categories = [
  { label: '5G/LTE', value: 'all' },
  { label: '온라인 전용', value: 'online' },
  { label: '태블릿/스마트워치', value: 'tablet' },
  { label: '듀얼넘버 플러스', value: 'dual' },
];

const PlanListPage = () => {
  const [active, setActive] = useState(categories[0].value);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [plans, setPlans] = useState([]);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState({});

  const [sortBy, setSortBy] = useState('popular');
  const [sortOrder, setSortOrder] = useState('asc');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState('');

  const [emptyReason, setEmptyReason] = useState('');

  const catMap = {
    all: 'all',
    online: '온라인 전용 요금제',
    tablet: '태블릿/스마트워치',
    dual: '듀얼넘버 플러스',
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('category', catMap[active] || 'all');

    params.append('sortBy', 'price_value'); // 서버 허용 값
    params.append('sortOrder', sortOrder);
    params.append('customSort', sortBy); // 클라 표시용
    params.append('search', search);

    if (sortBy === 'price_value') {
      params.append('page', page);
      params.append('limit', limit);
    } else {
      params.append('page', 1);
      params.append('limit', 100);
    }

    (filter['요금범위'] || []).forEach((r) => {
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

    if (filter['데이터']?.length) {
      params.append('dataOption', filter['데이터'].join(','));
    }

    if (filter['연령대']?.length) {
      const ages = filter['연령대'].filter((age) => age !== '전체대상');
      if (ages.length > 0) {
        params.append('ageRange', ages.join(','));
      }
    }

    if (filter['혜택']?.length) {
      params.append('brands', filter['혜택'].join(','));
    }

    if (filter.quickTag && filter.quickTag !== '#전체') {
      params.append('quickTag', filter.quickTag.replace('#', ''));
    }

    fetch(`${API_BASE_URL}/plans?${params.toString()}`, {
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        let loadedPlans = data.data.plans;

        if (sortBy === 'popular') {
          loadedPlans.sort((a, b) => (b.badge === '인기' ? 1 : 0) - (a.badge === '인기' ? 1 : 0));
        } else if (sortBy === 'data') {
          loadedPlans.sort((a, b) => getDailyDataGB(b.infos) - getDailyDataGB(a.infos));
        }

        const paged =
          sortBy === 'price_value'
            ? loadedPlans
            : loadedPlans.slice((page - 1) * limit, page * limit);

        setPlans(paged);
        setTotalPages(
          sortBy === 'price_value'
            ? data.data.pagination.totalPages
            : Math.ceil(loadedPlans.length / limit)
        );

        if (!search && Object.keys(filter).length === 0) {
          setEmptyReason('');
        }
      })
      .catch(console.error);
  }, [active, sortBy, sortOrder, page, limit, filter, search]);

  const handleCategoryClick = (value) => {
    if (value === 'online') {
      window.open('https://www.lguplus.com/mobile/plan/mplan/direct', '_blank');
    } else if (value === 'tablet' || value === 'dual') {
      window.open('https://www.lguplus.com/mobile/plan/mplan/2nd-device', '_blank');
    } else {
      setActive(value);
    }
  };

  const handleSort = (sortField, order) => {
    setSortBy(sortField);
    setSortOrder(order);
    setOpen(false);
  };

  const handlePopularSort = () => {
    setPage(1);
    setSortBy('popular');
    setOpen(false);
  };

  const handleDataSort = () => {
    setPage(1);
    setSortBy('data');
    setOpen(false);
  };

  const handleSearch = () => {
    setPage(1);
    setEmptyReason('search');
  };

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
    setPage(1);
    setEmptyReason('filter');
  };

  return (
    <div className="min-h-screen p-0  text-black">
      <div className="flex items-center justify-between mb-[18px] mt-[18px]">
        {/* 요금제 */}
        <h2 className="m-heading-2 md:heading-2 font-500 text-black">요금제</h2>
        {/* 검색 */}
        <div className="relative flex items-center rounded-full w-[182px] h-[28px] md:w-70">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            placeholder="검색어를 입력하세요."
            className="
    border border-gray-500 bg-white text-black rounded-2xl
    pl-3 pr-10 py-3 w-full
    focus:outline-none focus:border-black
    placeholder:text-[12px] md:placeholder:text-[16px]
    placeholder:leading-[20px] placeholder:font-500
  "
          />

          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-black transition-colors duration-200"
            onClick={handleSearch}
          >
            <img src={SearchIcon} alt="검색 아이콘" className="w-5 h-5" />
          </div>
        </div>
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={handleSearch}
        ></div>
      </div>

      {/* 카테고리 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-[18px] gap-2 md:gap-0">
        <ul className="flex space-x-5 border-b border-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((category) => (
            <li
              key={category.value}
              onClick={() => handleCategoryClick(category.value)}
              className={`cursor-pointer m-body-medium font-700 md:heading-3 text-black transition-colors pb-2 ${
                active === category.value ? 'border-b-2 border-pink-600' : ''
              }`}
            >
              {category.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row justify-between items-center mb-[18px] gap-2">
        {/* 토클 */}
        <div className="relative inline-block text-left text-black  m-body-medium md: font-500">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer "
          >
            {sortBy === 'popular'
              ? '인기순'
              : sortBy === 'price_value' && sortOrder === 'asc'
                ? '낮은 가격순'
                : sortBy === 'price_value' && sortOrder === 'desc'
                  ? '높은 가격순'
                  : sortBy === 'data'
                    ? '데이터 많은 순'
                    : '정렬'}
            <img src={open ? ToggleUpIcon : ToggleDownIcon} alt="토글 아이콘" />
          </button>

          {open && (
            <div className="z-50 cursor-pointer absolute mt-2 w-40 text-center bg-white text-black rounded-[16px] shadow">
              <button
                onClick={handlePopularSort}
                className="cursor-pointer block w-full text-center px-4 py-2 hover:text-pink-700"
              >
                인기순
              </button>
              <button
                onClick={() => handleSort('price_value', 'asc')}
                className="cursor-pointer block w-full text-center px-4 py-2 hover:text-pink-700"
              >
                낮은 가격순
              </button>
              <button
                onClick={() => handleSort('price_value', 'desc')}
                className="cursor-pointer block w-full text-center px-4 py-2 hover:text-pink-700"
              >
                높은 가격순
              </button>
              <button
                onClick={handleDataSort}
                className="cursor-pointer block w-full text-center px-4 py-2 hover:text-pink-700"
              >
                데이터 많은 순
              </button>
            </div>
          )}
        </div>
        {/* 필터 */}
        <div
          className="ml-auto flex gap-2 text-black m-body-medium font-700 md:body-large md:font-500 cursor-pointer"
          onClick={() => setFilterOpen(true)}
        >
          <img src={FilterIcon} alt="필터 아이콘" className="w-5 h-5" />
          필터
        </div>

        <Filter
          isOpen={isFilterOpen}
          onClose={() => setFilterOpen(false)}
          onFilter={handleFilter}
          activeCategory={catMap[active] || 'all'}
        />
      </div>
      {plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-black">
          {/* 이미지 */}
          <img
            src={emptyReason === 'filter' ? FilterOff : SearchOff}
            alt="결과 없음"
            className="w-[150px] h-auto mb-6"
          />

          {/* 텍스트 */}
          {emptyReason === 'search' && (
            <>
              <p className="m-heading-2 mb-2">‘{search}’ 에 대한 검색 결과가 없습니다.</p>
              <p className="body-medium text-black mb-8">
                검색어를 확인하고 입력했는지 다시 확인해 주세요.
              </p>
            </>
          )}

          {emptyReason === 'filter' && (
            <>
              <p className="m-heading-2 mb-2">조건에 맞는 요금제가 없어요!</p>
              <p className="body-medium text-black mb-8">필터를 변경해서 다시 확인해 주세요.</p>
            </>
          )}

          {/* 이용안내 박스 */}
          <div className="text-left border bg-white border-gray-400 rounded-[12px] p-6 w-full max-w-[830px] h-auto flex flex-col justify-center">
            <p className="font-500 text-gray-700 flex items-center mb-2">
              <img
                src={emptyReason === 'filter' ? Notice : Notice}
                alt="이용안내"
                className="w-5 h-5 mr-2"
              />
              이용안내
            </p>

            {/* 안내 문구 */}
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-[14px] leading-[20px]">
              {emptyReason === 'filter' ? (
                <>
                  <li>선택한 조건에 맞는 요금제가 없습니다.</li>
                  <li>조건을 줄이거나 초기화 후 다시 시도해 주세요.</li>
                  <li>숫자가 표시되지 않으면, 현재 선택된 요금제가 없습니다.</li>
                </>
              ) : (
                <>
                  <li>검색어는 초성이 아닌 단어를 정확히 입력해 주세요.</li>
                  <li>철자가 맞는지 확인해 주세요.</li>
                  <li>다른 키워드나 단어로 다시 검색해보세요.</li>
                  <li>띄어쓰기나 특수문자를 제거해보세요.</li>
                </>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <>
          {/* PC - 4열 */}
          <div className="hidden md:grid grid-cols-4 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan._id}
                imagePath={plan.imagePath}
                name={plan.name}
                infos={plan.infos}
                plan_speed={plan.plan_speed}
                price={plan.price}
                sale_price={plan.sale_price}
                price_value={plan.price_value}
                sale_price_value={plan.sale_price_value}
                benefits={Object.entries(plan.benefits)}
              />
            ))}
          </div>

          {/* 모바일 - 2열 */}
          <div className="grid grid-cols-2 gap-4 px-4 md:hidden">
            {plans.map((plan) => (
              <MobilePlanCard
                key={plan._id}
                imagePath={plan.imagePath}
                name={plan.name}
                infos={plan.infos}
                plan_speed={plan.plan_speed}
                price={plan.price}
                sale_price={plan.sale_price}
                price_value={plan.price_value}
                sale_price_value={plan.sale_price_value}
                benefits={Object.entries(plan.benefits)}
              />
            ))}
          </div>
        </>

      )}
      {/* Pagination은 항상 유지 */}
      <div className="flex justify-center mt-10">
        <nav className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-6 h-6 flex items-center justify-center rounded-full body-small font-500 transition-colors duration-300 ease-in-out ${
                page === i + 1
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-500 text-white hover:bg-pink-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PlanListPage;
