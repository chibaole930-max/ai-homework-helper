import React, { useState } from 'react';
import { Route, Sparkles, Loader2, Send, RefreshCw, Target } from 'lucide-react';

interface LoTrinhProps {
  grade: string;
}

interface LoTrinhResult {
  markdown: string;
}

export const LoTrinhTab: React.FC<LoTrinhProps> = ({ grade }) => {
  const [career, setCareer] = useState('');
  const [strength, setStrength] = useState('');
  const [weakness, setWeakness] = useState('');
  const [hours, setHours] = useState('2');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<LoTrinhResult | null>(null);
  const [resultKey, setResultKey] = useState(0);

  const canSubmit = career.trim().length >= 2;

  const generate = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/learning-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade, career, strength, weakness, hours }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không thể tạo lộ trình. Vui lòng thử lại.');
      }
      setResult({ markdown: data.markdown || data.text || 'Đã tạo lộ trình.' });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  const regenerate = () => {
    setResultKey((k) => k + 1);
    void generate();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <Route className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold">Lộ Trình Cá Nhân Hóa — Lớp {grade}</h2>
            <p className="text-xs text-amber-100 mt-0.5">
              Chia sẻ mục tiêu của bạn, AI sẽ xây dựng lộ trình học phù hợp theo năng lực (chuẩn
              GDPT 2018).
            </p>
          </div>
        </div>
      </div>

      {!result && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-extrabold text-slate-800">Khai thông tin mục tiêu</h3>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="text-xs font-bold text-slate-600 mb-1 block">
                🎯 Bạn muốn hướng tới nghề nghiệp nào? *
              </span>
              <input
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                placeholder="Ví dụ: kỹ sư công nghệ thông tin, bác sĩ, giáo viên..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-slate-600 mb-1 block">
                ✅ Môn học bạn học tốt nhất
              </span>
              <input
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                placeholder="Ví dụ: Toán, Vật lí..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-slate-600 mb-1 block">
                ⚠️ Môn học bạn cần cải thiện
              </span>
              <input
                value={weakness}
                onChange={(e) => setWeakness(e.target.value)}
                placeholder="Ví dụ: Tiếng Anh, Hóa học..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-slate-600 mb-1 block">
                ⏰ Thời gian tự học mỗi ngày (giờ)
              </span>
              <select
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="1">1 giờ</option>
                <option value="2">2 giờ</option>
                <option value="3">3 giờ</option>
                <option value="4">4 giờ</option>
                <option value="5">5+ giờ</option>
              </select>
            </label>
          </div>

          {error && (
            <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={generate}
            disabled={!canSubmit || loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white text-sm font-extrabold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-sm"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {loading ? 'Đang xây dựng lộ trình...' : 'Tạo lộ trình học tập'}
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
              <Route className="w-4 h-4 text-orange-600" />
              Lộ trình của bạn
            </h3>
            <div className="flex gap-2">
              <button
                onClick={regenerate}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                Làm lại
              </button>
              <button
                onClick={() => setResult(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Sửa thông tin
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <div key={resultKey} className="prose prose-sm max-w-none">
              {result.markdown.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2
                      key={i}
                      className="text-sm font-extrabold text-orange-700 mt-3 mb-1.5 border-b border-orange-100 pb-1"
                    >
                      {line.slice(3)}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-xs font-extrabold text-slate-800 mt-2 mb-1">
                      {line.slice(4)}
                    </h3>
                  );
                }
                if (line.startsWith('- ') || line.startsWith('* ')) {
                  return (
                    <p
                      key={i}
                      className="text-xs text-slate-600 leading-relaxed pl-3 flex items-start gap-1.5"
                    >
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>{line.slice(2)}</span>
                    </p>
                  );
                }
                if (/^\d+\.\s/.test(line)) {
                  return (
                    <p key={i} className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
                      <span className="text-orange-600 font-bold shrink-0">{line.match(/^\d+\./)?.[0]}</span>
                      <span>{line.replace(/^\d+\.\s/, '')}</span>
                    </p>
                  );
                }
                if (line.trim() === '') return <div key={i} className="h-2" />;
                return (
                  <p key={i} className="text-xs text-slate-700 leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};