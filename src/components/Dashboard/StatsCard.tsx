import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorVariants = {
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
  orange: 'bg-orange-50 text-orange-600 border-orange-200',
  red: 'bg-red-50 text-red-600 border-red-200',
};

const changeColors = {
  increase: 'text-green-600',
  decrease: 'text-red-600',
  neutral: 'text-gray-600',
};

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color 
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className={`text-sm font-medium mt-2 ${changeColors[changeType]}`}>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-lg border ${colorVariants[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}