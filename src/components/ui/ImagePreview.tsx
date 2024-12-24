"use client";

import { CheckCircle } from "lucide-react";

interface ImagePreviewProps {
  image: string;
  title: string;
}

export function ImagePreview({ image, title }: ImagePreviewProps) {
  return (
    <div className="relative">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover aspect-[3/4]"
        />
        <div className="absolute top-1/4 right-4 bg-white rounded-lg p-3 shadow-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="absolute bottom-1/4 right-8 bg-yellow-100 rounded-lg px-3 py-1 shadow-lg">
          <span className="text-sm font-medium text-yellow-800">
            Follow the Tip
          </span>
        </div>
      </div>
    </div>
  );
}
