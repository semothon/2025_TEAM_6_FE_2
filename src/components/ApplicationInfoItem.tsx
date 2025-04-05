
import React from 'react';
import { Clock, CalendarDays, MapPin, FileText, User, Phone } from "lucide-react";

interface ApplicationInfoItemProps {
  icon: 'clock' | 'calendar' | 'location' | 'file' | 'purpose' | 'user' | 'phone';
  label: string;
  value: string;
  url?: string;
}

const ApplicationInfoItem: React.FC<ApplicationInfoItemProps> = ({ icon, label, value, url }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'clock':
        return <Clock className="h-5 w-5 text-khu-green" />;
      case 'calendar':
        return <CalendarDays className="h-5 w-5 text-khu-green" />;
      case 'location':
        return <MapPin className="h-5 w-5 text-khu-green" />;
      case 'file':
        return <FileText className="h-5 w-5 text-khu-green" />;
      case 'purpose':
        return <FileText className="h-5 w-5 text-khu-green" />;
      case 'user':
        return <User className="h-5 w-5 text-khu-green" />;
      case 'phone':
        return <Phone className="h-5 w-5 text-khu-green" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-200 last:border-b-0">
      <div className="mt-0.5">{renderIcon()}</div>
      <div className="flex-1">
        <div className="text-sm font-medium text-khu-gray mb-1">{label}</div>
        {url ? (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            {value}
          </a>
        ) : (
          <div className="text-gray-900 font-medium">{value}</div>
        )}
      </div>
    </div>
  );
};

export default ApplicationInfoItem;
