import { SubjectInfo, TextbookSeries } from '../types';

export const TEXTBOOKS_6: TextbookSeries[] = [
  'Kết nối tri thức với cuộc sống',
  'Cánh diều',
  'Chân trời sáng tạo',
  'Tổng hợp / Chung',
];

export const SUBJECTS_6: SubjectInfo[] = [
  {
    id: 'toan',
    name: 'Toán 6',
    shortName: 'Toán',
    badge: 'Toán',
    color: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-blue-50/70',
    borderColor: 'border-blue-200',
    accentText: 'text-blue-700',
    icon: 'Calculator',
    description:
      'Số tự nhiên, số nguyên, phân số, số thập phân, hình học trực quan và hình phẳng cơ bản, dữ liệu và xác suất thực nghiệm',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-toan-6-ket-noi-tri-thuc-c3352.html',
    popularLessons: [
      'Tập hợp, phần tử của tập hợp',
      'Các phép toán với số tự nhiên',
      'Tính chia hết, ước và bội',
      'Số nguyên âm và các phép toán với số nguyên',
      'Phân số và số thập phân',
      'Hình học phẳng: đoạn thẳng, góc',
      'Dữ liệu và xác suất thực nghiệm',
    ],
    chapters: [
      {
        id: 'toan-c1',
        title: 'Chương I: Tập hợp các số tự nhiên',
        lessons: [
          { id: 'toan-c1-1', number: 'Bài 1', title: 'Tập hợp và phần tử của tập hợp' },
          { id: 'toan-c1-2', number: 'Bài 2', title: 'Cách ghi số tự nhiên' },
          { id: 'toan-c1-3', number: 'Bài 3', title: 'Thứ tự trong tập hợp các số tự nhiên' },
          { id: 'toan-c1-4', number: 'Bài 4', title: 'Phép cộng và phép trừ số tự nhiên' },
        ],
      },
      {
        id: 'toan-c2',
        title: 'Chương II: Tính chia hết trong tập hợp các số tự nhiên',
        lessons: [
          { id: 'toan-c2-1', number: 'Bài 5', title: 'Quan hệ chia hết và tính chất' },
          { id: 'toan-c2-2', number: 'Bài 6', title: 'Dấu hiệu chia hết cho 2, 3, 5, 9' },
          { id: 'toan-c2-3', number: 'Bài 7', title: 'Số nguyên tố' },
          { id: 'toan-c2-4', number: 'Bài 8', title: 'Ước chung, ƯCLN. Bội chung, BCNN' },
        ],
      },
      {
        id: 'toan-c3',
        title: 'Chương III: Số nguyên',
        lessons: [
          { id: 'toan-c3-1', number: 'Bài 9', title: 'Số nguyên âm và tập hợp các số nguyên' },
          { id: 'toan-c3-2', number: 'Bài 10', title: 'Phép cộng và phép trừ số nguyên' },
          { id: 'toan-c3-3', number: 'Bài 11', title: 'Phép nhân số nguyên' },
          { id: 'toan-c3-4', number: 'Bài 12', title: 'Phép chia hết, ước và bội của một số nguyên' },
        ],
      },
      {
        id: 'toan-c4',
        title: 'Chương IV: Một số hình phẳng trong thực tiễn',
        lessons: [
          { id: 'toan-c4-1', number: 'Bài 13', title: 'Hình tam giác đều, hình vuông, hình lục giác đều' },
          { id: 'toan-c4-2', number: 'Bài 14', title: 'Hình có trục đối xứng' },
          { id: 'toan-c4-3', number: 'Bài 15', title: 'Hình có tâm đối xứng' },
        ],
      },
      {
        id: 'toan-c5',
        title: 'Chương V: Phân số',
        lessons: [
          { id: 'toan-c5-1', number: 'Bài 16', title: 'Mở rộng phân số. Phân số bằng nhau' },
          { id: 'toan-c5-2', number: 'Bài 17', title: 'So sánh phân số. Hỗn số dương' },
          { id: 'toan-c5-3', number: 'Bài 18', title: 'Phép cộng và phép trừ phân số' },
          { id: 'toan-c5-4', number: 'Bài 19', title: 'Phép nhân và phép chia phân số' },
        ],
      },
      {
        id: 'toan-c6',
        title: 'Chương VI: Số thập phân',
        lessons: [
          { id: 'toan-c6-1', number: 'Bài 20', title: 'Số thập phân và các phép tính với số thập phân' },
          { id: 'toan-c6-2', number: 'Bài 21', title: 'Làm tròn và ước lượng' },
          { id: 'toan-c6-3', number: 'Bài 22', title: 'Một số bài toán về tỉ số và tỉ số phần trăm' },
        ],
      },
      {
        id: 'toan-c7',
        title: 'Chương VII: Những hình hình học cơ bản',
        lessons: [
          { id: 'toan-c7-1', number: 'Bài 23', title: 'Điểm và đường thẳng' },
          { id: 'toan-c7-2', number: 'Bài 24', title: 'Đoạn thẳng. Độ dài đoạn thẳng' },
          { id: 'toan-c7-3', number: 'Bài 25', title: 'Trung điểm của đoạn thẳng' },
          { id: 'toan-c7-4', number: 'Bài 26', title: 'Góc và số đo góc' },
        ],
      },
      {
        id: 'toan-c8',
        title: 'Chương VIII: Dữ liệu và xác suất thực nghiệm',
        lessons: [
          { id: 'toan-c8-1', number: 'Bài 27', title: 'Dữ liệu và thu thập dữ liệu' },
          { id: 'toan-c8-2', number: 'Bài 28', title: 'Bảng thống kê và biểu đồ tranh' },
          { id: 'toan-c8-3', number: 'Bài 29', title: 'Biểu đồ cột kép' },
          { id: 'toan-c8-4', number: 'Bài 30', title: 'Xác suất thực nghiệm' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Tìm ƯCLN và BCNN',
        text: 'Cho a = 12, b = 18. Tìm ƯCLN(a, b) và BCNN(a, b) bằng cách phân tích mỗi số ra thừa số nguyên tố.',
        type: 'Số học',
      },
      {
        title: 'Tính với số nguyên',
        text: 'Thực hiện phép tính: (-15) + 28 + (-7) + 12.',
        type: 'Số nguyên',
      },
      {
        title: 'Trung điểm của đoạn thẳng',
        text: 'Cho đoạn thẳng AB dài 8 cm, M là trung điểm của AB. Tính độ dài AM và MB.',
        type: 'Hình học',
      },
    ],
  },
  {
    id: 'van',
    name: 'Ngữ văn 6',
    shortName: 'Văn',
    badge: 'Văn',
    color: 'from-rose-600 to-pink-700',
    bgLight: 'bg-rose-50/70',
    borderColor: 'border-rose-200',
    accentText: 'text-rose-700',
    icon: 'BookOpen',
    description:
      'Soạn văn 6 Kết nối tri thức: truyện đồng thoại, cổ tích, truyền thuyết, ngụ ngôn, thơ, kí và văn bản thông tin',
    loigiaihayUrl: 'https://loigiaihay.com/soan-van-6-ket-noi-tri-thuc-c3354.html',
    popularLessons: [
      'Soạn bài: Bài học đường đời đầu tiên',
      'Soạn bài: Thạch Sanh',
      'Soạn bài: Mây và sóng',
      'Soạn bài: Cô bé bán diêm',
      'Soạn bài: Quê hương (Tế Hanh)',
      'Soạn bài: Cô Tô',
      'Soạn bài: Thánh Gióng',
    ],
    chapters: [
      {
        id: 'van-c1',
        title: 'Bài 1: Tôi và các bạn',
        lessons: [
          { id: 'van-c1-1', number: 'Văn bản 1', title: 'Bài học đường đời đầu tiên' },
          { id: 'van-c1-2', number: 'Văn bản 2', title: 'Thạch Sanh' },
          { id: 'van-c1-3', number: 'Văn bản 3', title: 'Ếch ngồi đáy giếng' },
        ],
      },
      {
        id: 'van-c2',
        title: 'Bài 2: Gõ cửa trái tim',
        lessons: [
          { id: 'van-c2-1', number: 'Văn bản 1', title: 'Mây và sóng' },
          { id: 'van-c2-2', number: 'Văn bản 2', title: 'Cô bé bán diêm' },
        ],
      },
      {
        id: 'van-c3',
        title: 'Bài 3: Yêu thương và chia sẻ',
        lessons: [
          { id: 'van-c3-1', number: 'Văn bản 1', title: 'Bức tranh của em gái tôi' },
          { id: 'van-c3-2', number: 'Văn bản 2', title: 'Buổi học cuối cùng' },
        ],
      },
      {
        id: 'van-c4',
        title: 'Bài 4: Quê hương yêu dấu',
        lessons: [
          { id: 'van-c4-1', number: 'Văn bản 1', title: 'Quê hương (thơ Tế Hanh)' },
          { id: 'van-c4-2', number: 'Văn bản 2', title: 'Cây tre Việt Nam' },
        ],
      },
      {
        id: 'van-c5',
        title: 'Bài 5: Những nẻo đường xứ sở',
        lessons: [
          { id: 'van-c5-1', number: 'Văn bản 1', title: 'Cô Tô' },
          { id: 'van-c5-2', number: 'Văn bản 2', title: 'Lượm' },
        ],
      },
      {
        id: 'van-c6',
        title: 'Bài 6: Chuyện kể về những người anh hùng',
        lessons: [
          { id: 'van-c6-1', number: 'Văn bản 1', title: 'Thánh Gióng' },
          { id: 'van-c6-2', number: 'Văn bản 2', title: 'Sơn Tinh, Thuỷ Tinh' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Phân tích nhân vật Dế Mèn',
        text: 'Phân tích diễn biến tâm lí và bài học của nhân vật Dế Mèn trong đoạn trích "Bài học đường đời đầu tiên".',
        type: 'Nghị luận văn học',
      },
      {
        title: 'Bài học từ truyện ngụ ngôn',
        text: 'Từ truyện ngụ ngôn "Ếch ngồi đáy giếng", em rút ra bài học gì cho bản thân?',
        type: 'Nghị luận xã hội',
      },
    ],
  },
  {
    id: 'anh',
    name: 'Tiếng Anh 6',
    shortName: 'Anh',
    badge: 'Anh',
    color: 'from-emerald-600 to-teal-700',
    bgLight: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200',
    accentText: 'text-emerald-700',
    icon: 'BookMarked',
    description:
      'Tiếng Anh 6 Global Success: 12 unit theo chủ điểm, ngữ pháp và từ vựng trọng tâm, rèn kĩ năng nghe, nói, đọc, viết',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-tieng-anh-6-ket-noi-tri-thuc-c3355.html',
    popularLessons: [
      'Unit 1: My new school (Trường học mới của tôi)',
      'Unit 2: My house (Ngôi nhà của tôi)',
      'Unit 3: My friends (Bạn bè của tôi)',
      'Unit 4: My neighbourhood (Khu phố của tôi)',
      'Unit 5: Natural wonders of the world (Kì quan thiên nhiên của thế giới)',
      'Unit 6: Our Tet holiday (Tết của chúng ta)',
      'Unit 7: Television (Truyền hình)',
    ],
    chapters: [
      {
        id: 'anh-c1',
        title: 'Unit 1: My new school',
        lessons: [
          { id: 'anh-c1-1', number: '1', title: 'Getting Started' },
          { id: 'anh-c1-2', number: '2', title: 'A Closer Look 1 & 2' },
          { id: 'anh-c1-3', number: '3', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c2',
        title: 'Unit 2: My house',
        lessons: [
          { id: 'anh-c2-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c2-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c3',
        title: 'Unit 3: My friends',
        lessons: [
          { id: 'anh-c3-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c3-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c4',
        title: 'Unit 4: My neighbourhood',
        lessons: [
          { id: 'anh-c4-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c4-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c5',
        title: 'Unit 5: Natural wonders of the world',
        lessons: [
          { id: 'anh-c5-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c5-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c6',
        title: 'Unit 6: Our Tet holiday',
        lessons: [
          { id: 'anh-c6-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c6-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c7',
        title: 'Unit 7: Television',
        lessons: [
          { id: 'anh-c7-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c7-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c8',
        title: 'Unit 8: Sports and games',
        lessons: [
          { id: 'anh-c8-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c8-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c9',
        title: 'Unit 9: Cities of the world',
        lessons: [
          { id: 'anh-c9-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c9-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c10',
        title: 'Unit 10: Our houses in the future',
        lessons: [
          { id: 'anh-c10-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c10-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c11',
        title: 'Unit 11: Our greener world',
        lessons: [
          { id: 'anh-c11-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c11-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c12',
        title: 'Unit 12: Robots',
        lessons: [
          { id: 'anh-c12-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c12-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Giới thiệu trường học mới',
        text: 'Write a short paragraph (about 60-80 words) to introduce your new school. (Class 6).',
        type: 'Writing',
      },
      {
        title: 'Thì hiện tại đơn và hiện tại tiếp diễn',
        text: 'Put the verbs in the correct form: "She usually (walk) ____ to school, but today she (go) ____ by bus."',
        type: 'Grammar',
      },
    ],
  },
  {
    id: 'khtn',
    name: 'Khoa học tự nhiên 6',
    shortName: 'KHTN',
    badge: 'KHTN',
    color: 'from-green-600 to-emerald-700',
    bgLight: 'bg-green-50/70',
    borderColor: 'border-green-200',
    accentText: 'text-emerald-700',
    icon: 'FlaskConical',
    description:
      'KHTN 6 Kết nối tri thức: tích hợp Vật lí - Hoá học - Sinh học: mở đầu khoa học tự nhiên, tế bào và thế giới sống, chất và sự biến đổi của chất, năng lượng, trái đất và bầu trời',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-khtn-6-ket-noi-tri-thuc-c3356.html',
    popularLessons: [
      'Mở đầu về khoa học tự nhiên',
      'Tế bào - đơn vị cơ sở của sự sống',
      'Cơ thể đơn bào và đa bào',
      'Phân loại thế giới sống',
      'Chất và các thể của chất',
      'Oxygen và không khí',
      'Hỗn hợp và cách tách chất',
      'Lực và năng lượng',
    ],
    chapters: [
      {
        id: 'khtn-c1',
        title: 'Chủ đề 1: Mở đầu về khoa học tự nhiên',
        lessons: [
          { id: 'khtn-c1-1', number: 'Bài 1', title: 'Giới thiệu về khoa học tự nhiên' },
          { id: 'khtn-c1-2', number: 'Bài 2', title: 'Kính lúp và kính hiển vi quang học' },
        ],
      },
      {
        id: 'khtn-c2',
        title: 'Chủ đề 2: Tế bào - cơ thể đơn bào và đa bào',
        lessons: [
          { id: 'khtn-c2-1', number: 'Bài 3', title: 'Tế bào - đơn vị cơ sở của sự sống' },
          { id: 'khtn-c2-2', number: 'Bài 4', title: 'Sự lớn lên và sinh sản của tế bào' },
          { id: 'khtn-c2-3', number: 'Bài 5', title: 'Từ tế bào đến cơ thể' },
        ],
      },
      {
        id: 'khtn-c3',
        title: 'Chủ đề 3: Phân loại thế giới sống',
        lessons: [
          { id: 'khtn-c3-1', number: 'Bài 6', title: 'Phân loại thế giới sống' },
          { id: 'khtn-c3-2', number: 'Bài 7', title: 'Vi khuẩn, nguyên sinh vật và nấm' },
          { id: 'khtn-c3-3', number: 'Bài 8', title: 'Thực vật và động vật' },
        ],
      },
      {
        id: 'khtn-c4',
        title: 'Chủ đề 4: Chất và sự biến đổi của chất',
        lessons: [
          { id: 'khtn-c4-1', number: 'Bài 9', title: 'Vật thể, chất và các thể của chất' },
          { id: 'khtn-c4-2', number: 'Bài 10', title: 'Oxygen và không khí' },
          { id: 'khtn-c4-3', number: 'Bài 11', title: 'Chất tinh khiết, hỗn hợp và cách tách chất' },
        ],
      },
      {
        id: 'khtn-c5',
        title: 'Chủ đề 5: Lực và năng lượng',
        lessons: [
          { id: 'khtn-c5-1', number: 'Bài 12', title: 'Lực và tác dụng của lực' },
          { id: 'khtn-c5-2', number: 'Bài 13', title: 'Đo lực bằng lực kế' },
          { id: 'khtn-c5-3', number: 'Bài 14', title: 'Năng lượng và sự chuyển hoá năng lượng' },
        ],
      },
      {
        id: 'khtn-c6',
        title: 'Chủ đề 6: Trái đất và bầu trời',
        lessons: [
          { id: 'khtn-c6-1', number: 'Bài 15', title: 'Chuyển động của Trái Đất và Mặt Trăng' },
          { id: 'khtn-c6-2', number: 'Bài 16', title: 'Hệ Mặt Trời và Ngân Hà' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Tế bào',
        text: 'Phân biệt tế bào nhân sơ và tế bào nhân thực; nêu 3 đặc điểm khác nhau giữa hai loại tế bào này.',
        type: 'Sinh học',
      },
      {
        title: 'Oxygen và không khí',
        text: 'Không khí gồm những thành phần nào? Vì sao oxygen quan trọng đối với sự sống?',
        type: 'Hoá học',
      },
      {
        title: 'Lực và năng lượng',
        text: 'Một quả bóng đang nằm yên, sau cú đá nó lăn đi. Hãy nêu tác dụng của lực trong tình huống này.',
        type: 'Vật lí',
      },
    ],
  },
  {
    id: 'sudia',
    name: 'Lịch sử và Địa lí 6',
    shortName: 'Sử - Địa',
    badge: 'Sử-Địa',
    color: 'from-amber-600 to-orange-700',
    bgLight: 'bg-amber-50/70',
    borderColor: 'border-amber-200',
    accentText: 'text-amber-800',
    icon: 'Globe2',
    description:
      'Tích hợp Lịch sử và Địa lí 6: khởi nguyên loài người, xã hội cổ đại và xã hội phong kiến; địa lí về trái đất, khí hậu, nước, đất và sinh vật trên Trái Đất',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-lich-su-va-dia-li-6-ket-noi-tri-thuc-c3357.html',
    popularLessons: [
      'Khởi nguyên của loài người',
      'Xã hội cổ đại: Ai Cập, Lưỡng Hà, Ấn Độ, Trung Quốc',
      'Đông Nam Á từ những thế kỉ tiếp giáp Công nguyên',
      'Xã hội phong kiến phương Đông và phương Tây',
      'Bản đồ và cách đọc bản đồ',
      'Chuyển động của Trái Đất',
      'Khí hậu và biến đổi khí hậu',
      'Nước trên Trái Đất',
    ],
    chapters: [
      {
        id: 'sudia-c1',
        title: 'Phân môn Lịch sử - Chương 1: Khởi nguyên của loài người',
        lessons: [
          { id: 'sudia-c1-1', number: 'Bài 1', title: 'Quá trình tiến hoá của loài người' },
          { id: 'sudia-c1-2', number: 'Bài 2', title: 'Đời sống vật chất, tinh thần của người nguyên thuỷ' },
        ],
      },
      {
        id: 'sudia-c2',
        title: 'Phân môn Lịch sử - Chương 2: Xã hội cổ đại',
        lessons: [
          { id: 'sudia-c2-1', number: 'Bài 3', title: 'Ai Cập và Lưỡng Hà cổ đại' },
          { id: 'sudia-c2-2', number: 'Bài 4', title: 'Ấn Độ và Trung Quốc cổ đại' },
          { id: 'sudia-c2-3', number: 'Bài 5', title: 'Hy Lạp và La Mã cổ đại' },
        ],
      },
      {
        id: 'sudia-c3',
        title: 'Phân môn Lịch sử - Chương 3: Đông Nam Á từ những thế kỉ tiếp giáp Công nguyên đến thế kỉ X',
        lessons: [
          { id: 'sudia-c3-1', number: 'Bài 6', title: 'Các quốc gia sơ kì ở Đông Nam Á' },
          { id: 'sudia-c3-2', number: 'Bài 7', title: 'Vương quốc Campuchia và vương quốc Lào' },
        ],
      },
      {
        id: 'sudia-c4',
        title: 'Phân môn Lịch sử - Chương 4: Xã hội phong kiến',
        lessons: [
          { id: 'sudia-c4-1', number: 'Bài 8', title: 'Xã hội phong kiến ở phương Đông' },
          { id: 'sudia-c4-2', number: 'Bài 9', title: 'Xã hội phong kiến ở phương Tây' },
        ],
      },
      {
        id: 'sudia-d1',
        title: 'Phân môn Địa lí - Chương 1: Bản đồ và phương tiện thể hiện bề mặt trái đất',
        lessons: [
          { id: 'sudia-d1-1', number: 'Bài 10', title: 'Hệ thống kinh, vĩ tuyến và toạ độ địa lí' },
          { id: 'sudia-d1-2', number: 'Bài 11', title: 'Bản đồ, tỉ lệ bản đồ và phương hướng trên bản đồ' },
        ],
      },
      {
        id: 'sudia-d2',
        title: 'Phân môn Địa lí - Chương 2: Trái đất - hành tinh của hệ mặt trời',
        lessons: [
          { id: 'sudia-d2-1', number: 'Bài 12', title: 'Trái Đất trong hệ Mặt Trời' },
          { id: 'sudia-d2-2', number: 'Bài 13', title: 'Chuyển động tự quay quanh trục của Trái Đất' },
          { id: 'sudia-d2-3', number: 'Bài 14', title: 'Chuyển động của Trái Đất quanh Mặt Trời' },
        ],
      },
      {
        id: 'sudia-d3',
        title: 'Phân môn Địa lí - Chương 3: Cấu tạo của trái đất - các lớp',
        lessons: [
          { id: 'sudia-d3-1', number: 'Bài 15', title: 'Cấu tạo của Trái Đất' },
          { id: 'sudia-d3-2', number: 'Bài 16', title: 'Các mảng kiến tạo, núi lửa và động đất' },
          { id: 'sudia-d3-3', number: 'Bài 17', title: 'Nội lực, ngoại lực và các dạng địa hình chính' },
        ],
      },
      {
        id: 'sudia-d4',
        title: 'Phân môn Địa lí - Chương 4: Khí hậu và biến đổi khí hậu',
        lessons: [
          { id: 'sudia-d4-1', number: 'Bài 18', title: 'Khí quyển và sự phân bố nhiệt độ trên Trái Đất' },
          { id: 'sudia-d4-2', number: 'Bài 19', title: 'Thời tiết và khí hậu trên Trái Đất' },
          { id: 'sudia-d4-3', number: 'Bài 20', title: 'Biến đổi khí hậu' },
        ],
      },
      {
        id: 'sudia-d5',
        title: 'Phân môn Địa lí - Chương 5: Nước trên trái đất',
        lessons: [
          { id: 'sudia-d5-1', number: 'Bài 21', title: 'Thuỷ quyển và vòng tuần hoàn lớn của nước' },
          { id: 'sudia-d5-2', number: 'Bài 22', title: 'Sông, hồ, nước ngầm và băng hà' },
          { id: 'sudia-d5-3', number: 'Bài 23', title: 'Biển và đại dương' },
        ],
      },
      {
        id: 'sudia-d6',
        title: 'Phân môn Địa lí - Chương 6: Đất và sinh vật trên trái đất',
        lessons: [
          { id: 'sudia-d6-1', number: 'Bài 24', title: 'Đất trên Trái Đất' },
          { id: 'sudia-d6-2', number: 'Bài 25', title: 'Sinh vật và sự phân bố sinh vật trên Trái Đất' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Xã hội cổ đại',
        text: 'Trình bày những thành tựu văn hoá tiêu biểu của người Ai Cập và Lưỡng Hà cổ đại.',
        type: 'Lịch sử',
      },
      {
        title: 'Chuyển động của Trái Đất',
        text: 'Trình bày hệ quả của chuyển động tự quay quanh trục của Trái Đất.',
        type: 'Địa lí',
      },
    ],
  },
  {
    id: 'gdcd',
    name: 'Giáo dục công dân 6',
    shortName: 'GDCD',
    badge: 'GDCD',
    color: 'from-fuchsia-600 to-pink-700',
    bgLight: 'bg-fuchsia-50/70',
    borderColor: 'border-fuchsia-200',
    accentText: 'text-fuchsia-700',
    icon: 'HeartHandshake',
    description:
      'Giáo dục công dân 6 Kết nối tri thức: giáo dục đạo đức, kĩ năng sống và pháp luật cho học sinh lớp 6',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-giao-duc-cong-dan-6-ket-noi-tri-thuc-c3358.html',
    popularLessons: [
      'Tự hào về truyền thống gia đình, dòng họ',
      'Yêu thương con người',
      'Siêng năng, kiên trì',
      'Tôn trọng sự thật',
      'Tự lập',
      'Ứng phó với tình huống nguy hiểm',
      'Quyền và nghĩa vụ cơ bản của công dân',
    ],
    chapters: [
      {
        id: 'gdcd-c1',
        title: 'Bài 1: Tự hào về truyền thống gia đình, dòng họ',
        lessons: [
          { id: 'gdcd-c1-1', number: 'Bài 1', title: 'Truyền thống tốt đẹp của gia đình, dòng họ' },
          { id: 'gdcd-c1-2', number: 'Bài 1', title: 'Giữ gìn và phát huy truyền thống gia đình, dòng họ' },
        ],
      },
      {
        id: 'gdcd-c2',
        title: 'Bài 2: Yêu thương con người',
        lessons: [
          { id: 'gdcd-c2-1', number: 'Bài 2', title: 'Biểu hiện và ý nghĩa của tình yêu thương con người' },
          { id: 'gdcd-c2-2', number: 'Bài 2', title: 'Rèn luyện lòng yêu thương con người' },
        ],
      },
      {
        id: 'gdcd-c3',
        title: 'Bài 3: Siêng năng, kiên trì',
        lessons: [
          { id: 'gdcd-c3-1', number: 'Bài 3', title: 'Siêng năng, kiên trì trong học tập và lao động' },
          { id: 'gdcd-c3-2', number: 'Bài 3', title: 'Khắc phục khó khăn, vượt khó vươn lên' },
        ],
      },
      {
        id: 'gdcd-c4',
        title: 'Bài 4: Tôn trọng sự thật',
        lessons: [{ id: 'gdcd-c4-1', number: 'Bài 4', title: 'Tôn trọng sự thật trong lời nói và việc làm' }],
      },
      {
        id: 'gdcd-c5',
        title: 'Bài 5: Tự lập',
        lessons: [
          { id: 'gdcd-c5-1', number: 'Bài 5', title: 'Biểu hiện và ý nghĩa của tính tự lập' },
          { id: 'gdcd-c5-2', number: 'Bài 5', title: 'Rèn luyện tính tự lập trong học tập và sinh hoạt' },
        ],
      },
      {
        id: 'gdcd-c6',
        title: 'Bài 6: Tự nhận thức bản thân',
        lessons: [
          { id: 'gdcd-c6-1', number: 'Bài 6', title: 'Nhận thức về điểm mạnh, điểm hạn chế của bản thân' },
          { id: 'gdcd-c6-2', number: 'Bài 6', title: 'Kĩ năng tự nhận thức và phát huy bản thân' },
        ],
      },
      {
        id: 'gdcd-c7',
        title: 'Bài 7: Ứng phó với tình huống nguy hiểm',
        lessons: [
          { id: 'gdcd-c7-1', number: 'Bài 7', title: 'Nhận biết các tình huống nguy hiểm' },
          { id: 'gdcd-c7-2', number: 'Bài 7', title: 'Kĩ năng ứng phó với tình huống nguy hiểm' },
        ],
      },
      {
        id: 'gdcd-c8',
        title: 'Bài 8: Tiết kiệm',
        lessons: [
          { id: 'gdcd-c8-1', number: 'Bài 8', title: 'Biểu hiện và ý nghĩa của tiết kiệm' },
          { id: 'gdcd-c8-2', number: 'Bài 8', title: 'Thực hành tiết kiệm trong đời sống hằng ngày' },
        ],
      },
      {
        id: 'gdcd-c9',
        title: 'Bài 9: Quyền và nghĩa vụ cơ bản của công dân',
        lessons: [
          { id: 'gdcd-c9-1', number: 'Bài 9', title: 'Công dân nước Cộng hoà xã hội chủ nghĩa Việt Nam' },
          { id: 'gdcd-c9-2', number: 'Bài 9', title: 'Quyền và nghĩa vụ cơ bản của công dân' },
        ],
      },
      {
        id: 'gdcd-c10',
        title: 'Bài 10: Thực hiện quyền và nghĩa vụ cơ bản của công dân',
        lessons: [
          { id: 'gdcd-c10-1', number: 'Bài 10', title: 'Thực hiện quyền và nghĩa vụ của công dân' },
          { id: 'gdcd-c10-2', number: 'Bài 10', title: 'Quyền trẻ em và bổn phận của học sinh' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Yêu thương con người',
        text: 'Tìm những việc làm thể hiện tình yêu thương con người và nêu ý nghĩa của lòng yêu thương con người.',
        type: 'Đạo đức',
      },
      {
        title: 'Tự lập',
        text: 'Em hiểu thế nào là tự lập? Nêu những biểu hiện của tính tự lập trong học tập và sinh hoạt hằng ngày.',
        type: 'Kĩ năng sống',
      },
    ],
  },
  {
    id: 'tin',
    name: 'Tin học 6',
    shortName: 'Tin',
    badge: 'Tin',
    color: 'from-sky-600 to-blue-800',
    bgLight: 'bg-sky-50/70',
    borderColor: 'border-sky-200',
    accentText: 'text-sky-800',
    icon: 'Laptop',
    description:
      'Tin học 6 Kết nối tri thức: mở đầu về máy tính, mạng máy tính và Internet, tổ chức lưu trữ tìm kiếm trao đổi thông tin, ứng dụng tin học',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-tin-hoc-6-ket-noi-tri-thuc-c3359.html',
    popularLessons: [
      'Thông tin và dữ liệu',
      'Máy tính và phần mềm máy tính',
      'Mạng máy tính và Internet',
      'Lưu trữ dữ liệu trong máy tính',
      'Tìm kiếm thông tin trên Internet',
      'Soạn thảo văn bản trên máy tính',
    ],
    chapters: [
      {
        id: 'tin-c1',
        title: 'Chủ đề 1: Máy tính và cộng đồng',
        lessons: [
          { id: 'tin-c1-1', number: 'Bài 1', title: 'Thông tin, dữ liệu và xử lí thông tin' },
          { id: 'tin-c1-2', number: 'Bài 2', title: 'Máy tính và phần mềm máy tính' },
        ],
      },
      {
        id: 'tin-c2',
        title: 'Chủ đề 2: Mạng máy tính và Internet',
        lessons: [
          { id: 'tin-c2-1', number: 'Bài 3', title: 'Mạng máy tính' },
          { id: 'tin-c2-2', number: 'Bài 4', title: 'Internet và thư điện tử' },
        ],
      },
      {
        id: 'tin-c3',
        title: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm, trao đổi thông tin',
        lessons: [
          { id: 'tin-c3-1', number: 'Bài 5', title: 'Lưu trữ dữ liệu trong máy tính' },
          { id: 'tin-c3-2', number: 'Bài 6', title: 'Tìm kiếm và trao đổi thông tin trên Internet' },
        ],
      },
      {
        id: 'tin-c4',
        title: 'Chủ đề 4: Ứng dụng tin học',
        lessons: [
          { id: 'tin-c4-1', number: 'Bài 7', title: 'Soạn thảo văn bản trên máy tính' },
          { id: 'tin-c4-2', number: 'Bài 8', title: 'Trình bày thông tin bằng bảng tính và phần mềm thuyết trình' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Thông tin và dữ liệu',
        text: 'Phân biệt thông tin và dữ liệu, lấy ví dụ minh hoạ cho mỗi khái niệm.',
        type: 'Tin học',
      },
      {
        title: 'Soạn thảo văn bản',
        text: 'Nêu các bước định dạng đoạn văn bản để trình bày trang giấy khoa học, đẹp mắt trong phần mềm soạn thảo.',
        type: 'Ứng dụng tin học',
      },
    ],
  },
  {
    id: 'congnghe',
    name: 'Công nghệ 6',
    shortName: 'Công nghệ',
    badge: 'Công nghệ',
    color: 'from-stone-600 to-zinc-800',
    bgLight: 'bg-stone-50/70',
    borderColor: 'border-stone-200',
    accentText: 'text-stone-800',
    icon: 'Cpu',
    description:
      'Công nghệ 6 Kết nối tri thức: nhà ở, trang phục và thời trang, bảo quản và chế biến thực phẩm, đồ dùng điện gia đình',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-cong-nghe-6-ket-noi-tri-thuc-c3360.html',
    popularLessons: [
      'Nhà ở đối với đời sống con người',
      'Ngôi nhà thông minh',
      'Thực phẩm và dinh dưỡng',
      'Phương pháp bảo quản thực phẩm',
      'Trang phục và thời trang',
      'Đồ dùng điện gia đình',
    ],
    chapters: [
      {
        id: 'congnghe-c1',
        title: 'Chương I: Nhà ở',
        lessons: [
          { id: 'congnghe-c1-1', number: 'Bài 1', title: 'Nhà ở đối với đời sống con người' },
          { id: 'congnghe-c1-2', number: 'Bài 2', title: 'Xây dựng nhà ở' },
          { id: 'congnghe-c1-3', number: 'Bài 3', title: 'Ngôi nhà thông minh' },
        ],
      },
      {
        id: 'congnghe-c2',
        title: 'Chương II: Bảo quản và chế biến thực phẩm',
        lessons: [
          { id: 'congnghe-c2-1', number: 'Bài 4', title: 'Thực phẩm và dinh dưỡng' },
          { id: 'congnghe-c2-2', number: 'Bài 5', title: 'Phương pháp bảo quản thực phẩm' },
          { id: 'congnghe-c2-3', number: 'Bài 6', title: 'Phương pháp chế biến thực phẩm' },
        ],
      },
      {
        id: 'congnghe-c3',
        title: 'Chương III: Trang phục và thời trang',
        lessons: [
          { id: 'congnghe-c3-1', number: 'Bài 7', title: 'Trang phục và thời trang' },
          { id: 'congnghe-c3-2', number: 'Bài 8', title: 'Lựa chọn và sử dụng trang phục' },
          { id: 'congnghe-c3-3', number: 'Bài 9', title: 'Bảo quản trang phục' },
        ],
      },
      {
        id: 'congnghe-c4',
        title: 'Chương IV: Đồ dùng điện gia đình',
        lessons: [
          { id: 'congnghe-c4-1', number: 'Bài 10', title: 'Đồ dùng điện gia đình: phân loại và sử dụng an toàn' },
          { id: 'congnghe-c4-2', number: 'Bài 11', title: 'Sử dụng năng lượng điện tiết kiệm và hiệu quả' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Ngôi nhà thông minh',
        text: 'Ngôi nhà thông minh là gì? Kể tên các hệ thống thông minh trong ngôi nhà thông minh.',
        type: 'Nhà ở',
      },
      {
        title: 'Phương pháp bảo quản thực phẩm',
        text: 'Trình bày các phương pháp bảo quản thực phẩm và lấy ví dụ minh hoạ cho từng phương pháp.',
        type: 'Thực phẩm',
      },
    ],
  },
];