import React, { useState } from 'react';
import { X, Crown, Ticket, CheckCircle2, Loader2, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PLANS = [
  {
    id: '1m',
    name: '1 Tháng',
    price: '49.000đ',
    per: '30 ngày',
    tag: 'Phổ biến',
    highlight: true,
  },
  { id: '3m', name: '3 Tháng', price: '119.000đ', per: '90 ngày', tag: '', highlight: false },
  { id: '1y', name: '1 Năm', price: '399.000đ', per: '365 ngày', tag: 'Tiết kiệm 32%', highlight: false },
];

const formatDate = (iso: string | null) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

export const VipModal: React.FC = () => {
  const { vipOpen, user, loading, redeem, openAuth, closeModals } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!vipOpen) return null;

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!code.trim()) {
      setError('Vui lòng nhập mã kích hoạt.');
      return;
    }
    setBusy(true);
    const err = await redeem(code.trim());
    setBusy(false);
    if (err) {
      setError(err);
    } else {
      setSuccess('Kích hoạt thành công! Chúc bạn học tập vui vẻ.');
      setCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-announce-backdrop"
        onClick={closeModals}
      />
      <div className="relative animate-announce-in w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 px-6 py-5 relative">
          <button
            onClick={closeModals}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/25 flex items-center justify-center mb-3">
            <Crown className="w-6 h-6 text-yellow-300" />
          </div>
          <h2 className="text-xl font-extrabold text-white">Nâng cấp VIP</h2>
          <p className="text-sm text-orange-100 mt-0.5">
            AI không giới hạn + truy cập trọn Kho bài mẫu cộng đồng
          </p>
        </div>

        <div className="p-6 space-y-5">
          {loading ? (
            <div className="text-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Đang kiểm tra tài khoản...</p>
            </div>
          ) : !user ? (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-center">
              <p className="text-sm font-bold text-amber-800 mb-2">
                Bạn cần đăng nhập để nhập mã kích hoạt VIP
              </p>
              <button
                onClick={openAuth}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold px-4 py-2.5 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Đăng nhập / Đăng ký
              </button>
            </div>
          ) : user.isVip ? (
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-emerald-800">
                  Bạn đang là thành viên VIP!
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Hiệu lực đến: <b>{formatDate(user.vipUntil)}</b>
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-sm font-bold text-slate-700">Tài khoản: {user.email}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Chưa kích hoạt VIP — AI còn giới hạn 3 lượt/ngày
              </p>
            </div>
          )}

          <form onSubmit={handleRedeem} className="space-y-2">
            <label className="text-xs font-bold text-slate-600 block">
              Nhập mã kích hoạt VIP
            </label>
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="VD: VIP1-XXXX-XXXX-XXXX"
                disabled={!user}
                className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm tracking-wider font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-slate-100 disabled:text-slate-400"
              />
              <button
                type="submit"
                disabled={busy || !user}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold px-4 text-sm shadow-md hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {busy ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Ticket className="w-4 h-4" />
                )}
                Kích hoạt
              </button>
            </div>
            {error && (
              <div className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {success}
              </div>
            )}
          </form>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-slate-800">Chọn gói VIP</h3>
              <span className="text-[11px] text-slate-400">Giá từ {PLANS[0].price}</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {PLANS.map((p) => (
                <div
                  key={p.id}
                  className={`relative rounded-2xl border p-3 text-center ${
                    p.highlight
                      ? 'border-amber-400 bg-amber-50 shadow-sm'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  {p.tag && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-amber-600 text-white rounded-full px-2 py-0.5 whitespace-nowrap">
                      {p.tag}
                    </span>
                  )}
                  <p className="text-xs font-bold text-slate-700">{p.name}</p>
                  <p className="text-base font-extrabold text-amber-600 mt-0.5">
                    {p.price}
                  </p>
                  <p className="text-[11px] text-slate-400">{p.per}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
              Hướng dẫn: chọn gói, chuyển khoản/Momo theo số liên hệ bên dưới, rồi chủ web gửi
              mã kích hoạt cho bạn. Nhập mã để mở khóa ngay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};