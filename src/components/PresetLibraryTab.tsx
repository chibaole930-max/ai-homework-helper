import React, { useState } from 'react';
import { PRESET_LESSON_NOTES } from '../data/presets';
import { SUBJECTS } from '../data/subjects';
import { SavedStudyItem, SubjectId } from '../types';
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
} from 'lucide-react';

interface PresetLibraryTabProps {
  onImportPreset: (item: SavedStudyItem) => void;
  isItemSaved: (title: string, subject: string) => boolean;
}

export const PresetLibraryTab: React.FC<PresetLibraryTabProps> = ({
  onImportPreset,
  isItemSaved,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<SavedStudyItem | null>(null);
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set());

  const filteredPresets = PRESET_LESSON_NOTES.filter((item) => {
    if (selectedSubject !== 'all' && item.subjectId !== selectedSubject) {
      return false;
    }
    return true;
  });

  const handleImport = (item: SavedStudyItem) => {
    onImportPreset(item);
    setImportedIds((prev) => new Set(prev).add(item.id));
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-2xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-xs mb-3">
            <Library className="w-3.5 h-3.5 text-amber-300" />
            <span>Kho Học Liệu Mẫu Chuẩn GDPT 2018</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Thư Viện Bài Soạn & Lời Giải Mẫu Lớp 12
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Tuyển chọn các bài soạn mẫu chuẩn sư phạm và lời giải mẫu tiêu biểu cho học sinh Lớp 12.
            Bạn có thể đọc ngay hoặc lưu trực tiếp vào Vở ghi của mình chỉ với 1 cú click!
          </p>
        </div>
        <div className="absolute right-0 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Filter by Subject */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
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
        {SUBJECTS.map((s) => (
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

      {/* Grid of Preset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPresets.map((item) => {
          const alreadySaved =
            importedIds.has(item.id) || isItemSaved(item.title, item.subject);
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
                  <span className="text-[10px] font-semibold text-slate-400">
                    {item.textbook}
                  </span>
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

              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
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
          );
        })}
      </div>

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

            <div className="p-6 overflow-y-auto flex-1">
              <MarkdownRenderer content={activeItem.content} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
