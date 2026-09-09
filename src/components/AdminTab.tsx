import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Lock,
  Loader2,
  Save,
  LogOut,
  Megaphone,
  Wrench,
  X,
  Check,
  ClipboardList,
  Hourglass,
  Eye,
  Trash2,
  BarChart3,
  Users,
  HeartHandshake,
  ImagePlus,
} from 'lucide-react';

interface SiteSettings {
  maintenance: { enabled: boolean; message: string };
  announcement: { enabled: boolean; text: string };
  donate: { enabled: boolean; qrImage: string; note: string };
}

interface StatsOverview {
  today: string;
  todayEvents: Record<string, number>;
  uniqueToday: number;
  totals: Record<string, number>;
  daily: {
    day: string;
    events: Record<string, number>;
    uniqueVisitors: number;
  }[];
}

const STAT_EVENT_LABELS: Record<string, string> = {
  page_view: 'Lượt xem',
  lesson_note: 'Soạn bài',
  solve_exercise: 'Giải bài',
  tutor_followup: 'Hỏi đáp',
  community_share: 'Chia sẻ',
};

interface PendingPresetItem {
  id: string;
  type: string;
  title: string;
  subject: string;
  subjectId: string;
  textbook: string;
  content: string;
  date: string;
  style?: string;
  author: string;
  source: 'auto' | 'manual';
  createdAt: string;
}

const TOKEN_KEY = 'admin_token';

export default function AdminTab() {
  const [token, setToken] = useState<string>(
    () => sessionStorage.getItem(TOKEN_KEY) || ''
  );
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const qrInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [pending, setPending] = useState<PendingPresetItem[]>([]);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [pendingBusy, setPendingBusy] = useState<string | null>(null);
  const [pendingMsg, setPendingMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setPendingLoading(true);
    fetch('/api/admin/settings', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (r.status === 401) {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken('');
          return null;
        }
        if (!r.ok) throw new Error('Không tải được cài đặt.');
        return r.json();
      })
      .then((d) => {
        if (d) setSettings(d as SiteSettings);
      })
      .catch((err) => setSaveMsg({ ok: false, text: err.message }))
      .finally(() => setLoading(false));
    fetch('/api/admin/pending', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error('Không tải được danh sách duyệt.');
        const d = await r.json();
        setPending(d.items || []);
      })
      .catch((err) =>
        setPendingMsg({ ok: false, text: err.message || 'Không tải được.' })
      )
      .finally(() => setPendingLoading(false));
    setStatsLoading(true);
    fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error('Không tải được thống kê.');
        return r.json();
      })
      .then((d) => setStats(d as StatsOverview))
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, [token]);

  const refreshStats = () => {
    if (!token) return;
    setStatsLoading(true);
    fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error('Không tải được thống kê.');
        return r.json();
      })
      .then((d) => setStats(d as StatsOverview))
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  };

  const handleApprovePending = async (id: string) => {
    setPendingBusy(id);
    setPendingMsg(null);
    try {
      const res = await fetch(`/api/admin/pending/${id}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Không duyệt được.');
      setPending(data.items || []);
      setPendingMsg({ ok: true, text: data.message || 'Đã duyệt.' });
    } catch (err: any) {
      setPendingMsg({ ok: false, text: err.message || 'Không duyệt được.' });
    } finally {
      setPendingBusy(null);
    }
  };

  const handleRejectPending = async (id: string) => {
    setPendingBusy(id);
    setPendingMsg(null);
    try {
      const res = await fetch(`/api/admin/pending/${id}/reject`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Không bỏ được.');
      setPending(data.items || []);
      setPendingMsg({ ok: true, text: data.message || 'Đã bỏ bài.' });
    } catch (err: any) {
      setPendingMsg({ ok: false, text: err.message || 'Không bỏ được.' });
    } finally {
      setPendingBusy(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Đăng nhập thất bại.');
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Đăng nhập thất bại.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Không lưu được cài đặt.');
      setSettings(data as SiteSettings);
      setSaveMsg({ ok: true, text: 'Đã lưu và áp dụng cho toàn bộ người dùng.' });
      setTimeout(() => setSaveMsg(null), 3000);
    } catch (err: any) {
      setSaveMsg({ ok: false, text: err.message || 'Không lưu được cài đặt.' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    fetch('/api/admin/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setSettings(null);
  };

  const handleQrUpload = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setSaveMsg({ ok: false, text: 'Vui lòng chọn file ảnh (PNG/JPG/WebP...).' });
      return;
    }
    if (file.size > 1500 * 1024) {
      setSaveMsg({ ok: false, text: 'Ảnh quá lớn (tối đa 1.5MB).' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      setSettings((prev) =>
        prev ? { ...prev, donate: { ...prev.donate, qrImage: dataUrl } } : prev
      );
      setSaveMsg({ ok: true, text: 'Đã đọc ảnh QR thành công. Nhấn Lưu cài đặt để áp dụng.' });
    };
    reader.onerror = () =>
      setSaveMsg({ ok: false, text: 'Không đọc được file ảnh.' });
    reader.readAsDataURL(file);
  };

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleLogin}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900">Quản Trị Web Admin</h1>
              <p className="text-xs text-slate-500">
                Trang dành cho quản trị viên. Nhập mật khẩu quản trị để tiếp tục.
              </p>
            </div>

            <label className="block">
              <span className="text-xs font-bold text-slate-600 mb-1 block">Mật khẩu quản trị</span>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
              </div>
            </label>

            {loginError && (
              <div className="px-3 py-2 rounded-xl text-xs bg-red-50 border border-red-200 text-red-700">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn || !password.trim()}
              className="w-full py-2.5 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white flex items-center justify-center gap-2"
            >
              {loggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang kiểm tra...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Đăng Nhập Quản Trị
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              Để đăng nhập được, admin phải khai báo biến môi trường{' '}
              <code className="bg-slate-100 px-1 rounded">ADMIN_PASSWORD</code> trên server.
            </p>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Trang Quản Trị</h1>
            <p className="text-xs text-slate-500">Bảo trì hệ thống & gửi thông báo</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          Đăng Xuất
        </button>
      </div>

      {saveMsg && (
        <div
          className={`px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 ${
            saveMsg.ok
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {saveMsg.ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {saveMsg.text}
        </div>
      )}

      {/* Chế độ bảo trì */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-100 text-amber-600">
              <Wrench className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Chế Độ Bảo Trì</h2>
              <p className="text-[11px] text-slate-500">
                Khi bật: khóa AI soạn bài/giải bài & đóng góp bài mẫu, người dùng thấy màn hình bảo trì.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={settings?.maintenance.enabled || false}
              onChange={(e) =>
                setSettings((prev) =>
                  prev
                    ? { ...prev, maintenance: { ...prev.maintenance, enabled: e.target.checked } }
                    : prev
                )
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-amber-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">
            Thông báo bảo trì (hiện cho học sinh)
          </label>
          <textarea
            value={settings?.maintenance.message || ''}
            onChange={(e) =>
              setSettings((prev) =>
                prev
                  ? { ...prev, maintenance: { ...prev.maintenance, message: e.target.value } }
                  : prev
              )
            }
            rows={2}
            placeholder="VD: Hệ thống đang nâng cấp, vui lòng quay lại lúc 14h."
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none"
          />
        </div>
      </div>

      {/* Gửi thông báo */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-sky-100 text-sky-600">
              <Megaphone className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Thông Báo Cho Học Sinh</h2>
              <p className="text-[11px] text-slate-500">
                Banner toàn trang, có nút đóng. Sửa/xóa bất kỳ lúc nào.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={settings?.announcement.enabled || false}
              onChange={(e) =>
                setSettings((prev) =>
                  prev
                    ? { ...prev, announcement: { ...prev.announcement, enabled: e.target.checked } }
                    : prev
                )
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-sky-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
          </label>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">Nội dung thông báo</label>
          <textarea
            value={settings?.announcement.text || ''}
            onChange={(e) =>
              setSettings((prev) =>
                prev
                  ? { ...prev, announcement: { ...prev.announcement, text: e.target.value } }
                  : prev
              )
            }
            rows={3}
            placeholder="VD: Tuần này hệ thống bình thường. Chúc các em học tốt!"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100 outline-none"
          />
        </div>

        <div className="px-3 py-2 rounded-xl bg-slate-50 text-[11px] text-slate-500 flex items-start gap-1.5">
          <ClipboardList className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>
            Nhấn <b>Lưu cài đặt</b> bên dưới để áp dụng ngay. Nếu chưa kích hoạt bảo trì, banner thông
            báo sẽ hiện trên mọi trang trong ~60 giây.
          </span>
        </div>
      </div>

      {/* Ủng hộ / Donate */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-rose-100 text-rose-600">
              <HeartHandshake className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Ủng Hộ / Donate</h2>
              <p className="text-[11px] text-slate-500">
                Công khai mã QR để học sinh biết ơn & ủng hộ. Hiển thị nút trên web.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={settings?.donate.enabled || false}
              onChange={(e) =>
                setSettings((prev) =>
                  prev
                    ? { ...prev, donate: { ...prev.donate, enabled: e.target.checked } }
                    : prev
                )
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-rose-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
          </label>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1.5 block">
            Ảnh mã QR nhận tiền
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {settings?.donate.qrImage ? (
              <div className="relative shrink-0">
                <img
                  src={settings.donate.qrImage}
                  alt="Mã QR donate"
                  className="w-36 h-36 object-contain rounded-2xl border border-slate-200 bg-white p-1"
                />
                <button
                  onClick={() =>
                    setSettings((prev) =>
                      prev
                        ? {
                            ...prev,
                            donate: {
                              ...prev.donate,
                              qrImage: '',
                            },
                          }
                        : prev
                    )
                  }
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow"
                  title="Xóa ảnh QR"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => qrInputRef.current?.click()}
                className="w-36 h-36 shrink-0 rounded-2xl border-2 border-dashed border-slate-300 hover:border-rose-400 hover:bg-rose-50 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors"
              >
                <ImagePlus className="w-7 h-7" />
                <span className="text-[11px] font-bold">Chọn ảnh QR</span>
              </button>
            )}
            <div className="flex-1 space-y-2 w-full">
              <input
                ref={qrInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleQrUpload(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
              <button
                onClick={() => qrInputRef.current?.click()}
                disabled={!settings?.donate.qrImage}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ImagePlus className="w-3.5 h-3.5" />
                {settings?.donate.qrImage ? 'Đổi ảnh QR' : 'Chọn ảnh QR'}
              </button>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Chọn ảnh mã QR (VNPAY, MoMo, ngân hàng...). File được lưu an toàn phía server, tối đa 1.5MB.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">
            Lời kêu gọi (hiện kèm mã QR cho học sinh)
          </label>
          <textarea
            value={settings?.donate.note || ''}
            onChange={(e) =>
              setSettings((prev) =>
                prev
                  ? { ...prev, donate: { ...prev.donate, note: e.target.value } }
                  : prev
              )
            }
            rows={2}
            placeholder="VD: Cảm ơn bạn đã ủng hộ để web duy trì miễn phí cho mọi học sinh!"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none"
          />
        </div>

        <div className="px-3 py-2 rounded-xl bg-slate-50 text-[11px] text-slate-500 flex items-start gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>
            Khi bật và có ảnh QR, web sẽ <b className="text-rose-500">tự động hiện popup</b>{' '}
            ủng hộ khi học sinh vào web (1 lần/mỗi phiên truy cập).
          </span>
        </div>
      </div>

      {/* Thống kê sử dụng thật */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-teal-100 text-teal-600">
              <BarChart3 className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Thống Kê Sử Dụng Thật</h2>
              <p className="text-[11px] text-slate-500">
                Số liệu real đếm trực tiếp từ request thực tế của người dùng.
              </p>
            </div>
          </div>
          <button
            onClick={refreshStats}
            disabled={statsLoading}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50"
          >
            {statsLoading ? 'Đang tải...' : 'Làm mới'}
          </button>
        </div>

        {statsLoading && !stats ? (
          <div className="py-6 flex justify-center text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="rounded-xl bg-violet-50 border border-violet-200 px-3 py-2.5">
                <div className="text-[10px] font-bold text-violet-500 uppercase flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Người dùng hôm nay
                </div>
                <div className="text-lg font-extrabold text-violet-700 mt-0.5">
                  {stats.uniqueToday.toLocaleString('vi-VN')}
                </div>
              </div>
              {Object.keys(STAT_EVENT_LABELS).map((ev) => (
                <div key={ev} className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">
                    {STAT_EVENT_LABELS[ev]} hôm nay
                  </div>
                  <div className="text-lg font-extrabold text-slate-800 mt-0.5">
                    {(stats.todayEvents[ev] || 0).toLocaleString('vi-VN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 px-1">
              <span className="font-bold text-slate-600">Tổng cộng:</span>
              {Object.keys(STAT_EVENT_LABELS).map((ev) => (
                <span key={ev}>
                  {STAT_EVENT_LABELS[ev]} <b className="text-slate-800">{(stats.totals[ev] || 0).toLocaleString('vi-VN')}</b>
                </span>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-200">
                    <th className="text-left py-1.5 font-bold">Ngày</th>
                    <th className="text-right py-1.5 font-bold">Người dùng</th>
                    {Object.keys(STAT_EVENT_LABELS).map((ev) => (
                      <th key={ev} className="text-right py-1.5 font-bold">
                        {STAT_EVENT_LABELS[ev]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...stats.daily].reverse().map((row) => {
                    const [y, m, d] = row.day.split('-');
                    const isToday = row.day === stats.today;
                    return (
                      <tr key={row.day} className="border-b border-slate-100">
                        <td className="py-1.5 text-slate-600 font-semibold">
                          {isToday ? 'Hôm nay' : `${d}/${m}`}
                        </td>
                        <td className="py-1.5 text-right font-bold text-violet-700">
                          {row.uniqueVisitors}
                        </td>
                        {Object.keys(STAT_EVENT_LABELS).map((ev) => (
                          <td key={ev} className="py-1.5 text-right text-slate-700">
                            {row.events[ev] || 0}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>

      {/* Duyệt bài mẫu chờ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-violet-100 text-violet-600">
              <Hourglass className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Duyệt Bài Mẫu Chờ</h2>
              <p className="text-[11px] text-slate-500">
                Bài soạn AI & chia sẻ thủ công chờ admin duyệt. Duyệt để đưa vào Kho chung.
              </p>
            </div>
          </div>
          {!pendingLoading && pending.length > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
              {pending.length} bài
            </span>
          )}
        </div>

        {pendingMsg && (
          <div
            className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 ${
              pendingMsg.ok
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {pendingMsg.ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            {pendingMsg.text}
          </div>
        )}

        {pendingLoading ? (
          <div className="py-6 flex justify-center text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : pending.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            Không có bài nào đang chờ duyệt.
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((item) => (
              <div key={item.id} className="border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-800 break-words">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {item.subject}
                      {item.textbook ? ` • ${item.textbook}` : ''}
                      {item.style ? ` • ${item.style}` : ''} • {item.author} • {item.date}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.source === 'auto'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.source === 'auto' ? 'AI tự động' : 'Chia sẻ tay'}
                  </span>
                </div>

                <details className="group">
                  <summary className="cursor-pointer text-[11px] font-bold text-slate-600 hover:text-slate-800 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    Xem trước nội dung
                  </summary>
                  <div className="mt-2 bg-slate-50 rounded-lg p-2.5 text-[11px] text-slate-700 whitespace-pre-wrap max-h-60 overflow-auto leading-relaxed">
                    {item.content.slice(0, 3000)}
                    {item.content.length > 3000 ? (
                      <span className="text-slate-400"> … (đã cắt hiển thị)</span>
                    ) : null}
                  </div>
                </details>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleApprovePending(item.id)}
                    disabled={pendingBusy === item.id}
                    className="px-4 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white flex items-center gap-1.5"
                  >
                    {pendingBusy === item.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    Duyệt
                  </button>
                  <button
                    onClick={() => handleRejectPending(item.id)}
                    disabled={pendingBusy === item.id}
                    className="px-4 py-1.5 text-xs font-bold rounded-xl bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-700 border border-red-200 flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Bỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || !settings}
          className="px-6 py-2.5 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Lưu cài đặt
            </>
          )}
        </button>
      </div>
    </div>
  );
}