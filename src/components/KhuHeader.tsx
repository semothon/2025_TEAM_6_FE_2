
import React from 'react';

const KhuHeader: React.FC = () => {
  return (
    <div className="bg-khu-green text-white p-4 rounded-t-lg shadow-md">
      <h1 className="text-xl font-bold text-center">경희대학교</h1>
      <p className="text-sm text-center mt-1 text-khu-lightgray">강의실 예약 정보</p>
    </div>
  );
};

export default KhuHeader;
