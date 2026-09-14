import { SubjectInfo, TextbookSeries } from '../types';

export const TEXTBOOKS_7: TextbookSeries[] = [
  'Kết nối tri thức với cuộc sống',
  'Cánh diều',
  'Chân trời sáng tạo',
  'Tổng hợp / Chung',
];

export const SUBJECTS_7: SubjectInfo[] = [
  {
    id: 'toan',
    name: 'Toán 7',
    shortName: 'Toán',
    badge: 'Toán',
    color: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-blue-50/70',
    borderColor: 'border-blue-200',
    accentText: 'text-blue-700',
    icon: 'Calculator',
    description:
      'Số hữu tỉ, số thực, góc và đường thẳng song song, tam giác, tam giác bằng nhau - đồng dạng, hình học trực quan, biểu thức đại số, thống kê và xác suất',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-toan-7-ket-noi-tri-thuc-c3352.html',
    popularLessons: [
      'Số hữu tỉ và số thực',
      'Phép cộng, trừ, nhân, chia số hữu tỉ',
      'Góc và các đường thẳng song song',
      'Tam giác cân, tam giác đều',
      'Tam giác bằng nhau và tam giác đồng dạng',
      'Biểu thức đại số và cách rút gọn',
      'Thống kê và xác suất',
    ],
    chapters: [
      {
        id: 'toan-c1',
        title: 'Chương I: Số hữu tỉ',
        lessons: [
          { id: 'toan-c1-1', number: 'Bài 1', title: 'Phân số và phép tính phân số' },
          { id: 'toan-c1-2', number: 'Bài 2', title: 'Số hữu tỉ và biểu diễn trên trục số' },
          { id: 'toan-c1-3', number: 'Bài 3', title: 'Phép cộng, trừ số hữu tỉ' },
        ],
      },
      {
        id: 'toan-c2',
        title: 'Chương II: Số thực',
        lessons: [
          { id: 'toan-c2-1', number: 'Bài 5', title: 'Căn bậc hai, căn bậc ba' },
          { id: 'toan-c2-2', number: 'Bài 6', title: 'Số thực và phép tính số thực' },
        ],
      },
      {
        id: 'toan-c3',
        title: 'Chương III: Góc và đường thẳng song song',
        lessons: [
          { id: 'toan-c3-1', number: 'Bài 7', title: 'Các góc tạo bởi ba đường thẳng cắt nhau' },
          { id: 'toan-c3-2', number: 'Bài 8', title: 'Hai đường thẳng song song và một đường thẳng cắt' },
          { id: 'toan-c3-3', number: 'Bài 9', title: 'Định lí Ta-lét và ứng dụng' },
        ],
      },
      {
        id: 'toan-c4',
        title: 'Chương IV: Tam giác',
        lessons: [
          { id: 'toan-c4-1', number: 'Bài 11', title: 'Các trường hợp bằng nhau của tam giác' },
          { id: 'toan-c4-2', number: 'Bài 12', title: 'Tam giác cân và tam giác đều' },
          { id: 'toan-c4-3', number: 'Bài 13', title: 'Đường trung bình của tam giác' },
        ],
      },
      {
        id: 'toan-c5',
        title: 'Chương V: Tam giác bằng nhau và tam giác đồng dạng',
        lessons: [
          { id: 'toan-c5-1', number: 'Bài 15', title: 'Tam giác đồng dạng' },
          { id: 'toan-c5-2', number: 'Bài 16', title: 'Định lí Ta-lét đảo và định lí Ta-lét trong tam giác' },
          { id: 'toan-c5-3', number: 'Bài 17', title: 'Hình học trực quan' },
        ],
      },
      {
        id: 'toan-c6',
        title: 'Chương VI: Biểu thức đại số',
        lessons: [
          { id: 'toan-c6-1', number: 'Bài 19', title: 'Cộng, trừ đa thức' },
          { id: 'toan-c6-2', number: 'Bài 20', title: 'Nhân đơn thức với đa thức' },
          { id: 'toan-c6-3', number: 'Bài 21', title: 'Nhân đa thức với đa thức' },
          { id: 'toan-c6-4', number: 'Bài 22', title: 'Rút gọn biểu thức đại số' },
        ],
      },
      {
        id: 'toan-c7',
        title: 'Chương VII: Thống kê và xác suất',
        lessons: [
          { id: 'toan-c7-1', number: 'Bài 24', title: 'Biểu đồ và bảng tổng hợp tần số' },
          { id: 'toan-c7-2', number: 'Bài 25', title: 'Điểm tập trung, phổ biến và measures of central tendency' },
          { id: 'toan-c7-3', number: 'Bài 26', title: 'Xác suất của biến cố' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Rút gọn biểu thức đại số',
        text: 'Rút gọn biểu thức: A = (2x + 3)(x - 1) - (x + 1)²',
        type: 'Đại số',
      },
      {
        title: 'Chứng minh tam giác đồng dạng',
        text: 'Cho tam giác ABC với D thuộc AB, E thuộc AC sao cho DE // BC. Chứng minh △ADE ~ △ABC và suy ra tỉ lệ thức.',
        type: 'Hình học',
      },
      {
        title: 'Tính xác suất',
        text: 'Tung một con xúc xắc cân đối. Tính xác suất để tổng điểm hai mặt chẵn và lớn hơn 4.',
        type: 'Xác suất',
      },
    ],
  },
  {
    id: 'van',
    name: 'Ngữ văn 7',
    shortName: 'Văn',
    badge: 'Văn',
    color: 'from-rose-600 to-pink-700',
    bgLight: 'bg-rose-50/70',
    borderColor: 'border-rose-200',
    accentText: 'text-rose-700',
    icon: 'BookOpen',
    description:
      'Soạn văn 7 Kết nối tri thức tập 1 & 2: truyện ngắn, thơ bốn chữ, thơ năm chữ, tục ngữ ca dao, văn nghị luận, văn bản thông tin',
    loigiaihayUrl: 'https://loigiaihay.com/soan-van-7-ket-noi-tri-thuc-c3354.html',
    popularLessons: [
      'Dòng sông khó cạn',
      'Bài học từ cây dừa',
      'Cảm nghĩ về cây tre Việt Nam',
      'Tục ngữ về thiên nhiên và lao động sản xuất',
      'Con hổ có nghĩa',
      'Phân tích văn bản thông tin',
      'Viết bài nghị luận về vấn đề xã hội',
    ],
    chapters: [
      {
        id: 'van-c1',
        title: 'Bài 1: Ngôi nhà chung của em',
        lessons: [
          { id: 'van-c1-1', number: 'Văn bản 1', title: 'Dòng sông khó cạn' },
          { id: 'van-c1-2', number: 'Văn bản 2', title: 'Bài học từ cây dừa' },
        ],
      },
      {
        id: 'van-c2',
        title: 'Bài 2: Khúc nhạc tâm hồn',
        lessons: [
          { id: 'van-c2-1', number: 'Văn bản 1', title: 'Thơ bốn chữ và thơ năm chữ' },
          { id: 'van-c2-2', number: 'Văn bản 2', title: 'Cảm nghĩ về một bài thơ ngắn' },
        ],
      },
      {
        id: 'van-c3',
        title: 'Bài 3: Cội nguồn yêu thương',
        lessons: [{ id: 'van-c3-1', number: 'Văn bản', title: 'Cảm nghĩ về cây tre Việt Nam' }],
      },
      {
        id: 'van-c4',
        title: 'Bài 4: Giai điệu đất nước',
        lessons: [
          { id: 'van-c4-1', number: 'Văn bản 1', title: 'Tục ngữ về thiên nhiên và lao động sản xuất' },
          { id: 'van-c4-2', number: 'Văn bản 2', title: 'Ca dao về tình cảm gia đình' },
        ],
      },
      {
        id: 'van-c5',
        title: 'Bài 5: Màu sắc trăm miền',
        lessons: [{ id: 'van-c5-1', number: 'Văn bản', title: 'Văn nghị luận xã hội' }],
      },
      {
        id: 'van-c6',
        title: 'Bài 6: Bài học cuộc sống',
        lessons: [{ id: 'van-c6-1', number: 'Văn bản', title: 'Con hổ có nghĩa' }],
      },
      {
        id: 'van-c7',
        title: 'Bài 7: Trí tuệ nhân loại',
        lessons: [{ id: 'van-c7-1', number: 'Văn bản', title: 'Truyện ngụ ngôn và bài học' }],
      },
      {
        id: 'van-c8',
        title: 'Bài 9: Hòa điệu với tự nhiên',
        lessons: [{ id: 'van-c8-1', number: 'Văn bản', title: 'Văn bản về thiên nhiên và con người' }],
      },
      {
        id: 'van-c9',
        title: 'Bài 10: Trang sách và cuộc sống',
        lessons: [{ id: 'van-c9-1', number: 'Văn bản', title: 'Văn bản thông tin và nghị luận' }],
      },
    ],
    sampleQuestions: [
      {
        title: 'Phân tích nhân vật',
        text: 'Phân tích vẻ đẹp hình tượng và ý nghĩa biểu tượng của hình ảnh cây tre trong văn học Việt Nam.',
        type: 'Nghị luận văn học',
      },
      {
        title: 'Tục ngữ và ca dao',
        text: 'Phân tích ý nghĩa câu tục ngữ: "Thuốc đắng dã tật, sự thật mất lòng" và liên hệ thực tiễn.',
        type: 'Tục ngữ',
      },
      {
        title: 'Viết bài nghị luận',
        text: 'Viết đoạn văn khoảng 200 chữ trình bày suy nghĩ về tầm quan trọng của việc đọc sách trong thời đại số.',
        type: 'Nghị luận xã hội',
      },
    ],
  },
  {
    id: 'anh',
    name: 'Tiếng Anh 7',
    shortName: 'Anh',
    badge: 'Anh',
    color: 'from-emerald-600 to-teal-700',
    bgLight: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200',
    accentText: 'text-emerald-700',
    icon: 'BookMarked',
    description:
      'Tiếng Anh 7 Kết nối tri thức: 12 unit theo chủ điểm, ngữ pháp và từ vựng trọng tâm, rèn kĩ năng đọc hiểu, nghe nói và viết',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-tieng-anh-7-ket-noi-tri-thuc-c3355.html',
    popularLessons: [
      'Unit 1: My hobbies (Sở thích của tôi)',
      'Unit 2: My house (Ngôi nhà của tôi)',
      'Unit 3: My neighbourhood (Khu phố của tôi)',
      'Unit 4: My school (Trường học của tôi)',
      'Unit 5: My future (Tương lai của tôi)',
      'Unit 6: Technology (Công nghệ)',
      'Unit 7: Seasons and weather (Mùa và thời tiết)',
    ],
    chapters: [
      {
        id: 'anh-c1',
        title: 'Unit 1: My hobbies',
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
          { id: 'anh-c2-1', number: '1', title: 'Getting Started' },
          { id: 'anh-c2-2', number: '2', title: 'A Closer Look 1 & 2' },
        ],
      },
      {
        id: 'anh-c3',
        title: 'Unit 3: My neighbourhood',
        lessons: [
          { id: 'anh-c3-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c3-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c4',
        title: 'Unit 4: My school',
        lessons: [
          { id: 'anh-c4-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c4-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c5',
        title: 'Unit 5: My future',
        lessons: [
          { id: 'anh-c5-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c5-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c6',
        title: 'Unit 6: Technology',
        lessons: [
          { id: 'anh-c6-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
        ],
      },
      {
        id: 'anh-c7',
        title: 'Unit 7: Seasons and weather',
        lessons: [
          { id: 'anh-c7-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
        ],
      },
      {
        id: 'anh-c8',
        title: 'Unit 8: Country life and city life',
        lessons: [
          { id: 'anh-c8-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
        ],
      },
      {
        id: 'anh-c9',
        title: 'Unit 9: Structures and materials',
        lessons: [
          { id: 'anh-c9-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
        ],
      },
      {
        id: 'anh-c10',
        title: 'Unit 10: Water sports',
        lessons: [
          { id: 'anh-c10-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
        ],
      },
      {
        id: 'anh-c11',
        title: 'Unit 11: Space travel',
        lessons: [
          { id: 'anh-c11-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
        ],
      },
      {
        id: 'anh-c12',
        title: 'Unit 12: English speaking countries',
        lessons: [
          { id: 'anh-c12-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Viết đoạn văn tiếng Anh',
        text: 'Write a short paragraph (about 100 words) about your favourite hobby and explain why you like it.',
        type: 'Writing',
      },
      {
        title: 'Chia động từ đúng thì',
        text: 'Complete the sentences with the correct form: "Last summer, my family (go) ____ to the beach. We (swim) ____ in the sea every day."',
        type: 'Grammar',
      },
    ],
  },
  {
    id: 'khtn',
    name: 'Khoa học tự nhiên 7',
    shortName: 'KHTN',
    badge: 'KHTN',
    color: 'from-green-600 to-emerald-700',
    bgLight: 'bg-green-50/70',
    borderColor: 'border-green-200',
    accentText: 'text-emerald-700',
    icon: 'FlaskConical',
    description:
      'KHTN 7 Kết nối tri thức: nguyên tử và nguyên tố hóa học, phân tử đơn chất hợp chất, tốc độ, âm thanh, ánh sáng, trao đổi chất ở sinh vật',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-khtn-7-ket-noi-tri-thuc-c3356.html',
    popularLessons: [
      'Cấu tạo nguyên tử và bảng tuần hoàn',
      'Phân tử, đơn chất và hợp chất',
      'Tốc độ và chuyển động',
      'Âm thanh và nghe',
      'Ánh sáng và mắt',
      'Trao đổi chất và chuyển hóa năng lượng',
      'Cảm ứng ở sinh vật',
      'Sinh trưởng và sinh sản',
    ],
    chapters: [
      {
        id: 'khtn-c1',
        title: 'Chủ đề 1: Nguyên tử và nguyên tố hóa học',
        lessons: [
          { id: 'khtn-c1-1', number: 'Bài 1', title: 'Nguyên tử' },
          { id: 'khtn-c1-2', number: 'Bài 2', title: 'Bảng tuần hoàn các nguyên tố hóa học' },
        ],
      },
      {
        id: 'khtn-c2',
        title: 'Chủ đề 2: Phân tử, đơn chất, hợp chất - hóa trị',
        lessons: [
          { id: 'khtn-c2-1', number: 'Bài 3', title: 'Phân tử và nguyên tử' },
          { id: 'khtn-c2-2', number: 'Bài 4', title: 'Đơn chất và hợp chất' },
          { id: 'khtn-c2-3', number: 'Bài 5', title: 'Hóa trị và công thức hóa học' },
        ],
      },
      {
        id: 'khtn-c3',
        title: 'Chủ đề 3: Tốc độ',
        lessons: [
          { id: 'khtn-c3-1', number: 'Bài 6', title: 'Khái niệm và công thức tính tốc độ' },
          { id: 'khtn-c3-2', number: 'Bài 7', title: 'Chuyển động thẳng đều và chuyển động thẳng biến đổi đều' },
        ],
      },
      {
        id: 'khtn-c4',
        title: 'Chủ đề 4: Âm thanh',
        lessons: [
          { id: 'khtn-c4-1', number: 'Bài 8', title: 'Nguồn âm và truyền âm' },
          { id: 'khtn-c4-2', number: 'Bài 9', title: 'Độ cao, độ to và độ vang của âm' },
        ],
      },
      {
        id: 'khtn-c5',
        title: 'Chủ đề 5: Ánh sáng',
        lessons: [
          { id: 'khtn-c5-1', number: 'Bài 10', title: 'Ảnh của vật qua gương phẳng' },
          { id: 'khtn-c5-2', number: 'Bài 11', title: 'Quang hợp và ứng dụng trong đời sống' },
        ],
      },
      {
        id: 'khtn-c6',
        title: 'Chủ đề 6: Trao đổi chất và chuyển hóa năng lượng ở sinh vật',
        lessons: [
          { id: 'khtn-c6-1', number: 'Bài 12', title: 'Quá trình quang hợp ở thực vật' },
          { id: 'khtn-c6-2', number: 'Bài 13', title: 'Quá trình hô hấp ở thực vật và động vật' },
        ],
      },
      {
        id: 'khtn-c7',
        title: 'Chủ đề 7: Cảm ứng ở sinh vật',
        lessons: [
          { id: 'khtn-c7-1', number: 'Bài 14', title: 'Cảm ứng của thực vật' },
          { id: 'khtn-c7-2', number: 'Bài 15', title: 'Cảm ứng ở động vật' },
        ],
      },
      {
        id: 'khtn-c8',
        title: 'Chủ đề 8: Sinh trưởng và sinh sản ở sinh vật',
        lessons: [
          { id: 'khtn-c8-1', number: 'Bài 16', title: 'Sinh trưởng ở thực vật' },
          { id: 'khtn-c8-2', number: 'Bài 17', title: 'Sinh sản hữu tính và sinh sản vô tính' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Công thức hóa học',
        text: 'Viết công thức hóa học của các chất: nước, muối ăn, Axetic acid và cho biết hóa trị của các nguyên tố trong hợp chất.',
        type: 'Hoá học',
      },
      {
        title: 'Tính tốc độ',
        text: 'Một ô tô chạy quãng đường 120 km trong 2 giờ. Tính vận tốc trung bình (km/h) và đổi sang m/s.',
        type: 'Vật lí',
      },
      {
        title: 'Quang hợp ở thực vật',
        text: 'Trình bày quá trình quang hợp ở thực vật và điều kiện cần thiết để quá trình xảy ra.',
        type: 'Sinh học',
      },
    ],
  },
  {
    id: 'sudia',
    name: 'Lịch sử và Địa lí 7',
    shortName: 'Sử - Địa',
    badge: 'Sử-Địa',
    color: 'from-amber-600 to-orange-700',
    bgLight: 'bg-amber-50/70',
    borderColor: 'border-amber-200',
    accentText: 'text-amber-800',
    icon: 'Globe2',
    description:
      'Tích hợp Lịch sử và Địa lí 7: thế giới và Việt Nam từ thế kỉ V đến đầu thế kỉ XVI; địa lí các châu lục trên thế giới',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-lich-su-va-dia-li-7-ket-noi-tri-thuc-c3357.html',
    popularLessons: [
      'Tây Âu từ thế kỉ V đến nửa đầu thế kỉ XVI',
      'Trung Quốc và Ấn Độ thời trung đại',
      'Đông Nam Á từ nửa sau thế kỉ X đến đầu thế kỉ XVI',
      'Việt Nam từ thế kỉ X đến đầu thế kỉ XVI',
      'Địa lí châu Âu',
      'Địa lí châu Á',
      'Địa lí châu Phi',
      'Địa lí châu Mĩ',
    ],
    chapters: [
      {
        id: 'sudia-c1',
        title: 'Phân môn Lịch sử - Tây Âu từ thế kỉ V đến nửa đầu thế kỉ XVI',
        lessons: [
          { id: 'sudia-c1-1', number: 'Bài 1', title: 'Sự hình thành các quốc gia phong kiến Tây Âu' },
          { id: 'sudia-c1-2', number: 'Bài 2', title: 'Xã hội Tây Âu thời trung đại' },
        ],
      },
      {
        id: 'sudia-c2',
        title: 'Phân môn Lịch sử - Trung Quốc và Ấn Độ thời trung đại',
        lessons: [
          { id: 'sudia-c2-1', number: 'Bài 3', title: 'Trung Quốc thời phong kiến từ thế kỉ V đến thế kỉ X' },
          { id: 'sudia-c2-2', number: 'Bài 4', title: 'Ấn Độ từ thế kỉ V đến thế kỉ XII' },
        ],
      },
      {
        id: 'sudia-c3',
        title: 'Phân môn Lịch sử - Đông Nam Á từ nửa sau thế kỉ X đến đầu thế kỉ XVI',
        lessons: [
          { id: 'sudia-c3-1', number: 'Bài 5', title: 'Đại Việt từ thế kỉ X đến thế kỉ XV' },
          { id: 'sudia-c3-2', number: 'Bài 6', title: 'Đông Nam Á từ thế kỉ X đến XVI' },
        ],
      },
      {
        id: 'sudia-c4',
        title: 'Phân môn Lịch sử - Việt Nam từ thế kỉ X đến đầu thế kỉ XVI',
        lessons: [
          { id: 'sudia-c4-1', number: 'Bài 7', title: 'Việt Nam từ thế kỉ X đến thế kỉ XV: Nhà Lý, Nhà Trần' },
          { id: 'sudia-c4-2', number: 'Bài 8', title: 'Việt Nam thế kỉ XV - XVI: Nhà Lê sơ' },
        ],
      },
      {
        id: 'sudia-d1',
        title: 'Phân môn Địa lí - Châu Âu',
        lessons: [
          { id: 'sudia-d1-1', number: 'Bài 9', title: 'Vị trí, phạm vi và tự nhiên châu Âu' },
          { id: 'sudia-d1-2', number: 'Bài 10', title: 'Dân cư và kinh tế châu Âu' },
        ],
      },
      {
        id: 'sudia-d2',
        title: 'Phân môn Địa lí - Châu Á',
        lessons: [
          { id: 'sudia-d2-1', number: 'Bài 11', title: 'Vị trí, phạm vi và tự nhiên châu Á' },
          { id: 'sudia-d2-2', number: 'Bài 12', title: 'Dân cư và kinh tế châu Á' },
        ],
      },
      {
        id: 'sudia-d3',
        title: 'Phân môn Địa lí - Châu Phi',
        lessons: [
          { id: 'sudia-d3-1', number: 'Bài 13', title: 'Vị trí, phạm vi và tự nhiên châu Phi' },
          { id: 'sudia-d3-2', number: 'Bài 14', title: 'Dân cư và kinh tế châu Phi' },
        ],
      },
      {
        id: 'sudia-d4',
        title: 'Phân môn Địa lí - Châu Mĩ',
        lessons: [
          { id: 'sudia-d4-1', number: 'Bài 15', title: 'Vị trí, phạm vi và tự nhiên châu Mĩ' },
          { id: 'sudia-d4-2', number: 'Bài 16', title: 'Dân cư và kinh tế châu Mĩ' },
        ],
      },
      {
        id: 'sudia-d5',
        title: 'Phân môn Địa lí - Châu Đại Dương',
        lessons: [
          { id: 'sudia-d5-1', number: 'Bài 17', title: 'Vị trí, tự nhiên, dân cư và kinh tế châu Đại Dương' },
        ],
      },
      {
        id: 'sudia-d6',
        title: 'Phân môn Địa lí - Châu Nam Cực',
        lessons: [
          { id: 'sudia-d6-1', number: 'Bài 18', title: 'Vị trí, tự nhiên và sự hợp tác quốc tế ở châu Nam Cực' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Xã hội phong kiến Tây Âu',
        text: 'Trình bày đặc điểm cấu trúc xã hội Tây Âu thời trung đại và so sánh với xã hội phong kiến châu Á.',
        type: 'Lịch sử',
      },
      {
        title: 'Địa lí châu Á',
        text: 'Phân tích vị trí địa lí và vai trò của châu Á trên thế giới. nêu đặc điểm nổi bật về dân cư và kinh tế.',
        type: 'Địa lí',
      },
    ],
  },
  {
    id: 'gdcd',
    name: 'Giáo dục công dân 7',
    shortName: 'GDCD',
    badge: 'GDCD',
    color: 'from-fuchsia-600 to-pink-700',
    bgLight: 'bg-fuchsia-50/70',
    borderColor: 'border-fuchsia-200',
    accentText: 'text-fuchsia-700',
    icon: 'HeartHandshake',
    description:
      'Giáo dục công dân 7 Kết nối tri thức: truyền thống quê hương, quan tâm cảm thông, học tập tự giác, giữ chữ tín, bảo tồn di sản, quản lí tiền',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-giao-duc-cong-dan-7-ket-noi-tri-thuc-c3358.html',
    popularLessons: [
      'Tự hào về truyền thống quê hương',
      'Quan tâm, cảm thông và chia sẻ',
      'Học tập tự giác, tích cực',
      'Giữ chữ tín',
      'Bảo tồn di sản văn hóa',
      'Quản lí tiền',
      'Phòng chống bạo lực học đường',
    ],
    chapters: [
      {
        id: 'gdcd-c1',
        title: 'Bài 1: Tự hào về truyền thống quê hương',
        lessons: [
          { id: 'gdcd-c1-1', number: 'Bài 1', title: 'Truyền thống vẻ vang của dân tộc' },
          { id: 'gdcd-c1-2', number: 'Bài 1', title: 'Truyền thống quê hương và gia đình' },
        ],
      },
      {
        id: 'gdcd-c2',
        title: 'Bài 2: Quan tâm, cảm thông và chia sẻ',
        lessons: [
          { id: 'gdcd-c2-1', number: 'Bài 2', title: 'Sự quan tâm, cảm thông và chia sẻ' },
          { id: 'gdcd-c2-2', number: 'Bài 2', title: 'Cùng nhau giúp đỡ người gặp khó khăn' },
        ],
      },
      {
        id: 'gdcd-c3',
        title: 'Bài 3: Học tập tự giác, tích cực',
        lessons: [
          { id: 'gdcd-c3-1', number: 'Bài 3', title: 'Học tập là nhiệm vụ của học sinh' },
          { id: 'gdcd-c3-2', number: 'Bài 3', title: 'Học tập tự giác, tích cực và sáng tạo' },
        ],
      },
      {
        id: 'gdcd-c4',
        title: 'Bài 4: Giữ chữ tín',
        lessons: [
          { id: 'gdcd-c4-1', number: 'Bài 4', title: 'Giữ chữ tín trong lời nói và việc làm' },
        ],
      },
      {
        id: 'gdcd-c5',
        title: 'Bài 5: Bảo tồn di sản văn hóa',
        lessons: [
          { id: 'gdcd-c5-1', number: 'Bài 5', title: 'Giá trị của di sản văn hóa' },
          { id: 'gdcd-c5-2', number: 'Bài 5', title: 'Bảo tồn và phát huy di sản văn hóa' },
        ],
      },
      {
        id: 'gdcd-c6',
        title: 'Bài 6: Quản lí tiền',
        lessons: [
          { id: 'gdcd-c6-1', number: 'Bài 6', title: 'Quản lí tiền trong chi tiêu cá nhân' },
          { id: 'gdcd-c6-2', number: 'Bài 6', title: 'Chi tiêu hợp lí và tiết kiệm' },
        ],
      },
      {
        id: 'gdcd-c7',
        title: 'Bài 7: Phòng chống bạo lực học đường',
        lessons: [
          { id: 'gdcd-c7-1', number: 'Bài 7', title: 'Nhận diện bạo lực học đường' },
          { id: 'gdcd-c7-2', number: 'Bài 7', title: 'Phòng chống bạo lực học đường' },
        ],
      },
      {
        id: 'gdcd-c8',
        title: 'Bài 8: Phòng chống xâm hại',
        lessons: [
          { id: 'gdcd-c8-1', number: 'Bài 8', title: 'Nhận diện hành vi xâm hại' },
          { id: 'gdcd-c8-2', number: 'Bài 8', title: 'Phòng ngừa và ứng xử khi bị xâm hại' },
        ],
      },
      {
        id: 'gdcd-c9',
        title: 'Bài 9: Ứng phó với tình huống nguy hiểm',
        lessons: [
          { id: 'gdcd-c9-1', number: 'Bài 9', title: 'Nhận biết tình huống nguy hiểm' },
          { id: 'gdcd-c9-2', number: 'Bài 9', title: 'Kỹ năng ứng phó với tình huống nguy hiểm' },
        ],
      },
      {
        id: 'gdcd-c10',
        title: 'Bài 10: Nguyên nhân, hậu quả của tệ nạn xã hội',
        lessons: [
          { id: 'gdcd-c10-1', number: 'Bài 10', title: 'Nguyên nhân và hậu quả của tệ nạn xã hội' },
          { id: 'gdcd-c10-2', number: 'Bài 10', title: 'Phòng ngừa tệ nạn xã hội' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Giữ chữ tín',
        text: 'Tại sao giữ chữ tín là phẩm chất quan trọng của con người? Cho ví dụ cụ thể trong cuộc sống hàng ngày.',
        type: 'Đạo đức',
      },
      {
        title: 'Quản lí chi tiêu',
        text: 'Lập kế hoạch chi tiêu hợp lí cho một tuần với số tiền 200.000 đồng tiền ăn trưa của học sinh.',
        type: 'Kinh tế',
      },
    ],
  },
  {
    id: 'tin',
    name: 'Tin học 7',
    shortName: 'Tin',
    badge: 'Tin',
    color: 'from-sky-600 to-blue-800',
    bgLight: 'bg-sky-50/70',
    borderColor: 'border-sky-200',
    accentText: 'text-sky-800',
    icon: 'Laptop',
    description:
      'Tin học 7 Kết nối tri thức: máy tính và cộng đồng, tổ chức lưu trữ tìm kiếm trao đổi thông tin, đạo đức pháp luật môi trường số, ứng dụng tin học',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-tin-hoc-7-ket-noi-tri-thuc-c3359.html',
    popularLessons: [
      'Máy tính và cộng đồng',
      'Sử dụng máy tính an toàn và hiệu quả',
      'Tổ chức lưu trữ dữ liệu',
      'Tìm kiếm và trao đổi thông tin trên Internet',
      'Đạo đức và pháp luật trong môi trường số',
      'Ứng dụng tin học trong thực tiễn',
    ],
    chapters: [
      {
        id: 'tin-c1',
        title: 'Chủ đề 1: Máy tính và cộng đồng',
        lessons: [
          { id: 'tin-c1-1', number: 'Bài 1', title: 'Máy tính và vai trò trong cộng đồng' },
          { id: 'tin-c1-2', number: 'Bài 2', title: 'Sử dụng máy tính an toàn và hiệu quả' },
        ],
      },
      {
        id: 'tin-c2',
        title: 'Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
        lessons: [
          { id: 'tin-c2-1', number: 'Bài 3', title: 'Tổ chức lưu trữ dữ liệu trên máy tính' },
          { id: 'tin-c2-2', number: 'Bài 4', title: 'Tìm kiếm thông tin trên Internet' },
          { id: 'tin-c2-3', number: 'Bài 5', title: 'Trao đổi thông tin qua email và ứng dụng nhắn tin' },
        ],
      },
      {
        id: 'tin-c3',
        title: 'Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số',
        lessons: [
          { id: 'tin-c3-1', number: 'Bài 6', title: 'Đạo đức, pháp luật và văn hóa trong môi trường số' },
        ],
      },
      {
        id: 'tin-c4',
        title: 'Chủ đề 4: Ứng dụng tin học',
        lessons: [
          { id: 'tin-c4-1', number: 'Bài 7', title: 'Trình bày thông tin bằng bảng tính' },
          { id: 'tin-c4-2', number: 'Bài 8', title: 'Tạo và trình bày thông tin bằng phần mềm thuyết trình' },
          { id: 'tin-c4-3', number: 'Bài 9', title: 'Tạo trang web đơn giản' },
          { id: 'tin-c4-4', number: 'Bài 10', title: 'Lập trình cơ bản với Scratch' },
        ],
      },
      {
        id: 'tin-c5',
        title: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
        lessons: [
          { id: 'tin-c5-1', number: 'Bài 11', title: 'Tư duy thuật toán và giải quyết vấn đề' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Lưu trữ dữ liệu',
        text: 'Trình bày cách tổ chức thư mục và tệp tin trên máy tính để quản lí dữ liệu học tập hiệu quả.',
        type: 'Tổ chức thông tin',
      },
      {
        title: 'An toàn mạng',
        text: 'Nêu các biện pháp bảo vệ thông tin cá nhân khi sử dụng Internet và mạng xã hội.',
        type: 'Đạo đức - An toàn mạng',
      },
      {
        title: 'Thuật toán',
        text: 'Viết thuật toán tìm largest number trong một danh sách 5 số nguyên. Mô tả các bước thực hiện.',
        type: 'Thuật toán',
      },
    ],
  },
  {
    id: 'congnghe',
    name: 'Công nghệ 7',
    shortName: 'Công nghệ',
    badge: 'Công nghệ',
    color: 'from-stone-600 to-zinc-800',
    bgLight: 'bg-stone-50/70',
    borderColor: 'border-stone-200',
    accentText: 'text-stone-800',
    icon: 'Cpu',
    description:
      'Công nghệ 7 Kết nối tri thức: trồng trọt, lâm nghiệp, chăn nuôi, thuỷ sản - các kĩ thuật cơ bản trong sản xuất nông nghiệp',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-cong-nghe-7-ket-noi-tri-thuc-c3360.html',
    popularLessons: [
      'Mở đầu về trồng trọt',
      'Làm đất trồng cây',
      'Gieo trồng cây',
      'Thu hoạch sản phẩm trồng trọt',
      'Kĩ thuật trồng rừng',
      'Nuôi gia súc gia cầm',
    ],
    chapters: [
      {
        id: 'congnghe-c1',
        title: 'Chương I: Trồng trọt',
        lessons: [
          { id: 'congnghe-c1-1', number: 'Bài 1', title: 'Mở đầu về trồng trọt' },
          { id: 'congnghe-c1-2', number: 'Bài 2', title: 'Làm đất trồng cây' },
          { id: 'congnghe-c1-3', number: 'Bài 3', title: 'Gieo trồng cây' },
          { id: 'congnghe-c1-4', number: 'Bài 4', title: 'Thu hoạch sản phẩm trồng trọt' },
        ],
      },
      {
        id: 'congnghe-c2',
        title: 'Chương II: Lâm nghiệp',
        lessons: [
          { id: 'congnghe-c2-1', number: 'Bài 5', title: 'Giới thiệu về lâm nghiệp' },
          { id: 'congnghe-c2-2', number: 'Bài 6', title: 'Kĩ thuật trồng và chăm sóc rừng' },
        ],
      },
      {
        id: 'congnghe-c3',
        title: 'Chương III: Chăn nuôi',
        lessons: [
          { id: 'congnghe-c3-1', number: 'Bài 7', title: 'Giới thiệu về chăn nuôi' },
          { id: 'congnghe-c3-2', number: 'Bài 8', title: 'Nuôi gia súc và gia cầm' },
          { id: 'congnghe-c3-3', number: 'Bài 9', title: 'Chăm sóc và phòng bệnh cho vật nuôi' },
        ],
      },
      {
        id: 'congnghe-c4',
        title: 'Chương IV: Thuỷ sản',
        lessons: [
          { id: 'congnghe-c4-1', number: 'Bài 10', title: 'Giới thiệu về thuỷ sản' },
          { id: 'congnghe-c4-2', number: 'Bài 11', title: 'Nuôi thuỷ sản' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Làm đất trồng cây',
        text: 'Trình bày các bước làm đất trồng cây và nêu tầm quan trọng của việc làm đất đối với sự sinh trưởng của cây.',
        type: 'Trồng trọt',
      },
      {
        title: 'Chăn nuôi',
        text: 'So sánh ưu nhược điểm giữa chăn nuôi nhốt và chăn nuôi thả松. Đưa ra giải pháp phù hợp.',
        type: 'Chăn nuôi',
      },
    ],
  },
];
