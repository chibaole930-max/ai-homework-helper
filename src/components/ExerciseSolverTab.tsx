import React, { useState, useRef } from 'react';
import {
  SubjectId,
  TextbookSeries,
  SolutionDepth,
  SavedStudyItem,
  TutorMessage,
  SubjectInfo,
  GradeId,
} from '../types';
import { SubjectIcon } from './SubjectIcon';
import { MarkdownRenderer } from './MarkdownRenderer';
import {
  Sparkles,
  Camera,
  Upload,
  X,
  Copy,
  Check,
  Bookmark,
  Printer,
  HelpCircle,
  MessageSquare,
  Send,
  RefreshCw,
  AlertCircle,
  Lightbulb,
  FileQuestion,
  ChevronRight,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface ExerciseSolverTabProps {
  onSaveExercise: (item: Omit<SavedStudyItem, 'id' | 'date'>) => void;
  isItemSaved: (title: string, subject: string) => boolean;
  subjects: SubjectInfo[];
  gradeLabel: string;
  grade: GradeId;
}

export const ExerciseSolverTab: React.FC<ExerciseSolverTabProps> = ({
  onSaveExercise,
  isItemSaved,
  subjects,
  gradeLabel,
  grade,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>(
    (subjects[0]?.id as SubjectId) || 'toan'
  );
  const [selectedTextbook, setSelectedTextbook] =
    useState<TextbookSeries>('Tổng hợp / Chung');
  const [problemText, setProblemText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [solutionDepth, setSolutionDepth] = useState<SolutionDepth>('detailed');
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const scrollOutputIntoView = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Tutor followup state
  const [tutorInput, setTutorInput] = useState('');
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [tutorChat, setTutorChat] = useState<TutorMessage[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSubject =
    subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Vui lòng chỉ tải lên tệp định dạng hình ảnh (PNG, JPG, JPEG, WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('Kích thước ảnh quá lớn (vui lòng chọn ảnh dưới 15MB).');
      return;
    }

    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSolve = async () => {
    if (!problemText.trim() && !imagePreview) {
      setErrorMsg('Vui lòng nhập đề bài bằng văn bản hoặc tải ảnh chụp bài tập.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);
    setTutorChat([]); // reset followups
    scrollOutputIntoView();

    try {
      const response = await fetch('/api/solve-exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: currentSubject.name,
          textbook: selectedTextbook,
          problemText: problemText.trim(),
          imageBase64: imagePreview,
          mimeType: imageMimeType,
          solutionDepth,
          sourceUrl: currentSubject.loigiaihayUrl || '',
          grade,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Yêu cầu thất bại (${response.status})`);
      }

      const data = await response.json();
      setSolution(data.result);
    } catch (err: any) {
      console.error('Error solving exercise:', err);
      setErrorMsg(
        err.message || 'Lỗi khi kết nối giải bài tập. Vui lòng kiểm tra lại mạng hoặc thử lại.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTutorAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorInput.trim() || isTutorLoading) return;

    const userQ = tutorInput.trim();
    setTutorInput('');
    setTutorChat((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userQ,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setIsTutorLoading(true);

    try {
      const response = await fetch('/api/tutor-followup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: currentSubject.name,
          originalProblem: problemText,
          solution,
          userQuestion: userQ,
          grade,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Không thể giải đáp thắc mắc lúc này.');
      }

      setTutorChat((prev) => [
        ...prev,
        {
          sender: 'tutor',
          text: data.result,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      setTutorChat((prev) => [
        ...prev,
        {
          sender: 'tutor',
          text: 'Xin lỗi, gia sư gặp sự cố tạm thời khi trả lời. Bạn hãy thử đặt lại câu hỏi ngắn gọn hơn nhé!',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTutorLoading(false);
    }
  };

  const handleCopy = () => {
    if (!solution) return;
    navigator.clipboard.writeText(solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!solution) return;
    const titleSnippet = problemText
      ? problemText.slice(0, 45).replace(/\n/g, ' ') + '...'
      : `Bài tập ${currentSubject.shortName} (Hình ảnh)`;

    onSaveExercise({
      type: 'exercise',
      title: titleSnippet,
      subject: currentSubject.name,
      subjectId: currentSubject.id,
      textbook: selectedTextbook,
      content: solution,
      isFavorite: false,
      originalProblem: problemText,
      hasImage: !!imagePreview,
    });
  };

  const titleSnippet = problemText
    ? problemText.slice(0, 45).replace(/\n/g, ' ') + '...'
    : `Bài tập ${currentSubject.shortName}`;
  const alreadySaved = isItemSaved(titleSnippet, currentSubject.name);

  return (
    <div className="space-y-6">
      {/* Solver Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 rounded-2xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Giải Bài Tập Chuẩn Lời Giải Hay (loigiaihay.com) {gradeLabel}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Giải Chi Tiết Bài Tập Mọi Môn Học
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Nhập đề bài hoặc chụp ảnh bài tập. Hệ thống giải chi tiết theo chuẩn mực sư phạm của
            Lời Giải Hay (loigiaihay.com): Tóm tắt &rarr; Phương pháp giải &rarr; Lời giải chi tiết
            &rarr; Đáp số &rarr; Mẹo tránh bẫy và câu hỏi tự luyện tương tự.
          </p>
        </div>
        <div className="absolute right-0 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. Chọn Môn Học */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                  1
                </span>
                Môn Học {gradeLabel}
              </label>
              {currentSubject.loigiaihayUrl && (
                <a
                  href={currentSubject.loigiaihayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-md transition-colors"
                  title="Xem chuyên trang trên loigiaihay.com"
                >
                  <span>loigiaihay.com</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {subjects.map((s) => {
                const isSelected = s.id === selectedSubjectId;
                return (
                  <button
                    key={s.id}
                    id={`solver-subject-${s.id}`}
                    type="button"
                    onClick={() => setSelectedSubjectId(s.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/90 text-blue-900 shadow-xs ring-2 ring-blue-500/20 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border'
                      }`}
                    >
                      <SubjectIcon icon={s.icon} className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs leading-tight">{s.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Nhập Đề Bài hoặc Tải Ảnh */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                  2
                </span>
                Đề Bài Tập (Văn bản hoặc Chụp ảnh)
              </label>
            </div>

            {/* Textarea */}
            <div>
              <textarea
                id="input-problem-text"
                rows={5}
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Dán hoặc gõ đề bài vào đây (hỗ trợ câu hỏi tự luận, trắc nghiệm A-B-C-D, câu hỏi ngữ văn, bài dịch tiếng Anh, v.v.)..."
                className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed resize-y"
              />
            </div>

            {/* Image Upload Area */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload-input"
              />

              {imagePreview ? (
                <div className="relative rounded-xl border border-blue-200 bg-blue-50/50 p-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Ảnh đề bài"
                      className="w-14 h-14 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                    />
                    <div className="truncate text-xs">
                      <p className="font-semibold text-slate-800 truncate">Ảnh chụp bài tập</p>
                      <p className="text-slate-500 text-[11px]">Đã đính kèm ảnh đề bài</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 transition-colors"
                    title="Xóa ảnh"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleImageUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-3.5 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/30 group"
                >
                  <div className="flex items-center justify-center gap-2 text-slate-600 group-hover:text-blue-600">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold">
                      Tải ảnh hoặc chụp ảnh đề bài (Kéo thả hoặc nhấn vào đây)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Hỗ trợ ảnh chụp sách bài tập, đề kiểm tra, công thức toán lý hóa
                  </p>
                </div>
              )}
            </div>

            {/* Quick Sample Questions for Grade 12 */}
            {currentSubject.sampleQuestions.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Đề bài mẫu {currentSubject.shortName} {grade} (thử nhanh):
                </span>
                <div className="space-y-1">
                  {currentSubject.sampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setProblemText(q.text)}
                      className="w-full text-left p-2 rounded-lg border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-blue-50/50 text-xs transition-colors flex items-center justify-between group"
                    >
                      <div className="truncate pr-2">
                        <span className="font-semibold text-slate-800">{q.title}: </span>
                        <span className="text-slate-600">{q.text}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Chế Độ Lời Giải & Nút Giải */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                  3
                </span>
                Chế Độ Giải
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSolutionDepth('detailed')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    solutionDepth === 'detailed'
                      ? 'border-blue-600 bg-blue-50/90 ring-1 ring-blue-500 font-bold text-blue-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs block font-bold">Chi Tiết Từng Bước</span>
                  <span className="text-[10px] text-slate-500">Kèm bẫy & bài tập</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSolutionDepth('hint_only')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    solutionDepth === 'hint_only'
                      ? 'border-blue-600 bg-blue-50/90 ring-1 ring-blue-500 font-bold text-blue-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs block font-bold">Gợi Ý Hướng Đi</span>
                  <span className="text-[10px] text-slate-500">Tự suy nghĩ đáp số</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSolutionDepth('quick')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    solutionDepth === 'quick'
                      ? 'border-blue-600 bg-blue-50/90 ring-1 ring-blue-500 font-bold text-blue-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs block font-bold">Đáp Án Nhanh</span>
                  <span className="text-[10px] text-slate-500">So kết quả đề thi</span>
                </button>
              </div>
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                  <span className="leading-relaxed font-medium">{errorMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSolve}
                  className="self-start px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Thử lại ngay</span>
                </button>
              </div>
            )}

            {/* Action Button */}
            <button
              id="btn-solve-exercise"
              type="button"
              disabled={isLoading}
              onClick={handleSolve}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white font-bold rounded-xl shadow-md shadow-blue-100 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang phân tích & giải bài tập...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Giải Bài Tập Ngay</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Output & Followup Tutor */}
        <div ref={outputRef} className="lg:col-span-7 space-y-4 scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-[580px]">
            {/* Output Header */}
            <div className="px-4 sm:px-5 py-3.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-sm font-bold text-slate-800 truncate">
                  Lời giải chi tiết: {currentSubject.name}
                </span>
              </div>

              {solution && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200 flex items-center gap-1 font-medium transition-colors"
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
                        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50 border-slate-200'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {alreadySaved ? 'Đã lưu' : 'Lưu vở'}
                    </span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-1.5 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">In</span>
                  </button>
                </div>
              )}
            </div>

            {/* Output Body */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">
                      Đang giải bài tập {currentSubject.shortName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">
                      Đang đọc đề bài, tra cứu định lý và thiết lập lời giải từng bước chuẩn xác...
                    </p>
                  </div>
                </div>
              ) : solution ? (
                <div className="space-y-6">
                  <div className="prose prose-slate max-w-none">
                    <MarkdownRenderer content={solution} />
                  </div>

                  {/* Tutor Q&A Section */}
                  <div className="pt-6 border-t border-slate-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Hỏi thêm Gia Sư về bài này
                        </h4>
                        <p className="text-xs text-slate-500">
                          Chưa hiểu bước nào trong lời giải? Đặt câu hỏi để gia sư giải thích kỹ hơn!
                        </p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    {tutorChat.length > 0 && (
                      <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
                        {tutorChat.map((msg, i) => (
                          <div
                            key={i}
                            className={`flex flex-col ${
                              msg.sender === 'user' ? 'items-end' : 'items-start'
                            }`}
                          >
                            <div
                              className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                                msg.sender === 'user'
                                  ? 'bg-blue-600 text-white rounded-br-xs'
                                  : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-xs'
                              }`}
                            >
                              {msg.sender === 'tutor' ? (
                                <MarkdownRenderer content={msg.text} />
                              ) : (
                                <span>{msg.text}</span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 px-1">
                              {msg.timestamp}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Ask Input Form */}
                    <form onSubmit={handleTutorAsk} className="flex gap-2">
                      <input
                        type="text"
                        value={tutorInput}
                        onChange={(e) => setTutorInput(e.target.value)}
                        placeholder="Ví dụ: Tại sao ở bước 2 lại chia cho 2? Có cách bấm máy tính Casio không?"
                        className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                      <button
                        type="submit"
                        disabled={isTutorLoading || !tutorInput.trim()}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isTutorLoading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span className="hidden sm:inline">Hỏi</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[420px] flex flex-col items-center justify-center text-center text-slate-400 py-16 px-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                    <FileQuestion className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-700 mb-1">
                    Chưa có bài tập nào đang giải
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mb-5">
                    Dán đề bài hoặc chụp ảnh phiếu bài tập ở cột bên trái rồi nhấn{' '}
                    <strong className="text-blue-600 font-semibold">"Giải Bài Tập Ngay"</strong>.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Mẹo: Bạn có thể bấm thử các đề bài mẫu ở mục số 2</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
