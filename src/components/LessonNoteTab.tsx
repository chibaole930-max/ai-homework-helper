import React, { useState, useRef, useEffect } from 'react';
import {
  SubjectInfo,
  SubjectId,
  TextbookSeries,
  NoteStyle,
  DetailLevel,
  SavedStudyItem,
  LoigiaihaySection,
  GradeId,
} from '../types';
import { SubjectIcon } from './SubjectIcon';
import { MarkdownRenderer } from './MarkdownRenderer';
import { CurriculumBrowser } from './CurriculumBrowser';
import {
  Sparkles,
  BookOpen,
  BrainCircuit,
  FileSpreadsheet,
  Target,
  Copy,
  Check,
  Bookmark,
  Printer,
  Edit2,
  CheckCircle2,
  RefreshCw,
  Sliders,
  ChevronRight,
  AlertCircle,
  ExternalLink,
  Layers,
  ListChecks,
  Share2,
  X,
  Loader2,
  Send,
} from 'lucide-react';

interface LessonNoteTabProps {
  onSaveNote: (item: Omit<SavedStudyItem, 'id' | 'date'>) => void;
  isItemSaved: (title: string, subject: string) => boolean;
  subjects: SubjectInfo[];
  textbooks: TextbookSeries[];
  gradeLabel: string;
  grade: GradeId;
}

export const LessonNoteTab: React.FC<LessonNoteTabProps> = ({
  onSaveNote,
  isItemSaved,
  subjects,
  textbooks,
  gradeLabel,
  grade,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>(() =>
    (subjects[0]?.id as SubjectId) || 'dia'
  );
  const [selectedTextbook, setSelectedTextbook] =
    useState<TextbookSeries>('Kết nối tri thức với cuộc sống');
  const [lessonTitle, setLessonTitle] = useState('');
  const [noteStyle, setNoteStyle] = useState<NoteStyle>('loigiaihay_full');
  const [loigiaihaySection, setLoigiaihaySection] =
    useState<LoigiaihaySection>('all');
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('standard');
  const [customNote, setCustomNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // Giới hạn lượt soạn bài miễn phí (3 lượt/ngày theo IP)
  const [usage, setUsage] = useState<{
    limit: number;
    used: number;
    remaining: number;
  } | null>(null);
  // Chia sẻ bài mẫu lên Kho chung
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareTitle, setShareTitle] = useState('');
  const [shareAuthor, setShareAuthor] = useState('');
  const [shareContent, setShareContent] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/usage/status')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) setUsage(d);
      })
      .catch(() => {});
  }, []);

  const openShareModal = () => {
    setShareTitle(lessonTitle.trim() || `Bài ghi ${currentSubject.shortName}`);
    setShareContent(generatedNote);
    setShareAuthor('');
    setShareError(null);
    setShared(false);
    setShowShareModal(true);
  };

  const handleShareToLibrary = async () => {
    if (!shareContent.trim()) {
      setShareError('Vui lòng nhập nội dung bài mẫu.');
      return;
    }
    setIsSharing(true);
    setShareError(null);
    try {
      const res = await fetch('/api/community/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: currentSubject.name,
          subjectId: currentSubject.id,
          textbook: selectedTextbook,
          title: shareTitle.trim(),
          content: shareContent,
          author: shareAuthor.trim(),
          grade,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Đăng lên Kho bài mẫu thất bại.');
      }
      setShared(true);
      setTimeout(() => {
        setShowShareModal(false);
        setShared(false);
      }, 1300);
    } catch (err: any) {
      setShareError(err.message || 'Không thể đăng. Vui lòng thử lại.');
    } finally {
      setIsSharing(false);
    }
  };

  const scrollOutputIntoView = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const currentSubject =
    subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  useEffect(() => {
    if (lessonTitle === '' && currentSubject) {
      if (currentSubject.chapters && currentSubject.chapters.length > 0 && currentSubject.chapters[0].lessons.length > 0) {
        const firstLesson = currentSubject.chapters[0].lessons[0];
        const title = firstLesson.number
          ? `${firstLesson.number}: ${firstLesson.title}`
          : firstLesson.title;
        setLessonTitle(title);
      } else if (currentSubject.popularLessons && currentSubject.popularLessons.length > 0) {
        setLessonTitle(currentSubject.popularLessons[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubjectSelect = (newSubjectId: SubjectId) => {
    setSelectedSubjectId(newSubjectId);
    const sub = subjects.find((s) => s.id === newSubjectId);
    if (sub?.chapters && sub.chapters.length > 0 && sub.chapters[0].lessons.length > 0) {
      const firstLesson = sub.chapters[0].lessons[0];
      const title = firstLesson.number
        ? `${firstLesson.number}: ${firstLesson.title}`
        : firstLesson.title;
      setLessonTitle(title);
    } else if (sub?.popularLessons && sub.popularLessons.length > 0) {
      setLessonTitle(sub.popularLessons[0]);
    }
  };

  const handleGenerate = async (overrideTitle?: string) => {
    const activeTitle = (overrideTitle !== undefined ? overrideTitle : lessonTitle).trim();
    if (!activeTitle) {
      setErrorMsg('Vui lòng chọn hoặc nhập tên bài học từ danh sách mục lục.');
      return;
    }

    if (overrideTitle) {
      setLessonTitle(overrideTitle);
    }

    setErrorMsg(null);
    setIsLoading(true);
    setIsEditing(false);
    scrollOutputIntoView();

    try {
      const response = await fetch('/api/lesson-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: currentSubject.name,
          subjectId: currentSubject.id,
          textbook: selectedTextbook,
          lessonTitle: activeTitle,
          noteStyle,
          loigiaihaySection,
          detailLevel,
          customNote: customNote.trim(),
          sourceUrl: currentSubject.loigiaihayUrl || '',
          grade,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Yêu cầu thất bại (${response.status})`);
      }

      const data = await response.json();
      setGeneratedNote(data.result);
      setUsage((prev) =>
        prev
          ? {
              ...prev,
              used: prev.used + 1,
              remaining: Math.max(0, prev.limit - (prev.used + 1)),
            }
          : prev
      );
    } catch (err: any) {
      console.error('Error generating lesson note:', err);
      setErrorMsg(
        err.message || 'Đã có lỗi xảy ra khi tạo bài ghi. Vui lòng kiểm tra lại mạng hoặc thử lại sau.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLesson = (title: string, autoGenerate = false) => {
    setLessonTitle(title);
    if (autoGenerate) {
      handleGenerate(title);
    }
  };

  const handleCopy = () => {
    if (!generatedNote) return;
    navigator.clipboard.writeText(generatedNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!generatedNote) return;
    onSaveNote({
      type: 'note',
      title: lessonTitle.trim() || `Bài ghi ${currentSubject.shortName}`,
      subject: currentSubject.name,
      subjectId: currentSubject.id,
      textbook: selectedTextbook,
      content: generatedNote,
      isFavorite: false,
      style: noteStyle,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const alreadySaved = isItemSaved(lessonTitle.trim(), currentSubject.name);
  const outOfUses = usage !== null && usage.remaining <= 0;

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 rounded-2xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-semibold backdrop-blur-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Trợ Lý Soạn Bài AI Chuyên Sâu {gradeLabel}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Soạn Bài Ghi & Tổng Hợp Kiến Thức Trọng Tâm
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Chuẩn hóa bài ghi vở cho tất cả 11 môn học {gradeLabel} theo chương trình GDPT 2018 mới nhất.
            Hỗ trợ vẽ sơ đồ tư duy, tóm lược công thức cốt lõi và câu hỏi ôn thi THPT Quốc gia.
          </p>
        </div>
        <div className="absolute right-0 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Hạn mức lượt soạn bài miễn phí hôm nay */}
      {usage && usage.remaining > 0 && (
        <div className="px-4 py-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs bg-indigo-50/70 border-indigo-100 text-indigo-800">
          <span className="font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
            Soạn bài miễn phí hôm nay: còn{' '}
            <b className="text-indigo-900">{usage.remaining}/{usage.limit}</b> lượt
          </span>
        </div>
      )}
      {usage && usage.remaining <= 0 && (
        <div className="px-4 py-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs bg-amber-50 border-amber-200 text-amber-800">
          <span className="font-medium flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            Bạn đã dùng hết {usage.limit} lượt soạn bài miễn phí hôm nay. Hạn mức sẽ reset vào ngày mai.
          </span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. Chọn Môn Học */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  1
                </span>
                Chọn Môn Học {gradeLabel}
              </label>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                11 Môn học
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {subjects.map((subject) => {
                const isSelected = subject.id === selectedSubjectId;
                return (
                  <button
                    key={subject.id}
                    id={`subject-btn-${subject.id}`}
                    onClick={() => handleSubjectSelect(subject.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-150 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/90 text-indigo-900 shadow-xs ring-2 ring-indigo-500/20 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      <SubjectIcon icon={subject.icon} className="w-4 h-4" />
                    </div>
                    <span className="text-xs leading-tight">{subject.shortName}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100 flex-wrap gap-2">
              <p className="text-xs text-slate-500 italic">
                Đang chọn: <strong className="text-slate-800">{currentSubject.name}</strong> –{' '}
                {currentSubject.description}
              </p>
              {currentSubject.loigiaihayUrl && (
                <a
                  href={currentSubject.loigiaihayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition-colors"
                  title={`Xem mục lục lời giải ${currentSubject.name} trên loigiaihay.com`}
                >
                  <span>Mục lục trên loigiaihay.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* 2. Chọn Bộ Sách Giáo Khoa */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  2
                </span>
                Bộ Sách Giáo Khoa
              </label>
              <span className="text-xs font-medium text-slate-500">
                Chương trình GDPT 2018
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {textbooks.map((tb) => (
                <button
                  key={tb}
                  onClick={() => setSelectedTextbook(tb)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors ${
                    selectedTextbook === tb
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tb}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Liệt kê các Phần & Bài học SGK (Chuẩn loigiaihay.com) */}
          <CurriculumBrowser
            chapters={currentSubject.chapters || []}
            selectedSubject={currentSubject}
            selectedTextbook={selectedTextbook}
            currentLessonTitle={lessonTitle}
            onSelectLesson={handleSelectLesson}
            isLoading={isLoading}
          />

          {/* 4. Phong Cách Soạn Bài & Mức Độ */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  4
                </span>
                Kiểu Định Dạng Bài Soạn
              </label>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                Chuẩn loigiaihay.com
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setNoteStyle('loigiaihay_full')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  noteStyle === 'loigiaihay_full'
                    ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/50 text-amber-950'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chuẩn Lời Giải Hay</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Lý thuyết, trả lời câu hỏi SGK & giải bài tập chi tiết
                </p>
              </button>

              <button
                type="button"
                onClick={() => setNoteStyle('sgk_exercises')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  noteStyle === 'sgk_exercises'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500 text-indigo-950'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <ListChecks className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Giải Bài Tập SGK/SBT</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Trọn bộ bài 1.1, 1.2... SGK & SBT có phương pháp giải
                </p>
              </button>

              <button
                type="button"
                onClick={() => setNoteStyle('standard')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  noteStyle === 'standard'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500 text-indigo-950'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Vở Ghi Tiêu Chuẩn</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Mục tiêu, tóm tắt cốt lõi, ví dụ và bài tập củng cố
                </p>
              </button>

              <button
                type="button"
                onClick={() => setNoteStyle('formula_summary')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  noteStyle === 'formula_summary'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500 text-indigo-950'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sổ Tay Công Thức</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Công thức tính nhanh, định lý, bảng tra và bẫy đề thi
                </p>
              </button>

              <button
                type="button"
                onClick={() => setNoteStyle('mindmap')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  noteStyle === 'mindmap'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500 text-indigo-950'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />
                  <span>Sơ Đồ Tư Duy</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Phân nhánh logic, từ khóa then chốt và mẹo nhớ
                </p>
              </button>

              <button
                type="button"
                onClick={() => setNoteStyle('exam_prep')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  noteStyle === 'exam_prep'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500 text-indigo-950'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <Target className="w-3.5 h-3.5 text-rose-600" />
                  <span>Đề Cương Ôn Thi THPT</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Trắc nghiệm nhiều lựa chọn, đúng/sai, trả lời ngắn
                </p>
              </button>
            </div>

            {/* Chuyên mục Lời Giải Hay */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Chuyên mục muốn tập trung (loigiaihay.com):</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'Tất cả các phần' },
                  { id: 'theory', label: 'Lý thuyết trọng tâm' },
                  { id: 'activities', label: 'Khởi động & Khám phá' },
                  { id: 'practice', label: 'Luyện tập & Vận dụng' },
                  { id: 'exercises_sgk', label: 'Bài tập SGK' },
                  { id: 'exercises_sbt', label: 'Bài tập SBT' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setLoigiaihaySection(sec.id as LoigiaihaySection)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      loigiaihaySection === sec.id
                        ? 'bg-amber-600 text-white border-amber-600 font-semibold shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detail Level */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Mức độ chi tiết:</span>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setDetailLevel('basic')}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    detailLevel === 'basic'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ngắn gọn
                </button>
                <button
                  type="button"
                  onClick={() => setDetailLevel('standard')}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    detailLevel === 'standard'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tiêu chuẩn
                </button>
                <button
                  type="button"
                  onClick={() => setDetailLevel('advanced')}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    detailLevel === 'advanced'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Nâng cao
                </button>
              </div>
            </div>

            {/* Custom note */}
            <div>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Yêu cầu thêm (ví dụ: nhấn mạnh bài tập khó, kèm bài văn mẫu...)"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            {/* Error message */}
            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
                  <span className="leading-relaxed font-medium">{errorMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  className="self-start px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Thử lại ngay</span>
                </button>
              </div>
            )}

            {/* Generate Action Button */}
            <button
              id="btn-generate-lesson"
              type="button"
              disabled={isLoading || outOfUses}
              onClick={() => handleGenerate()}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang tổng hợp bài ghi {gradeLabel}...</span>
                </>
              ) : outOfUses ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Hết lượt soạn bài hôm nay</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Soạn Bài Ghi Ngay</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Output Result Pane */}
        <div ref={outputRef} className="lg:col-span-7 scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-[580px]">
            {/* Output Header */}
            <div className="px-4 sm:px-5 py-3.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-sm font-bold text-slate-800 truncate">
                  {lessonTitle
                    ? `${currentSubject.shortName}: ${lessonTitle}`
                    : 'Nội dung bài ghi vở'}
                </span>
                {selectedTextbook && (
                  <span className="text-[11px] font-medium bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-full hidden sm:inline-block">
                    {selectedTextbook}
                  </span>
                )}
              </div>

              {/* Action Toolbar */}
              {generatedNote && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    title={isEditing ? 'Xem trước định dạng' : 'Chỉnh sửa bài ghi'}
                    className="p-1.5 text-xs text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg border border-slate-200 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {isEditing ? 'Xem trước' : 'Sửa'}
                    </span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="p-1.5 text-xs text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg border border-slate-200 flex items-center gap-1 font-medium transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Sao chép</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSave}
                    className={`p-1.5 text-xs rounded-lg border flex items-center gap-1 font-medium transition-colors ${
                      alreadySaved
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border-slate-200'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {alreadySaved ? 'Đã lưu' : 'Lưu vở'}
                    </span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-1.5 text-xs text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg border border-slate-200 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">In</span>
                  </button>

                  <button
                    onClick={openShareModal}
                    title="Đăng bài này lên Kho bài mẫu cho mọi người dùng web cùng xem"
                    className="p-1.5 text-xs text-slate-600 hover:text-white hover:bg-emerald-600 rounded-lg border border-slate-200 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Chia sẻ lên Kho</span>
                  </button>
                </div>
              )}
            </div>

            {/* Output Body */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center animate-pulse">
                      <Sparkles className="w-8 h-8 text-indigo-600 animate-spin" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">
                      Đang soạn bài {currentSubject.shortName} {gradeLabel}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">
                      Tổng hợp cấu trúc chuẩn GDPT 2018, trích lọc công thức và câu hỏi củng cố...
                    </p>
                  </div>
                </div>
              ) : generatedNote ? (
                isEditing ? (
                  <div className="h-full flex flex-col space-y-2">
                    <span className="text-xs font-semibold text-slate-500">
                      Chế độ chỉnh sửa Markdown trực tiếp:
                    </span>
                    <textarea
                      value={generatedNote}
                      onChange={(e) => setGeneratedNote(e.target.value)}
                      className="w-full flex-1 min-h-[460px] p-4 font-mono text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                    />
                  </div>
                ) : (
                  <div className="prose prose-slate max-w-none">
                    <MarkdownRenderer content={generatedNote} />
                  </div>
                )
              ) : (
                <div className="h-full min-h-[420px] flex flex-col items-center justify-center text-center text-slate-400 py-16 px-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-700 mb-1">
                    Chưa có bài soạn nào được tạo
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mb-5">
                    Chọn môn học, bộ sách giáo khoa và tên bài học ở cột bên trái, sau đó nhấn{' '}
                    <strong className="text-indigo-600 font-semibold">"Soạn Bài Ghi Ngay"</strong>.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Mẹo: Bạn có thể chọn nhanh các bài học tiêu biểu ở mục số 2</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Đăng bài mẫu lên Kho chung */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Đăng bài mẫu lên Kho chung
                </h2>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Bài của bạn sẽ được đồng bộ để mọi người dùng web xem và sử dụng.
                </p>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="bg-slate-50 rounded-lg px-3 py-2">
                  Môn học: <b className="text-slate-900">{currentSubject.name}</b>
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-2">
                  Bộ sách: <b className="text-slate-900">{selectedTextbook}</b>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">Tên bài mẫu *</label>
                <input
                  value={shareTitle}
                  onChange={(e) => setShareTitle(e.target.value)}
                  placeholder="VD: Bài 1: Vị trí địa lí và phạm vi lãnh thổ"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">
                  Tên của bạn (không bắt buộc)
                </label>
                <input
                  value={shareAuthor}
                  onChange={(e) => setShareAuthor(e.target.value)}
                  placeholder="VD: Minh Anh - 12A1"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">
                  Nội dung bài mẫu (Markdown) *
                </label>
                <textarea
                  value={shareContent}
                  onChange={(e) => setShareContent(e.target.value)}
                  rows={9}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none font-mono leading-relaxed"
                />
              </div>

              {shareError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  {shareError}
                </div>
              )}
              {shared && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-semibold">
                  Đã gửi bài mẫu! Bài của bạn đang chờ admin duyệt rồi sẽ xuất hiện trong Kho bài mẫu chung.
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-200"
              >
                Hủy
              </button>
              <button
                onClick={handleShareToLibrary}
                disabled={isSharing || shared}
                className="px-4 py-2 text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white flex items-center gap-1.5"
              >
                {isSharing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang đăng...
                  </>
                ) : shared ? (
                  <>
                    <Check className="w-4 h-4" />
                    Đã đăng
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Đăng lên Kho Bài Mẫu
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
