'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imagePath?: string;
  description?: string;
  ingredients?: string[];
  badge?: string;
  isSelected: boolean;
  onToggle: () => void;
  imageStyle?: 'cover' | 'contain'; // Style de l'image
}

export default function ProductCard({
  name,
  price,
  imagePath,
  description,
  ingredients,
  badge,
  isSelected,
  onToggle,
  imageStyle = 'cover', // Par défaut: cover (zoom)
}: ProductCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative group text-left w-full rounded-xl overflow-hidden transition-all duration-300 bg-white animate-slide-up ${
        isSelected
          ? 'ring-2 ring-blue-500 shadow-lg scale-[1.02]'
          : 'ring-1 ring-slate-200 hover:ring-blue-300 hover:shadow-md'
      }`}
    >
      {/* Image container */}
      <div className="relative h-48 bg-white overflow-hidden">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={name}
            fill
            className={`group-hover:scale-105 transition-transform duration-500 ${
              imageStyle === 'contain' ? 'object-contain p-2' : 'object-cover'
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <span className="text-5xl opacity-20">🍕</span>
            </div>
          </div>
        )}

        {/* Badge Alcool en rouge */}
        {badge && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md animate-slide-in">
            {badge}
          </div>
        )}

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-3 left-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-1.5 shadow-lg animate-scale-in">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-slate-900 group-hover:text-slate-700 transition-colors">
            {name}
          </h3>
          <span className="text-xl font-bold text-slate-900 ml-3">
            {price.toFixed(2)}€
          </span>
        </div>

        {description && (
          <p className="text-sm text-slate-500 mb-3">{description}</p>
        )}

        {ingredients && ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded-md border border-slate-200 transition-colors hover:bg-slate-100"
              >
                {ingredient}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
