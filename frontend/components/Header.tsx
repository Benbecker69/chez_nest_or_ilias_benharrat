'use client';

import Image from 'next/image';
import SearchBar from './ui/SearchBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo and title */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src="/images/logo/logo_nest_or.png"
                alt="Chez Nest-Or Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Chez Nest-Or
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Pizzeria italienne
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="w-full lg:w-auto lg:flex-1 lg:max-w-2xl">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Rechercher une pizza, boisson ou dessert..."
            />
          </div>
        </div>
      </div>
    </header>
  );
}
