import React from 'react';
import { Edit3, Sparkles, Library, FolderHeart, ChevronRight } from 'lucide-react';
import { SavedStudyItem, SubjectInfo } from '../types';

export type OpenFeature = 'notes' | 'solver' | 'presets' | 'saved';

interface AppDashboardProps {
  subjects: SubjectInfo[];
  savedItems: SavedStudyItem[];
  onOpenFeature: (feature: OpenFeature) => void;
}

interface TileDef {
  feature: OpenFeature;
  title: string;
  icon: React.ElementType;
  iconClass: string;
  desc: string;
  chips: string[];
}

function FeatureTile({ tile, onOpen }: { tile: TileDef; onOpen: () => void }) {
  const Icon = tile.icon;
  return (
    <button
      onClick={onOpen}
      title={tile.title}
      className="group relative h-full w-full min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex flex-col gap-1.5"
    >
      <div className="flex items-center justify-between gap-1.5 shrink-0">
        <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-white ${tile.iconClass} shrink-0`}>
          <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </div>
        <span className="ml-auto flex items-center gap-0.5 text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 whitespace-nowrap shrink-0">
          Mở
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>

      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight shrink-0">
        {tile.title}
      </h3>

      <p className="text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-2 min-h-0">
        {tile.desc}
      </p>

      <div className="mt-auto pt-0.5 min-h-0 overflow-hidden">
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
    </button>
  );
}

const SOLVER_DEMO_SUBJECTS = ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa'];
const PRESET_DEMO_CHIPS = ['Bài mẫu', 'Ngắn gọn', 'Có lời giải'];

export const AppDashboard: React.FC<AppDashboardProps> = ({
  subjects,
  savedItems,
  onOpenFeature,
}) => {
  const tiles: TileDef[] = [
    {
      feature: 'notes',
      title: 'Soạn Bài Ghi',
      icon: Edit3,
      iconClass: 'bg-gradient-to-tr from-indigo-600 to-blue-500',
      desc: 'Nhập bài học, chọn môn & giọng văn — AI soạn bài ghi ngắn gọn, rõ ý, lưu vào Vở Ghi.',
      chips: subjects.slice(0, 5).map((s) => s.shortName),
    },
    {
      feature: 'solver',
      title: 'Giải Bài Tập',
      icon: Sparkles,
      iconClass: 'bg-gradient-to-tr from-amber-500 to-orange-500',
      desc: 'Dán đề bài bất kỳ, nhận lời giải từng bước chi tiết, dễ hiểu, đúng chương trình.',
      chips: SOLVER_DEMO_SUBJECTS,
    },
    {
      feature: 'presets',
      title: 'Kho Bài Mẫu',
      icon: Library,
      iconClass: 'bg-gradient-to-tr from-violet-600 to-fuchsia-500',
      desc: 'Bài mẫu chọn lọc theo từng môn & bài học, chỉ một chạm là tải về Vở Ghi.',
      chips: PRESET_DEMO_CHIPS,
    },
    {
      feature: 'saved',
      title: `Vở Ghi (${savedItems.length})`,
      icon: FolderHeart,
      iconClass: 'bg-gradient-to-tr from-emerald-500 to-teal-500',
      desc:
        savedItems.length > 0
          ? `Bài gần nhất: ${savedItems[0].title}`
          : 'Chưa có bài nào — chạm để mở Vở Ghi.',
      chips:
        savedItems.length > 0
          ? savedItems.slice(0, 3).map((i) => i.subject.match(/^([^\s]+)/)?.[1] || i.subject)
          : ['Trống'],
    },
  ];

  return (
    <div className="h-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {tiles.map((t) => (
        <FeatureTile key={t.feature} tile={t} onOpen={() => onOpenFeature(t.feature)} />
      ))}
    </div>
  );
};