import { useState } from 'react';
import downIcon from '@/assets/svg/downIcon.svg';
import upIcon from '@/assets/svg/upIcon.svg';

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

  const [expandedItems, setExpandedItems] = useState(() => {
    const initialState = {};
    items.forEach((label) => {
      initialState[label] = false;
    });
    return initialState;
  });

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
      <div className="flex justify-end mt-5 mb-6">
        <button
          onClick={handleToggleAll}
          className="flex items-center gap-2 text-gray-700 font-500 leading-none"
        >
          {allExpanded ? '전체 접기' : '전체 펼치기'}
          <img
            src={allExpanded ? upIcon : downIcon}
            alt="전체 토글 아이콘"
            className="w-[16px] h-[16px]"
          />
        </button>
      </div>

      {/* 버튼 아래 검정색 선 추가 */}
      <div className="w-full h-[1px] bg-black mb-1" />

      {/* 드롭다운 항목들 */}
      <div className="divide-y divide-gray-500">
        {items.map((label, index) => (
          <div key={index} className="py-5.5">
            <div
              className="flex items-center justify-between cursor-pointer px-6"
              onClick={() => toggleItem(label)}
            >
              <span className="text-black heading-2 font-500">{label}</span>
              <img
                src={expandedItems[label] ? upIcon : downIcon}
                alt={`${label} 토글`}
                className="w-[20px] h-[20px]"
              />
            </div>

            {/* 드롭다운 내부 내용 */}
            {expandedItems[label] && (
              <div className="mt-4 px-14 py-4">
                {label === '데이터' ? (
                  <>
                    <div className="text-black heading-3 font-500 mb-3">데이터 무제한</div>
                    <div className="text-gray-700 body-medium font-400 space-y-2">
                      <p>· 속도 제한 없이 5G 데이터를 무제한 이용할 수 있어요.</p>
                      <p>
                        · 단, 다른 고객들의 데이터 이용에 방해가 될 만큼 많은 양의 데이터를 사용하면
                        데이터 속도 제한, 서비스 이용 제한, 해지 등의 책임이 따를 수 있어요.
                      </p>
                      <p>· 네트워크 환경에 따라 속도가 일시적으로 느려질 수 있어요.</p>
                    </div>
                  </>
                ) : label === '공유데이터' ? (
                  <>
                    <table className="w-full text-center border-separate border-spacing-0">
                      <thead className="bg-gray-400">
                        <tr>
                          <th className="py-3 px-3 font-semibold text-gray-700 w-1/3">요금제명</th>
                          <th className="py-3 px-3 font-semibold text-gray-700 w-1/3 whitespace-pre-line">
                            테더링+쉐어링
                            <br />
                            <span className="text-sm">(데이터 함께쓰기+데이터 나눠쓰기)</span>
                          </th>
                          <th className="py-3 px-3 font-semibold text-gray-700 w-1/3 whitespace-pre-line">
                            참 쉬운
                            <br />
                            <span className="text-sm">가족 데이터</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['5G 시그니처', '120GB', '60GB'],
                          ['5G 프리미어 슈퍼', '100GB', '50GB'],
                          ['5G 프리미어 플러스', '100GB', '-'],
                          ['5G 프리미어 레귤러', '80GB', '-'],
                          ['5G 프리미어 에센셜', '70GB', '-'],
                        ].map(([name, share, family], idx) => (
                          <tr key={idx}>
                            <td className="py-3 px-3">{name}</td>
                            <td className="py-3 px-3">{share}</td>
                            <td className="py-3 px-3">{family}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mt-6 text-gray-700 body-medium font-400 space-y-2">
                      <p>
                        · 테더링(데이터 함께쓰기): 노트북, 태블릿, 휴대폰 등을 내 휴대폰과 연결해
                        데이터를 함께 쓸 수 있어요.
                      </p>
                      <p>
                        · 쉐어링(데이터 나눠쓰기): 휴대폰을 제외하고 내 명의로 5G 요금제에 가입한
                        태블릿, 스마트워치에 나눠 줄 수 있어요.
                      </p>
                      <p>· 데이터 주고받기: 지인이나 가족에게 나눠 줄 수 있어요.</p>
                      <div className="pl-4 text-xs space-y-1.5">
                        <p>- 지인 또는 가족에게 월 2회, 가족에게는 2회 추가로 줄 수 있어요.</p>
                        <p>- 한 번에 최대 1GB를 줄 수 있어요.</p>
                      </div>
                    </div>
                  </>
                ) : label === '음성통화' ? (
                  <>
                    <div className="text-black heading-3 font-500 mb-3">국내 음성통화 무제한</div>
                    <div className="text-gray-700 body-medium font-400 space-y-2">
                      <p>
                        · 휴대폰, 시내외 전화, 인터넷전화 상관없이 모든 국내 음성통화를 무료로
                        이용할 수 있어요.
                      </p>
                      <p>
                        · 음성통화 무제한 혜택을 약관에 정한 기준보다 많이 사용하거나 스팸, 광고
                        목적으로 이용한 것이 확인되면 추가 요금을 내야 하거나 서비스 이용이 정지될
                        수 있어요.
                      </p>
                      <div className="pl-4 text-xs space-y-1.5">
                        <p>- 1일 600분 넘게 통화한 횟수가 한 달에 3회 초과할 때</p>
                        <p>
                          - 월정액 55,000원 미만 요금제 이용 고객이 한 달에 6,000분 넘게 전화를
                          걸거나 55,000원 이상 요금제 이용 고객이 10,000분 넘게 전화를 걸 때
                        </p>
                        <p>- 한 달에 1,000개가 넘는 번호로 음성 또는 영상통화를 걸 때</p>
                      </div>
                    </div>
                    <div className="mt-6 text-black heading-3 font-500 mb-3">
                      부가/영상 통화 300분
                    </div>
                    <div className="text-gray-700 body-medium font-400 space-y-2">
                      <p>
                        · 부가 통화란 15XX, 16XX로 시작하는 전국 대표번호, 050X로 시작하는 평생
                        개인번호, 013등으로 시작하는 주파수공용통신을 말해요.
                      </p>
                      <p>
                        · 부가통화는 1초 통화할 때마다 기본 제공량이 1초, 영상통화는 1초 통화할
                        때마다 기본제공량이 1.66초 줄어들어요.
                      </p>
                      <p>
                        · 기본제공량을 다 쓰면 부가 통화는 1초에 1.98원, 영상 통화는 1초에 3.3원씩
                        통화료를 내야 해요.
                      </p>
                    </div>
                  </>
                ) : label === '문자메세지' ? (
                  <>
                    <div className="text-black heading-3 font-500 mb-3">문자메시지 기본제공</div>
                    <div className="text-gray-700 body-medium font-400 space-y-2">
                      <p>· 다른 통신사 고객에게 보내는 문자메시지도 무료예요.</p>
                      <p>
                        · 문자메시지 기본제공 혜택을 약관에 정한 기준보다 많이 사용하거나 스팸, 광고
                        목적으로 이용한 것이 확인되면 추가 요금을 내야 하거나 서비스 이용이 정지될
                        수 있어요.
                      </p>
                      <div className="pl-4 text-xs space-y-1.5">
                        <p>- 문자메시지를 하루 150건 넘게 보내는 날이 한 달에 10회 초과할 때</p>
                        <p>- 하루 500건 넘게 문자메시지를 보낼 때</p>
                        <p>- 한 달에 2,000개가 넘는 번호로 문자메시지를 보낼 때</p>
                        <p>- 휴대폰 이외의 시스템에서 문자메시지를 보낼 때</p>
                        <p>- 제 3자에게 휴대전화를 임대하는 등 이용약관을 위반할 때</p>
                      </div>
                    </div>
                  </>
                ) : label === '현역 병사 혜택' ? (
                  <>
                    <div className="text-gray-700 body-medium font-400 space-y-2">
                      <p>
                        · 대한민국 현역 병사라면 누구나 복무 기간 동안 매달 요금을 20% 할인 받을 수
                        있어요.
                      </p>
                    </div>
                  </>
                ) : label === '유쓰 5G 공유데이터 혜택' ? (
                  <>
                    <div className="text-gray-700 body-medium font-400 space-y-2">
                      <p>
                        · 만 19세 이상 만 34세 이하 고객이 5G 무제한 요금제를 이용할 때
                        테더링/쉐어링 데이터 60GB를 추가로 받을 수 있는 혜택이에요. 별도 가입 신청이
                        필요한 혜택이에요.
                      </p>
                      <p>
                        · 내 이름으로 가입한 휴대폰이 여러 개라도 유쓰 5G 공유데이터 또는 유쓰 5G
                        요금제 혜택은 휴대폰 1개로만 받을 수 있어요.한 것이 확인되면 추가 요금을
                        내야 하거나 서비스 이용이 정지될 수 있어요.
                      </p>
                      <p>· 만 35세가 되는 날의 다음 달 1일 혜택이 자동으로 중단돼요.</p>
                      <p>
                        · 5G 데이터 무제한 요금제가 아닌 다른 요금제로 바꾸면 혜택을 받을 수 없어요.
                      </p>
                    </div>
                  </>
                ) : label === '청소년 보호 정책' ? (
                  <>
                    <div className="text-gray-700 body-medium font-400 space-y-2">
                      <p>
                        · 만 18세 이하 청소년 고객은 다음과 같이 청소년 보호정책을 적용 받을 수
                        있어요.
                      </p>
                      <div className="pl-4 text-xs space-y-1.5">
                        <p>-「국제전화발신차단,「060발신차단」등의 부가서비스 자동 가입</p>
                        <p>- 해외 로밍 이용 제한</p>
                        <p>- 부가통화 기본제공량을 모두 사용하면 자동으로 발신 차단</p>
                      </div>
                    </div>
                    <div className="mt-3 text-gray-700 body-medium font-400 space-y-2">
                      <p>· 청소년 보호 정책이 적용되는 요금제는 최대 1개만 가입할 수 있어요.</p>
                      <p>
                        · 청소년 고객은 「데이터 주기」와 쉐어링을 이용할 수 없기 때문에 쉐어링 전용
                        데이터로 받은 70GB를 테더링용으로 쓸 수 있어요.
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailAccordion;
