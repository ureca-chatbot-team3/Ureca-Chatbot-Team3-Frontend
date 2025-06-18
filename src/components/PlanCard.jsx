import React from 'react';

const PlanCard = ({ imagePath, name, infos, plan_speed, price, sale_price, benefits = [] }) => {
  return (
    <div className="w-[300px] h-[592px] bg-white rounded-[20px] flex flex-col items-center p-4 box-border">
      {/* 이미지 */}
      <div className="w-[246px] h-[224px] rounded-[20px] overflow-hidden">
        <img
          src={imagePath || '/noImageImg.png'}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[22px]" />

      {/* 이름 */}
      <h2 className="heading-3 font-700 text-black">{name}</h2>
      <div className="h-[25px]" />
      <div className="w-full border-t" style={{ borderColor: 'var(--color-gray-500)' }} />
      <div className="h-[10px]" />

      {/* infos, plan_speed */}
      <div className="flex flex-col items-start w-full px-1">
        <span className="heading-3 font-500 text-black">{infos}</span>
        <span className="heading-3 font-500 text-black">{plan_speed}</span>
      </div>
      <div className="h-[20px]" />

      {/* price, sale_price */}
      <div className="flex flex-col items-start w-full px-1">
        <span className="body-large font-500 text-pink-700 mb-1">{price}</span>
        <span className="body-large font-500 text-black">{sale_price}</span>
      </div>

      <div className="h-[10px]" />
      <div className="w-full border-t" style={{ borderColor: 'var(--color-gray-500)' }} />
      <div className="h-[10px]" />

      {/* benefits */}
      <div className="flex flex-col items-start w-full px-1 mt-2 space-y-[4px]">
        {benefits.map((benefit, index) => (
          <span key={index} className="body-small font-300 text-black">
            {benefit}
          </span>
        ))}
      </div>
      <div className="h-[35px]" />
    </div>
  );
};

export default PlanCard;
