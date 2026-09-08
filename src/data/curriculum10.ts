import { SubjectId, CurriculumChapter } from '../types';

const LOIGIAIHAY_BASE = 'https://loigiaihay.com';

export const SUBJECT_CURRICULUM_10: Record<SubjectId, CurriculumChapter[]> = {
  toan: [
    {
      id: 'toan-ch0',
      title: 'Chương 1: Mệnh đề và tập hợp',
      lessons: [
        { id: 'toan-ch0-l0', title: 'Bài 1: Mệnh đề', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch0-l1', title: 'Bài 2: Tập hợp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch0-l2', title: 'Bài 3: Nhập môn chứng minh toán học', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch0-l3', title: 'Bài 4: Phép toán tập hợp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
      ],
    },
    {
      id: 'toan-ch1',
      title: 'Chương 2: Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
      lessons: [
        { id: 'toan-ch1-l0', title: 'Bài 5: Bất phương trình bậc nhất một ẩn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch1-l1', title: 'Bài 6: Bất phương trình bậc nhất hai ẩn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch1-l2', title: 'Bài 7: Hệ bất phương trình bậc nhất hai ẩn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch1-l3', title: 'Bài 8: Phương trình và hệ phương trình bậc nhất hai ẩn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
      ],
    },
    {
      id: 'toan-ch2',
      title: 'Chương 3: Hàm số bậc hai',
      lessons: [
        { id: 'toan-ch2-l0', title: 'Bài 9: Hàm số bậc hai và đồ thị', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch2-l1', title: 'Bài 10: Bất phương trình bậc hai', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch2-l2', title: 'Bài 11: Phương trình và hệ phương trình bậc hai', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
      ],
    },
    {
      id: 'toan-ch3',
      title: 'Chương 4: Hệ thức lượng trong tam giác',
      lessons: [
        { id: 'toan-ch3-l0', title: 'Bài 12: Định lí Sin', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch3-l1', title: 'Bài 13: Định lí Cos', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch3-l2', title: 'Bài 14: Công thức lượng giác cho nửa góc', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch3-l3', title: 'Bài 15: Diện tích tam giác', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
      ],
    },
    {
      id: 'toan-ch4',
      title: 'Chương 5: Thống kê',
      lessons: [
        { id: 'toan-ch4-l0', title: 'Bài 16: Các phép toán với mẫu số liệu', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch4-l1', title: 'Bài 17: Phân vị và khoảng cách tứ phân vị', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch4-l2', title: 'Bài 18: Đo độ phân tán', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
      ],
    },
    {
      id: 'toan-ch5',
      title: 'Chương 6: Vectơ',
      lessons: [
        { id: 'toan-ch5-l0', title: 'Bài 19: Định nghĩa và phép cộng vectơ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch5-l1', title: 'Bài 20: Phép nhân một số với vectơ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch5-l2', title: 'Bài 21: Tích vô hướng của hai vectơ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
      ],
    },
    {
      id: 'toan-ch6',
      title: 'Chương 7: Đại số giác',
      lessons: [
        { id: 'toan-ch6-l0', title: 'Bài 22: Góc lượng giác', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch6-l1', title: 'Bài 23: Giá trị lượng giác', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch6-l2', title: 'Bài 24: Công thức lượng giác', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
      ],
    },
    {
      id: 'toan-ch7',
      title: 'Chương 8: Tọa độ trong mặt phẳng',
      lessons: [
        { id: 'toan-ch7-l0', title: 'Bài 25: Tọa độ hóa trên mặt phẳng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
        { id: 'toan-ch7-l1', title: 'Bài 26: Phương trình đường thẳng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-10-ket-noi-tri-thuc-c811.html` },
      ],
    },
  ],

  van: [
    {
      id: 'van-ch0',
      title: 'Bài 1: Đọc hiểu văn bản dân gian',
      lessons: [
        { id: 'van-ch0-l0', title: '1.1 Thạch Sanh', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
        { id: 'van-ch0-l1', title: '1.2 Cây tre trăm đốt', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
        { id: 'van-ch0-l2', title: '1.3 Sự tích hòn đảo', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
      ],
    },
    {
      id: 'van-ch1',
      title: 'Bài 2: Đọc hiểu văn bản yêu nước',
      lessons: [
        { id: 'van-ch1-l0', title: '2.1 Bình Ngô đại cáo', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
        { id: 'van-ch1-l1', title: '2.2 Hịch tướng sĩ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
      ],
    },
    {
      id: 'van-ch2',
      title: 'Bài 3: Đọc hiểu văn bản lý luận',
      lessons: [
        { id: 'van-ch2-l0', title: '3.1 Bàn luận về sĩ phu', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
        { id: 'van-ch2-l1', title: '3.2 Truyện Kiều trích', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
      ],
    },
    {
      id: 'van-ch3',
      title: 'Bài 4: Đọc hiểu văn bản thơ trung đại',
      lessons: [
        { id: 'van-ch3-l0', title: '4.1 Chinh phụ ngâm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
        { id: 'van-ch3-l1', title: '4.2 Ca trù', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
      ],
    },
    {
      id: 'van-ch4',
      title: 'Bài 5: Đọc hiểu văn bản thơ hiện đại',
      lessons: [
        { id: 'van-ch4-l0', title: '5.1 Vội vàng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
        { id: 'van-ch4-l1', title: '5.2 Mùa xuân nho nhỏ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
      ],
    },
    {
      id: 'van-ch5',
      title: 'Bài 6: Đọc hiểu văn bản tự sự',
      lessons: [
        { id: 'van-ch5-l0', title: '6.1 Chiếc thuyền ngoài xa', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
      ],
    },
    {
      id: 'van-ch6',
      title: 'Bài 7: Viết đoạn văn nghị luận xã hội',
      lessons: [
        { id: 'van-ch6-l0', title: '7.1 Nghị luận xã hội', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
      ],
    },
    {
      id: 'van-ch7',
      title: 'Bài 8: Viết bài văn nghị luận văn học',
      lessons: [
        { id: 'van-ch7-l0', title: '8.1 Nghị luận văn học', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
      ],
    },
    {
      id: 'van-ch8',
      title: 'Bài 9: Tổng ôn',
      lessons: [
        { id: 'van-ch8-l0', title: '9.1 Tổng ôn Ngữ văn 10', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-10-ket-noi-tri-thuc-chi-tiet-c851.html` },
      ],
    },
  ],

  anh: [
    {
      id: 'anh-ch0',
      title: 'Unit 1: A new start',
      lessons: [
        { id: 'anh-ch0-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch0-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch0-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch0-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch0-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch0-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch0-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch1',
      title: 'Unit 2: School life',
      lessons: [
        { id: 'anh-ch1-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch1-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch1-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch1-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch1-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch1-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch1-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch2',
      title: 'Unit 3: Friends and neighbours',
      lessons: [
        { id: 'anh-ch2-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch2-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch2-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch2-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch2-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch2-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch2-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch3',
      title: 'Unit 4: Styles of life',
      lessons: [
        { id: 'anh-ch3-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch3-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch3-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch3-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch3-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch3-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch3-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch4',
      title: 'Unit 5: Technology and I',
      lessons: [
        { id: 'anh-ch4-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch4-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch4-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch4-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch4-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch4-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch4-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch5',
      title: 'Unit 6: Bodies in motion',
      lessons: [
        { id: 'anh-ch5-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch5-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch5-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch5-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch5-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch5-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch5-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch6',
      title: 'Unit 7: The mass media',
      lessons: [
        { id: 'anh-ch6-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch6-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch6-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch6-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch6-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch6-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch6-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch7',
      title: 'Unit 8: New ways to learn',
      lessons: [
        { id: 'anh-ch7-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch7-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch7-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch7-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch7-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch7-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch7-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch8',
      title: 'Unit 9: Natural wonders of the world',
      lessons: [
        { id: 'anh-ch8-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch8-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch8-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch8-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch8-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch8-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch8-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch9',
      title: 'Unit 10: Conservation',
      lessons: [
        { id: 'anh-ch9-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch9-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch9-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch9-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch9-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch9-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
        { id: 'anh-ch9-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch10',
      title: 'Review 1',
      lessons: [
        { id: 'anh-ch10-l0', title: 'Review Units 1-6', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
    {
      id: 'anh-ch11',
      title: 'Review 2',
      lessons: [
        { id: 'anh-ch11-l0', title: 'Review Units 7-10', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-10-global-success-c818.html` },
      ],
    },
  ],

  ly: [
    {
      id: 'ly-ch0',
      title: 'Chương 1: Động học',
      lessons: [
        { id: 'ly-ch0-l0', title: 'Bài 1: Chuyển động thẳng biến đổi đều', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch0-l1', title: 'Bài 2: Chuyển động tròn đều', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch0-l2', title: 'Bài 3: Nguyên lý tương đối', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
      ],
    },
    {
      id: 'ly-ch1',
      title: 'Chương 2: Động lực học',
      lessons: [
        { id: 'ly-ch1-l0', title: 'Bài 4: Lực và định luật II Newton', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch1-l1', title: 'Bài 5: Định luật III Newton', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch1-l2', title: 'Bài 6: Lực ma sát', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch1-l3', title: 'Bài 7: Lực cản của môi trường', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch1-l4', title: 'Bài 8: Cân bằng của vật', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
      ],
    },
    {
      id: 'ly-ch2',
      title: 'Chương 3: Công - Năng lượng - Động lượng',
      lessons: [
        { id: 'ly-ch2-l0', title: 'Bài 9: Công và công suất', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch2-l1', title: 'Bài 10: Năng lượng cơ học', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch2-l2', title: 'Bài 11: Động lượng và định luật bảo toàn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
      ],
    },
    {
      id: 'ly-ch3',
      title: 'Chương 4: Điện học',
      lessons: [
        { id: 'ly-ch3-l0', title: 'Bài 12: Điện tích', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch3-l1', title: 'Bài 13: Lực điện', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch3-l2', title: 'Bài 14: Dòng điện', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch3-l3', title: 'Bài 15: Điện trở', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
      ],
    },
    {
      id: 'ly-ch4',
      title: 'Chương 5: Từ học',
      lessons: [
        { id: 'ly-ch4-l0', title: 'Bài 16: Từ trường', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch4-l1', title: 'Bài 17: Từ cảm ứng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch4-l2', title: 'Bài 18: Cảm ứng điện từ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
      ],
    },
    {
      id: 'ly-ch5',
      title: 'Chương 6: Mạch điện xoay chiều',
      lessons: [
        { id: 'ly-ch5-l0', title: 'Bài 19: Dòng điện xoay chiều', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch5-l1', title: 'Bài 20: Mạch RLC', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
        { id: 'ly-ch5-l2', title: 'Bài 21: Biến áp và truyền tải điện', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
      ],
    },
    {
      id: 'ly-ch6',
      title: 'Chương 7: Nhiệt động học',
      lessons: [
        { id: 'ly-ch6-l0', title: 'Bài 22: Nhiệt động lực học', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-10-ket-noi-tri-thuc-c804.html` },
      ],
    },
  ],

  hoa: [
    {
      id: 'hoa-ch0',
      title: 'Chương 1: Cấu tạo nguyên tử',
      lessons: [
        { id: 'hoa-ch0-l0', title: 'Bài 1: Cấu tạo nguyên tử', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch0-l1', title: 'Bài 2: Bảng tuần hoàn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch0-l2', title: 'Bài 3: Liên kết hóa học', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
      ],
    },
    {
      id: 'hoa-ch1',
      title: 'Chương 2: Oxi hóa - khử',
      lessons: [
        { id: 'hoa-ch1-l0', title: 'Bài 4: Oxi hóa - khử', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch1-l1', title: 'Bài 5: Điện cực và hiệu điện thế', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch1-l2', title: 'Bài 6: Pin và ắc quy', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
      ],
    },
    {
      id: 'hoa-ch2',
      title: 'Chương 3: Hóa học trong dung dịch',
      lessons: [
        { id: 'hoa-ch2-l0', title: 'Bài 7: Hòa tan và độ hòa tan', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch2-l1', title: 'Bài 8: Độ pH và dung dịch axit - bazơ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch2-l2', title: 'Bài 9: Phản ứng trung hòa', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
      ],
    },
    {
      id: 'hoa-ch3',
      title: 'Chương 4: Hiđrocacbon',
      lessons: [
        { id: 'hoa-ch3-l0', title: 'Bài 10: Alkan', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch3-l1', title: 'Bài 11: Alken và Ankin', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch3-l2', title: 'Bài 12: Hiđrocacbon thơm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
      ],
    },
    {
      id: 'hoa-ch4',
      title: 'Chương 5: Derivat của hiđrocacbon',
      lessons: [
        { id: 'hoa-ch4-l0', title: 'Bài 13: Ancol', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch4-l1', title: 'Bài 14: Andehit và Xeton', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch4-l2', title: 'Bài 15: Axit cacboxylic', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch4-l3', title: 'Bài 16: Ester', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
      ],
    },
    {
      id: 'hoa-ch5',
      title: 'Chương 6: Polymer',
      lessons: [
        { id: 'hoa-ch5-l0', title: 'Bài 17: Polymer và polymer hóa', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch5-l1', title: 'Bài 18: Cao su tổng hợp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
      ],
    },
    {
      id: 'hoa-ch6',
      title: 'Chương 7: Hóa học và đời sống',
      lessons: [
        { id: 'hoa-ch6-l0', title: 'Bài 19: Chất tẩy rửa', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch6-l1', title: 'Bài 20: Thuốc và thực phẩm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
        { id: 'hoa-ch6-l2', title: 'Bài 21: Hóa học và môi trường', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-10-ket-noi-tri-thuc-c828.html` },
      ],
    },
  ],

  sinh: [
    {
      id: 'sinh-ch0',
      title: 'Phần 1: Tế bào',
      lessons: [
        { id: 'sinh-ch0-l0', title: 'Bài 1: Tế bào thực vật', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch0-l1', title: 'Bài 2: Tế bào động vật', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch0-l2', title: 'Bài 3: ATP', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch0-l3', title: 'Bài 4: Trao đổi chất', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch0-l4', title: 'Bài 5: Nhân đôi ADN', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
      ],
    },
    {
      id: 'sinh-ch1',
      title: 'Phần 2: Di truyền cơ thể',
      lessons: [
        { id: 'sinh-ch1-l0', title: 'Bài 6: Quan hệ gen - NST', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch1-l1', title: 'Bài 7: Giới tính', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch1-l2', title: 'Bài 8: Biến dị NST', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
      ],
    },
    {
      id: 'sinh-ch2',
      title: 'Phần 3: Di truyền phân tử',
      lessons: [
        { id: 'sinh-ch2-l0', title: 'Bài 9: Mã di truyền', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch2-l1', title: 'Bài 10: Thiết kế thực nghiệm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch2-l2', title: 'Bài 11: Di truyền NST', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
      ],
    },
    {
      id: 'sinh-ch3',
      title: 'Phần 4: Di truyền và biến dị',
      lessons: [
        { id: 'sinh-ch3-l0', title: 'Bài 12: Quy luật phân li', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch3-l1', title: 'Bài 13: Phân li độc lập', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch3-l2', title: 'Bài 14: Tương tác gen', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch3-l3', title: 'Bài 15: Liên kết gen', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch3-l4', title: 'Bài 16: Đột biến gen', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
      ],
    },
    {
      id: 'sinh-ch4',
      title: 'Phần 5: Sinh thái',
      lessons: [
        { id: 'sinh-ch4-l0', title: 'Bài 17: Gen và quần thể', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch4-l1', title: 'Bài 18: Quần xã', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch4-l2', title: 'Bài 19: Hệ sinh thái', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
        { id: 'sinh-ch4-l3', title: 'Bài 20: Sinh quyển', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-10-ket-noi-tri-thuc-c854.html` },
      ],
    },
  ],

  su: [
    {
      id: 'su-ch0',
      title: 'Chủ đề 1: Văn minh lớn trên thế giới',
      lessons: [
        { id: 'su-ch0-l0', title: 'Bài 1: Văn minh Lưỡng Hà', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
        { id: 'su-ch0-l1', title: 'Bài 2: Văn minh Ai Cập', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
      ],
    },
    {
      id: 'su-ch1',
      title: 'Chủ đề 2: Phương Đông thời phong kiến',
      lessons: [
        { id: 'su-ch1-l0', title: 'Bài 3: Văn minh Ấn Độ và Trung Quốc', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
      ],
    },
    {
      id: 'su-ch2',
      title: 'Chủ đề 3: Phương Tây XVI-XVIII',
      lessons: [
        { id: 'su-ch2-l0', title: 'Bài 4: Các nước tư bản lớn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
        { id: 'su-ch2-l1', title: 'Bài 5: Thời kỳ Phục hưng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
      ],
    },
    {
      id: 'su-ch3',
      title: 'Chủ đề 4: Cách mạng tư sản',
      lessons: [
        { id: 'su-ch3-l0', title: 'Bài 6: Cách mạng Pháp 1789', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
        { id: 'su-ch3-l1', title: 'Bài 7: Các cuộc cách mạng tư sản', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
      ],
    },
    {
      id: 'su-ch4',
      title: 'Chủ đề 5: Văn minh Đông Nam Á',
      lessons: [
        { id: 'su-ch4-l0', title: 'Bài 8: Hành trình phát triển và thành tựu của văn minh Đông Nam Á', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
      ],
    },
    {
      id: 'su-ch5',
      title: 'Chủ đề 6: Cách mạng công nghiệp',
      lessons: [
        { id: 'su-ch5-l0', title: 'Bài 9: Cách mạng công nghiệp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
        { id: 'su-ch5-l1', title: 'Bài 10: Các cuộc cách mạng CN', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
      ],
    },
    {
      id: 'su-ch6',
      title: 'Chủ đề 7',
      lessons: [
        { id: 'su-ch6-l0', title: 'Bài 11: Cách mạng tháng Mười Nga', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
        { id: 'su-ch6-l1', title: 'Bài 12: Đấu tranh giải phóng dân tộc', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
        { id: 'su-ch6-l2', title: 'Bài 13: Chiến tranh thế giới thứ hai', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-10-ket-noi-tri-thuc-voi-cuoc-song-c824.html` },
      ],
    },
  ],

  dia: [
    {
      id: 'dia-ch0',
      title: 'Chương 1: Phân tích môi trường',
      lessons: [
        { id: 'dia-ch0-l0', title: 'Bài 1: Tìm hiểu thực trạng môi trường', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch0-l1', title: 'Bài 2: Vị trí địa lí', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch0-l2', title: 'Bài 3: Phạm vi lãnh thổ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
      ],
    },
    {
      id: 'dia-ch1',
      title: 'Chương 2: Thiên nhiên',
      lessons: [
        { id: 'dia-ch1-l0', title: 'Bài 4: Đặc điểm khí hậu', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch1-l1', title: 'Bài 5: Thủy văn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch1-l2', title: 'Bài 6: Thiên nhiên đất', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
      ],
    },
    {
      id: 'dia-ch2',
      title: 'Chương 3: Dân cư',
      lessons: [
        { id: 'dia-ch2-l0', title: 'Bài 7: Quy mô dân số', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch2-l1', title: 'Bài 8: Cơ cấu dân số', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch2-l2', title: 'Bài 9: Phân bố dân cư', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
      ],
    },
    {
      id: 'dia-ch3',
      title: 'Chương 4: Nông nghiệp',
      lessons: [
        { id: 'dia-ch3-l0', title: 'Bài 10: Nông nghiệp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch3-l1', title: 'Bài 11: Lâm nghiệp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
      ],
    },
    {
      id: 'dia-ch4',
      title: 'Chương 5: Công nghiệp và dịch vụ',
      lessons: [
        { id: 'dia-ch4-l0', title: 'Bài 12: Công nghiệp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch4-l1', title: 'Bài 13: Dịch vụ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
      ],
    },
    {
      id: 'dia-ch5',
      title: 'Chương 6: Vùng lãnh thổ',
      lessons: [
        { id: 'dia-ch5-l0', title: 'Bài 14: Đồng bằng sông Hồng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch5-l1', title: 'Bài 15: Đồng bằng sông Cửu Long', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch5-l2', title: 'Bài 16: Trung du miền núi Bắc Bộ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch5-l3', title: 'Bài 17: Bắc Trung Bộ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch5-l4', title: 'Bài 18: Nam Trung Bộ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch5-l5', title: 'Bài 19: Tây Nguyên', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
        { id: 'dia-ch5-l6', title: 'Bài 20: Đông Nam Bộ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
      ],
    },
    {
      id: 'dia-ch6',
      title: 'Chương 7: Thực hành',
      lessons: [
        { id: 'dia-ch6-l0', title: 'Bài 21: Thực hành phân tích môi trường', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-10-ket-noi-tri-thuc-c810.html` },
      ],
    },
  ],

  gdktpl: [
    {
      id: 'gdktpl-ch0',
      title: 'Chủ đề 1: Hoạt động kinh tế',
      lessons: [
        { id: 'gdktpl-ch0-l0', title: 'Bài 1: Hành vi kinh tế', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
        { id: 'gdktpl-ch0-l1', title: 'Bài 2: Sản xuất', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
        { id: 'gdktpl-ch0-l2', title: 'Bài 3: Thị trường', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
      ],
    },
    {
      id: 'gdktpl-ch1',
      title: 'Chủ đề 2: Kinh tế thị trường',
      lessons: [
        { id: 'gdktpl-ch1-l0', title: 'Bài 4: Kinh tế thị trường', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
        { id: 'gdktpl-ch1-l1', title: 'Bài 5: Cung - cầu', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
      ],
    },
    {
      id: 'gdktpl-ch2',
      title: 'Chủ đề 3: Nhà nước pháp quyền',
      lessons: [
        { id: 'gdktpl-ch2-l0', title: 'Bài 6: Nhà nước pháp quyền', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
        { id: 'gdktpl-ch2-l1', title: 'Bài 7: Pháp luật', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
      ],
    },
    {
      id: 'gdktpl-ch3',
      title: 'Chủ đề 4: Quyền con người',
      lessons: [
        { id: 'gdktpl-ch3-l0', title: 'Bài 8: Quyền con người', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
      ],
    },
    {
      id: 'gdktpl-ch4',
      title: 'Chủ đề 5: Quyền công dân',
      lessons: [
        { id: 'gdktpl-ch4-l0', title: 'Bài 9: Quyền công dân', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
      ],
    },
    {
      id: 'gdktpl-ch5',
      title: 'Chủ đề 6: Nghĩa vụ công dân',
      lessons: [
        { id: 'gdktpl-ch5-l0', title: 'Bài 10: Nghĩa vụ công dân', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
      ],
    },
    {
      id: 'gdktpl-ch6',
      title: 'Chủ đề 7: Đời sống kinh tế',
      lessons: [
        { id: 'gdktpl-ch6-l0', title: 'Bài 11: Thuế', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
        { id: 'gdktpl-ch6-l1', title: 'Bài 12: Bảo hiểm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
        { id: 'gdktpl-ch6-l2', title: 'Bài 13: Gia đình', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
      ],
    },
    {
      id: 'gdktpl-ch7',
      title: 'Chủ đề 8: Xã hội',
      lessons: [
        { id: 'gdktpl-ch7-l0', title: 'Bài 14: Khiếu nại - Tố cáo', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
        { id: 'gdktpl-ch7-l1', title: 'Bài 15: Giải quyết tranh chấp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
      ],
    },
    {
      id: 'gdktpl-ch8',
      title: 'Chủ đề 9: Tổng ôn',
      lessons: [
        { id: 'gdktpl-ch8-l0', title: 'Bài 16: Tổng ôn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-10-ket-noi-tri-thuc-c921.html` },
      ],
    },
  ],

  tin: [
    {
      id: 'tin-ch0',
      title: 'Chủ đề 1: Quy tắc thao tác với máy tính',
      lessons: [
        { id: 'tin-ch0-l0', title: 'Bài 1: Quy tắc thao tác', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
        { id: 'tin-ch0-l1', title: 'Bài 2: An toàn và bảo mật', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
      ],
    },
    {
      id: 'tin-ch1',
      title: 'Chủ đề 2: Thuật toán và sơ đồ luồng',
      lessons: [
        { id: 'tin-ch1-l0', title: 'Bài 3: Thuật toán', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
        { id: 'tin-ch1-l1', title: 'Bài 4: Sơ đồ luồng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
      ],
    },
    {
      id: 'tin-ch2',
      title: 'Chủ đề 3: Lập trình Scratch',
      lessons: [
        { id: 'tin-ch2-l0', title: 'Bài 5: Giới thiệu Scratch', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
        { id: 'tin-ch2-l1', title: 'Bài 6: Lập trình Scratch', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
        { id: 'tin-ch2-l2', title: 'Bài 7: Thực hành Scratch', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
      ],
    },
    {
      id: 'tin-ch3',
      title: 'Chủ đề 4: Python cơ bản',
      lessons: [
        { id: 'tin-ch3-l0', title: 'Bài 8: Python cơ bản', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
        { id: 'tin-ch3-l1', title: 'Bài 9: Biến và kiểu dữ liệu', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
        { id: 'tin-ch3-l2', title: 'Bài 10: Cấu trúc điều khiển', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
        { id: 'tin-ch3-l3', title: 'Bài 11: Vòng lặp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
        { id: 'tin-ch3-l4', title: 'Bài 12: Hàm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
      ],
    },
    {
      id: 'tin-ch4',
      title: 'Chủ đề 5: Xử lý số liệu',
      lessons: [
        { id: 'tin-ch4-l0', title: 'Bài 13: Bảng tính', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
        { id: 'tin-ch4-l1', title: 'Bài 14: Xử lý số liệu', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-10-ket-noi-tri-thuc-c897.html` },
      ],
    },
  ],

  congnghe: [
    {
      id: 'congnghe-ch0',
      title: 'Chương 1: Thiết kế sản phẩm',
      lessons: [
        { id: 'congnghe-ch0-l0', title: 'Bài 1: Thiết kế sản phẩm trên máy tính', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
        { id: 'congnghe-ch0-l1', title: 'Bài 2: Thực phẩm và dinh dưỡng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
        { id: 'congnghe-ch0-l2', title: 'Bài 3: Chế biến thực phẩm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
      ],
    },
    {
      id: 'congnghe-ch1',
      title: 'Chương 2: Vật liệu',
      lessons: [
        { id: 'congnghe-ch1-l0', title: 'Bài 4: Vật liệu kim loại', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
        { id: 'congnghe-ch1-l1', title: 'Bài 5: Vật liệu không kim loại', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
        { id: 'congnghe-ch1-l2', title: 'Bài 6: Vật liệu composite', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
      ],
    },
    {
      id: 'congnghe-ch2',
      title: 'Chương 3: Điện tử và tự động hóa',
      lessons: [
        { id: 'congnghe-ch2-l0', title: 'Bài 7: Điện tử cơ bản', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
        { id: 'congnghe-ch2-l1', title: 'Bài 8: Mạch điện', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
        { id: 'congnghe-ch2-l2', title: 'Bài 9: Vi điều khiển', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
        { id: 'congnghe-ch2-l3', title: 'Bài 10: Tự động hóa', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-10-ket-noi-tri-thuc-c899.html` },
      ],
    },
  ],
};
