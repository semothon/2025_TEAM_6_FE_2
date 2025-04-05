
import React from 'react';
import { Badge } from "@/components/ui/badge";

type StatusType = "APPROVED" | "PENDING" | "REJECTED" | string;

interface ApplicationStatusBadgeProps {
  status: StatusType;
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "APPROVED":
        return { text: "승인됨", variant: "bg-green-500 hover:bg-green-600" };
      case "PENDING":
        return { text: "대기 중", variant: "bg-yellow-500 hover:bg-yellow-600" };
      case "REJECTED":
        return { text: "거절됨", variant: "bg-red-500 hover:bg-red-600" };
      default:
        return { text: status, variant: "bg-gray-500 hover:bg-gray-600" };
    }
  };

  const { text, variant } = getStatusConfig(status);

  return (
    <Badge className={`${variant} text-white font-medium`}>
      {text}
    </Badge>
  );
};

export default ApplicationStatusBadge;
