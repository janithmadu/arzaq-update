"use client";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

export const revalidate = 1;

interface Image {
  id: string;
  photoUrl: string; // Ensures URL format
  altText?: string; // Alt text is optional
}

interface ImagesProps {
  images: Image[];
}

function ImageGallery({ images }: ImagesProps) {
  const [selectedImage, setSelectedImage] = useState(
    images?.[0]?.photoUrl || "/placeholder.jpg" // Default to the first image or a placeholder
  );
  const [loading, setLoading] = useState(false); // Loading state for the main image

  const handleImageChange = (photoUrl: string) => {
    setLoading(true);
    setSelectedImage(photoUrl);
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Main Image */}
      <div className="flex justify-center items-center bg-grayscale20 rounded-lg overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        <CldImage
          width={500} // Main image width
          height={350} // Main image height
          loading="lazy"
          src={selectedImage}
          alt="Main Product Image"
          className="  object-contain w-full max-w-[500px] max-h-[400px] bg-grayscale20"
          onLoad={() => setLoading(false)} // Remove loader when the image loads
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-x-3 overflow-x-auto">
        {images.map((image, index) => (
          <CldImage
            key={image.id || index}
            loading="lazy"
            src={image.photoUrl || "/placeholder.jpg"} // Fallback to a placeholder if no URL
            alt={image.altText || `Thumbnail ${index + 1}`}
            width={60} // Thumbnail width
            height={60} // Thumbnail height
            className={`cursor-pointer rounded-lg  bg-none object-cover h-16 w-16 ${
              selectedImage === image.photoUrl ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleImageChange(image.photoUrl)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
