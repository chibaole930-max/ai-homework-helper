import { SubjectInfo, TextbookSeries } from '../types';

export const TEXTBOOKS_8: TextbookSeries[] = [
  'Kết nối tri thức với cuộc sống',
  'Cánh diều',
  'Chân trời sáng tạo',
  'Tổng hợp / Chung',
];

export const SUBJECTS_8: SubjectInfo[] = [
  {
    id: 'toan',
    name: 'Toán 8',
    shortName: 'Toán',
    badge: 'Toán',
    color: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-blue-50/70',
    borderColor: 'border-blue-200',
    accentText: 'text-blue-700',
    icon: 'Calculator',
    description:
      'Đa thức, hằng đẳng thức, phân thức, hàm số bậc nhất, tứ giác - đa giác, định lí Pythagore, hình học trực quan, xác suất - thống kê',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-toan-8-ket-noi-tri-thuc-c3322.html',
    popularLessons: [
      'Đa thức và các phép tính trên đa thức',
      'Hằng đẳng thức đáng nhớ',
      'Phân thức và phép tính trên phân thức',
      'Hàm số bậc nhất và đồ thị',
      'Tứ giác và đa giác',
      'Định lí Pythagore',
      'Xác suất và thống kê',
    ],
    chapters: [
      {
        id: 'toan-c1',
        title: 'Chương I: Đa thức',
        lessons: [
          { id: 'toan-c1-1', number: 'Bài 1', title: 'Đa thức một biến và các phép tính' },
          { id: 'toan-c1-2', number: 'Bài 2', title: 'Phân tích đa thức thành nhân tử' },
          { id: 'toan-c1-3', number: 'Bài 3', title: 'Ước chung lớn nhất và bội chung nhỏ nhất' },
        ],
      },
      {
        id: 'toan-c2',
        title: 'Chương II: Hằng đẳng thức đáng nhớ và ứng dụng',
        lessons: [
          { id: 'toan-c2-1', number: 'Bài 4', title: 'Hằng đẳng thức đáng nhớ' },
          { id: 'toan-c2-2', number: 'Bài 5', title: 'Phân tích đa thức thành nhân tử bằng hằng đẳng thức' },
          { id: 'toan-c2-3', number: 'Bài 6', title: 'Áp dụng hằng đẳng thức đáng nhớ' },
        ],
      },
      {
        id: 'toan-c3',
        title: 'Chương III: Tứ giác',
        lessons: [
          { id: 'toan-c3-1', number: 'Bài 7', title: 'Tứ giác và các tứ giác đặc biệt' },
          { id: 'toan-c3-2', number: 'Bài 8', title: 'Đường chéo của tứ giác' },
          { id: 'toan-c3-3', number: 'Bài 9', title: 'Hình bình hành' },
          { id: 'toan-c3-4', number: 'Bài 10', title: 'Hình chữ nhật' },
          { id: 'toan-c3-5', number: 'Bài 11', title: 'Hình thoi' },
          { id: 'toan-c3-6', number: 'Bài 12', title: 'Hình vuông' },
        ],
      },
      {
        id: 'toan-c4',
        title: 'Chương IV: Định lí Thalès',
        lessons: [
          { id: 'toan-c4-1', number: 'Bài 13', title: 'Định lí Thalès và ứng dụng' },
          { id: 'toan-c4-2', number: 'Bài 14', title: 'Định lí Pythagore và ứng dụng' },
        ],
      },
      {
        id: 'toan-c5',
        title: 'Chương V: Dữ liệu và biểu đồ',
        lessons: [
          { id: 'toan-c5-1', number: 'Bài 15', title: 'Tổng hợp và biểu diễn dữ liệu' },
          { id: 'toan-c5-2', number: 'Bài 16', title: 'Đường trung bình, trung vị và mốt' },
        ],
      },
      {
        id: 'toan-c6',
        title: 'Chương VI: Xác suất',
        lessons: [
          { id: 'toan-c6-1', number: 'Bài 17', title: 'Xác suất của biến cố' },
          { id: 'toan-c6-2', number: 'Bài 18', title: 'Tính xác suất' },
        ],
      },
      {
        id: 'toan-c7',
        title: 'Chương VII: Phương trình và bất phương trình bậc nhất một ẩn',
        lessons: [
          { id: 'toan-c7-1', number: 'Bài 19', title: 'Phương trình bậc nhất một ẩn' },
          { id: 'toan-c7-2', number: 'Bài 20', title: 'Bất phương trình bậc nhất một ẩn' },
          { id: 'toan-c7-3', number: 'Bài 21', title: 'Giải bài toán bằng phương trình và bất phương trình bậc nhất một ẩn' },
        ],
      },
      {
        id: 'toan-c8',
        title: 'Chương VIII: Hàm số và đồ thị',
        lessons: [
          { id: 'toan-c8-1', number: 'Bài 22', title: 'Hàm số bậc nhất và đồ thị' },
          { id: 'toan-c8-2', number: 'Bài 23', title: 'Mối liên hệ giữa phương trình bậc nhất hai ẩn và hàm số bậc nhất' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Phân tích đa thức thành nhân tử',
        text: 'Phân tích thành nhân tử các biểu thức: a) x² - 9; b) 4x² - 12x + 9.',
        type: 'Đa thức',
      },
      {
        title: 'Áp dụng định lí Pythagore',
        text: 'Cho tam giác ABC vuông tại A với AB = 3cm, AC = 4cm. Tính BC và diện tích tam giác ABC.',
        type: 'Hình học',
      },
      {
        title: 'Giải phương trình bậc nhất',
        text: 'Giải phương trình: 3(x - 2) + 5 = 2x + 1.',
        type: 'Phương trình',
      },
    ],
  },
  {
    id: 'van',
    name: 'Ngữ văn 8',
    shortName: 'Văn',
    badge: 'Văn',
    color: 'from-rose-600 to-pink-700',
    bgLight: 'bg-rose-50/70',
    borderColor: 'border-rose-200',
    accentText: 'text-rose-700',
    icon: 'BookOpen',
    description:
      'Truyện ngắn hiện đại, thơ Đường luật, truyện cười - truyện trào phúng, văn nghị luận',
    loigiaihayUrl: 'https://loigiaihay.com/soan-van-8-ket-noi-tri-thuc-c3323.html',
    popularLessons: [
      'Soạn bài: Vượt thác',
      'Soạn bài: Quê người',
      'Soạn bài: Nhà nho lưu lạc',
      'Soạn bài: Đề đền Sầm Nghi Đống',
      'Soạn bài: Liễu biến - từ chuyện hồ Ly',
      'Soạn bài: Thuế máu',
    ],
    chapters: [
      {
        id: 'van-c1',
        title: 'Bài 1: Truyện ngắn',
        lessons: [
          { id: 'van-c1-1', number: 'Văn bản 1', title: 'Vượt thác - Võ Quảng' },
          { id: 'van-c1-2', number: 'Văn bản 2', title: 'Quê người - Tố Hữu' },
        ],
      },
      {
        id: 'van-c2',
        title: 'Bài 2: Thơ Đường luật',
        lessons: [
          { id: 'van-c2-1', number: 'Văn bản 1', title: 'Nhà nho lưu lạc - Nguyễn Bỉnh Khiêm' },
          { id: 'van-c2-2', number: 'Văn bản 2', title: 'Đề đền Sầm Nghi Đống - Nguyễn Trãi' },
        ],
      },
      {
        id: 'van-c3',
        title: 'Bài 3: Truyện cười và truyện trào phúng',
        lessons: [{ id: 'van-c3-1', number: 'Văn bản', title: 'Liễu biến - từ chuyện hồ Ly' }],
      },
      {
        id: 'van-c4',
        title: 'Bài 4: Văn bản thông tin',
        lessons: [{ id: 'van-c4-1', number: 'Văn bản', title: 'Thuế máu - Võ Nguyên Giáp' }],
      },
      {
        id: 'van-c5',
        title: 'Bài 5: Văn nghị luận',
        lessons: [{ id: 'van-c5-1', number: 'Văn bản', title: 'Nghị luận về vấn đề đạo đức' }],
      },
      {
        id: 'van-c6',
        title: 'Bài 6: Truyện',
        lessons: [{ id: 'van-c6-1', number: 'Văn bản', title: 'Truyện hiện đại' }],
      },
      {
        id: 'van-c7',
        title: 'Bài 7: Thơ',
        lessons: [{ id: 'van-c7-1', number: 'Văn bản', title: 'Thơ trung đại và hiện đại' }],
      },
      {
        id: 'van-c8',
        title: 'Bài 8: Hài kịch',
        lessons: [{ id: 'van-c8-1', number: 'Văn bản', title: 'Hài kịch và trào phúng' }],
      },
      {
        id: 'van-c9',
        title: 'Bài 9: Văn bản thông tin (tiếp)',
        lessons: [{ id: 'van-c9-1', number: 'Văn bản', title: 'Văn bản thông tin nâng cao' }],
      },
      {
        id: 'van-c10',
        title: 'Bài 10: Nghị luận (tiếp)',
        lessons: [{ id: 'van-c10-1', number: 'Văn bản', title: 'Nghị luận văn học' }],
      },
    ],
    sampleQuestions: [
      {
        title: 'Phân tích truyện ngắn',
        text: 'Phân tích nhân vật chính trong một truyện ngắn hiện đại mà em đã học, nêu suy nghĩ về thông điệp tác giả muốn truyền tải.',
        type: 'Truyện ngắn',
      },
      {
        title: 'Cảm nhận bài thơ Đường luật',
        text: 'Cảm nhận vẻ đẹp và ý nghĩa của một bài thơ Đường luật em đã học trong chương trình Ngữ văn 8.',
        type: 'Thơ',
      },
    ],
  },
  {
    id: 'anh',
    name: 'Tiếng Anh 8',
    shortName: 'Tiếng Anh',
    badge: 'Anh',
    color: 'from-emerald-600 to-teal-700',
    bgLight: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200',
    accentText: 'text-emerald-700',
    icon: 'BookMarked',
    description:
      'Tiếng Anh 8 Kết nối tri thức: 12 unit theo chủ điểm, ngữ pháp & từ vựng trọng tâm, rèn kĩ năng đọc hiểu và viết',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-tieng-anh-8-ket-noi-tri-thuc-c3324.html',
    popularLessons: [
      'Unit 1: Leisure time (Thời gian rảnh)',
      'Unit 2: Physical activities (Hoạt động thể chất)',
      'Unit 3: Community service (Dịch vụ cộng đồng)',
      'Unit 4: Making friends (Kết bạn)',
      'Unit 5: Inventions (Phát minh)',
      'Unit 6: The world of work (Thế giới việc làm)',
    ],
    chapters: [
      {
        id: 'anh-c1',
        title: 'Unit 1: Leisure time',
        lessons: [
          { id: 'anh-c1-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c1-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c2',
        title: 'Unit 2: Physical activities',
        lessons: [
          { id: 'anh-c2-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c2-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c3',
        title: 'Unit 3: Community service',
        lessons: [
          { id: 'anh-c3-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c3-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c4',
        title: 'Unit 4: Making friends',
        lessons: [
          { id: 'anh-c4-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c4-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c5',
        title: 'Unit 5: Inventions',
        lessons: [
          { id: 'anh-c5-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c5-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c6',
        title: 'Unit 6: The world of work',
        lessons: [
          { id: 'anh-c6-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c6-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c7',
        title: 'Unit 7: Computers and mobile devices',
        lessons: [
          { id: 'anh-c7-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c7-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c8',
        title: 'Unit 8: Technology and I',
        lessons: [
          { id: 'anh-c8-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c8-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c9',
        title: 'Unit 9: Natural wonders',
        lessons: [
          { id: 'anh-c9-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c9-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c10',
        title: 'Unit 10: Journey into space',
        lessons: [
          { id: 'anh-c10-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c10-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c11',
        title: 'Unit 11: Healthy living',
        lessons: [
          { id: 'anh-c11-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c11-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c12',
        title: 'Unit 12: Life on other planets',
        lessons: [
          { id: 'anh-c12-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c12-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Write about leisure activities',
        text: 'Write a short paragraph (80-100 words) about your favourite leisure activity and explain why you enjoy it.',
        type: 'Writing',
      },
      {
        title: 'Past simple and past continuous',
        text: 'Fill in the blanks with the correct past simple or past continuous form: "While I (walk) ___ to school, I (see) ___ an old friend."',
        type: 'Grammar',
      },
    ],
  },
  {
    id: 'khtn',
    name: 'Khoa học tự nhiên 8',
    shortName: 'KHTN',
    badge: 'KHTN',
    color: 'from-green-600 to-emerald-700',
    bgLight: 'bg-green-50/70',
    borderColor: 'border-green-200',
    accentText: 'text-emerald-700',
    icon: 'FlaskConical',
    description:
      'KHTN 8 (Kết nối tri thức): phản ứng hóa học, mol, vật lí (khối lượng riêng, áp suất, lực, điện, nhiệt), sinh học cơ thể người, sinh vật và môi trường',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-khtn-8-ket-noi-tri-thuc-c3325.html',
    popularLessons: [
      'Phản ứng hóa học và điều kiện xảy ra',
      'Hệ thức hóa học, mô và khối lượng mol',
      'Khối lượng riêng - Áp suất',
      'Lực và tác dụng làm quay của lực',
      'Điện: hiệu điện thế và định luật Ohm',
      'Nhiệt và sự trao đổi nhiệt',
      'Cơ thể người: hệ vận động và tiêu hóa',
    ],
    chapters: [
      {
        id: 'khtn-c1',
        title: 'Chủ đề 1: Phản ứng hóa học',
        lessons: [
          { id: 'khtn-c1-1', number: 'Bài 1', title: 'Phản ứng hóa học' },
          { id: 'khtn-c1-2', number: 'Bài 2', title: 'Điều kiện xảy ra phản ứng hóa học' },
        ],
      },
      {
        id: 'khtn-c2',
        title: 'Chủ đề 2: Mô và khối lượng mol',
        lessons: [
          { id: 'khtn-c2-1', number: 'Bài 3', title: 'Hệ thức hóa học' },
          { id: 'khtn-c2-2', number: 'Bài 4', title: 'Mô và khối lượng mol' },
        ],
      },
      {
        id: 'khtn-c3',
        title: 'Chủ đề 3: Khối lượng riêng - Áp suất',
        lessons: [
          { id: 'khtn-c3-1', number: 'Bài 6', title: 'Khối lượng riêng' },
          { id: 'khtn-c3-2', number: 'Bài 7', title: 'Áp suất' },
        ],
      },
      {
        id: 'khtn-c4',
        title: 'Chủ đề 4: Tác dụng làm quay của lực',
        lessons: [
          { id: 'khtn-c4-1', number: 'Bài 9', title: 'Lực và mô men lực' },
          { id: 'khtn-c4-2', number: 'Bài 10', title: 'Cân và cân bằng vật thể' },
        ],
      },
      {
        id: 'khtn-c5',
        title: 'Chủ đề 5: Điện',
        lessons: [
          { id: 'khtn-c5-1', number: 'Bài 12', title: 'Hiệu điện thế và dòng điện' },
          { id: 'khtn-c5-2', number: 'Bài 13', title: 'Định luật Ohm' },
          { id: 'khtn-c5-3', number: 'Bài 14', title: 'Công suất điện và điện năng' },
        ],
      },
      {
        id: 'khtn-c6',
        title: 'Chủ đề 6: Nhiệt',
        lessons: [
          { id: 'khtn-c6-1', number: 'Bài 16', title: 'Nhiệt lượng và sự trao đổi nhiệt' },
          { id: 'khtn-c6-2', number: 'Bài 17', title: 'Nhiệt độ và nhiệt năng' },
        ],
      },
      {
        id: 'khtn-c7',
        title: 'Chủ đề 7: Cơ thể người',
        lessons: [
          { id: 'khtn-c7-1', number: 'Bài 19', title: 'Hệ vận động' },
          { id: 'khtn-c7-2', number: 'Bài 20', title: 'Hệ tiêu hóa' },
          { id: 'khtn-c7-3', number: 'Bài 21', title: 'Máu và hệ tuần hoàn' },
          { id: 'khtn-c7-4', number: 'Bài 22', title: 'Hệ hô hấp' },
          { id: 'khtn-c7-5', number: 'Bài 23', title: 'Hệ bài tiết' },
          { id: 'khtn-c7-6', number: 'Bài 24', title: 'Da và điều hòa thân nhiệt' },
        ],
      },
      {
        id: 'khtn-c8',
        title: 'Chủ đề 8: Sinh vật và môi trường',
        lessons: [
          { id: 'khtn-c8-1', number: 'Bài 25', title: 'Sinh vật với môi trường sống' },
          { id: 'khtn-c8-2', number: 'Bài 26', title: 'Mối quan hệ giữa các loài sinh vật' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Tính khối lượng mol',
        text: 'Tính khối lượng mol của NaOH và xác định số mol có trong 80g NaOH.',
        type: 'Hóa học',
      },
      {
        title: 'Áp suất trong chất lỏng',
        text: 'Tính áp suất ở độ sâu 5m trong nước (g = 10N/kg, density = 1000kg/m³).',
        type: 'Vật lí',
      },
      {
        title: 'Hệ tiêu hóa',
        text: 'Trình bày quá trình tiêu hóa và hấp thu chất dinh dưỡng ở người.',
        type: 'Sinh học',
      },
    ],
  },
  {
    id: 'sudia',
    name: 'Lịch sử và Địa lí 8',
    shortName: 'Sử - Địa',
    badge: 'Sử-Địa',
    color: 'from-amber-600 to-orange-700',
    bgLight: 'bg-amber-50/70',
    borderColor: 'border-amber-200',
    accentText: 'text-amber-800',
    icon: 'Globe2',
    description:
      'Tích hợp Lịch sử & Địa lí 8: Tây Âu và nước Mỹ từ nửa sau TK XVI đến TK XVIII, Đông Nam Á, Việt Nam từ đầu TK XVI đến thế kỉ XVIII, Địa lí Việt Nam',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-lich-su-va-dia-li-8-ket-noi-tri-thuc-c3326.html',
    popularLessons: [
      'Tây Âu và nước Mỹ từ nửa sau TK XVI đến TK XVIII',
      'Đông Nam Á từ nửa sau TK XVI đến TK XIX',
      'Việt Nam từ đầu TK XVI đến thế kỉ XVIII',
      'Việt Nam nửa đầu thế kỉ XIX',
      'Vị trí địa lí và phạm vi lãnh thổ Việt Nam',
      'Đặc điểm chung của tự nhiên Việt Nam',
      'Đặc điểm dân cư Việt Nam',
    ],
    chapters: [
      {
        id: 'sudia-c1',
        title: 'Phân môn Lịch sử - Tây Âu và nước Mỹ từ nửa sau thế kỉ XVI đến thế kỉ XVIII',
        lessons: [
          { id: 'sudia-c1-1', number: 'Bài 1', title: 'Thời kì Phục hưng ở Tây Âu' },
          { id: 'sudia-c1-2', number: 'Bài 2', title: 'Cách mạng tư sản Anh' },
          { id: 'sudia-c1-3', number: 'Bài 3', title: 'Mỹ lập nước' },
        ],
      },
      {
        id: 'sudia-c2',
        title: 'Phân môn Lịch sử - Đông Nam Á từ nửa sau thế kỉ XVI đến thế kỉ XIX',
        lessons: [
          { id: 'sudia-c2-1', number: 'Bài 4', title: 'Đông Nam Á thế kỉ XVI - XVIII' },
          { id: 'sudia-c2-2', number: 'Bài 5', title: 'Đông Nam Á nửa đầu thế kỉ XIX' },
        ],
      },
      {
        id: 'sudia-c3',
        title: 'Phân môn Lịch sử - Việt Nam từ đầu thế kỉ XVI đến thế kỉ XVIII',
        lessons: [
          { id: 'sudia-c3-1', number: 'Bài 6', title: 'Việt Nam thế kỉ XVI - XVII' },
          { id: 'sudia-c3-2', number: 'Bài 7', title: 'Việt Nam thế kỉ XVIII' },
        ],
      },
      {
        id: 'sudia-c4',
        title: 'Phân môn Lịch sử - Việt Nam nửa đầu thế kỉ XIX',
        lessons: [
          { id: 'sudia-c4-1', number: 'Bài 8', title: 'Đầu thế kỉ XIX và vua Gia Long' },
          { id: 'sudia-c4-2', number: 'Bài 9', title: 'Thời kì Minh Mệnh' },
        ],
      },
      {
        id: 'sudia-d1',
        title: 'Phân môn Địa lí - Vị trí địa lí và phạm vi lãnh thổ Việt Nam',
        lessons: [
          { id: 'sudia-d1-1', number: 'Bài 10', title: 'Vị trí địa lí Việt Nam' },
          { id: 'sudia-d1-2', number: 'Bài 11', title: 'Phạm vi lãnh thổ Việt Nam' },
        ],
      },
      {
        id: 'sudia-d2',
        title: 'Phân môn Địa lí - Đặc điểm chung của tự nhiên Việt Nam',
        lessons: [
          { id: 'sudia-d2-1', number: 'Bài 12', title: 'Địa hình và khí hậu' },
          { id: 'sudia-d2-2', number: 'Bài 13', title: 'Biển và hải đảo' },
        ],
      },
      {
        id: 'sudia-d3',
        title: 'Phân môn Địa lí - Đặc điểm dân cư Việt Nam',
        lessons: [
          { id: 'sudia-d3-1', number: 'Bài 14', title: 'Quy mô dân số và phân bố dân cư' },
          { id: 'sudia-d3-2', number: 'Bài 15', title: 'Dân tộc và tôn giáo' },
        ],
      },
      {
        id: 'sudia-d4',
        title: 'Phân môn Địa lí - Đặc điểm sông ngòi, đất, sinh vật Việt Nam',
        lessons: [
          { id: 'sudia-d4-1', number: 'Bài 16', title: 'Hệ thống sông ngòi' },
          { id: 'sudia-d4-2', number: 'Bài 17', title: 'Đất và sự phân hóa đáy' },
          { id: 'sudia-d4-3', number: 'Bài 18', title: 'Thực vật và động vật' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Cách mạng tư sản Anh',
        text: 'Trình bày nguyên nhân, diễn biến và ý nghĩa của Cách mạng tư sản Anh thế kỉ XVII.',
        type: 'Lịch sử',
      },
      {
        title: 'Vị trí địa lí Việt Nam',
        text: 'Trình bày vị trí địa lí tự nhiên và vị trí địa lí kinh tế - xã hội của Việt Nam.',
        type: 'Địa lí',
      },
    ],
  },
  {
    id: 'gdcd',
    name: 'Giáo dục công dân 8',
    shortName: 'GDCD',
    badge: 'GDCD',
    color: 'from-fuchsia-600 to-pink-700',
    bgLight: 'bg-fuchsia-50/70',
    borderColor: 'border-fuchsia-200',
    accentText: 'text-fuchsia-700',
    icon: 'HeartHandshake',
    description:
      'Giáo dục công dân 8 Kết nối tri thức: truyền thống dân tộc, tự trọng, tôn trọng lẽ phải, phòng chống bạo lực gia đình, lập kế hoạch chi tiêu, phòng chống tệ nạn xã hội',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-giao-duc-cong-dan-8-ket-noi-tri-thuc-c3327.html',
    popularLessons: [
      'Tự hào về truyền thống dân tộc',
      'Lòng tự trọng',
      'Tôn trọng và bảo vệ lẽ phải',
      'Bạo lực gia đình',
      'Lập kế hoạch chi tiêu',
      'Lắng nghe tích cực',
      'Phòng chống tệ nạn xã hội',
    ],
    chapters: [
      {
        id: 'gdcd-c1',
        title: 'Bài 1: Tự hào về truyền thống dân tộc',
        lessons: [
          { id: 'gdcd-c1-1', number: 'Bài 1', title: 'Những truyền thống tốt đẹp của dân tộc' },
          { id: 'gdcd-c1-2', number: 'Bài 2', title: 'Gìn giữ và phát huy truyền thống dân tộc' },
        ],
      },
      {
        id: 'gdcd-c2',
        title: 'Bài 2: Lòng tự trọng',
        lessons: [
          { id: 'gdcd-c2-1', number: 'Bài 3', title: 'Lòng tự trọng là gì' },
          { id: 'gdcd-c2-2', number: 'Bài 4', title: 'Rèn luyện lòng tự trọng' },
        ],
      },
      {
        id: 'gdcd-c3',
        title: 'Bài 3: Tôn trọng và bảo vệ lẽ phải',
        lessons: [
          { id: 'gdcd-c3-1', number: 'Bài 5', title: 'Tôn trọng lẽ phải' },
          { id: 'gdcd-c3-2', number: 'Bài 6', title: 'Bảo vệ lẽ phải' },
        ],
      },
      {
        id: 'gdcd-c4',
        title: 'Bài 4: Bạo lực gia đình',
        lessons: [
          { id: 'gdcd-c4-1', number: 'Bài 7', title: 'Bạo lực gia đình và tác hại' },
          { id: 'gdcd-c4-2', number: 'Bài 8', title: 'Phòng chống bạo lực gia đình' },
        ],
      },
      {
        id: 'gdcd-c5',
        title: 'Bài 5: Lập kế hoạch chi tiêu',
        lessons: [
          { id: 'gdcd-c5-1', number: 'Bài 9', title: 'Kinh tế gia đình và chi tiêu' },
          { id: 'gdcd-c5-2', number: 'Bài 10', title: 'Lập kế hoạch chi tiêu' },
        ],
      },
      {
        id: 'gdcd-c6',
        title: 'Bài 6: Lắng nghe tích cực',
        lessons: [
          { id: 'gdcd-c6-1', number: 'Bài 11', title: 'Lắng nghe tích cực trong giao tiếp' },
          { id: 'gdcd-c6-2', number: 'Bài 12', title: 'Thực hành lắng nghe tích cực' },
        ],
      },
      {
        id: 'gdcd-c7',
        title: 'Bài 7: Phòng chống tệ nạn xã hội',
        lessons: [
          { id: 'gdcd-c7-1', number: 'Bài 13', title: 'Tệ nạn xã hội và tác hại' },
          { id: 'gdcd-c7-2', number: 'Bài 14', title: 'Phòng chống tệ nạn xã hội' },
        ],
      },
      {
        id: 'gdcd-c8',
        title: 'Bài 8: Xác định mục tiêu cá nhân',
        lessons: [
          { id: 'gdcd-c8-1', number: 'Bài 15', title: 'Mục tiêu cá nhân và ý nghĩa' },
          { id: 'gdcd-c8-2', number: 'Bài 16', title: 'Lên kế hoạch đạt mục tiêu' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Truyền thống dân tộc',
        text: 'Hãy nêu một truyền thống tốt đẹp của dân tộc Việt Nam và giải thích tại sao chúng ta cần gìn giữ truyền thống đó.',
        type: 'Truyền thống',
      },
      {
        title: 'Lòng tự trọng',
        text: 'Trình bày suy nghĩ của em về tầm quan trọng của lòng tự trọng trong cuộc sống hàng ngày.',
        type: 'Đạo đức',
      },
    ],
  },
  {
    id: 'tin',
    name: 'Tin học 8',
    shortName: 'Tin học',
    badge: 'Tin',
    color: 'from-sky-600 to-blue-800',
    bgLight: 'bg-sky-50/70',
    borderColor: 'border-sky-200',
    accentText: 'text-sky-800',
    icon: 'Laptop',
    description:
      'Tin học 8 Kết nối tri thức: máy tính và xã hội tri thức, mạng máy tính và Internet, đạo đức pháp luật và văn hóa trong môi trường số, ứng dụng tin học',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-tin-hoc-8-ket-noi-tri-thuc-c3328.html',
    popularLessons: [
      'Máy tính và xã hội tri thức',
      'Mạng máy tính và Internet',
      'Đạo đức, pháp luật và văn hóa trong môi trường số',
      'Trình bày thông tin trong môi trường số',
      'Vẽ kĩ thuật và tạo biểu đồ',
      'Phần mềm chỉnh sửa ảnh và trình chiếu',
      'Giải quyết vấn đề với sự trợ giúp của máy tính',
    ],
    chapters: [
      {
        id: 'tin-c1',
        title: 'Chủ đề 1: Máy tính và xã hội tri thức',
        lessons: [
          { id: 'tin-c1-1', number: 'Bài 1', title: 'Máy tính và xã hội tri thức' },
          { id: 'tin-c1-2', number: 'Bài 2', title: 'Vai trò của thông tin trong xã hội tri thức' },
        ],
      },
      {
        id: 'tin-c2',
        title: 'Chủ đề 2: Mạng máy tính và Internet',
        lessons: [
          { id: 'tin-c2-1', number: 'Bài 3', title: 'Mạng máy tính và Internet' },
          { id: 'tin-c2-2', number: 'Bài 4', title: 'Trình bày thông tin trong môi trường số' },
          { id: 'tin-c2-3', number: 'Bài 5', title: 'Bảo vệ thông tin trên mạng' },
        ],
      },
      {
        id: 'tin-c3',
        title: 'Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số',
        lessons: [
          { id: 'tin-c3-1', number: 'Bài 6', title: 'Đạo đức và pháp luật trong môi trường số' },
          { id: 'tin-c3-2', number: 'Bài 7', title: 'Văn hóa giao tiếp trực tuyến' },
        ],
      },
      {
        id: 'tin-c4',
        title: 'Chủ đề 4: Ứng dụng tin học',
        lessons: [
          { id: 'tin-c4-1', number: 'Bài 8', title: 'Vẽ kĩ thuật' },
          { id: 'tin-c4-2', number: 'Bài 9', title: 'Tạo biểu đồ' },
          { id: 'tin-c4-3', number: 'Bài 10', title: 'Phần mềm chỉnh sửa ảnh' },
          { id: 'tin-c4-4', number: 'Bài 11', title: 'Trình chiếu thông tin' },
        ],
      },
      {
        id: 'tin-c5',
        title: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
        lessons: [
          { id: 'tin-c5-1', number: 'Bài 12', title: 'Chương trình máy tính với Scratch' },
          { id: 'tin-c5-2', number: 'Bài 13', title: 'Lập trình với Python' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Mạng máy tính và Internet',
        text: 'Trình bày cấu trúc mạng máy tính và vai trò của Internet trong xã hội hiện đại.',
        type: 'Mạng máy tính',
      },
      {
        title: 'Chương trình Scratch',
        text: 'Thiết kế một chương trình Scratch đơn giản di chuyển nhân vật qua lại trên màn hình.',
        type: 'Lập trình',
      },
    ],
  },
  {
    id: 'congnghe',
    name: 'Công nghệ 8',
    shortName: 'Công nghệ',
    badge: 'CN',
    color: 'from-stone-600 to-zinc-800',
    bgLight: 'bg-stone-50/70',
    borderColor: 'border-stone-200',
    accentText: 'text-stone-800',
    icon: 'Cpu',
    description:
      'Công nghệ 8 Kết nối tri thức: vẽ kĩ thuật, cơ khí, điện, đồ dùng điện gia đình, thiết kế kĩ thuật',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-cong-nghe-8-ket-noi-tri-thuc-c3329.html',
    popularLessons: [
      'Bản vẽ kĩ thuật và tiêu chuẩn trình bày',
      'Hình chiếu và bản vẽ chi tiết',
      'Kim loại và phi kim trong cơ khí',
      'Mạch điện và thiết bị điện',
      'Đồ dùng điện gia đình',
      'Thiết kế kĩ thuật',
    ],
    chapters: [
      {
        id: 'cn-c1',
        title: 'Chương I: Vẽ kĩ thuật',
        lessons: [
          { id: 'cn-c1-1', number: 'Bài 1', title: 'Bản vẽ kĩ thuật và tiêu chuẩn trình bày' },
          { id: 'cn-c1-2', number: 'Bài 2', title: 'Hình chiếu và các loại hình chiếu' },
          { id: 'cn-c1-3', number: 'Bài 3', title: 'Bản vẽ chi tiết' },
          { id: 'cn-c1-4', number: 'Bài 4', title: 'Bản vẽ mặt bằng' },
        ],
      },
      {
        id: 'cn-c2',
        title: 'Chương II: Cơ khí',
        lessons: [
          { id: 'cn-c2-1', number: 'Bài 5', title: 'Kim loại và các loại hợp kim' },
          { id: 'cn-c2-2', number: 'Bài 6', title: 'Phi kim và vật liệu composite' },
          { id: 'cn-c2-3', number: 'Bài 7', title: 'Tác hại của cơ khí và biện pháp phòng ngừa' },
        ],
      },
      {
        id: 'cn-c3',
        title: 'Chương III: Điện',
        lessons: [
          { id: 'cn-c3-1', number: 'Bài 8', title: 'Mạch điện và sơ đồ mạch điện' },
          { id: 'cn-c3-2', number: 'Bài 9', title: 'Thiết bị điện' },
          { id: 'cn-c3-3', number: 'Bài 10', title: 'Điện năng và tiết kiệm điện' },
        ],
      },
      {
        id: 'cn-c4',
        title: 'Chương IV: Đồ dùng điện gia đình',
        lessons: [
          { id: 'cn-c4-1', number: 'Bài 11', title: 'Nguyên lý hoạt động đồ dùng điện gia đình' },
          { id: 'cn-c4-2', number: 'Bài 12', title: 'Bảo trì và sửa chữa đồ dùng điện' },
        ],
      },
      {
        id: 'cn-c5',
        title: 'Chương V: Thiết kế kĩ thuật',
        lessons: [
          { id: 'cn-c5-1', number: 'Bài 13', title: 'Quy trình thiết kế kĩ thuật' },
          { id: 'cn-c5-2', number: 'Bài 14', title: 'Thực hành thiết kế sản phẩm' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Bản vẽ kĩ thuật',
        text: 'Vẽ bản vẽ hình chiếu của một khối hộp chữ nhật có kích thước dài 10cm, rộng 6cm, cao 4cm.',
        type: 'Vẽ kĩ thuật',
      },
      {
        title: 'Mạch điện',
        text: 'Vẽ sơ đồ mạch điện gồm nguồn điện, cầu dao, bóng đèn và công tắc. Giải thích nguyên lý hoạt động.',
        type: 'Điện',
      },
      {
        title: 'Thiết kế sản phẩm',
        text: 'Trình bày các bước trong quy trình thiết kế kĩ thuật một sản phẩm đơn giản.',
        type: 'Thiết kế',
      },
    ],
  },
];
