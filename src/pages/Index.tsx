
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import KhuHeader from '@/components/KhuHeader';

const Index = () => {
  const navigate = useNavigate();

  // Function to extract application ID from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const applicationId = urlParams.get('id');
    
    if (applicationId) {
      navigate(`/application/${applicationId}`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md overflow-hidden shadow-lg">
        <KhuHeader />
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-khu-green mb-4">강의실 예약 시스템</h2>
          <p className="text-gray-700 mb-6">
            경희대학교 강의실 예약 정보를 확인하려면 공유받은 URL을 통해 접속하세요.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              URL 형식: https://your-app-url.com?id=예약번호
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
