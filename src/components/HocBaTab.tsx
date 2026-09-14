import React, { useEffect, useState } from 'react';
import { ClipboardList, Save, Trash2, Target, Info } from 'lucide-react';
import { SubjectInfo } from '../types';

interface HocBaProps {
  subjects: SubjectInfo[];
  grade: string;
}

interface TargetRow {
  subjectId: string;
  subjectName: string;
  target: string;
}

const STORAGE_KEY_PREFIX = 'lop12_hocba_v1_';

export const HocBaTab: React.FC<HocBaProps> = ({ subjects, grade }) => {
  const [rows, setRows] = useState<TargetRow[]>([]);
  const [touched, setTouched] = useState(false);

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
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold">Sổ Học Bạ Điện Tử — Lớp {grade}</h2>
            <p className="text-xs text-blue-100 mt-0.5">
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
    </div>
  );
};