import React, { useState } from 'react';
import {
  Lightbulb,
  NotebookPen,
  BrainCircuit,
  Map,
  Clock,
  Repeat2,
  GraduationCap,
  Hash,
  ThumbsUp,
  ChevronDown,
  FlaskConical,
  MapPinned,
} from 'lucide-react';

interface Tip {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  title: string;
  subtitle: string;
  steps: { title: string; detail: string }[];
  note: string;
}

const TIPS: Tip[] = [
  {
    id: 'spaced-repetition',
    icon: Repeat2,
    iconBg: 'bg-indigo-100 text-indigo-600',
    title: 'Ôn Tập Ngắt Quãng (Spaced Repetition)',
    subtitle: 'Bí quyết giúp nhớ lâu gấp nhiều lần',
    steps: [
      {
        title: 'Ôn lần 1: sau 1 ngày',
        detail: 'Học xong, hôm sau mở lại ngay để đưa kiến thức vào trí nhớ dài hạn.',
      },
      {
        title: 'Ôn lần 2: sau 3 ngày',
        detail: 'Nhắc lại trước khi não kịp quên — đúng thời điểm vàng của não bộ.',
      },
      {
        title: 'Ôn lần 3: sau 7 ngày',
        detail: 'Sau một tuần, kiến thức đã "chín", xem lại để khóa vững trong đầu.',
      },
      {
        title: 'Ôn lần 4 & 5: sau 14 và 30 ngày',
        detail: 'Chỉ cần lướt nhanh — từ đây gần như bạn không thể quên được nữa.',
      },
    ],
    note: 'Mẹo: dùng app thẻ học (flashcards) để hệ thống tự động nhắc lịch ôn 1-3-7-14-30 ngày cho bạn, đỡ phải tự theo dõi.',
  },
  {
    id: 'active-recall',
    icon: BrainCircuit,
    iconBg: 'bg-purple-100 text-purple-600',
    title: 'Gợi Nhớ Chủ Động (Active Recall)',
    subtitle: 'Tự hỏi trước, mở sách sau — hiệu quả gấp 3 lần đọc lại',
    steps: [
      {
        title: 'Che vở, cố nhớ lại',
        detail: 'Sau khi học, đóng sách lại và tự viết ra mọi thứ bạn nhớ được về bài học.',
      },
      {
        title: 'Tự đặt câu hỏi',
        detail: '"Định lý này dùng khi nào?" "Vì sao kết quả lại như vậy?" — não cần "cào" để nhớ.',
      },
      {
        title: 'Làm bài tập không mở đáp án',
        detail: 'Đáp án mở sau khi xong. Khi mắc lỗi, não khắc ghi lỗi đó lâu hơn hẳn.',
      },
      {
        title: 'Lật thẻ (flashcard)',
        detail: 'Đọc mặt trước, cố nhớ đáp án ở mặt sau rồi mới lật — đây là bài tập gợi nhớ chủ động thuần túy.',
      },
    ],
    note: 'Ứng dụng Thẻ Học Thông Minh trên web này chính là bài tập active recall: hãy cố nhớ đáp án trước khi lật thẻ.',
  },
  {
    id: 'cornell',
    icon: NotebookPen,
    iconBg: 'bg-teal-100 text-teal-600',
    title: 'Vở Ghi Cornell 5R',
    subtitle: 'Cách ghi chép giúp ôn thi không cần đọc lại cả tập vở',
    steps: [
      {
        title: 'Record — Ghi lại',
        detail: 'Ghi nội dung chi tiết vào CỘT PHẢI (rộng) theo lời giảng, đừng ghi nguyên văn từng chữ.',
      },
      {
        title: 'Reduce — Cô đọng',
        detail: 'Viết TỪ KHÓA / câu hỏi gợi nhớ ngắn gọn vào CỘT TRÁI (hẹp), tương ứng từng đoạn bên phải.',
      },
      {
        title: 'Recite — Nói lại',
        detail: 'Che cột phải, nhìn từ khóa cột trái và tự trình bày lại nội dung bằng lời nói của mình.',
      },
      {
        title: 'Reflect — Suy ngẫm',
        detail: 'Liên hệ bài học với điều đã biết, thêm câu hỏi của riêng bạn vào cuối mỗi phần.',
      },
      {
        title: 'Review — Ôn lại',
        detail: 'Lịch ôn khuyến nghị: sau 1 ngày → 3 ngày → 7 ngày. Ôn bằng cách kiểm tra lại cột trái.',
      },
    ],
    note: 'Khi soạn bài ghi, chọn kiểu "Vở Ghi Cornell 5R" — bài soạn sẽ có sẵn 2 cột từ khóa + nội dung và ô tóm tắt.',
  },
  {
    id: 'mindmap',
    icon: Map,
    iconBg: 'bg-emerald-100 text-emerald-600',
    title: 'Sơ Đồ Tư Duy (Mindmap)',
    subtitle: 'Vẽ một lần, nhớ cả chương',
    steps: [
      {
        title: 'Đặt chủ đề ở giữa',
        detail: 'Ví dụ "CÁCH MẠNG THÁNG TÁM" hoặc "HÀM SỐ BẬC HAI" ở trung tâm tờ giấy.',
      },
      {
        title: 'Vẽ nhánh cấp 1',
        detail: 'Các ý lớn chĩa ra như cành cây: Nguyên nhân — Diễn biến — Kết quả — Ý nghĩa.',
      },
      {
        title: 'Chia nhánh cấp 2, 3',
        detail: 'Mỗi nhánh chỉ ghi TỪ KHÓA ngắn, kèm màu sắc và hình vẽ nhỏ để não nhớ hình ảnh.',
      },
      {
        title: 'Tự vẽ lại từ trí nhớ',
        detail: 'Vẽ lại sơ đồ không nhìn mẫu — nếu nhớ đủ nhánh nghĩa là bạn đã nắm được bài.',
      },
    ],
    note: 'Chọn kiểu soạn "Sơ Đồ Tư Duy" ở mục Soạn Bài Ghi để nhận bản phân nhánh logic sẵn sàng.',
  },
  {
    id: 'loci',
    icon: MapPinned,
    iconBg: 'bg-rose-100 text-rose-600',
    title: 'Cung Điện Trí Nhớ (Phương Pháp Loci)',
    subtitle: 'Dùng không gian quen thuộc để nhớ danh sách dài',
    steps: [
      {
        title: 'Chọn một nơi quen thuộc',
        detail: 'Ngôi nhà của bạn: cửa ra vào → phòng khách → bếp → phòng ngủ. Đi theo 1 thứ tự cố định.',
      },
      {
        title: 'Gắn từng ý cần nhớ vào từng vị trí',
        detail: 'Nhớ 5 sự kiện lịch sử? Hãy tưởng tượng sự kiện 1 "ngồi" ngay cửa ra vào, sự kiện 2 ở ghế sofa...',
      },
      {
        title: 'Vẽ hình ảnh càng quái càng tốt',
        detail: 'Não không quên hình ảnh lạ mắt: sự kiện 2 hóa thân thành con voi đang ngồi trên ghế sofa!',
      },
      {
        title: 'Đi bộ "điểm danh" lại',
        detail: 'Khi cần nhớ, hãy "đi" lại con đường đó trong đầu và đọc lại từng vị trí đã gắn.',
      },
    ],
    note: 'Tuyệt đỉnh để nhớ công thức, mốc sử, dãy = chuỗi từ vựng và trình tự các bước giải toán.',
  },
  {
    id: 'mnemonics',
    icon: Hash,
    iconBg: 'bg-amber-100 text-amber-600',
    title: 'Mẹo Ghi Nhớ (Mnemonics)',
    subtitle: 'Thơ, câu chữ đầu, chuyện vui để nhớ lâu',
    steps: [
      {
        title: 'Nhớ tên theo vần / chữ đầu',
        detail: 'Dãy kim loại kiềm: Li - Na - K - Rb - Cs → "Lính Nào Không Rượu Cà Phê".',
      },
      {
        title: 'Đặt câu vui có vần điệu',
        detail: '"Sáng các tôi về đâu" = Nam cực: Thái Cực, Tây Bắc Phi, ... Ai có quy tắc riêng của mình là tốt nhất.',
      },
      {
        title: 'Chuyện vui + ngữ cảnh',
        detail: 'Nhớ "crustacean" (giáp xác) → tưởng tượng chú tôm mặc áo giáp đứng cạnh "crust".',
      },
      {
        title: 'Gắn vào thứ tự + hình ảnh',
        detail: 'Số thành hình: 1 = cây gậy, 2 = con thiên nga... ghép chuỗi thành câu chuyện.',
      },
    ],
    note: 'Lớp mình rất thích tự nghĩ ra câu vui — não nhớ câu mình "chế" khó mà quên được.',
  },
  {
    id: 'interleaving',
    icon: FlaskConical,
    iconBg: 'bg-orange-100 text-orange-600',
    title: 'Xen Kẽ Chủ Đề (Interleaving)',
    subtitle: 'Đừng học mãi một dạng bài — trộn chúng vào nhau',
    steps: [
      {
        title: 'Trộn các dạng bài khác nhau',
        detail: 'Sau 1-2 bài toán dạng A, làm ngay một bài dạng B, rồi quay lại — não phải "phân biệt" chứ không "bắt chước".',
      },
      {
        title: 'Xen kẽ môn học',
        detail: 'Học Toán kĩ rồi chuyển sang Anh, rồi Văn. Mỗi lần quay lại môn cũ là một lần gợi nhớ chủ động.',
      },
      {
        title: 'Tự hỏi "dạng nào?"',
        detail: 'Trước khi làm, tự xác định: "Câu này thuộc dạng bài nào, áp dụng phương pháp gì?" — kỹ năng làm bài thi.',
      },
      {
        title: 'Lên lịch trộn sẵn',
        detail: 'Phiên học 90 phút: 30p Toán hình + 30p Anh từ vựng + 30p Hóa, thay vì 90p mỗi môn.',
      },
    ],
    note: 'Khó hơn lúc đầu một chút nhưng kiến thức "dính" hơn hẳn — đặc biệt quan trọng khi ôn thi.',
  },
  {
    id: 'pomodoro',
    icon: Clock,
    iconBg: 'bg-sky-100 text-sky-600',
    title: 'Kỹ Thuật Pomodoro',
    subtitle: 'Học 25 phút, nghỉ 5 phút — tập trung sâu không mệt',
    steps: [
      {
        title: 'Chọn đúng 1 việc cần làm',
        detail: 'Ví dụ: "Giải 5 bài toán lượng giác" — chỉ 1 mục tiêu rõ ràng trong phiên này.',
      },
      {
        title: 'Hẹn 25 phút, tập trung tuyệt đối',
        detail: 'Điện thoại để xa, chỉ làm đúng việc đã chọn. Không kiểm tra tin nhắn giữa chừng.',
      },
      {
        title: 'Nghỉ 5 phút',
        detail: 'Đứng dậy, vươn vai, uống nước, nhìn xa — não được "reset" cho phiên mới.',
      },
      {
        title: 'Cứ 4 phiên, nghỉ dài 15-30 phút',
        detail: 'Chu kỳ giúp bạn học 2-3 giờ liên tục mà không kiệt sức.',
      },
    ],
    note: 'Học sinh cuối cấp đề xuất 45-50 phút học + 10-15 phút nghỉ để vừa đủ sâu, vừa tránh đuối.',
  },
];

function TipRow({ tip, defaultOpen }: { tip: Tip; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const Icon = tip.icon;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 sm:p-5 text-left transition-colors"
      >
        <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${tip.iconBg}`}>
          <Icon className="w-5 h-5" />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
            {tip.title}
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{tip.subtitle}</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 sm:px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
          {tip.steps.map((s, i) => (
            <div key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-extrabold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-bold text-slate-700">{s.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{s.detail}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
            <ThumbsUp className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-800 leading-relaxed">{tip.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export const StudyTipsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 rounded-2xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>Bộ Sưu Tập Bí Kíp Học Tập Cho Học Sinh Việt Nam</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Mẹo Học Tập Siêu Đỉnh
          </h1>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            8 phương pháp học hàng đầu thế giới — từ Cornell 5R, ghi nhớ ngắt quãng đến cung điện trí
            nhớ — được dịch thành mẹo thực dụng cho chương trình học Việt Nam.
          </p>
        </div>
        <div className="absolute right-0 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 flex items-start gap-3">
        <span className="shrink-0 w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
          <Lightbulb className="w-4.5 h-4.5" />
        </span>
        <div>
          <h2 className="text-sm font-extrabold text-slate-900">Kế hoạch ôn tập vàng (nghiên cứu Ebbinghaus)</h2>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Học sinh sẽ quên tới ~50% kiến thức chỉ sau <b>1 ngày</b> nếu không ôn lại. Chỉ cần ôn
            đúng lịch <b>1 → 3 → 7 → 14 → 30 ngày</b> là gần như khóa vĩnh viễn vào trí nhớ dài hạn.
            Hãy kết hợp với mục <b>Thẻ Học Thông Minh</b> của web để hệ thống tự nhắc lịch cho bạn.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {TIPS.map((tip, i) => (
          <TipRow key={tip.id} tip={tip} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  );
};

export default StudyTipsTab;