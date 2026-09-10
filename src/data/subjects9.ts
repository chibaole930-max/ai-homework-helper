import { SubjectInfo, TextbookSeries } from '../types';

export const TEXTBOOKS_9: TextbookSeries[] = [
  'Kết nối tri thức với cuộc sống',
  'Cánh diều',
  'Chân trời sáng tạo',
  'Tổng hợp / Chung',
];

export const SUBJECTS_9: SubjectInfo[] = [
  {
    id: 'toan',
    name: 'Toán 9',
    shortName: 'Toán',
    badge: 'Toán',
    color: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-blue-50/70',
    borderColor: 'border-blue-200',
    accentText: 'text-blue-700',
    icon: 'Calculator',
    description:
      'Phương trình & bất phương trình bậc nhất, căn bậc hai, hệ thức lượng trong tam giác vuông, đường tròn, hàm số bậc hai và PT bậc hai, thống kê & xác suất',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-toan-9-ket-noi-tri-thuc-c1748.html',
    popularLessons: [
      'Giải phương trình và bất phương trình bậc nhất một ẩn',
      'Hệ hai phương trình bậc nhất hai ẩn',
      'Căn bậc hai và căn bậc ba',
      'Hệ thức lượng trong tam giác vuông',
      'Đường tròn: vị trí tương đối, tiếp tuyến',
      'Hàm số y = ax² và phương trình bậc hai một ẩn',
      'Tần số và tần số tương đối',
      'Xác suất của biến cố',
    ],
    chapters: [
      {
        id: 'toan-c1',
        title: 'Chương I: Phương trình và bất phương trình bậc nhất một ẩn',
        lessons: [
          { id: 'toan-c1-1', number: 'Bài 1', title: 'Khái niệm phương trình và nghiệm của phương trình' },
          { id: 'toan-c1-2', number: 'Bài 2', title: 'Giải phương trình bậc nhất một ẩn' },
          { id: 'toan-c1-3', number: 'Bài 3', title: 'Giải bài toán bằng cách lập phương trình' },
          { id: 'toan-c1-4', number: 'Bài 4', title: 'Bất phương trình bậc nhất một ẩn' },
          { id: 'toan-c1-5', number: 'Bài 5', title: 'Giải bài toán bằng cách lập bất phương trình' },
        ],
      },
      {
        id: 'toan-c2',
        title: 'Chương II: Phương trình và hệ phương trình bậc nhất hai ẩn',
        lessons: [
          { id: 'toan-c2-1', number: 'Bài 6', title: 'Phương trình bậc nhất hai ẩn' },
          { id: 'toan-c2-2', number: 'Bài 7', title: 'Hệ hai phương trình bậc nhất hai ẩn' },
          { id: 'toan-c2-3', number: 'Bài 8', title: 'Giải hệ hai phương trình bậc nhất hai ẩn' },
          { id: 'toan-c2-4', number: 'Bài 9', title: 'Giải bài toán bằng cách lập hệ phương trình' },
        ],
      },
      {
        id: 'toan-c3',
        title: 'Chương III: Căn bậc hai và căn bậc ba',
        lessons: [
          { id: 'toan-c3-1', number: 'Bài 10', title: 'Căn bậc hai và phép khai phương' },
          { id: 'toan-c3-2', number: 'Bài 11', title: 'Căn thức bậc hai và hằng đẳng thức' },
          { id: 'toan-c3-3', number: 'Bài 12', title: 'Liên hệ giữa phép nhân, phép chia với phép khai căn' },
          { id: 'toan-c3-4', number: 'Bài 13', title: 'Căn bậc ba và căn thức bậc ba' },
          { id: 'toan-c3-5', number: 'Bài 14', title: 'Rút gọn biểu thức chứa căn thức bậc hai' },
        ],
      },
      {
        id: 'toan-c4',
        title: 'Chương IV: Hệ thức lượng trong tam giác vuông',
        lessons: [
          { id: 'toan-c4-1', number: 'Bài 15', title: 'Tỉ số lượng giác của góc nhọn' },
          { id: 'toan-c4-2', number: 'Bài 16', title: 'Hệ thức giữa cạnh và góc trong tam giác vuông' },
          { id: 'toan-c4-3', number: 'Bài 17', title: 'Giải tam giác vuông (ứng dụng thực tế)' },
        ],
      },
      {
        id: 'toan-c5',
        title: 'Chương V: Đường tròn',
        lessons: [
          { id: 'toan-c5-1', number: 'Bài 19', title: 'Đường tròn và các vị trí tương đối giữa hai đường tròn' },
          { id: 'toan-c5-2', number: 'Bài 20', title: 'Tiếp tuyến của đường tròn' },
          { id: 'toan-c5-3', number: 'Bài 21', title: 'Góc nội tiếp và góc tạo bởi tia tiếp tuyến, dây cung' },
        ],
      },
      {
        id: 'toan-c6',
        title: 'Chương VI: Hàm số y = ax² và phương trình bậc hai một ẩn',
        lessons: [
          { id: 'toan-c6-1', number: 'Bài 22', title: 'Hàm số y = ax² và đồ thị' },
          { id: 'toan-c6-2', number: 'Bài 23', title: 'Phương trình bậc hai một ẩn và công thức nghiệm' },
          { id: 'toan-c6-3', number: 'Bài 24', title: 'Hệ thức Viète và ứng dụng' },
        ],
      },
      {
        id: 'toan-c7',
        title: 'Chương VII: Tần số và tần số tương đối',
        lessons: [
          { id: 'toan-c7-1', number: 'Bài 27', title: 'Tần số và tần số tương đối' },
          { id: 'toan-c7-2', number: 'Bài 28', title: 'Lựa chọn và biểu diễn dữ liệu bằng biểu đồ' },
        ],
      },
      {
        id: 'toan-c8',
        title: 'Chương VIII: Xác suất của biến cố',
        lessons: [
          { id: 'toan-c8-1', number: 'Bài 29', title: 'Xác suất của biến cố theo quan điểm xác suất thực nghiệm' },
          { id: 'toan-c8-2', number: 'Bài 30', title: 'Mô hình xác suất đơn giản và tính xác suất' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Giải hệ phương trình bậc nhất hai ẩn',
        text: 'Giải hệ phương trình: 3x + 2y = 8 và x - y = 1.',
        type: 'Đại số',
      },
      {
        title: 'Tính giá trị biểu thức chứa căn',
        text: 'Rút gọn và tính giá trị của biểu thức A = √12 + 2√27 - √75 + √48.',
        type: 'Căn thức',
      },
      {
        title: 'Tiếp tuyến của đường tròn',
        text: 'Cho đường tròn (O; R) và điểm A ngoài đường tròn sao cho OA = 2R. Kẻ hai tiếp tuyến AB, AC. Chứng minh tam giác ABC đều và tính độ dài AB theo R.',
        type: 'Hình học',
      },
    ],
  },
  {
    id: 'van',
    name: 'Ngữ văn 9',
    shortName: 'Văn',
    badge: 'Văn',
    color: 'from-rose-600 to-pink-700',
    bgLight: 'bg-rose-50/70',
    borderColor: 'border-rose-200',
    accentText: 'text-rose-700',
    icon: 'BookOpen',
    description:
      'Soạn văn 9 Kết nối tri thức tập 1 & 2: truyện kì ảo, thơ trữ tình, ca dao dân ca, nghị luận xã hội - văn học, kịch, du kí',
    loigiaihayUrl: 'https://loigiaihay.com/soan-van-9-ket-noi-tri-thuc-c1740.html',
    popularLessons: [
      'Soạn bài: Thế giới kì ảo (truyện kì ảo Việt Nam và thế giới)',
      'Soạn bài: Những cung bậc tâm trạng (thơ trữ tình)',
      'Soạn bài: Hồn nước nằm trong tiếng mẹ cha (ca dao, dân ca)',
      'Soạn bài: Khám phá vẻ đẹp văn chương (nghị luận văn học)',
      'Soạn bài: Đối diện với nỗi đau (truyện hiện thực)',
      'Soạn bài: Hành trình uống nước nhớ nguồn (truyện lịch sử)',
      'Soạn bài: Hồn thơ muôn điệu',
      'Soạn bài: Tiếng nói của lương tri (kịch bản)',
    ],
    chapters: [
      {
        id: 'van-c1',
        title: 'Bài 1: Thế giới kì ảo',
        lessons: [
          { id: 'van-c1-1', number: 'Văn bản 1', title: 'Lời giải về truyện kì ảo' },
          { id: 'van-c1-2', number: 'Văn bản 2', title: 'Truyện kì ảo thế giới' },
        ],
      },
      {
        id: 'van-c2',
        title: 'Bài 2: Những cung bậc tâm trạng',
        lessons: [{ id: 'van-c2-1', number: 'Văn bản', title: 'Thơ trữ tình hiện đại' }],
      },
      {
        id: 'van-c3',
        title: 'Bài 3: Hồn nước nằm trong tiếng mẹ cha',
        lessons: [{ id: 'van-c3-1', number: 'Văn bản', title: 'Ca dao, dân ca' }],
      },
      {
        id: 'van-c4',
        title: 'Bài 4: Khám phá vẻ đẹp văn chương',
        lessons: [{ id: 'van-c4-1', number: 'Văn bản', title: 'Văn bản nghị luận văn học' }],
      },
      {
        id: 'van-c5',
        title: 'Bài 5: Đối diện với nỗi đau',
        lessons: [{ id: 'van-c5-1', number: 'Văn bản', title: 'Truyện ngắn hiện thực xã hội' }],
      },
      {
        id: 'van-c6',
        title: 'Bài 6: Hành trình uống nước nhớ nguồn',
        lessons: [{ id: 'van-c6-1', number: 'Văn bản', title: 'Truyện lịch sử, kí' }],
      },
      {
        id: 'van-c7',
        title: 'Bài 7: Hồn thơ muôn điệu',
        lessons: [{ id: 'van-c7-1', number: 'Văn bản', title: 'Thơ cách luật và tự do' }],
      },
      {
        id: 'van-c8',
        title: 'Bài 8: Tiếng nói của lương tri',
        lessons: [{ id: 'van-c8-1', number: 'Văn bản', title: 'Kịch bản văn học' }],
      },
    ],
    sampleQuestions: [
      {
        title: 'Nghị luận xã hội về tuổi trẻ',
        text: 'Viết đoạn văn khoảng 200 chữ trình bày suy nghĩ của em về vai trò của tuổi trẻ trong việc gìn giữ và phát huy bản sắc văn hóa dân tộc.',
        type: 'Nghị luận xã hội',
      },
      {
        title: 'Cảm nhận đoạn thơ',
        text: 'Phân tích tâm trạng và vẻ đẹp của nhân vật trữ tình trong một bài thơ trung đại em đã học lớp 9.',
        type: 'Nghị luận văn học',
      },
    ],
  },
  {
    id: 'anh',
    name: 'Tiếng Anh 9',
    shortName: 'Tiếng Anh',
    badge: 'Anh',
    color: 'from-emerald-600 to-teal-700',
    bgLight: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200',
    accentText: 'text-emerald-700',
    icon: 'Languages',
    description:
      'Tiếng Anh 9 Global Success: 12 unit theo chủ điểm, ngữ pháp & từ vựng trọng tâm, rèn kĩ năng đọc hiểu và viết',
    loigiaihayUrl: 'https://loigiaihay.com/tieng-anh-9-global-success-c1757.html',
    popularLessons: [
      'Unit 1: Local community (Cộng đồng địa phương)',
      'Unit 2: City life (Cuộc sống thành thị)',
      'Unit 3: Healthy living (Lối sống lành mạnh)',
      'Unit 4: Remembering the past (Kí ức quá khứ)',
      'Unit 5: Our experiences (Trải nghiệm của chúng ta)',
      'Unit 6: Vietnamese lifestyle: Then and now',
      'Unit 7: Natural wonders of the world',
      'Unit 8: Tourism',
      'Unit 9: English in the world',
      'Unit 10: Planet Earth',
    ],
    chapters: [
      {
        id: 'anh-c1',
        title: 'Unit 1: Local community',
        lessons: [
          { id: 'anh-c1-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c1-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c2',
        title: 'Unit 2: City life',
        lessons: [
          { id: 'anh-c2-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c2-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c3',
        title: 'Unit 3: Healthy living',
        lessons: [
          { id: 'anh-c3-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c3-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c4',
        title: 'Unit 4: Remembering the past',
        lessons: [
          { id: 'anh-c4-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c4-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c5',
        title: 'Unit 5: Our experiences',
        lessons: [
          { id: 'anh-c5-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' },
          { id: 'anh-c5-2', number: '2', title: 'Communication + Skills 1 & 2 + Looking Back' },
        ],
      },
      {
        id: 'anh-c6',
        title: 'Unit 6: Vietnamese lifestyle: Then and now',
        lessons: [{ id: 'anh-c6-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' }],
      },
      {
        id: 'anh-c7',
        title: 'Unit 7: Natural wonders of the world',
        lessons: [{ id: 'anh-c7-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' }],
      },
      {
        id: 'anh-c8',
        title: 'Unit 8: Tourism',
        lessons: [{ id: 'anh-c8-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' }],
      },
      {
        id: 'anh-c9',
        title: 'Unit 9: English in the world',
        lessons: [{ id: 'anh-c9-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' }],
      },
      {
        id: 'anh-c10',
        title: 'Unit 10: Planet Earth',
        lessons: [{ id: 'anh-c10-1', number: '1', title: 'Getting Started + A Closer Look 1 & 2' }],
      },
    ],
    sampleQuestions: [
      {
        title: 'Viết đoạn văn tiếng Anh',
        text: 'Write a short paragraph (about 100-120 words) about the benefits of living in the city. (Class 9).',
        type: 'Writing',
      },
      {
        title: 'Chia động từ đúng thì',
        text: 'Use the correct form/tenses of the verbs: "When I (arrive) ____ at the station, the train (just/leave) ____."',
        type: 'Grammar',
      },
    ],
  },
  {
    id: 'khtn',
    name: 'Khoa học tự nhiên 9',
    shortName: 'KHTN',
    badge: 'KHTN',
    color: 'from-cyan-600 to-blue-700',
    bgLight: 'bg-cyan-50/70',
    borderColor: 'border-cyan-200',
    accentText: 'text-cyan-700',
    icon: 'FlaskConical',
    description:
      'KHTN 9 (Kết nối tri thức): năng lượng cơ học, ánh sáng, điện - điện từ, kim loại & phi kim, hợp chất hữu cơ, di truyền học, tiến hóa',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-khoa-hoc-tu-nhien-9-ket-noi-tri-thuc-c1744.html',
    popularLessons: [
      'Năng lượng cơ học: động năng, thế năng, cơ năng',
      'Ánh sáng: khúc xạ, phản xạ toàn phần, kính lúp',
      'Điện: định luật Ohm, công suất điện, đoạn mạch',
      'Điện từ: nam châm, lực điện từ, máy biến thế',
      'Kim loại và phi kim: tính chất, dãy hoạt động hóa học',
      'Hợp chất hữu cơ: hydrocarbon và nguồn nhiên liệu',
      'Ethylic alcohol và acetic acid',
      'Di truyền học: gene, đột biến, nhiễm sắc thể',
      'Tiến hóa và sự phát sinh sự sống trên Trái Đất',
    ],
    chapters: [
      {
        id: 'khtn-c1',
        title: 'Chủ đề 1: Năng lượng cơ học',
        lessons: [
          { id: 'khtn-c1-1', number: 'Bài 1', title: 'Động năng - Thế năng' },
          { id: 'khtn-c1-2', number: 'Bài 2', title: 'Cơ năng và sự chuyển hóa năng lượng' },
        ],
      },
      {
        id: 'khtn-c2',
        title: 'Chủ đề 2: Ánh sáng',
        lessons: [
          { id: 'khtn-c2-1', number: 'Bài 5', title: 'Khúc xạ ánh sáng' },
          { id: 'khtn-c2-2', number: 'Bài 6', title: 'Phản xạ toàn phần' },
          { id: 'khtn-c2-3', number: 'Bài 7', title: 'Kính lúp và kính hiển vi' },
        ],
      },
      {
        id: 'khtn-c3',
        title: 'Chủ đề 3: Điện',
        lessons: [
          { id: 'khtn-c3-1', number: 'Bài 8', title: 'Định luật Ohm cho đoạn mạch' },
          { id: 'khtn-c3-2', number: 'Bài 10', title: 'Công suất điện - Điện năng tiêu thụ' },
        ],
      },
      {
        id: 'khtn-c4',
        title: 'Chủ đề 4: Điện từ',
        lessons: [
          { id: 'khtn-c4-1', number: 'Bài 12', title: 'Nam châm và lực từ' },
          { id: 'khtn-c4-2', number: 'Bài 14', title: 'Dòng điện xoay chiều - Máy biến thế' },
        ],
      },
      {
        id: 'khtn-c5',
        title: 'Chủ đề 6: Kim loại. Sự khác nhau giữa kim loại và phi kim',
        lessons: [
          { id: 'khtn-c5-1', number: 'Bài 16', title: 'Tính chất vật lí và hoá học của kim loại' },
          { id: 'khtn-c5-2', number: 'Bài 17', title: 'Dãy hoạt động hoá học của kim loại' },
        ],
      },
      {
        id: 'khtn-c6',
        title: 'Chủ đề 7: Hợp chất hữu cơ - Hydrocarbon và nguồn nhiên liệu',
        lessons: [
          { id: 'khtn-c6-1', number: 'Bài 21', title: 'Giới thiệu về hợp chất hữu cơ' },
          { id: 'khtn-c6-2', number: 'Bài 23', title: 'Alkane - Nguồn nhiên liệu hóa thạch' },
        ],
      },
      {
        id: 'khtn-c7',
        title: 'Chủ đề 8: Ethylic alcohol và acetic acid',
        lessons: [
          { id: 'khtn-c7-1', number: 'Bài 25', title: 'Ethylic alcohol' },
          { id: 'khtn-c7-2', number: 'Bài 26', title: 'Acetic acid' },
        ],
      },
      {
        id: 'khtn-c8',
        title: 'Chủ đề 9: Lipid - Carbohydrate - Protein - Polymer',
        lessons: [{ id: 'khtn-c8-1', number: 'Bài 27', title: 'Glucose và saccharose' }],
      },
      {
        id: 'khtn-c9',
        title: 'Chủ đề 10: Di truyền học',
        lessons: [
          { id: 'khtn-c9-1', number: 'Bài 28', title: 'DNA và gene' },
          { id: 'khtn-c9-2', number: 'Bài 29', title: 'Di truyền nhiễm sắc thể' },
          { id: 'khtn-c9-3', number: 'Bài 30', title: 'Đột biến gene và đột biến nhiễm sắc thể' },
        ],
      },
      {
        id: 'khtn-c10',
        title: 'Chủ đề 12: Tiến hóa',
        lessons: [{ id: 'khtn-c10-1', number: 'Bài 31', title: 'Chọn lọc tự nhiên và cơ chế tiến hóa' }],
      },
    ],
    sampleQuestions: [
      {
        title: 'Công suất điện',
        text: 'Một bóng đèn ghi 220V - 100W. Tính điện trở của đèn và điện năng tiêu thụ trong 2 giờ (đơn vị kWh).',
        type: 'Điện học',
      },
      {
        title: 'Dãy hoạt động hóa học',
        text: 'Cho các kim loại: Na, Cu, Fe, Al. Sắp xếp theo chiều giảm dần mức độ hoạt động hoá học và giải thích.',
        type: 'Hoá học vô cơ',
      },
      {
        title: 'Di truyền học',
        text: 'Trình bày cơ chế nhân đôi DNA theo nguyên tắc bổ sung và bán bảo toàn.',
        type: 'Sinh học',
      },
    ],
  },
  {
    id: 'sudia',
    name: 'Lịch sử và Địa lí 9',
    shortName: 'Sử - Địa',
    badge: 'Sử-Địa',
    color: 'from-amber-600 to-orange-700',
    bgLight: 'bg-amber-50/70',
    borderColor: 'border-amber-200',
    accentText: 'text-amber-800',
    icon: 'Globe2',
    description:
      'Tích hợp Lịch sử & Địa lí 9: thế giới và Việt Nam từ những năm 1918 đến nay; địa lí dân cư, kinh tế và các vùng kinh tế Việt Nam',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-lich-su-va-dia-li-9-ket-noi-tri-thuc-c1827.html',
    popularLessons: [
      'Thế giới sau Chiến tranh thế giới thứ hai',
      'Việt Nam từ 1918 đến 1945: hành trình tìm đường cứu nước',
      'Việt Nam từ 1945 đến 1954: Cách mạng tháng Tám và kháng chiến chống Pháp',
      'Việt Nam từ 1954 đến nay: chống Mĩ, thống nhất đất nước',
      'Địa lí dân cư: dân tộc, quần cư, lao động và việc làm',
      'Địa lí kinh tế: nông nghiệp, công nghiệp, dịch vụ',
      'Sự phân hoá lãnh thổ: các vùng kinh tế trọng điểm',
      'Địa lí địa phương',
    ],
    chapters: [
      {
        id: 'sudia-c1',
        title: 'Phân môn Lịch sử - Chương 1: Thế giới từ năm 1945 đến năm 1991',
        lessons: [
          { id: 'sudia-c1-1', number: 'Bài 1', title: 'Trật tự thế giới sau Chiến tranh thế giới thứ hai' },
          { id: 'sudia-c1-2', number: 'Bài 2', title: 'Châu Âu, Mỹ và quan hệ quốc tế thời Chiến tranh lạnh' },
        ],
      },
      {
        id: 'sudia-c2',
        title: 'Phân môn Lịch sử - Chương 2: Việt Nam từ năm 1918 đến năm 1945',
        lessons: [
          { id: 'sudia-c2-1', number: 'Bài 5', title: 'Hoạt động yêu nước và cách mạng của Nguyễn Ái Quốc' },
          { id: 'sudia-c2-2', number: 'Bài 6', title: 'Đảng Cộng sản Việt Nam ra đời' },
        ],
      },
      {
        id: 'sudia-c3',
        title: 'Phân môn Lịch sử - Chương 3: Việt Nam từ năm 1945 đến năm 1954',
        lessons: [
          { id: 'sudia-c3-1', number: 'Bài 9', title: 'Cách mạng tháng Tám năm 1945' },
          { id: 'sudia-c3-2', number: 'Bài 10', title: 'Kháng chiến chống thực dân Pháp (1945 - 1954)' },
        ],
      },
      {
        id: 'sudia-c4',
        title: 'Phân môn Lịch sử - Chương 4: Việt Nam từ năm 1954 đến nay',
        lessons: [
          { id: 'sudia-c4-1', number: 'Bài 13', title: 'Kháng chiến chống Mĩ, cứu nước (1954 - 1975)' },
          { id: 'sudia-c4-2', number: 'Bài 14', title: 'Việt Nam từ năm 1975 đến nay' },
        ],
      },
      {
        id: 'sudia-d1',
        title: 'Phân môn Địa lí - Chương 1: Địa lí dân cư',
        lessons: [
          { id: 'sudia-d1-1', number: 'Bài 16', title: 'Thành phần dân tộc, phân bố dân cư và quần cư' },
          { id: 'sudia-d1-2', number: 'Bài 17', title: 'Lao động, việc làm và chất lượng cuộc sống' },
        ],
      },
      {
        id: 'sudia-d2',
        title: 'Phân môn Địa lí - Chương 2: Địa lí kinh tế',
        lessons: [
          { id: 'sudia-d2-1', number: 'Bài 18', title: 'Nông nghiệp, lâm nghiệp, thuỷ sản' },
          { id: 'sudia-d2-2', number: 'Bài 19', title: 'Công nghiệp và dịch vụ' },
          { id: 'sudia-d2-3', number: 'Bài 20', title: 'Khai thác tổng hợp kinh tế biển đảo' },
        ],
      },
      {
        id: 'sudia-d3',
        title: 'Phân môn Địa lí - Chương 3: Sự phân hoá lãnh thổ',
        lessons: [
          { id: 'sudia-d3-1', number: 'Bài 21', title: 'Các vùng kinh tế: Trung du và miền núi Bắc Bộ, Đồng bằng sông Hồng' },
          { id: 'sudia-d3-2', number: 'Bài 24', title: 'Đông Nam Bộ và Đồng bằng sông Cửu Long' },
        ],
      },
      {
        id: 'sudia-d4',
        title: 'Phân môn Địa lí - Chương 4: Địa lí địa phương',
        lessons: [{ id: 'sudia-d4-1', number: 'Bài 28', title: 'Tìm hiểu và báo cáo về địa phương nơi em sống' }],
      },
    ],
    sampleQuestions: [
      {
        title: 'Phân tích ý nghĩa Cách mạng tháng Tám',
        text: 'Trình bày diễn biến và phân tích ý nghĩa lịch sử của Cách mạng tháng Tám năm 1945.',
        type: 'Lịch sử',
      },
      {
        title: 'Phân bố dân cư',
        text: 'Trình bày đặc điểm phân bố dân cư và ảnh hưởng của nó đến phát triển kinh tế - xã hội Việt Nam.',
        type: 'Địa lí',
      },
    ],
  },
  {
    id: 'tin',
    name: 'Tin học 9',
    shortName: 'Tin học',
    badge: 'Tin',
    color: 'from-sky-600 to-blue-800',
    bgLight: 'bg-sky-50/70',
    borderColor: 'border-sky-200',
    accentText: 'text-sky-800',
    icon: 'Laptop',
    description:
      'Tin học 9 Kết nối tri thức: máy tính và xã hội tri thức, mạng máy tính, tổ chức lưu trữ thông tin, đạo đức trong môi trường số, ứng dụng tin học',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-tin-hoc-9-ket-noi-tri-thuc-c1821.html',
    popularLessons: [
      'Vai trò của máy tính và xã hội tri thức',
      'Mạng máy tính và Internet: an toàn thông tin',
      'Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
      'Đạo đức, pháp luật và văn hóa trong môi trường số',
      'Ứng dụng tin học: thiết kế trang web, phần mềm bảng tính',
      'Giải quyết vấn đề với sự trợ giúp của máy tính',
      'Hướng nghiệp với tin học',
    ],
    chapters: [
      {
        id: 'tin-c1',
        title: 'Chủ đề 1: Máy tính và xã hội tri thức',
        lessons: [
          { id: 'tin-c1-1', number: 'Bài 1', title: 'Thế giới kĩ thuật số và xã hội tri thức' },
          { id: 'tin-c1-2', number: 'Bài 2', title: 'Vai trò của thông tin trong xã hội tri thức' },
        ],
      },
      {
        id: 'tin-c2',
        title: 'Chủ đề 2: Mạng máy tính và Internet',
        lessons: [
          { id: 'tin-c2-1', number: 'Bài 3', title: 'Mạng máy tính và Internet' },
          { id: 'tin-c2-2', number: 'Bài 4', title: 'An toàn và bảo mật thông tin trên mạng' },
        ],
      },
      {
        id: 'tin-c3',
        title: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
        lessons: [{ id: 'tin-c3-1', number: 'Bài 5', title: 'Sắp xếp và tìm kiếm dữ liệu hiệu quả' }],
      },
      {
        id: 'tin-c4',
        title: 'Chủ đề 4: Đạo đức, pháp luật và văn hóa trong môi trường số',
        lessons: [{ id: 'tin-c4-1', number: 'Bài 6', title: 'Văn hóa giao tiếp và trách nhiệm pháp lí trực tuyến' }],
      },
      {
        id: 'tin-c5',
        title: 'Chủ đề 5: Ứng dụng tin học',
        lessons: [
          { id: 'tin-c5-1', number: 'Bài 7', title: 'Trình bày thông tin bằng bảng tính' },
          { id: 'tin-c5-2', number: 'Bài 8', title: 'Tạo trang web đơn giản' },
        ],
      },
      {
        id: 'tin-c6',
        title: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
        lessons: [{ id: 'tin-c6-1', number: 'Bài 9', title: 'Tư duy thuật toán và các thuật toán tìm kiếm, sắp xếp' }],
      },
    ],
    sampleQuestions: [
      {
        title: 'An toàn thông tin',
        text: 'Trình bày các cách phòng tránh lừa đảo và bảo vệ thông tin cá nhân khi sử dụng mạng xã hội.',
        type: 'Đạo đức - An toàn mạng',
      },
      {
        title: 'Thuật toán tìm kiếm',
        text: 'Trình bày ý tưởng thuật toán tìm kiếm nhị phân và cho ví dụ minh hoạ.',
        type: 'Thuật toán',
      },
    ],
  },
  {
    id: 'congnghe',
    name: 'Công nghệ 9',
    shortName: 'Công nghệ',
    badge: 'Công nghệ',
    color: 'from-stone-600 to-zinc-800',
    bgLight: 'bg-stone-50/70',
    borderColor: 'border-stone-200',
    accentText: 'text-stone-800',
    icon: 'Cpu',
    description:
      'Công nghệ 9 Kết nối tri thức: mô đun Lắp đặt mạng điện trong nhà và mô đun Trồng cây ăn quả (định hướng nghề nghiệp)',
    loigiaihayUrl: 'https://loigiaihay.com/sgk-cong-nghe-9-ket-noi-tri-thuc-c1810.html',
    popularLessons: [
      'Giới thiệu chung về lắp đặt mạng điện trong nhà',
      'Vật liệu và dụng cụ dùng trong lắp đặt mạng điện',
      'Thiết bị đóng cắt và lấy điện',
      'Thiết kế và lắp đặt bảng điện',
      'Thực hành nối dây dẫn điện',
      'Kiểm tra an toàn mạng điện trong nhà',
      'Kĩ thuật trồng và chăm sóc cây ăn quả',
    ],
    chapters: [
      {
        id: 'cn-cd1',
        title: 'Mô đun: Lắp đặt mạng điện trong nhà',
        lessons: [
          { id: 'cn-cd1-1', number: 'Bài 1', title: 'Giới thiệu chung về lắp đặt mạng điện trong nhà' },
          { id: 'cn-cd1-2', number: 'Bài 2', title: 'Vật liệu điện dùng trong lắp đặt mạng điện' },
          { id: 'cn-cd1-3', number: 'Bài 3', title: 'Dụng cụ dùng trong lắp đặt mạng điện' },
          { id: 'cn-cd1-4', number: 'Bài 4', title: 'Thiết bị đóng cắt và lấy điện trong nhà' },
          { id: 'cn-cd1-5', number: 'Bài 5', title: 'Thiết kế mạch điện' },
          { id: 'cn-cd1-6', number: 'Bài 6', title: 'Thực hành lắp bảng điện' },
          { id: 'cn-cd1-7', number: 'Bài 7', title: 'Thực hành nối dây dẫn điện' },
          { id: 'cn-cd1-8', number: 'Bài 8', title: 'Thực hành lắp mạch điện hai công tắc ba cực điều khiển một đèn' },
          { id: 'cn-cd1-9', number: 'Bài 9', title: 'Kiểm tra an toàn mạng điện trong nhà' },
        ],
      },
      {
        id: 'cn-cd2',
        title: 'Mô đun: Trồng cây ăn quả',
        lessons: [
          { id: 'cn-cd2-1', number: 'Bài 10', title: 'Giới thiệu chung về trồng cây ăn quả' },
          { id: 'cn-cd2-2', number: 'Bài 11', title: 'Kĩ thuật nhân giống cây ăn quả' },
          { id: 'cn-cd2-3', number: 'Bài 12', title: 'Trồng và chăm sóc cây ăn quả' },
        ],
      },
    ],
    sampleQuestions: [
      {
        title: 'Mạch điện hai công tắc ba cực',
        text: 'Vẽ sơ đồ nguyên lí và sơ đồ lắp đặt mạch điện dùng hai công tắc ba cực điều khiển một đèn? Nêu quy trình lắp đặt.',
        type: 'Lắp đặt mạng điện',
      },
      {
        title: 'Thiết bị bảo vệ',
        text: 'Nêu tác dụng và cách lựa chọn cầu dao, aptomat, cầu chì trong mạng điện gia đình.',
        type: 'Lắp đặt mạng điện',
      },
    ],
  },
];