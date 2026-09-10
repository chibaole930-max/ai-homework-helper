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
  CheckCheck,
  Crown,
  Ticket,
  KeyRound,
  Copy,
  ShieldBan,
  ShoppingCart,
  Phone,
  Mail,
  BadgeCheck,
  EyeOff,
  Plus,
  RefreshCw,
  HeartPulse,
} from 'lucide-react';

interface AiKeyConfig {
  id: string;
  name?: string;
  key: string;
  enabled: boolean;
  limit?: number;
}

interface SiteSettings {
  maintenance: {
    enabled: boolean;
    message: string;
    modules?: { note?: boolean; solver?: boolean; presets?: boolean };
  };
  announcement: { enabled: boolean; text: string };
  donate: { enabled: boolean; qrImage: string; note: string };
  ai: { geminiKey: string; keys: AiKeyConfig[] };
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
  grade?: string;
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

  const [vipKeys, setVipKeys] = useState<
    { code: string; plan: string; days: number; status: string; note: string; usedByEmail: string | null; usedAt: string | null; createdAt: string }[] | null
  >(null);
  const [vipKeysLoading, setVipKeysLoading] = useState(false);
  const [genPlan, setGenPlan] = useState<'24h' | '1m' | '3m' | '1y'>('1m');
  const [genCount, setGenCount] = useState(1);
  const [genNote, setGenNote] = useState('');
  const [genBusy, setGenBusy] = useState(false);
  const [genMsg, setGenMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [vipFilter, setVipFilter] = useState<'all' | 'unused' | 'used' | 'void'>('all');

  const [orders, setOrders] = useState<
    { id: string; plan: string; phone: string; email: string; note: string; status: string; createdAt: string }[] | null
  >(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersMsg, setOrdersMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [showAiKey, setShowAiKey] = useState(false);
  const [aiStats, setAiStats] = useState<{
    stats: { key: string; requests: number; successes: number; failures: number; lastError?: string; lastUsedAt?: number }[];
    activeKeys: string[];
  } | null>(null);
  const [aiStatsLoading, setAiStatsLoading] = useState(false);
  const [aiHealth, setAiHealth] = useState<{
    keys: {
      key: string;
      name?: string;
      limit: number;
      usedToday: number;
      remaining: number;
      models: { model: string; cap: number; usedToday: number; remaining: number }[];
      requests: number;
      successes: number;
      failures: number;
    }[];
    summary: {
      totalBudget: number;
      totalUsedToday: number;
      totalRemaining: number;
      avg7: number;
      todayDemand: number;
      activeCount: number;
      neededKeys: number;
      extraKeys: number;
      limitAvg: number;
      resetInMs: number;
      status: 'ok' | 'tight' | 'exhausted';
    };
  } | null>(null);

  const loadAiStats = async () => {
    if (!token) return;
    setAiStatsLoading(true);
    try {
      const [statsRes, healthRes] = await Promise.all([
        fetch('/api/admin/ai-stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/ai-health', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (statsRes.status === 401 || healthRes.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken('');
        return;
      }
      if (!statsRes.ok) throw new Error('Không đọc được thống kê AI.');
      if (!healthRes.ok) throw new Error('Không đọc được sức khỏe key AI.');
      setAiStats(await statsRes.json());
      setAiHealth(await healthRes.json());
    } catch (err: any) {
      setSaveMsg({ ok: false, text: err.message || 'Không đọc được thống kê AI.' });
    } finally {
      setAiStatsLoading(false);
    }
  };

  const aiKeyRows = settings?.ai?.keys || [];

  const addAiKey = () => {
    setSettings((prev) =>
      prev
        ? {
            ...prev,
            ai: {
              ...prev.ai,
              keys: [
                ...(prev.ai.keys || []),
                {
                  id: `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
                  name: '',
                  key: '',
                  enabled: true,
                },
              ],
            },
          }
        : prev
    );
  };

  const patchAiKey = (id: string, patch: Partial<AiKeyConfig>) => {
    setSettings((prev) =>
      prev
        ? {
            ...prev,
            ai: {
              ...prev.ai,
              keys: (prev.ai.keys || []).map((k) => (k.id === id ? { ...k, ...patch } : k)),
            },
          }
        : prev
    );
  };

  const removeAiKey = (id: string) => {
    setSettings((prev) =>
      prev
        ? { ...prev, ai: { ...prev.ai, keys: (prev.ai.keys || []).filter((k) => k.id !== id) } }
        : prev
    );
  };

  const loadOrders = async () => {
    if (!token) return;
    setOrdersLoading(true);
    try {
      const res = await fetch('/api/vip/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken('');
        return;
      }
      if (!res.ok) throw new Error('Không tải được đơn hàng.');
      const d = await res.json();
      setOrders(d.orders || []);
    } catch (err: any) {
      setOrdersMsg({ ok: false, text: err.message || 'Không tải được đơn hàng.' });
    } finally {
      setOrdersLoading(false);
    }
  };

  const toggleOrder = async (id: string) => {
    setOrdersMsg(null);
    try {
      const res = await fetch(`/api/vip/orders/${encodeURIComponent(id)}/toggle`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Không cập nhật được.');
      setOrders(d.orders || []);
      setOrdersMsg({ ok: true, text: d.message || 'Đã cập nhật.' });
    } catch (err: any) {
      setOrdersMsg({ ok: false, text: err.message || 'Không cập nhật được.' });
    }
  };

  const fetchVipKeys = async () => {
    if (!token) return;
    setVipKeysLoading(true);
    try {
      const res = await fetch('/api/vip/keys', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken('');
        return;
      }
      if (!res.ok) throw new Error('Không tải được mã VIP.');
      const d = await res.json();
      setVipKeys(d.keys || []);
    } catch (err: any) {
      setGenMsg({ ok: false, text: err.message || 'Không tải được mã VIP.' });
    } finally {
      setVipKeysLoading(false);
    }
  };

  const handleGenerateKeys = async () => {
    setGenBusy(true);
    setGenMsg(null);
    try {
      const res = await fetch('/api/vip/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: genPlan, count: genCount, note: genNote.trim() }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Không sinh được mã VIP.');
      setGenMsg({ ok: true, text: d.message || 'Đã sinh mã.' });
      await fetchVipKeys();
    } catch (err: any) {
      setGenMsg({ ok: false, text: err.message || 'Không sinh được mã.' });
    } finally {
      setGenBusy(false);
    }
  };

  const handleToggleVoidKey = async (code: string) => {
    setGenBusy(true);
    setGenMsg(null);
    try {
      const res = await fetch(`/api/vip/keys/${encodeURIComponent(code)}/void`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Không cập nhật được.');
      setGenMsg({ ok: true, text: d.message || 'Đã cập nhật.' });
      await fetchVipKeys();
    } catch (err: any) {
      setGenMsg({ ok: false, text: err.message || 'Không cập nhật được.' });
    } finally {
      setGenBusy(false);
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setGenMsg({ ok: true, text: `Đã sao chép: ${code}` });
    } catch {
      setGenMsg({ ok: false, text: 'Không sao chép được (cần quyền clipboard).' });
    }
  };

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
    fetchVipKeys();
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const refreshVipKeys = () => {
    fetchVipKeys();
  };

  const refreshOrders = () => {
    loadOrders();
  };

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

  const handleApproveAllPending = async () => {
    if (pending.length === 0) return;
    if (
      !window.confirm(
        `Duyệt toàn bộ ${pending.length} bài mẫu chờ và đưa vào Kho chung ngay lập tức?`
      )
    ) {
      return;
    }
    setPendingBusy('all');
    setPendingMsg(null);
    try {
      const res = await fetch('/api/admin/pending/approve-all', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Không duyệt được.');
      setPending(data.items || []);
      setPendingMsg({ ok: true, text: data.message || 'Đã duyệt tất cả.' });
    } catch (err: any) {
      setPendingMsg({ ok: false, text: err.message || 'Không duyệt được.' });
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

        <div className="border-t border-slate-100 pt-3 space-y-2.5">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            Bảo trì riêng từng hạng mục
          </p>
          {(
            [
              ['note', 'Soạn Bài AI', 'Khóa /api/lesson-note, tab Soạn Bài hiện thông báo bảo trì'],
              ['solver', 'Giải Bài AI & Hỏi đáp', 'Khóa /api/solve-exercise + /api/tutor-followup, tab Giải Bài hiện thông báo'],
              ['presets', 'Kho Bài Mẫu', 'Khóa xem & đóng góp bài mẫu, tab Kho Bài Mẫu hiện thông báo'],
            ] as const
          ).map(([key, label, hint]) => (
            <div
              key={key}
              className="flex items-center justify-between gap-3 py-1"
            >
              <div>
                <p className="text-sm font-bold text-slate-700">{label}</p>
                <p className="text-[11px] text-slate-400">{hint}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={!!settings?.maintenance.modules?.[key]}
                  onChange={(e) =>
                    setSettings((prev) =>
                      prev
                        ? {
                            ...prev,
                            maintenance: {
                              ...prev.maintenance,
                              modules: {
                                ...(prev.maintenance.modules || {}),
                                [key]: e.target.checked,
                              },
                            },
                          }
                        : prev
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-amber-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          ))}
          <p className="text-[11px] text-slate-400 pt-0.5">
            Bật độc lập, không cần bật "Chế độ bảo trì" toàn web. Vở Ghi của học sinh luôn hoạt động.
          </p>
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

      {/* Cài đặt API Key AI */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600">
            <KeyRound className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-800">API Key AI (Gemini)</h2>
            <p className="text-[11px] text-slate-500">
              Nhiều key xoay vòng chia tải, key hết quota tự chuyển key tiếp theo.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAiKey((v) => !v)}
              className="px-2.5 py-1.5 text-[11px] font-bold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center gap-1"
            >
              {showAiKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showAiKey ? 'Ẩn key' : 'Hiện key'}
            </button>
            <button
              type="button"
              onClick={addAiKey}
              className="px-2.5 py-1.5 text-[11px] font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Thêm key
            </button>
          </div>
        </div>

        {aiKeyRows.length === 0 ? (
          <div className="px-3 py-5 rounded-xl bg-slate-50 text-xs text-slate-500 text-center leading-relaxed">
            Chưa có key nào. Bấm <b className="text-indigo-600">Thêm key</b> để thêm API key đầu tiên.
            <br />
            Key được quản lý <b>hoàn toàn trên web</b>, không cần biến môi trường {' '}
            <code className="font-mono text-indigo-600">GEMINI_API_KEY</code>.
          </div>
        ) : (
          <div className="space-y-3">
            {aiKeyRows.map((k) => (
              <div
                key={k.id}
                className={`rounded-xl border p-3 space-y-2.5 ${k.enabled ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-70'}`}
              >
                <div className="flex items-center gap-2">
                  <input
                    value={k.name || ''}
                    onChange={(e) => patchAiKey(k.id, { name: e.target.value })}
                    placeholder="Tên (VD: Key chính, Key dự phòng...)"
                    className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                  <input
                    type="number"
                    min={1}
                    value={k.limit || ''}
                    onChange={(e) =>
                      patchAiKey(k.id, {
                        limit: e.target.value === '' ? undefined : Math.max(1, Number(e.target.value)),
                      })
                    }
                    placeholder="1140"
                    title={`Giới hạn tổng lượt/ngày (bỏ trống = tự tính theo trần thật của các model: 1140)`}
                    className="w-16 shrink-0 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-center focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                  <label className="flex items-center gap-1.5 cursor-pointer shrink-0 text-[11px] font-bold text-slate-600">
                    <input
                      type="checkbox"
                      checked={k.enabled}
                      onChange={(e) => patchAiKey(k.id, { enabled: e.target.checked })}
                      className="accent-indigo-600 w-3.5 h-3.5"
                    />
                    {k.enabled ? 'Bật' : 'Tắt'}
                  </label>
                  <button
                    type="button"
                    onClick={() => removeAiKey(k.id)}
                    title="Xoá key"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showAiKey ? 'text' : 'password'}
                    value={k.key}
                    onChange={(e) => patchAiKey(k.id, { key: e.target.value.trim() })}
                    placeholder="AIza..."
                    autoComplete="off"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 text-xs font-mono focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAiKey((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showAiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              Thống kê từng key (từ lúc server khởi động)
            </span>
            <button
              type="button"
              onClick={loadAiStats}
              disabled={aiStatsLoading}
              className="px-2.5 py-1.5 text-[11px] font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${aiStatsLoading ? 'animate-spin' : ''}`} />
              {aiStatsLoading ? 'Đang tải...' : 'Làm mới'}
            </button>
          </div>
          {aiStats && aiStats.activeKeys.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {aiStats.activeKeys.map((mask) => {
                const found = aiStats.stats.find((x) => x.key === mask);
                const s = found
                  ? found
                  : {
                      key: mask,
                      requests: 0,
                      successes: 0,
                      failures: 0,
                      lastError: undefined as string | undefined,
                      lastUsedAt: undefined as number | undefined,
                    };
                const pct = s.requests > 0 ? Math.round((s.successes / s.requests) * 100) : 0;
                return (
                  <div
                    key={mask}
                    className="rounded-lg border border-slate-200 px-3 py-2 space-y-1"
                    title={s.lastError || ''}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-slate-700">{mask}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          pct >= 60
                            ? 'bg-emerald-50 text-emerald-600'
                            : pct > 0
                              ? 'bg-amber-50 text-amber-600'
                              : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {pct}% OK
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span>Gọi: <b className="text-slate-700">{s.requests}</b></span>
                      <span className="text-emerald-600">OK: <b>{s.successes}</b></span>
                      <span className="text-rose-500">Lỗi: <b>{s.failures}</b></span>
                      {s.lastError && <span className="truncate italic">{s.lastError}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-2 py-1 text-[11px] text-slate-400">
              Chưa có dữ liệu. Chỉ hiện thống kê sau khi có yêu cầu AI. Bấm{' '}
              <b className="text-slate-500">Làm mới</b> để xem.
            </div>
          )}
        </div>

        {aiHealth && (
          <div className="pt-1 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-500" />
              Sức khỏe key & dự tính tiết kiệm
              <span className="font-normal text-slate-400">
                (reset theo giờ Mỹ sau ≈{' '}
                {(() => {
                  const ms = aiHealth.summary.resetInMs;
                  const h = Math.floor(ms / 3600000);
                  const m = Math.ceil((ms % 3600000) / 60000);
                  return h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
                })()}
                )
              </span>
            </div>

            {aiHealth.keys.length === 0 ? (
              <div className="text-[11px] text-slate-400 px-2 py-1">
                Không có key nào đang hoạt động (chỉ mới có key môi trường nếu được đặt).
              </div>
            ) : (
              <div className="space-y-2">
                {aiHealth.keys.map((k) => {
                  const pct =
                    k.limit > 0 ? Math.min(100, Math.round((k.usedToday / k.limit) * 100)) : 0;
                  const barColor =
                    k.remaining === 0
                      ? 'bg-rose-500'
                      : pct >= 70
                        ? 'bg-amber-500'
                        : 'bg-emerald-500';
                  const txtColor =
                    k.remaining === 0
                      ? 'text-rose-500'
                      : pct >= 70
                        ? 'text-amber-600'
                        : 'text-emerald-600';
                  return (
                    <div key={k.key} className="rounded-lg border border-slate-200 px-3 py-2 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 truncate">
                          <span className="font-mono">{k.key}</span>
                          {k.name && <span className="text-slate-400 font-normal truncate">· {k.name}</span>}
                        </span>
                        <span className={`text-[10px] font-bold shrink-0 ${txtColor}`}>
                          {k.usedToday}/{k.limit} lượt · còn {k.remaining}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor}`}
                          style={{ width: `${Math.max(2, pct)}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {k.models.map((m) => {
                          const cpct =
                            m.cap > 0 ? Math.min(100, Math.round((m.usedToday / m.cap) * 100)) : 0;
                          const cColor =
                            m.remaining === 0
                              ? 'bg-rose-100 text-rose-600'
                              : cpct >= 70
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700';
                          const short = m.model.replace('gemini-', '').replace('-flash', '');
                          return (
                            <span
                              key={m.model}
                              title={`${m.model}: đã dùng ${m.usedToday}/${m.cap} lượt hôm nay (giới hạn thật theo AI Studio)`}
                              className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${cColor}`}
                            >
                              {short}: {m.remaining}/{m.cap}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-[10px] text-slate-600 space-y-0.5">
                <div className="font-bold text-emerald-700 text-[11px] mb-1">Nhu cầu AI thực tế</div>
                <div>
                  TB 7 ngày: <b className="text-slate-700">{aiHealth.summary.avg7}</b> lượt/ngày
                </div>
                <div>
                  Hôm nay: <b className="text-slate-700">{aiHealth.summary.todayDemand}</b> lượt
                </div>
                <div>
                  Tổng tiêu hôm nay:{' '}
                  <b className="text-slate-700">
                    {aiHealth.summary.totalUsedToday}/{aiHealth.summary.totalBudget}
                  </b>{' '}
                  lượt
                </div>
              </div>
              <div
                className={`rounded-lg border px-3 py-2 text-[10px] leading-relaxed ${
                  aiHealth.summary.status === 'ok'
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                    : aiHealth.summary.status === 'tight'
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                <div className="font-bold text-[11px] mb-1">Cấu hình tiết kiệm nhất</div>
                {aiHealth.summary.status === 'ok' && (
                  <span>
                    Đang có <b>{aiHealth.summary.activeCount}</b> key, vừa đủ cho nhu cầu (~{' '}
                    <b>{aiHealth.summary.neededKeys}</b> key). Không cần thêm key.
                  </span>
                )}
                {aiHealth.summary.status === 'tight' && (
                  <span>
                    Nên có ~<b>{aiHealth.summary.neededKeys}</b> key (đang có{' '}
                    <b>{aiHealth.summary.activeCount}</b>). Bổ sung ≈
                    <b>{aiHealth.summary.extraKeys}</b> key nữa để tránh gián đoạn. Khi để trống
                    giới hạn, mỗi key mặc định dùng theo trần thật của từng model (flash 20, flash-lite 500/ngày — gộp ≈ <b>1140 lượt/ngày</b>).
                  </span>
                )}
                {aiHealth.summary.status === 'exhausted' && (
                  <span>
                    Không đủ key cho nhu cầu. Hãy thêm key hoặc nâng giới hạn/ngày từng key, rồi bấm{' '}
                    <b>Lưu cài đặt</b>.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="px-3 py-2 rounded-xl bg-indigo-50/50 text-[11px] text-slate-500 flex items-start gap-1.5">
          <KeyRound className="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-500" />
          <div className="space-y-1">
            <p>
              Sau khi sửa key, bấm <b className="text-indigo-600">Lưu cài đặt</b> ở cuối trang —
              key rỗng/trùng sẽ bị server tự bỏ, key tắt (✓) tạm ngưng dùng.
            </p>
            <p>
              Key được quản lý <b className="text-slate-600">hoàn toàn trên web</b>, không cần đặt
              biến môi trường <code className="font-mono text-indigo-600">GEMINI_API_KEY</code>.
              Nếu xoá hết key thì AI sẽ báo chưa cấu hình cho tới khi bạn thêm key mới.
            </p>
          </div>
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
          <div className="flex items-center gap-2 shrink-0">
            {!pendingLoading && pending.length > 0 && (
              <>
                <button
                  onClick={handleApproveAllPending}
                  disabled={pendingBusy === 'all' || pendingBusy !== null}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white flex items-center gap-1.5"
                >
                  {pendingBusy === 'all' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCheck className="w-3.5 h-3.5" />
                  )}
                  Duyệt tất cả
                </button>
                <span className="px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
                  {pending.length} bài
                </span>
              </>
            )}
          </div>
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
                      {item.grade ? ` • Lớp ${item.grade}` : ''}
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

      {/* Đơn hàng đặt mua VIP */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-rose-100 text-rose-600">
              <ShoppingCart className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                Đơn Hàng Đặt Mua VIP
                {orders && orders.filter((o) => o.status === 'new').length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                    {orders.filter((o) => o.status === 'new').length} đơn mới
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-500">
                Học sinh chọn gói + ghi SĐT Zalo. Liên hệ để chốt đơn, phát mã, rồi đánh dấu đã xử lý.
              </p>
            </div>
          </div>
          <button
            onClick={refreshOrders}
            disabled={ordersLoading}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 shrink-0"
          >
            {ordersLoading ? 'Đang tải...' : 'Làm mới'}
          </button>
        </div>

        {ordersMsg && (
          <div
            className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 ${
              ordersMsg.ok
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {ordersMsg.ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            {ordersMsg.text}
          </div>
        )}

        {ordersLoading && !orders ? (
          <div className="py-6 flex justify-center text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            Chưa có đơn hàng nào. Học sinh đặt mua sẽ hiện tại đây.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-[11px]">
              <thead className="sticky top-0 bg-white">
                <tr className="text-slate-400 border-b border-slate-200">
                  <th className="text-left py-1.5 font-bold">Thời gian</th>
                  <th className="text-left py-1.5 font-bold">Gói</th>
                  <th className="text-left py-1.5 font-bold">SĐT Zalo</th>
                  <th className="text-left py-1.5 font-bold">Tài khoản</th>
                  <th className="text-left py-1.5 font-bold">Ghi chú</th>
                  <th className="text-left py-1.5 font-bold">Trạng thái</th>
                  <th className="text-right py-1.5 font-bold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className={`border-b border-slate-100 ${o.status === 'new' ? 'bg-rose-50/50' : ''}`}>
                    <td className="py-2 pr-2 text-slate-500 whitespace-nowrap">
                      {new Date(o.createdAt).toLocaleString('vi-VN')}
                    </td>
                    <td className="py-2 pr-2 whitespace-nowrap">
                      <span className="text-amber-700 font-bold">
                        {o.plan === '24h' ? '24 Giờ' : o.plan === '1m' ? '1 Tháng' : o.plan === '3m' ? '3 Tháng' : '1 Năm'}
                      </span>
                      <span className="text-slate-400">
                        {' '}
                        {o.plan === '1m' ? '49.000đ' : o.plan === '3m' ? '119.000đ' : o.plan === '1y' ? '399.000đ' : ''}
                      </span>
                    </td>
                    <td className="py-2 pr-2">
                      <span className="inline-flex items-center gap-1 font-bold text-rose-700 whitespace-nowrap">
                        <Phone className="w-3 h-3" />
                        {o.phone}
                      </span>
                    </td>
                    <td className="py-2 pr-2 text-slate-600 max-w-[160px] truncate">
                      <span className="inline-flex items-center gap-1">
                        <Mail className="w-3 h-3 shrink-0" />
                        {o.email}
                      </span>
                    </td>
                    <td className="py-2 pr-2 text-slate-500 max-w-[140px] truncate">{o.note || '—'}</td>
                    <td className="py-2 pr-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                          o.status === 'new'
                            ? 'bg-rose-600 text-white'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {o.status === 'new' ? 'Chưa xử lý' : 'Đã xử lý'}
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => toggleOrder(o.id)}
                        className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                      >
                        <span className="inline-flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3" />
                          {o.status === 'new' ? 'Đã xử lý' : 'Mở lại'}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quản lý mã kích hoạt VIP */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-100 text-amber-600">
              <Crown className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Quản Lý Mã Kích Hoạt VIP</h2>
              <p className="text-[11px] text-slate-500">
                Sinh mã bán qua Momo/chuyển khoản. Học sinh nhập mã để mở khóa AI không giới hạn + Kho bài mẫu.
              </p>
            </div>
          </div>
          <button
            onClick={refreshVipKeys}
            disabled={vipKeysLoading}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 shrink-0"
          >
            {vipKeysLoading ? 'Đang tải...' : 'Làm mới danh sách'}
          </button>
        </div>

        {/* Sinh mã */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-800">
            <KeyRound className="w-3.5 h-3.5" />
            Sinh mã mới
          </div>
          <div className="grid sm:grid-cols-4 gap-2.5 items-end">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Gói</label>
              <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white">
                {(['24h', '1m', '3m', '1y'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setGenPlan(p)}
                    className={`flex-1 px-2 py-2 text-[11px] font-bold transition-colors ${
                      genPlan === p ? 'bg-amber-600 text-white' : 'bg-white text-slate-600 hover:bg-amber-50'
                    }`}
                  >
                    {p === '24h' ? '24 Giờ' : p === '1m' ? '1 Tháng' : p === '3m' ? '3 Tháng' : '1 Năm'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Số lượng</label>
              <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden">
                <button
                  onClick={() => setGenCount((c) => Math.max(1, c - 1))}
                  className="px-2.5 py-2 text-slate-500 hover:bg-slate-50 font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={genCount}
                  onChange={(e) => setGenCount(Number(e.target.value) || 1)}
                  className="w-full text-center text-sm font-bold outline-none"
                />
                <button
                  onClick={() => setGenCount((c) => Math.min(200, c + 1))}
                  className="px-2.5 py-2 text-slate-500 hover:bg-slate-50 font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Ghi chú</label>
              <input
                value={genNote}
                onChange={(e) => setGenNote(e.target.value)}
                placeholder="VD: bán qua Zalo 098..."
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none"
              />
            </div>
            <div className="flex gap-2 sm:justify-end">
              <button
                onClick={handleGenerateKeys}
                disabled={genBusy}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white"
              >
                {genBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Ticket className="w-3.5 h-3.5" />}
                Sinh mã
              </button>
            </div>
          </div>
          {genMsg && (
            <div
              className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 ${
                genMsg.ok
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {genMsg.ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {genMsg.text}
            </div>
          )}
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-wrap gap-1.5">
          {(['all', 'unused', 'used', 'void'] as const).map((f) => {
            const count =
              !vipKeys
                ? 0
                : f === 'all'
                  ? vipKeys.length
                  : vipKeys.filter((k) => k.status === f).length;
            return (
              <button
                key={f}
                onClick={() => setVipFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                  vipFilter === f
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f === 'all' ? 'Tất cả' : f === 'unused' ? 'Chưa dùng' : f === 'used' ? 'Đã dùng' : 'Vô hiệu'}{' '}
                <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Danh sách mã */}
        {vipKeysLoading && !vipKeys ? (
          <div className="py-6 flex justify-center text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : !vipKeys || vipKeys.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            Chưa có mã nào. Sinh mã bên trên để bắt đầu.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-[11px]">
              <thead className="sticky top-0 bg-white">
                <tr className="text-slate-400 border-b border-slate-200">
                  <th className="text-left py-1.5 font-bold">Mã</th>
                  <th className="text-left py-1.5 font-bold">Gói</th>
                  <th className="text-left py-1.5 font-bold">Trạng thái</th>
                  <th className="text-left py-1.5 font-bold">Người dùng</th>
                  <th className="text-left py-1.5 font-bold">Ghi chú</th>
                  <th className="text-right py-1.5 font-bold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {vipKeys
                  .filter((k) => vipFilter === 'all' || k.status === vipFilter)
                  .map((k) => (
                    <tr key={k.code} className="border-b border-slate-100">
                      <td className="py-2 pr-2">
                        <div className="flex items-center gap-1">
                          <span className="font-mono font-bold text-slate-700 whitespace-nowrap">{k.code}</span>
                          <button
                            onClick={() => copyCode(k.code)}
                            title="Sao chép"
                            className="text-slate-400 hover:text-amber-600 transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 pr-2 whitespace-nowrap">
                        <span className="text-amber-700 font-bold">
                          {k.plan === '24h' ? '24 Giờ' : k.plan === '1m' ? '1 Tháng' : k.plan === '3m' ? '3 Tháng' : '1 Năm'}
                        </span>{' '}
                        <span className="text-slate-400">{k.days} ngày</span>
                      </td>
                      <td className="py-2 pr-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                            k.status === 'unused'
                              ? 'bg-emerald-100 text-emerald-700'
                              : k.status === 'used'
                                ? 'bg-violet-100 text-violet-700'
                                : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {k.status === 'unused' ? 'Chưa dùng' : k.status === 'used' ? `Đã dùng ${k.usedAt ? new Date(k.usedAt).toLocaleDateString('vi-VN') : ''}` : 'Vô hiệu'}
                        </span>
                      </td>
                      <td className="py-2 pr-2 text-slate-600 max-w-[140px] truncate">
                        {k.usedByEmail || '—'}
                      </td>
                      <td className="py-2 pr-2 text-slate-500 max-w-[140px] truncate">{k.note || '—'}</td>
                      <td className="py-2 text-right">
                        {k.status === 'used' ? (
                          <span className="text-[10px] text-slate-300">Không thể xử lý</span>
                        ) : (
                          <button
                            onClick={() => handleToggleVoidKey(k.code)}
                            className="px-2 py-1 text-[10px] font-bold rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors"
                          >
                            <span className="inline-flex items-center gap-1">
                              <ShieldBan className="w-3 h-3" />
                              {k.status === 'void' ? 'Khôi phục' : 'Vô hiệu'}
                            </span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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