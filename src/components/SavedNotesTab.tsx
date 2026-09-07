import React, { useState } from 'react';
import { SavedStudyItem, SubjectId } from '../types';
import { SUBJECTS } from '../data/subjects';
import { SubjectIcon } from './SubjectIcon';
import { MarkdownRenderer } from './MarkdownRenderer';
import {
  Search,
  Star,
  Trash2,
  BookOpen,
  Sparkles,
  FileText,
  Calendar,
  X,
  Copy,
  Check,
  Printer,
  Download,
  Filter,
} from 'lucide-react';

interface SavedNotesTabProps {
  items: SavedStudyItem[];
  onToggleFavorite: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const SavedNotesTab: React.FC<SavedNotesTabProps> = ({
  items,
  onToggleFavorite,
  onDeleteItem,
  onClearAll,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'note' | 'exercise' | 'favorite'>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<SavedStudyItem | null>(null);
  const [copied, setCopied] = useState(false);

  // Filter items
  const filteredItems = items.filter((item) => {
    if (filterType === 'note' && item.type !== 'note') return false;
    if (filterType === 'exercise' && item.type !== 'exercise') return false;
    if (filterType === 'favorite' && !item.isFavorite) return false;
    if (filterSubject !== 'all' && item.subjectId !== filterSubject) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vo_ghi_lop12_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Vở Ghi Điện Tử & Bài Đã Lưu</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
              {items.length} bài
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Lưu trữ tự động các bài học đã soạn và bài tập đã giải để ôn tập mọi lúc, mọi nơi
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={exportToJson}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Dữ Liệu</span>
            </button>
            <button
              onClick={onClearAll}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa tất cả</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài soạn, từ khóa, công thức..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Type Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả ({items.length})
            </button>
            <button
              onClick={() => setFilterType('note')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === 'note'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Bài Soạn Ghi
            </button>
            <button
              onClick={() => setFilterType('exercise')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === 'exercise'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Lời Giải Bài Tập
            </button>
            <button
              onClick={() => setFilterType('favorite')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1 transition-colors ${
                filterType === 'favorite'
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              Yêu thích
            </button>
          </div>
        </div>

        {/* Filter by subject chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs scrollbar-none">
          <span className="text-slate-400 font-medium whitespace-nowrap pl-1">
            Lọc môn:
          </span>
          <button
            onClick={() => setFilterSubject('all')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterSubject === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả
          </button>
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setFilterSubject(s.id)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                filterSubject === s.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{s.shortName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-slate-400" />
          <h3 className="text-base font-semibold text-slate-700 mb-1">
            Chưa có bài nào trong danh mục này
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hãy sang tab <strong>"Soạn Bài Ghi"</strong> hoặc <strong>"Giải Bài Tập"</strong>,
            sau khi tạo xong nhấn nút <strong>"Lưu vở"</strong> để xem lại ở đây.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const subjectObj = SUBJECTS.find((s) => s.id === item.subjectId);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 space-y-3">
                  {/* Top tags */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        {item.subject}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                          item.type === 'note'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {item.type === 'note' ? 'Bài soạn' : 'Bài giải'}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className={`p-1 rounded-lg transition-colors ${
                        item.isFavorite
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-slate-300 hover:text-amber-400'
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          item.isFavorite ? 'fill-amber-400 text-amber-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setActiveItem(item)}
                    className="font-bold text-sm text-slate-800 line-clamp-2 cursor-pointer group-hover:text-indigo-600 transition-colors leading-snug"
                  >
                    {item.title}
                  </h3>

                  {/* Snippet preview */}
                  <p
                    onClick={() => setActiveItem(item)}
                    className="text-xs text-slate-500 line-clamp-3 leading-relaxed cursor-pointer font-serif italic"
                  >
                    {item.content.replace(/#|\*|`|>|\[|\]/g, '').slice(0, 140)}...
                  </p>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.date}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveItem(item)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa bài này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reader Modal / Overlay */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    {activeItem.subject}
                  </span>
                  <span className="text-xs text-slate-500">{activeItem.date}</span>
                  {activeItem.textbook && (
                    <span className="text-xs text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md hidden sm:inline-block">
                      {activeItem.textbook}
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {activeItem.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(activeItem.content)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In</span>
                </button>
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <MarkdownRenderer content={activeItem.content} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
