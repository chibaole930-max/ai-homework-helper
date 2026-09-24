import React, { useState } from 'react';
import {
  BookOpenCheck,
  Crown,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  User,
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
  const { user, openAuth, openVip, logout } = useAuth();
  const isVip = user?.isVip ?? false;
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = () => {
    setMenuOpen(false);
    onHome?.();
  };

  return (
    <header className="shrink-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-[52px] sm:h-14 flex items-center gap-1 sm:gap-3">
        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={goHome}
          className="flex items-center gap-2 cursor-pointer select-none group flex-shrink-0 min-w-0"
          title="Về bảng điều khiển"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-200/60 group-hover:scale-110 group-active:scale-95 transition-transform duration-200 shrink-0">
            <BookOpenCheck className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight whitespace-nowrap">
                StudyEZ
              </span>
              <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                GDPT 2018
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden lg:block truncate">
              Soạn bài & Giải bài theo Lời Giải Hay — dùng có kiểm chứng
            </p>
          </div>
        </div>

        {/* Back to dashboard (desktop) */}
        {onHome && (
          <button
            onClick={goHome}
            title="Về bảng điều khiển"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 hover:bg-indigo-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 transition-all duration-150 shrink-0"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Bảng điều khiển</span>
          </button>
        )}

        {/* Online Banner (mọi màn hình) */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 shrink-0">
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
          <div className="flex items-center gap-1 px-1 py-1 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 pl-1 pr-0.5 hidden lg:inline">
              Lớp
            </span>
            <select
              value={grade}
              onChange={(e) => onGradeChange(e.target.value as GradeId)}
              className="bg-white border border-slate-200 rounded-lg px-1 py-1 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              title="Chọn lớp"
            >
              {(['6', '7', '8', '9', '10', '11', '12'] as GradeId[]).map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </select>
          </div>

          {/* Auth & VIP (desktop) */}
          <button
            onClick={openVip}
            className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-150 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
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
                className="hidden md:block max-w-[120px] truncate px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
              >
                {user.name || user.email.split('@')[0]}
              </span>
              <button
                onClick={logout}
                title="Đăng xuất"
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={openAuth}
              className="hidden md:block px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 hover:bg-indigo-200 hover:-translate-y-0.5 transition-all duration-150"
            >
              Đăng nhập
            </button>
          )}

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            title="Menu"
            aria-label="Mở menu"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200 active:scale-95 transition-all"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-xl">
          <div className="max-w-7xl mx-auto px-3 py-2 space-y-1">
            <button
              onClick={goHome}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-left"
            >
              <LayoutDashboard className="w-4 h-4" />
              Bảng điều khiển
            </button>
            <button
              onClick={openVip}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-amber-700 hover:bg-amber-50 transition-colors text-left"
            >
              <Crown className="w-4 h-4" />
              {isVip ? 'Gói VIP của bạn' : 'Nâng cấp VIP'}
            </button>
            {user ? (
              <>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-600">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700">
                    <User className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">
                      {user.name || user.email.split('@')[0]}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </>
            ) : (
              <button
                onClick={openAuth}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-indigo-700 hover:bg-indigo-50 transition-colors text-left"
              >
                <User className="w-4 h-4" />
                Đăng nhập / Đăng ký
              </button>
            )}
            <div className="px-3 pt-1.5 pb-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>
                Online:{' '}
                <b className="text-emerald-600">{onlineCount > 0 ? onlineCount : '...'}</b>
              </span>
              <span className="font-semibold uppercase tracking-wide">GDPT 2018</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};