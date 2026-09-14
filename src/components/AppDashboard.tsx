import React from 'react';
import {
  Edit3,
  Sparkles,
  Library,
  FolderHeart,
  ChevronRight,
  GraduationCap,
  ClipboardList,
  Route,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Stagger, StaggerItem } from './Motion';
import { GradeId, SavedStudyItem, SubjectInfo } from '../types';

export type OpenFeature = 'notes' | 'solver' | 'presets' | 'saved' | 'transcript' | 'path';

interface AppDashboardProps {
  grade: GradeId;
  subjects: SubjectInfo[];
  savedItems: SavedStudyItem[];
  onOpenFeature: (feature: OpenFeature) => void;
  onGradeChange: (grade: GradeId) => void;
}

interface TileDef {
  feature: OpenFeature;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accentBar: string;
  iconBg: string;
  desc: string;
  chips: string[];
  cta: string;
}

function FeatureTile({ tile, onOpen }: { tile: TileDef; onOpen: () => void }) {
  const Icon = tile.icon;
  return (
    <button
      onClick={onOpen}
      title={tile.title}
      className="group relative h-full w-full min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.99] transition-all duration-200 flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <div className={`shrink-0 h-1.5 w-full ${tile.accentBar}`} />
      <div className="flex-1 min-h-0 p-3 sm:p-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 shrink-0">
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-white ${tile.iconBg} shadow-md shadow-slate-200/70 group-hover:scale-110 transition-transform duration-200 shrink-0`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold text-slate-300 group-hover:text-blue-600 flex items-center gap-0.5 whitespace-nowrap transition-colors">
            {tile.cta}
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-extrabold text-white rounded-md px-1.5 py-0.5 bg-slate-900">
            {tile.number}
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight truncate">
            {tile.title}
          </h3>
        </div>
        <p className="text-[11px] font-semibold text-slate-400 leading-none shrink-0">
          {tile.subtitle}
        </p>

        <p className="text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-2 min-h-0">
          {tile.desc}
        </p>

        <div className="mt-auto pt-1 min-h-0 overflow-hidden">
          <div className="flex flex-wrap gap-1">
            {tile.chips.map((c) => (
              <span
                key={c}
                className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold whitespace-nowrap"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

const THCS_GRADES: GradeId[] = ['6', '7', '8', '9'];
const THPT_GRADES: GradeId[] = ['10', '11', '12'];

const THCS_REQUIRED: SubjectInfo['id'][] = ['toan', 'van', 'anh', 'khtn', 'sudia', 'gdcd', 'tin', 'congnghe'];
const THPT_REQUIRED: SubjectInfo['id'][] = ['toan', 'van', 'anh', 'su'];
const THPT_ELECTIVE: SubjectInfo['id'][] = ['ly', 'hoa', 'sinh', 'dia', 'gdktpl', 'tin', 'congnghe'];

export const AppDashboard: React.FC<AppDashboardProps> = ({
  grade,
  subjects,
  savedItems,
  onOpenFeature,
  onGradeChange,
}) => {
  const isTHCS = THCS_GRADES.includes(grade);
  const blockGrades = isTHCS ? THCS_GRADES : THPT_GRADES;

  const subjectMeta = subjects.map((s) => {
    if (isTHCS) {
      return {
        ...s,
        tag: THCS_REQUIRED.includes(s.id) ? 'Bắt buộc' : 'Tự chọn',
        tagStyle: THCS_REQUIRED.includes(s.id)
          ? 'bg-blue-50 text-blue-700 border-blue-200'
          : 'bg-orange-50 text-orange-700 border-orange-200',
      };
    }
    if (THPT_REQUIRED.includes(s.id)) {
      return { ...s, tag: 'Bắt buộc', tagStyle: 'bg-blue-50 text-blue-700 border-blue-200' };
    }
    if (THPT_ELECTIVE.includes(s.id)) {
      const combo = ['ly', 'hoa', 'sinh'].includes(s.id)
        ? 'KHTN'
        : ['su', 'dia', 'gdktpl'].includes(s.id)
          ? 'KHXH'
          : 'Tự chọn';
      return {
        ...s,
        tag: `Tổ hợp ${combo}`,
        tagStyle: 'bg-orange-50 text-orange-700 border-orange-200',
      };
    }
    return { ...s, tag: 'Tự chọn', tagStyle: 'bg-orange-50 text-orange-700 border-orange-200' };
  });

  const tiles: TileDef[] = [
    {
      feature: 'notes',
      number: '1',
      title: 'Soạn Bài Ghi',
      subtitle: 'AI soạn bài chuẩn pros',
      icon: Edit3,
      accentBar: 'bg-gradient-to-r from-indigo-600 to-blue-500',
      iconBg: 'bg-gradient-to-tr from-indigo-600 to-blue-500',
      desc: 'Nhập bài học, chọn môn — nhận ngay bài ghi sạch đẹp, đúng trọng tâm, dễ học.',
      chips: subjects.slice(0, 5).map((s) => s.shortName),
      cta: 'Bắt đầu',
    },
    {
      feature: 'solver',
      number: '2',
      title: 'Giải Bài Tập',
      subtitle: 'Giải đề bất kỳ từng bước',
      icon: Sparkles,
      accentBar: 'bg-gradient-to-r from-amber-500 to-orange-500',
      iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500',
      desc: 'Dán đề bài vào, AI giải chi tiết từng bước, dễ hiểu, đúng chương trình.',
      chips: ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa'],
      cta: 'Giải ngay',
    },
    {
      feature: 'presets',
      number: '3',
      title: 'Kho Bài Mẫu',
      subtitle: 'Hàng trăm bài mẫu sẵn có',
      icon: Library,
      accentBar: 'bg-gradient-to-r from-violet-600 to-fuchsia-500',
      iconBg: 'bg-gradient-to-tr from-violet-600 to-fuchsia-500',
      desc: 'Khám phá bài mẫu chất lượng theo từng môn & bài học, tải về Vở Ghi một chạm.',
      chips: ['Đủ môn', 'Chọn lọc', 'Miễn phí'],
      cta: 'Khám phá',
    },
    {
      feature: 'saved',
      number: '4',
      title: 'Vở Ghi',
      subtitle: 'Tài liệu học của riêng bạn',
      icon: FolderHeart,
      accentBar: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      iconBg: 'bg-gradient-to-tr from-emerald-500 to-teal-500',
      desc:
        savedItems.length > 0
          ? `Bạn đang có ${savedItems.length} bài — mở ra học tiếp ngay nhé.`
          : 'Chỗ lưu tất cả bài soạn & lời giải. Bắt đầu lưu bài đầu tiên nào!',
      chips:
        savedItems.length > 0
          ? savedItems.slice(0, 3).map((i) => i.subject.match(/^([^\s]+)/)?.[1] || i.subject)
          : ['Trống'],
      cta: 'Xem vở',
    },
    {
      feature: 'transcript',
      number: '5',
      title: 'Sổ Học Bạ',
      subtitle: 'Đặt chỉ tiêu điểm TBM',
      icon: ClipboardList,
      accentBar: 'bg-gradient-to-r from-blue-500 to-sky-500',
      iconBg: 'bg-gradient-to-tr from-blue-500 to-sky-500',
      desc: 'Nhập điểm TBM mong muốn theo từng môn, theo dõi tiến độ đạt được cả năm.',
      chips: ['Điểm TBM', 'Mục tiêu', 'Theo dõi'],
      cta: 'Mở sổ',
    },
    {
      feature: 'path',
      number: '6',
      title: 'Lộ Trình Học Tập',
      subtitle: 'Lộ trình cá nhân hóa',
      icon: Route,
      accentBar: 'bg-gradient-to-r from-orange-500 to-amber-500',
      iconBg: 'bg-gradient-to-tr from-orange-500 to-amber-500',
      desc: 'Khai mục tiêu của bạn, AI xây lộ trình học từng môn, từng giai đoạn phù hợp.',
      chips: ['Mục tiêu', 'Cá nhân hóa', 'AI'],
      cta: 'Tạo lộ trình',
    },
  ];

  return (
    <div className="h-full flex flex-col gap-2 sm:gap-3">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white p-3 sm:p-4 shadow-md flex items-center gap-3 sm:gap-5"
      >
        <div className="absolute -right-10 -top-14 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-24 -bottom-16 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-blue-100 text-[11px] font-semibold mb-1.5 backdrop-blur-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            {isTHCS ? 'Khối THCS' : 'Khối THPT'} • Hỗ trợ học tập lớp {grade}
          </span>
          <h1 className="text-base sm:text-xl font-extrabold tracking-tight leading-tight">
            Học giỏi – nhẹ nhàng hơn mỗi ngày
          </h1>
          <p className="hidden sm:block text-xs text-blue-100 mt-0.5">
            Soạn bài, giải bài, kho bài mẫu, sổ học bạ và lộ trình — gọn trong một màn hình.
          </p>
        </div>
        <button
          onClick={() => onOpenFeature('notes')}
          className="relative z-10 shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 active:scale-[0.98] transition-all text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-900/20"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          Soạn bài ngay
        </button>
      </motion.div>

      {/* Khối selector + lớp */}
      <div className="shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm p-2.5 sm:p-3 space-y-2.5">
        {/* Chọn khối */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => {
              const target = isTHCS ? THPT_GRADES[0] : THCS_GRADES[0];
              onGradeChange(target);
            }}
            className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-150 ${
              isTHCS
                ? 'bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            🏫 Khối THCS
            <span className="ml-1 opacity-80 hidden sm:inline">(Lớp 6 - 9)</span>
          </button>
          <button
            onClick={() => {
              const target = isTHCS ? THPT_GRADES[0] : THCS_GRADES[0];
              onGradeChange(target);
            }}
            className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-150 ${
              !isTHCS
                ? 'bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            🎓 Khối THPT
            <span className="ml-1 opacity-80 hidden sm:inline">(Lớp 10 - 12)</span>
          </button>
        </div>

        {/* Chọn lớp trong khối + môn học (animate khi đổi khối/lớp) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${grade}-block`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-2.5"
          >
            <div className="flex items-center gap-1">
              {blockGrades.map((g) => (
                <button
                  key={g}
                  onClick={() => onGradeChange(g)}
                  className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-150 border hover:-translate-y-0.5 ${
                    grade === g
                      ? isTHCS
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-orange-500 text-white border-orange-500 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>

            {/* Môn học GDPT 2018 */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 mr-0.5">
                Môn:
              </span>
              {subjectMeta.map((s) => (
                <span
                  key={s.id}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold ${s.tagStyle}`}
                >
                  {s.shortName}
                  <span className="opacity-70">{s.tag}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tiles */}
      <Stagger className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 overflow-y-auto">
        {tiles.map((t) => (
          <StaggerItem key={t.feature} className="h-full min-h-0">
            <FeatureTile tile={t} onOpen={() => onOpenFeature(t.feature)} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
};