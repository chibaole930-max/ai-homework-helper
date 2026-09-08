import React, { useState, useMemo } from 'react';
import { CurriculumChapter, SubjectInfo, TextbookSeries } from '../types';
import {
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Search,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  BookOpen,
  Check,
  X,
  Layers,
  FileText,
} from 'lucide-react';

interface CurriculumBrowserProps {
  chapters: CurriculumChapter[];
  selectedSubject: SubjectInfo;
  selectedTextbook: TextbookSeries;
  currentLessonTitle: string;
  onSelectLesson: (lessonTitle: string, autoGenerate?: boolean) => void;
  isLoading?: boolean;
}

export const CurriculumBrowser: React.FC<CurriculumBrowserProps> = ({
  chapters,
  selectedSubject,
  selectedTextbook,
  currentLessonTitle,
  onSelectLesson,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  // All chapters open by default so users see all parts and lessons directly without having to guess
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    chapters.forEach((c) => {
      init[c.id] = true;
    });
    return init;
  });
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInputText, setCustomInputText] = useState('');

  // Total lessons count
  const totalLessons = useMemo(() => {
    return chapters.reduce((acc, c) => acc + c.lessons.length, 0);
  }, [chapters]);

  // Filtered chapters & lessons
  const filteredChapters = useMemo(() => {
    if (!searchTerm.trim()) return chapters;

    const term = searchTerm.toLowerCase().trim();
    return chapters
      .map((ch) => {
        const matchingLessons = ch.lessons.filter(
          (l) =>
            l.title.toLowerCase().includes(term) ||
            (l.number && l.number.toLowerCase().includes(term)) ||
            (l.description && l.description.toLowerCase().includes(term))
        );

        const matchesChapterTitle = ch.title.toLowerCase().includes(term);

        if (matchesChapterTitle) {
          return ch;
        }

        if (matchingLessons.length > 0) {
          return {
            ...ch,
            lessons: matchingLessons,
          };
        }

        return null;
      })
      .filter(Boolean) as CurriculumChapter[];
  }, [chapters, searchTerm]);

  const toggleChapter = (chapterId: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    chapters.forEach((c) => {
      next[c.id] = true;
    });
    setExpandedMap(next);
  };

  const collapseAll = () => {
    setExpandedMap({});
  };

  // Build full lesson title string
  const formatLessonTitle = (number?: string, title?: string) => {
    if (!title) return '';
    if (!number) return title;
    // Check if title already starts with the number (e.g. "Bài 1: ...")
    if (title.toLowerCase().startsWith(number.toLowerCase())) {
      return title;
    }
    return `${number}: ${title}`;
  };

  const isLessonActive = (number?: string, title?: string) => {
    if (!currentLessonTitle) return false;
    const formatted = formatLessonTitle(number, title).toLowerCase();
    const current = currentLessonTitle.toLowerCase();
    return current === formatted || (title && current.includes(title.toLowerCase()));
  };

  // Per-subject link to the loigiaihay page for the current grade
  const loigiaihayUrl = selectedSubject.loigiaihayUrl;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header of Curriculum Browser */}
      <div className="p-4 bg-gradient-to-r from-slate-50 to-indigo-50/40 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-xs">
              2
            </span>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>Mục lục các Phần & Bài học SGK</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                {chapters.length} phần • {totalLessons} bài học
              </span>
            </h3>
          </div>

          {/* Direct link to Loigiaihay */}
          {loigiaihayUrl && (
            <a
              href={loigiaihayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100/90 border border-amber-300/80 px-2.5 py-1 rounded-lg transition-all shadow-2xs"
              title="Xem nguyên văn mục lục bài học trên loigiaihay.com"
            >
              <span>Xem trên loigiaihay.com</span>
              <ExternalLink className="w-3 h-3 text-amber-700" />
            </a>
          )}
        </div>

        <p className="text-xs text-slate-600 mb-3">
          Toàn bộ các phần và bài học được liệt kê sẵn theo chuẩn sách giáo khoa{' '}
          <strong className="text-slate-800">{selectedTextbook}</strong>. Bấm vào bài bất kỳ để chọn và soạn ngay!
        </p>

        {/* Search bar & Toggle Expand/Collapse */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Tìm nhanh trong ${totalLessons} bài học (vd: Bài 1, dân số, kinh tế, đạo hàm...)`}
              className="w-full pl-8.5 pr-8 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <button
              type="button"
              onClick={expandAll}
              className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium whitespace-nowrap"
            >
              Mở tất cả
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium whitespace-nowrap"
            >
              Thu gọn
            </button>
          </div>
        </div>
      </div>

      {/* Currently Active / Selected Lesson Banner */}
      {currentLessonTitle && (
        <div className="px-4 py-2.5 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
                Bài học đang chọn:
              </div>
              <div className="text-xs font-bold text-indigo-950 truncate" title={currentLessonTitle}>
                {currentLessonTitle}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectLesson(currentLessonTitle, true)}
            disabled={isLoading}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Soạn bài này ngay</span>
          </button>
        </div>
      )}

      {/* Chapters and Lessons Tree View */}
      <div className="divide-y divide-slate-100 max-h-[460px] overflow-y-auto p-1">
        {filteredChapters.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            Không tìm thấy bài học nào khớp với từ khóa "{searchTerm}".
          </div>
        ) : (
          filteredChapters.map((chapter) => {
            const isExpanded = expandedMap[chapter.id] ?? true;
            const hasActiveLesson = chapter.lessons.some((l) => isLessonActive(l.number, l.title));

            return (
              <div key={chapter.id} className="py-1.5 px-1.5">
                {/* Chapter / Part Header */}
                <button
                  type="button"
                  onClick={() => toggleChapter(chapter.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                    hasActiveLesson
                      ? 'bg-indigo-50/60 border border-indigo-200/80 text-indigo-950 font-bold'
                      : 'hover:bg-slate-50 border border-transparent text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg ${
                        hasActiveLesson ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {chapter.title}
                      </div>
                      {chapter.description && (
                        <div className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                          {chapter.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[11px] font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                      {chapter.lessons.length} bài
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Lessons in this Chapter */}
                {isExpanded && (
                  <div className="mt-1 ml-3 pl-3 border-l-2 border-indigo-100/80 space-y-1 py-1">
                    {chapter.lessons.map((lesson) => {
                      const fullTitle = formatLessonTitle(lesson.number, lesson.title);
                      const active = isLessonActive(lesson.number, lesson.title);

                      return (
                        <div
                          key={lesson.id}
                          className={`group flex items-center justify-between p-2 rounded-xl transition-all border ${
                            active
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-950 shadow-2xs'
                              : 'bg-white hover:bg-slate-50/90 border-slate-100 hover:border-slate-200 text-slate-700'
                          }`}
                        >
                          {/* Lesson Info (Click to select) */}
                          <div
                            onClick={() => onSelectLesson(fullTitle, false)}
                            className="flex-1 cursor-pointer min-w-0 mr-2"
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              {lesson.number && (
                                <span
                                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                                    active
                                      ? 'bg-indigo-600 text-white'
                                      : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                                  }`}
                                >
                                  {lesson.number}
                                </span>
                              )}
                              <span
                                className={`text-xs ${
                                  active ? 'font-bold text-indigo-950' : 'font-medium text-slate-800'
                                }`}
                              >
                                {lesson.title}
                              </span>
                              {active && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                                  <Check className="w-2.5 h-2.5" />
                                  Đang chọn
                                </span>
                              )}
                            </div>

                            {lesson.description && (
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {lesson.description}
                              </p>
                            )}
                          </div>

                          {/* Quick Action Button */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectLesson(fullTitle, false);
                              }}
                              className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                                active
                                  ? 'bg-indigo-200/70 text-indigo-900'
                                  : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 border border-transparent hover:border-indigo-100'
                              }`}
                            >
                              Chọn bài
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectLesson(fullTitle, true);
                              }}
                              disabled={isLoading}
                              className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs flex items-center gap-1 transition-all disabled:opacity-50"
                              title={`Soạn ngay nội dung ${fullTitle}`}
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>Soạn ngay</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Manual Input Toggle for custom / non-SGK requests */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs">
        {!showCustomInput ? (
          <button
            type="button"
            onClick={() => setShowCustomInput(true)}
            className="text-slate-600 hover:text-indigo-700 font-medium flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Hoặc tự nhập tên bài học / chuyên đề tùy ý ngoài SGK</span>
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Nhập tên bài học / đề mục tùy ý:
              </label>
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                className="text-[11px] text-slate-400 hover:text-slate-600"
              >
                Đóng lại
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                placeholder="Nhập tên bài học, ví dụ: Chuyên đề khảo sát hàm phân thức nâng cao..."
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (customInputText.trim()) {
                    onSelectLesson(customInputText.trim(), false);
                  }
                }}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors shrink-0"
              >
                Áp dụng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
