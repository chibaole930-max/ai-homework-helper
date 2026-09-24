import React, { useEffect, useState } from 'react';
import { ClipboardList, Save, Trash2, Target, Info, History, BookOpen, PencilRuler, Route } from 'lucide-react';
import { SubjectInfo } from '../types';
import { useAuth } from '../context/AuthContext';
import { authHeaders } from '../lib/auth';

interface HocBaProps {
  subjects: SubjectInfo[];
  grade: string;
}

interface TargetRow {
  subjectId: string;
  subjectName: string;
  target: string;
}

interface HistoryLesson {
  id: string;
  type: 'note' | 'exercise' | 'path';
  title: string;
  subject: string;
  date: string;
  content: string;
}

const STORAGE_KEY_PREFIX = 'lop12_hocba_v1_';

export const HocBaTab: React.FC<HocBaProps> = ({ subjects, grade }) => {
  const { user } = useAuth();
  const [rows, setRows] = useState<TargetRow[]>([]);
  const [touched, setTouched] = useState(false);
  const [history, setHistory] = useState<HistoryLesson[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const storageKey = `${STORAGE_KEY_PREFIX}${grade}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as TargetRow[];
        if (Array.isArray(parsed)) setRows(parsed);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (touched) {
      localStorage.setItem(storageKey, JSON.stringify(rows));
    }
  }, [rows, storageKey, touched]);

  // Tải lịch sử học tập (các bài đã lưu trong Vở Ghi) từ Database khi đăng nhập
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setHistoryLoading(true);
    fetch('/api/lessons', { headers: authHeaders() })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data || !Array.isArray(data.lessons)) return;
        setHistory(
          data.lessons.map((l: any) => ({
            id: String(l.id),
            type: String(l.type || 'note'),
            title: String(l.title || ''),
            subject: String(l.subject || ''),
            date: String(l.date || ''),
            content: String(l.content || ''),
          }))
        );
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setHistoryLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const setTarget = (subjectId: string, value: string) => {
    if (!touched) setTouched(true);
    setRows((prev) =>
      prev.map((r) => (r.subjectId === subjectId ? { ...r, target: value } : r))
    );
  };

  const addRow = (subjectId: string, subjectName: string) => {
    if (!rows.some((r) => r.subjectId === subjectId)) {
      setTouchAndRows((prev) => [...prev, { subjectId, subjectName, target: '' }]);
    }
  };

  const setTouchAndRows = (fn: (prev: TargetRow[]) => TargetRow[]) => {
    if (!touched) setTouched(true);
    setRows(fn);
  };

  const removeRow = (subjectId: string) => {
    setTouchAndRows((prev) => prev.filter((r) => r.subjectId !== subjectId));
  };

  const clearAll = () => {
    setTouchAndRows(() => []);
  };

  const filled = rows.filter((r) => r.target).length;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 text-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold">Sổ Học Bạ Điện Tử — Lớp {grade}</h2>
            <p className="text-xs text-white/90 mt-0.5">
              Nhập điểm TBM (trung bình môn) bạn muốn đạt được cho từng môn, lưu lại để theo dõi
              mục tiêu cả năm.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-800 leading-relaxed">
          Mẹo: mục tiêu nên chia theo từng học kỳ. Ví dụ TBM Toán Học kỳ I = 8.5, Học kỳ II = 9.0.
          Điểm xét tốt nghiệp THCS/THPT dựa trên TBM cả năm.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-blue-600" />
            Chỉ tiêu TBM của bạn
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              {filled}/{subjects.length} môn
            </span>
            {rows.length > 0 && (
              <button
                onClick={clearAll}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa hết
              </button>
            )}
          </div>
        </div>

        {rows.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            Chọn môn bên dưới để bắt đầu đặt chỉ tiêu điểm.
          </p>
        ) : (
          <div className="space-y-2">
            {rows.map((row) => (
              <div
                key={row.subjectId}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
              >
                <span className="text-xs font-bold text-slate-700 min-w-[90px] shrink-0">
                  {row.subjectName}
                </span>
                <input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={row.target}
                  onChange={(e) => setTarget(row.subjectId, e.target.value)}
                  placeholder="Điểm TBM (0 - 10)"
                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => removeRow(row.subjectId)}
                  title="Bỏ môn này"
                  className="w-7 h-7 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5 mx-auto" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <h3 className="text-sm font-extrabold text-slate-800 mb-3">Chọn môn để thêm chỉ tiêu</h3>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => {
            const added = rows.some((r) => r.subjectId === s.id);
            return (
              <button
                key={s.id}
                onClick={() => (added ? removeRow(s.id) : addRow(s.id, s.name))}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  added
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {added ? '✓ ' : '+ '}
                {s.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {rows.filter((r) => r.target).length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Save className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-extrabold text-slate-800">Bảng chỉ tiêu đã lưu (Lớp {grade})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-200">
                  <th className="py-1.5 pr-3 font-semibold">Môn</th>
                  <th className="py-1.5 font-semibold">Điểm TBM mục tiêu</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((r) => r.target)
                  .map((r) => {
                    const target = parseFloat(r.target);
                    const healthy = !isNaN(target) && target >= 5;
                    return (
                      <tr key={r.subjectId} className="border-b border-slate-50">
                        <td className="py-1.5 pr-3 font-bold text-slate-700">{r.subjectName}</td>
                        <td className="py-1.5 font-bold text-blue-700">{r.target}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
            <History className="w-4 h-4 text-indigo-600" />
            Lịch sử học tập (đã lưu)
          </h3>
          {user ? (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              Đồng bộ tài khoản: {user.name || user.email}
            </span>
          ) : (
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
              Cần đăng nhập để lưu lịch sử
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Các bài soạn, bài giải và lộ trình bạn đã lưu vào Vở Ghi sẽ hiện tại đây theo tài khoản —
          xem lại bất cứ lúc nào dù đổi thiết bị.
        </p>
        {!user ? (
          <p className="text-xs text-slate-400 py-3 text-center">
            Đăng nhập để lịch sử học tập lưu vào Database.
          </p>
        ) : historyLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : history.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">
            Chưa có bài nào. Soạn bài hoặc giải bài và lưu vào Vở Ghi để thấy chúng ở đây.
          </p>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {history.map((h) => (
              <div
                key={h.id}
                className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  {h.type === 'exercise' ? (
                    <PencilRuler className="w-4 h-4" />
                  ) : h.type === 'path' ? (
                    <Route className="w-4 h-4" />
                  ) : (
                    <BookOpen className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 truncate">{h.title}</p>
                  <p className="text-[11px] text-slate-500">
                    {h.subject} · {h.date}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md shrink-0">
                  {h.type === 'exercise' ? 'Giải' : h.type === 'path' ? 'Lộ trình' : 'Soạn'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};