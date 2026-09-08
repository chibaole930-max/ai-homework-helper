import React, { useState, useEffect, useCallback } from 'react';
import { PRESET_LESSON_NOTES } from '../data/presets';
import { SavedStudyItem, SubjectId, SubjectInfo, GradeId } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import {
  Library,
  BookOpen,
  Sparkles,
  Search,
  BookmarkPlus,
  Check,
  ChevronRight,
  Eye,
  X,
  FileCheck2,
  PlusCircle,
  ThumbsUp,
  Users,
  Send,
  Loader2,
} from 'lucide-react';

interface CommunityPreset extends SavedStudyItem {
  author?: string;
  likes?: number;
  fromCommunity?: boolean;
}

interface PresetLibraryTabProps {
  onImportPreset: (item: SavedStudyItem) => void;
  isItemSaved: (title: string, subject: string) => boolean;
  subjects: SubjectInfo[];
  gradeLabel: string;
  grade: GradeId;
}

export const PresetLibraryTab: React.FC<PresetLibraryTabProps> = ({
  onImportPreset,
  isItemSaved,
  subjects,
  gradeLabel,
  grade,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<CommunityPreset | null>(null);
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<CommunityPreset[]>(PRESET_LESSON_NOTES as CommunityPreset[]);
  const [loading, setLoading] = useState(true);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contributing, setContributing] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [showContribute, setShowContribute] = useState(false);
  const [contributeForm, setContributeForm] = useState({
    subjectId: 'van',
    textbook: 'Kết nối tri thức với cuộc sống',
    title: '',
    author: '',
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const refreshPresets = useCallback(async () => {
    try {
      const res = await fetch('/api/community/presets');
      if (!res.ok) throw new Error('API lỗi');
      const data = await res.json();
      if (data && Array.isArray(data.items) && data.items.length > 0) {
        setItems(data.items);
        setSyncedAt(data.syncedAt);
      }
    } catch (err) {
      console.warn('Không tải được kho bài mẫu, dùng bản mẫu cục bộ:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPresets();
  }, [refreshPresets]);

  const filteredPresets = items.filter((item) => {
    if (selectedSubject !== 'all' && item.subjectId !== selectedSubject) {
      return false;
    }
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleImport = (item: CommunityPreset) => {
    onImportPreset({
      id: item.id,
      type: item.type,
      title: item.title,
      subject: item.subject,
      subjectId: item.subjectId as SubjectId,
      textbook: item.textbook,
      content: item.content,
      date: item.date,
      isFavorite: item.isFavorite,
      style: item.style,
      originalProblem: item.originalProblem,
    });
    setImportedIds((prev) => new Set(prev).add(item.id));
  };

  const handleLike = async (item: CommunityPreset) => {
    const isLiked = likedIds.has(item.id);
    const newLiked = !isLiked;

    setLikedIds((prev) => {
      const next = new Set(prev);
      if (newLiked) next.add(item.id);
      else next.delete(item.id);
      return next;
    });

    setItems((prev) =>
      prev.map((p) =>
        p.id === item.id
          ? { ...p, likes: Math.max(0, (p.likes || 0) + (newLiked ? 1 : -1)) }
          : p
      )
    );

    try {
      await fetch(`/api/community/presets/${item.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: newLiked }),
      });
    } catch (err) {
      console.warn('Không đồng bộ được lượt thích:', err);
    }
  };

  const handleContribute = async () => {
    if (!contributeForm.title.trim() || !contributeForm.content.trim()) {
      alert('Vui lòng nhập tên bài mẫu và nội dung.');
      return;
    }

    setSubmitting(true);
    try {
      const subject = subjects.find((s) => s.id === contributeForm.subjectId);
      const res = await fetch('/api/community/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subject ? subject.name : 'Ngữ văn 12',
          subjectId: contributeForm.subjectId,
          textbook: contributeForm.textbook,
          title: contributeForm.title,
          content: contributeForm.content,
          author: contributeForm.author,
          grade,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Lưu thất bại');
      }
      await refreshPresets();
      setShowContribute(false);
      setContributeForm({
        subjectId: 'van',
        textbook: 'Kết nối tri thức với cuộc sống',
        title: '',
        author: '',
        content: '',
      });
      alert('Cảm ơn bạn! Bài mẫu đã được gửi và đang chờ admin duyệt trước khi vào Kho chung.');
    } catch (err: any) {
      alert(err.message || 'Không thể đóng góp. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const contributeSelectedSubjectName = subjects.find(
    (s) => s.id === contributeForm.subjectId
  )?.name;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-2xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-xs mb-3">
            <Library className="w-3.5 h-3.5 text-amber-300" />
            <span>Kho Học Liệu Mẫu Chuẩn GDPT 2018 - Đồng bộ cộng đồng</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Thư Viện Bài Soạn & Lời Giải Mẫu {gradeLabel} (dùng chung cả 3 khối)
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Kho bài mẫu dùng chung cho tất cả mọi người sử dụng web! Bạn có thể đọc ngay,
            lưu vào Vở ghi, bày tỏ thích, và <span className="font-semibold text-white">đóng góp bài mẫu của riêng mình</span> để đồng bộ cho cộng đồng.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/15">
              <Users className="w-3.5 h-3.5" />
              <b className="text-white">{items.length}</b> bài mẫu đang chia sẻ
            </span>
            {syncedAt && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/15 text-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                Đồng bộ lúc {new Date(syncedAt).toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
            <button
              onClick={() => setShowContribute(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Đóng góp bài mẫu
            </button>
          </div>
        </div>
        <div className="absolute right-0 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Filter by Subject & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 whitespace-nowrap">
            Chọn môn:
          </span>
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedSubject === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tất cả các môn
          </button>
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSubject === s.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.shortName}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài mẫu theo tên bài..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
          />
        </div>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span className="text-sm">Đang đồng bộ kho bài mẫu...</span>
        </div>
      ) : filteredPresets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">
            Không tìm thấy bài mẫu nào. Hãy là người đầu tiên đóng góp!
          </p>
          <button
            onClick={() => setShowContribute(true)}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
          >
            <PlusCircle className="w-4 h-4" />
            Đóng góp bài mẫu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPresets.map((item) => {
            const alreadySaved =
              importedIds.has(item.id) || isItemSaved(item.title, item.subject);
            const isLiked = likedIds.has(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.subject}
                    </span>
                    {item.fromCommunity ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-0.5">
                        <Sparkles className="w-3 h-3" />
                        Cộng đồng
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400">
                        {item.textbook}
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => setActiveItem(item)}
                    className="font-bold text-base text-slate-900 line-clamp-2 hover:text-emerald-700 cursor-pointer transition-colors"
                  >
                    {item.title}
                  </h3>

                  <p
                    onClick={() => setActiveItem(item)}
                    className="text-xs text-slate-500 line-clamp-3 leading-relaxed cursor-pointer font-serif"
                  >
                    {item.content.replace(/#|\*|`|>|\[|\]/g, '').slice(0, 160)}...
                  </p>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 truncate">
                      Đóng góp bởi{' '}
                      <span className="font-semibold text-slate-700">
                        {item.author || 'Kho Học Liệu Mẫu'}
                      </span>
                    </span>
                    <button
                      onClick={() => handleLike(item)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors ${
                        isLiked
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      {item.likes || 0}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveItem(item)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Đọc bài mẫu</span>
                    </button>

                    <button
                      onClick={() => handleImport(item)}
                      disabled={alreadySaved}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors ${
                        alreadySaved
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {alreadySaved ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Đã lưu vào vở</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="w-3.5 h-3.5" />
                          <span>Lưu vào vở</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preset Reader Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {activeItem.subject}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {activeItem.title}
                </h2>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                  <span>
                    Bởi <b>{activeItem.author || 'Kho Học Liệu Mẫu'}</b>
                  </span>
                  <button
                    onClick={() => handleLike(activeItem)}
                    className="inline-flex items-center gap-1 font-bold text-emerald-700"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {activeItem.likes || 0} thích
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleImport(activeItem)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>Lưu vào vở của tôi</span>
                </button>
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <MarkdownRenderer content={activeItem.content} />
            </div>
          </div>
        </div>
      )}

      {/* Contribute Modal */}
      {showContribute && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Đóng góp bài mẫu cho cộng đồng
                </h2>
                <p className="text-xs text-amber-100 mt-0.5">
                  Bài mẫu của bạn sẽ được đồng bộ để mọi người xem và sử dụng.
                </p>
              </div>
              <button
                onClick={() => setShowContribute(false)}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 mb-1 block">
                    Môn học *
                  </label>
                  <select
                    value={contributeForm.subjectId}
                    onChange={(e) =>
                      setContributeForm((f) => ({
                        ...f,
                        subjectId: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Sẽ gắn môn: {contributeSelectedSubjectName}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">
                    Bộ sách
                  </label>
                  <select
                    value={contributeForm.textbook}
                    onChange={(e) =>
                      setContributeForm((f) => ({
                        ...f,
                        textbook: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                  >
                    {['Kết nối tri thức với cuộc sống', 'Cánh diều', 'Chân trời sáng tạo', 'Tổng hợp / Chung'].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">
                    Tên của bạn (không bắt buộc)
                  </label>
                  <input
                    value={contributeForm.author}
                    onChange={(e) =>
                      setContributeForm((f) => ({
                        ...f,
                        author: e.target.value,
                      }))
                    }
                    placeholder="VD: Minh Anh - 12A1"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 mb-1 block">
                    Tên bài mẫu *
                  </label>
                  <input
                    value={contributeForm.title}
                    onChange={(e) =>
                      setContributeForm((f) => ({
                        ...f,
                        title: e.target.value,
                      }))
                    }
                    placeholder="VD: Soạn bài Tây Tiến (Quang Dũng)"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 mb-1 block">
                    Nội dung bài mẫu (Markdown) *
                  </label>
                  <textarea
                    value={contributeForm.content}
                    onChange={(e) =>
                      setContributeForm((f) => ({
                        ...f,
                        content: e.target.value,
                      }))
                    }
                    rows={10}
                    placeholder={'## Mở đầu\n- Giới thiệu tác giả, tác phẩm...\n\n### Nội dung chính\n- ...\n\n### Kết luận\n- ...'}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none font-mono leading-relaxed"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowContribute(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-200"
              >
                Hủy
              </button>
              <button
                onClick={handleContribute}
                disabled={submitting}
                className="px-4 py-2 text-sm font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang đăng...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Gửi đóng góp
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};