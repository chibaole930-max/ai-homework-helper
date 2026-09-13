import React from 'react';
import {
  Edit3,
  Sparkles,
  Library,
  FolderHeart,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { SavedStudyItem, SubjectInfo } from '../types';

export type OpenFeature = 'notes' | 'solver' | 'presets' | 'saved';

interface AppDashboardProps {
  grade: string;
  subjects: SubjectInfo[];
  savedItems: SavedStudyItem[];
  onOpenFeature: (feature: OpenFeature) => void;
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
      className="group relative h-full w-full min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex flex-col focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <div className={`shrink-0 h-1.5 w-full ${tile.accentBar}`} />
      <div className="flex-1 min-h-0 p-3 sm:p-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 shrink-0">
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-white ${tile.iconBg} shadow-md shadow-slate-200/70 group-hover:scale-110 transition-transform duration-200 shrink-0`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold text-slate-300 group-hover:text-indigo-600 flex items-center gap-0.5 whitespace-nowrap transition-colors">
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

export const AppDashboard: React.FC<AppDashboardProps> = ({
  grade,
  subjects,
  savedItems,
  onOpenFeature,
}) => {
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
  ];

  return (
    <div className="h-full flex flex-col gap-3 sm:gap-4">
      {/* Hero */}
      <div className="shrink-0 relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-blue-600 to-sky-500 text-white p-4 sm:p-5 shadow-md flex items-center gap-3 sm:gap-5">
        <div className="absolute -right-10 -top-14 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-24 -bottom-16 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-indigo-100 text-[11px] font-semibold mb-2 backdrop-blur-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            Trợ lý học tập lớp {grade}
          </span>
          <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight leading-tight">
            Học giỏi – nhẹ nhàng hơn mỗi ngày
          </h1>
          <p className="hidden sm:block text-xs text-indigo-100 mt-1">
            Soạn bài, giải bài, kho bài mẫu và vở ghi — tất cả nằm gọn trong một màn hình.
          </p>
        </div>
        <button
          onClick={() => onOpenFeature('notes')}
          className="relative z-10 shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 active:scale-[0.98] transition-all text-xs sm:text-sm font-extrabold shadow-lg shadow-indigo-900/20"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="hidden xs:inline sm:inline">Soạn bài ngay</span>
          <span className="xs:hidden sm:hidden">Soạn bài</span>
        </button>
      </div>

      {/* Tiles */}
      <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map((t) => (
          <FeatureTile key={t.feature} tile={t} onOpen={() => onOpenFeature(t.feature)} />
        ))}
      </div>
    </div>
  );
};