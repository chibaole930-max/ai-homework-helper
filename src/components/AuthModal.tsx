import React, { useState } from 'react';
import { X, LogIn, UserPlus, Crown, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { authOpen, login, register, openVip, closeModals } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!authOpen) return null;

  const switchMode = (m: 'login' | 'register') => {
    setMode(m);
    setError(null);
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === 'register' && name.trim().length < 2) {
      setError('Vui lòng nhập tên hiển thị.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Email không hợp lệ.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    setBusy(true);
    const err =
      mode === 'login'
        ? await login(email.trim(), password)
        : await register(name.trim(), email.trim(), password);
    setBusy(false);
    if (err) setError(err);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-announce-backdrop"
        onClick={closeModals}
      />
      <div className="relative animate-announce-in w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-tr from-indigo-600 via-blue-600 to-sky-500 px-6 py-5 relative">
          <button
            onClick={closeModals}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
            <Crown className="w-6 h-6 text-yellow-300" />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {mode === 'login' ? 'Đăng nhập tài khoản' : 'Tạo tài khoản học sinh'}
          </h2>
          <p className="text-sm text-indigo-100 mt-0.5">
            Lưu bài ghi, theo dõi hạn mức AI và kích hoạt gói VIP
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-2 mb-5">
            <button
              onClick={() => switchMode('login')}
              className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                mode === 'login'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Đăng nhập
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                mode === 'register'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Đăng ký
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Tên hiển thị
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Minh Anh"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ban@email.com"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="It nhất 6 ký tự"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-bold py-3 text-sm shadow-md hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'login' ? 'Đăng nhập' : 'Đăng ký miễn phí'}
            </button>
          </form>

          <button
            onClick={() => openVip()}
            className="mt-4 w-full text-center text-xs font-bold text-amber-700 hover:text-amber-600 underline decoration-dotted underline-offset-4"
          >
            Đã có mã VIP? Nhập mã để mở khóa ngay
          </button>
        </div>
      </div>
    </div>
  );
};