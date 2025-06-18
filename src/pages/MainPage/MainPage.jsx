import PlanCard from '@/components/PlanCard';

const mockData = {
  imagePath: '/sampleImage.jpg',
  name: '요금제 A',
  infos: '20GB + 100분',
  plan_speed: '5G 초고속',
  price: '월 49,000원',
  sale_price: '할인가 39,000원',
  benefits: ['넷플릭스 3개월 제공', '데이터 리필 2회', '해외 로밍 지원'],
};

const MainPage = () => {
  return (
    <main className="bg-black text-white min-h-screen p-10">
      <div className="flex justify-center">
        <PlanCard
          imagePath={mockData.imagePath}
          name={mockData.name}
          infos={mockData.infos}
          plan_speed={mockData.plan_speed}
          price={mockData.price}
          sale_price={mockData.sale_price}
          benefits={mockData.benefits}
        />
      </div>
    </main>
  );
};

export default MainPage;
