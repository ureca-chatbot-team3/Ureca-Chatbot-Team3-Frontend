import PlanCard from '@/components/PlanCard';

const mockData = {
  id: 'mock-plan-1', // 목 데이터용 ID 추가
  imagePath: null,
  name: '요금제 A',
  infos: '20GB + 100분',
  plan_speed: '5G 초고속',
  price: '월 49,000원',
  sale_price: '할인가 39,000원',
  benefits: ['넷플릭스 3개월 제공'],
  price_value: 50000,
  sale_price_value: 40000,
};

const MainPage = () => {
  return (
    <main className="bg-black text-white min-h-screen p-10">
      <div className="flex justify-center">
        <PlanCard
          id={mockData.id}
          imagePath={mockData.imagePath}
          name={mockData.name}
          infos={mockData.infos}
          plan_speed={mockData.plan_speed}
          price_value={mockData.price_value}
          sale_price_value={mockData.sale_price_value}
          benefits={mockData.benefits}
        />
      </div>
    </main>
  );
};

export default MainPage;
