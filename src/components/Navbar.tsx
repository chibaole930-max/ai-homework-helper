import React from 'react';
import {
  BookOpenCheck,
  Edit3,
  HelpCircle,
  FolderHeart,
  Sparkles,
  Library,
} from 'lucide-react';

export type TabType = 'notes' | 'solver' | 'saved' | 'presets';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-16 lg:gap-3 gap-1">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => setActiveTab('notes')}
            className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0 pt-2.5 pb-1 lg:py-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform duration-200">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight whitespace-nowrap">
                  Học Tập <span className="text-indigo-600">Lớp 12</span>
                </span>
                <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70 px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                  GDPT 2018
                </span>
                <a
                  href="https://loigiaihay.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300/80 px-2 py-0.5 rounded-full transition-colors"
                  title="Nguồn tham khảo học liệu: https://loigiaihay.com/"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>loigiaihay.com</span>
                </a>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden lg:block">
                Soạn bài & Giải bài tập 11 môn Lớp 12 dựa trên nguồn Lời Giải Hay
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              id="tab-soan-bai"
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Soạn Bài Ghi</span>
            </button>

            <button
              id="tab-giai-bai"
              onClick={() => setActiveTab('solver')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                activeTab === 'solver'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Giải Bài Tập</span>
            </button>

            <button
              id="tab-kho-bai-mau"
              onClick={() => setActiveTab('presets')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                activeTab === 'presets'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Library className="w-4 h-4" />
              <span className="hidden sm:inline">Kho Bài Mẫu</span>
              <span className="sm:hidden">Bài Mẫu</span>
            </button>

            <button
              id="tab-vo-ghi"
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                activeTab === 'saved'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderHeart className="w-4 h-4" />
              <span>Vở Ghi</span>
              {savedCount > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    activeTab === 'saved'
                      ? 'bg-white text-indigo-700'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {savedCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
