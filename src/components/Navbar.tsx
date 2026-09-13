import React from 'react';
import {
  BookOpenCheck,
  Crown,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { GradeId } from '../types';
import { useAuth } from '../context/AuthContext';

export type TabType = 'notes' | 'solver' | 'saved' | 'presets';

interface NavbarProps {
  grade: GradeId;
  onGradeChange: (grade: GradeId) => void;
  onlineCount?: number;
  onHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  grade,
  onGradeChange,
  onlineCount = 0,
  onHome,
}) => {
  const gradeLabel = `Lớp ${grade}`;
  const { user, openAuth, openVip, logout } = useAuth();
  const isVip = user?.isVip ?? false;
  return (
    <header className="shrink-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-[52px] sm:h-14 flex items-center gap-2 sm:gap-3">
        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={onHome}
          className="flex items-center gap-2 cursor-pointer select-none group flex-shrink-0 min-w-0"
          title="Về bảng điều khiển"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <BookOpenCheck className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight whitespace-nowrap">
                Học Tập <span className="text-indigo-600">{gradeLabel}</span>
              </span>
              <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70 px-1.5 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                GDPT 2018
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden lg:block truncate">
              Soạn bài & Giải bài theo Lời Giải Hay — dùng có kiểm chứng
            </p>
          </div>
        </div>

        {/* Back to dashboard */}
        {onHome && (
          <button
            onClick={onHome}
            title="Về bảng điều khiển"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors shrink-0"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bảng điều khiển</span>
          </button>
        )}

        {/* Online Banner */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 shrink-0">
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold text-emerald-700 whitespace-nowrap">
            {onlineCount > 0 ? `${onlineCount} online` : 'Đang kết nối...'}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          {/* Grade Switcher */}
          <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-xl bg-slate-100 border border-slate-200">
            {(['9', '10', '11', '12'] as GradeId[]).map((g) => (
              <button
                key={g}
                onClick={() => onGradeChange(g)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all duration-150 ${
                  grade === g
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Auth & VIP */}
          <button
            onClick={openVip}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-150 shadow-sm ${
              isVip
                ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-white hover:opacity-90'
                : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white hover:opacity-90'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-yellow-200" />
            {isVip ? 'VIP' : 'VIP'}
          </button>

          {user ? (
            <>
              <span
                title={user.email}
                className="hidden sm:block max-w-[120px] truncate px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
              >
                {user.name || user.email.split('@')[0]}
              </span>
              <button
                onClick={logout}
                title="Đăng xuất"
                className="flex items-center justify-center w-8 h-8 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={openAuth}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
