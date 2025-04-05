
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchApplicationData, getMockApplicationData } from '@/services/applicationService';
import { Card } from '@/components/ui/card';
import ApplicationStatusBadge from '@/components/ApplicationStatusBadge';
import ApplicationInfoItem from '@/components/ApplicationInfoItem';
import KhuHeader from '@/components/KhuHeader';
import { useToast } from "@/hooks/use-toast";

const Application = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: application, isLoading, error } = useQuery({
    queryKey: ['application', id],
    queryFn: () => id ? fetchApplicationData(id) : getMockApplicationData(),
    meta: {
      onError: (err: Error) => {
        toast({
          title: "오류 발생",
          description: "신청서 정보를 불러오는데 문제가 발생했습니다.",
          variant: "destructive",
        });
        console.error("Failed to load application data", err);
      },
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khu-green mx-auto"></div>
          <p className="mt-4 text-khu-gray font-medium">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">오류 발생</h2>
            <p className="text-gray-700">신청서 정보를 불러오는데 문제가 발생했습니다.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-khu-green text-white rounded-md hover:bg-opacity-90 transition-all"
            >
              다시 시도
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <div className="text-center">
            <h2 className="text-xl font-bold text-khu-gray mb-2">정보 없음</h2>
            <p className="text-gray-700">신청서 정보를 찾을 수 없습니다.</p>
          </div>
        </Card>
      </div>
    );
  }

  // Format time for display (remove seconds)
  const formatTime = (time: string) => {
    if (!time) return '';
    return time.substring(0, 5);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md overflow-hidden shadow-lg">
        <KhuHeader />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-khu-green">강의실 예약 정보</h2>
            <ApplicationStatusBadge status={application.applicationStatus} />
          </div>
          
          <div className="space-y-1">
            <ApplicationInfoItem 
              icon="user" 
              label="신청자" 
              value={application.userName} 
            />
            <ApplicationInfoItem 
              icon="location" 
              label="강의실" 
              value={application.classroom} 
            />
            <ApplicationInfoItem 
              icon="purpose" 
              label="사용 목적" 
              value={application.applicationPurpose} 
            />
            <ApplicationInfoItem 
              icon="calendar" 
              label="예약 날짜" 
              value={application.applicationUseDate} 
            />
            <ApplicationInfoItem 
              icon="clock" 
              label="예약 시간" 
              value={`${formatTime(application.applicationStart)} - ${formatTime(application.applicationEnd)}`} 
            />
          </div>
          
          {application.applicationStatus === "REJECTED" && application.applicationRejectReason && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="text-sm font-medium text-red-800 mb-1">거절 사유</h3>
              <p className="text-sm text-red-700">{application.applicationRejectReason}</p>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>신청일: {application.applicationDate}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Application;
