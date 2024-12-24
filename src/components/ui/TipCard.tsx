"use client";

import { LucideIcon } from "lucide-react";

interface TipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export function TipCard({ icon: Icon, title, description, isActive, onClick }: TipCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
        isActive ? 'border-2 border-blue-500' : ''
      }`}
    >
      <div className="flex-shrink-0">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}