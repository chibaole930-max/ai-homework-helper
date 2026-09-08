import { SubjectId, CurriculumChapter } from '../types';

const LOIGIAIHAY_BASE = 'https://loigiaihay.com';

export const SUBJECT_CURRICULUM_11: Record<SubjectId, CurriculumChapter[]> = {
  toan: [
    {
      id: 'toan-ch0',
      title: 'Chương 1: Các cung lượng giác, góc lượng giác',
      lessons: [
        { id: 'toan-ch0-l0', title: 'Bài 1: Giá trị lượng giác của góc lượng giác', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch0-l1', title: 'Bài 2: Cung lượng giác', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
      ],
    },
    {
      id: 'toan-ch1',
      title: 'Chương 2: Công thức lượng giác và phương trình lượng giác',
      lessons: [
        { id: 'toan-ch1-l0', title: 'Bài 3: Công thức lượng giác', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch1-l1', title: 'Bài 4: Phương trình lượng giác cơ bản', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch1-l2', title: 'Bài 5: Ứng dụng của phương trình lượng giác', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
      ],
    },
    {
      id: 'toan-ch2',
      title: 'Chương 3: Hàm số lượng giác',
      lessons: [
        { id: 'toan-ch2-l0', title: 'Bài 6: Hàm số lượng giác y = sin x', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch2-l1', title: 'Bài 7: Hàm số lượng giác y = cos x', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch2-l2', title: 'Bài 8: Hàm số lượng giác y = tan x, cot x', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
      ],
    },
    {
      id: 'toan-ch3',
      title: 'Chương 4: Dãy số, cấp số cộng và cấp số nhân',
      lessons: [
        { id: 'toan-ch3-l0', title: 'Bài 9: Dãy số', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch3-l1', title: 'Bài 10: Cấp số cộng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch3-l2', title: 'Bài 11: Cấp số nhân', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
      ],
    },
    {
      id: 'toan-ch4',
      title: 'Chương 5: Giới hạn, liên tục',
      lessons: [
        { id: 'toan-ch4-l0', title: 'Bài 12: Giới hạn dãy số', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch4-l1', title: 'Bài 13: Giới hạn hàm số', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch4-l2', title: 'Bài 14: Hàm số liên tục', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
      ],
    },
    {
      id: 'toan-ch5',
      title: 'Chương 6: Đơn điệu và cực trị của hàm số',
      lessons: [
        { id: 'toan-ch5-l0', title: 'Bài 15: Tính đơn điệu của hàm số', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch5-l1', title: 'Bài 16: Cực trị của hàm số', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch5-l2', title: 'Bài 17: Giá trị lớn nhất - nhỏ nhất', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
      ],
    },
    {
      id: 'toan-ch6',
      title: 'Chương 7: Đại số tổ hợp',
      lessons: [
        { id: 'toan-ch6-l0', title: 'Bài 18: Quy tắc đếm và hoán vị', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch6-l1', title: 'Bài 19: Chỉnh hợp và tổ hợp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch6-l2', title: 'Bài 20: Xác suất', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
      ],
    },
    {
      id: 'toan-ch7',
      title: 'Chương 8: Đường thẳng và mặt phẳng',
      lessons: [
        { id: 'toan-ch7-l0', title: 'Bài 21: Vectơ trong không gian', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch7-l1', title: 'Bài 22: Đường thẳng trong không gian', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch7-l2', title: 'Bài 23: Mặt phẳng trong không gian', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
      ],
    },
    {
      id: 'toan-ch8',
      title: 'Chương 9: Quan hệ vuông góc',
      lessons: [
        { id: 'toan-ch8-l0', title: 'Bài 24: Đường thẳng vuông góc với mặt phẳng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch8-l1', title: 'Bài 25: Mặt phẳng vuông góc', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
        { id: 'toan-ch8-l2', title: 'Bài 26: Góc giữa các đường thẳng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-toan-11-ket-noi-tri-thuc-c1370.html` },
      ],
    },
  ],
  van: [
    {
      id: 'van-ch0',
      title: 'Bài 1: Đọc hiểu văn bản truyện ngắn hiện đại',
      lessons: [
        { id: 'van-ch0-l0', title: 'Hai đứa trẻ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
        { id: 'van-ch0-l1', title: 'Chí Phèo', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
        { id: 'van-ch0-l2', title: 'Vợ chồng A Phủ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
      ],
    },
    {
      id: 'van-ch1',
      title: 'Bài 2: Đọc hiểu văn bản thơ hiện đại',
      lessons: [
        { id: 'van-ch1-l0', title: 'Tràng Giang', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
        { id: 'van-ch1-l1', title: 'Đây thôn Vĩ Dạ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
        { id: 'van-ch1-l2', title: 'Vội vàng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
      ],
    },
    {
      id: 'van-ch2',
      title: 'Bài 3: Đọc hiểu văn bản kịch',
      lessons: [
        { id: 'van-ch2-l0', title: 'Rối nước', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
        { id: 'van-ch2-l1', title: 'Vở kịch', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
      ],
    },
    {
      id: 'van-ch3',
      title: 'Bài 4: Đọc hiểu văn bản nghị luận',
      lessons: [
        { id: 'van-ch3-l0', title: 'Bàn luận về văn chương', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
        { id: 'van-ch3-l1', title: 'Thơ văn thế kỉ XIX-XX', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
      ],
    },
    {
      id: 'van-ch4',
      title: 'Bài 5: Đọc hiểu văn bản tiểu thuyết',
      lessons: [
        { id: 'van-ch4-l0', title: 'Số đỏ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
        { id: 'van-ch4-l1', title: 'Tắt đèn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
      ],
    },
    {
      id: 'van-ch5',
      title: 'Bài 6: Viết bài văn nghị luận văn học',
      lessons: [
        { id: 'van-ch5-l0', title: 'Phân tích tác phẩm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
      ],
    },
    {
      id: 'van-ch6',
      title: 'Bài 7: Viết bài văn nghị luận xã hội',
      lessons: [
        { id: 'van-ch6-l0', title: 'Nghị luận xã hội', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
      ],
    },
    {
      id: 'van-ch7',
      title: 'Bài 8: Thực hành tiếng Việt',
      lessons: [
        { id: 'van-ch7-l0', title: 'Thực hành tiếng Việt', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
      ],
    },
    {
      id: 'van-ch8',
      title: 'Bài 9: Tổng ôn lớp 11',
      lessons: [
        { id: 'van-ch8-l0', title: 'Tổng ôn Ngữ văn 11', loigiaihayUrl: `${LOIGIAIHAY_BASE}/soan-van-11-ket-noi-tri-thuc-chi-tiet-c1360.html` },
      ],
    },
  ],
  anh: [
    {
      id: 'anh-ch0',
      title: 'Unit 1: Adolescent choices',
      lessons: [
        { id: 'anh-ch0-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch0-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch0-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch0-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch0-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch0-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch0-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch1',
      title: 'Unit 2: Human beings and the natural world',
      lessons: [
        { id: 'anh-ch1-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch1-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch1-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch1-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch1-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch1-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch1-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch2',
      title: 'Unit 3: Keys to healthy lifestyle',
      lessons: [
        { id: 'anh-ch2-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch2-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch2-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch2-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch2-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch2-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch2-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch3',
      title: 'Unit 4: Pathways to global citizenship',
      lessons: [
        { id: 'anh-ch3-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch3-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch3-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch3-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch3-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch3-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch3-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch4',
      title: 'Unit 5: Endangerment and city life',
      lessons: [
        { id: 'anh-ch4-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch4-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch4-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch4-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch4-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch4-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch4-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch5',
      title: 'Unit 6: Media and reputation',
      lessons: [
        { id: 'anh-ch5-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch5-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch5-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch5-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch5-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch5-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch5-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch6',
      title: 'Unit 7: Life cycles of technology',
      lessons: [
        { id: 'anh-ch6-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch6-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch6-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch6-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch6-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch6-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch6-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch7',
      title: 'Unit 8: Cities and country life',
      lessons: [
        { id: 'anh-ch7-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch7-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch7-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch7-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch7-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch7-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch7-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch8',
      title: 'Unit 9: Science and technological progress',
      lessons: [
        { id: 'anh-ch8-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch8-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch8-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch8-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch8-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch8-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch8-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch9',
      title: 'Unit 10: Historical memories',
      lessons: [
        { id: 'anh-ch9-l0', title: 'Getting started', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch9-l1', title: 'Language', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch9-l2', title: 'Reading', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch9-l3', title: 'Speaking', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch9-l4', title: 'Listening', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch9-l5', title: 'Writing', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
        { id: 'anh-ch9-l6', title: 'Looking back & Project', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch10',
      title: 'Review 1',
      lessons: [
        { id: 'anh-ch10-l0', title: 'Review Units 1-3, 5', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
    {
      id: 'anh-ch11',
      title: 'Review 2',
      lessons: [
        { id: 'anh-ch11-l0', title: 'Review Units 4, 6, 10', loigiaihayUrl: `${LOIGIAIHAY_BASE}/tieng-anh-11-global-success-c1404.html` },
      ],
    },
  ],
  ly: [
    {
      id: 'ly-ch0',
      title: 'Chương 1: Dao động',
      lessons: [
        { id: 'ly-ch0-l0', title: 'Bài 1: Dao động điều hòa', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch0-l1', title: 'Bài 2: Con lắc lò xo', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch0-l2', title: 'Bài 3: Con lắc đơn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch0-l3', title: 'Bài 4: Năng lượng trong dao động', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
      ],
    },
    {
      id: 'ly-ch1',
      title: 'Chương 2: Sóng cơ',
      lessons: [
        { id: 'ly-ch1-l0', title: 'Bài 5: Sóng cơ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch1-l1', title: 'Bài 6: Sóng truyền', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch1-l2', title: 'Bài 7: Sóng dừng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch1-l3', title: 'Bài 8: Giao thoa sóng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
      ],
    },
    {
      id: 'ly-ch2',
      title: 'Chương 3: Dòng điện trong các môi trường',
      lessons: [
        { id: 'ly-ch2-l0', title: 'Bài 9: Dòng điện trong kim loại', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch2-l1', title: 'Bài 10: Dòng điện trong chất điện phân', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch2-l2', title: 'Bài 11: Dòng điện trong chất khí', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch2-l3', title: 'Bài 12: Dòng điện trong chất bán dẫn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
      ],
    },
    {
      id: 'ly-ch3',
      title: 'Chương 4: Điện từ trường',
      lessons: [
        { id: 'ly-ch3-l0', title: 'Bài 13: Từ trường tĩnh', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch3-l1', title: 'Bài 14: Cảm ứng điện từ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch3-l2', title: 'Bài 15: Điện từ trường', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
        { id: 'ly-ch3-l3', title: 'Bài 16: Sóng điện từ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-vat-li-11-ket-noi-tri-thuc-c1366.html` },
      ],
    },
  ],
  hoa: [
    {
      id: 'hoa-ch0',
      title: 'Chương 1: Cân bằng hóa học',
      lessons: [
        { id: 'hoa-ch0-l0', title: 'Bài 1: Cân bằng hóa học', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch0-l1', title: 'Bài 2: Sự chuyển dịch cân bằng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch0-l2', title: 'Bài 3: Hằng số cân bằng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
      ],
    },
    {
      id: 'hoa-ch1',
      title: 'Chương 2: Nitơ, photpho',
      lessons: [
        { id: 'hoa-ch1-l0', title: 'Bài 4: Nitơ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch1-l1', title: 'Bài 5: Photpho', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch1-l2', title: 'Bài 6: Amoni và muối amoni', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch1-l3', title: 'Bài 7: Axit nitric', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch1-l4', title: 'Bài 8: Photphat', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
      ],
    },
    {
      id: 'hoa-ch2',
      title: 'Chương 3: Cacbon, silic',
      lessons: [
        { id: 'hoa-ch2-l0', title: 'Bài 9: Cacbon', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch2-l1', title: 'Bài 10: Cacbon oxit', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch2-l2', title: 'Bài 11: Cacbon dioxit', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch2-l3', title: 'Bài 12: Silic và hợp chất', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
      ],
    },
    {
      id: 'hoa-ch3',
      title: 'Chương 4: Đại cương hóa hữu cơ',
      lessons: [
        { id: 'hoa-ch3-l0', title: 'Bài 13: Hợp chất hữu cơ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch3-l1', title: 'Bài 14: Công thức phân tử', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch3-l2', title: 'Bài 15: Đồng đẳng, đồng phân', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch3-l3', title: 'Bài 16: Phản ứng hữu cơ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
      ],
    },
    {
      id: 'hoa-ch4',
      title: 'Chương 5: Hiđrocacbon',
      lessons: [
        { id: 'hoa-ch4-l0', title: 'Bài 17: Ankan', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch4-l1', title: 'Bài 18: Anken', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch4-l2', title: 'Bài 19: Ankin', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch4-l3', title: 'Bài 20: Ankadien', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch4-l4', title: 'Bài 21: Xiclankan', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
      ],
    },
    {
      id: 'hoa-ch5',
      title: 'Chương 6: Dẫn xuất halogen và alcohol - phenol',
      lessons: [
        { id: 'hoa-ch5-l0', title: 'Bài 22: Dẫn xuất halogen', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch5-l1', title: 'Bài 23: Ancol', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
        { id: 'hoa-ch5-l2', title: 'Bài 24: Phenol', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-hoa-hoc-11-ket-noi-tri-thuc-c1431.html` },
      ],
    },
  ],
  sinh: [
    {
      id: 'sinh-ch0',
      title: 'Chương 1: Sự trao đổi chất và chuyển hóa năng lượng ở sinh vật',
      lessons: [
        { id: 'sinh-ch0-l0', title: 'Bài 1: Trao đổi chất và chuyển hóa năng lượng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch0-l1', title: 'Bài 2: Chuyển hóa năng lượng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch0-l2', title: 'Bài 3: Enzim', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch0-l3', title: 'Bài 4: Vai trò của trao đổi chất', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
      ],
    },
    {
      id: 'sinh-ch1',
      title: 'Chương 2: Sinh sản tế bào',
      lessons: [
        { id: 'sinh-ch1-l0', title: 'Bài 5: Phân bào nguyên phân', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch1-l1', title: 'Bài 6: Phân bào giảm phân', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch1-l2', title: 'Bài 7: Điều hòa chu kì tế bào', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch1-l3', title: 'Bài 8: Ung thư', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
      ],
    },
    {
      id: 'sinh-ch2',
      title: 'Chương 3: Di truyền học',
      lessons: [
        { id: 'sinh-ch2-l0', title: 'Bài 9: Cơ sở vật chất của hiện tượng di truyền', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch2-l1', title: 'Bài 10: ADN và gen', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch2-l2', title: 'Bài 11: Phiên mã và dịch mã', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch2-l3', title: 'Bài 12: Điều hòa biểu hiện gen', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch2-l4', title: 'Bài 13: Đột biến gen', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch2-l5', title: 'Bài 14: Đột biến nhiễm sắc thể', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch2-l6', title: 'Bài 15: Quy luật di truyền', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch2-l7', title: 'Bài 16: Di truyền liên kết giới tính', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
      ],
    },
    {
      id: 'sinh-ch3',
      title: 'Chương 4: Ứng dụng di truyền học',
      lessons: [
        { id: 'sinh-ch3-l0', title: 'Bài 17: Kĩ thuật tạo giống', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch3-l1', title: 'Bài 18: Công nghệ gen', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch3-l2', title: 'Bài 19: Công nghệ tế bào', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
      ],
    },
    {
      id: 'sinh-ch4',
      title: 'Chương 5: Sinh thái học',
      lessons: [
        { id: 'sinh-ch4-l0', title: 'Bài 20: Quần thể sinh vật', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch4-l1', title: 'Bài 21: Mối quan hệ giữa các cá thể', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch4-l2', title: 'Bài 22: Quần xã sinh vật', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch4-l3', title: 'Bài 23: Hệ sinh thái', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch4-l4', title: 'Bài 24: Diễn thế sinh thái', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
        { id: 'sinh-ch4-l5', title: 'Bài 25: Sinh quyển', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-sinh-11-ket-noi-tri-thuc-c1388.html` },
      ],
    },
  ],
  su: [
    {
      id: 'su-ch0',
      title: 'Chủ đề 1: Từ khởi nghĩa đến thành lập nhà nước',
      lessons: [
        { id: 'su-ch0-l0', title: 'Bài 1: Khởi nghĩa tháng Tám 1945', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
        { id: 'su-ch0-l1', title: 'Bài 2: Nước Việt Nam Dân chủ Cộng hòa', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
      ],
    },
    {
      id: 'su-ch1',
      title: 'Chủ đề 2: Kháng chiến chống Pháp',
      lessons: [
        { id: 'su-ch1-l0', title: 'Bài 3: Kháng chiến chống thực dân Pháp 1945-1954', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
        { id: 'su-ch1-l1', title: 'Bài 4: Chiến dịch Điện Biên Phủ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
      ],
    },
    {
      id: 'su-ch2',
      title: 'Chủ đề 3: Kháng chiến chống Mĩ',
      lessons: [
        { id: 'su-ch2-l0', title: 'Bài 5: Kháng chiến chống Mĩ cứu nước', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
        { id: 'su-ch2-l1', title: 'Bài 6: Đại thắng mùa xuân 1975', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
      ],
    },
    {
      id: 'su-ch3',
      title: 'Chủ đề 4: Việt Nam 1975-1986',
      lessons: [
        { id: 'su-ch3-l0', title: 'Bài 7: Xây dựng đất nước 1975-1986', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
        { id: 'su-ch3-l1', title: 'Bài 8: Đổi mới', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
      ],
    },
    {
      id: 'su-ch4',
      title: 'Chủ đề 5: Cách mạng công nghiệp và văn minh',
      lessons: [
        { id: 'su-ch4-l0', title: 'Bài 9: Cách mạng công nghiệp 4.0', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
        { id: 'su-ch4-l1', title: 'Bài 10: Văn minh nhân loại', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
      ],
    },
    {
      id: 'su-ch5',
      title: 'Chủ đề 6',
      lessons: [
        { id: 'su-ch5-l0', title: 'Bài 11: Thế giới sau chiến tranh lạnh', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
        { id: 'su-ch5-l1', title: 'Bài 12: Khu vực Đông Nam Á', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
        { id: 'su-ch5-l2', title: 'Bài 13: Tổng ôn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-lich-su-11-ket-noi-tri-thuc-c1425.html` },
      ],
    },
  ],
  dia: [
    {
      id: 'dia-ch0',
      title: 'Phần 1: Địa lí tự nhiên và kinh tế - xã hội Việt Nam',
      lessons: [
        { id: 'dia-ch0-l0', title: 'Bài 1: Vị trí địa lí, phạm vi lãnh thổ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch0-l1', title: 'Bài 2: Đặc điểm tự nhiên', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch0-l2', title: 'Bài 3: Tài nguyên thiên nhiên', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch0-l3', title: 'Bài 4: Dân cư và lao động', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch0-l4', title: 'Bài 5: Kinh tế - xã hội', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch0-l5', title: 'Bài 6: Công nghiệp hóa', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch0-l6', title: 'Bài 7: Nông nghiệp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch0-l7', title: 'Bài 8: Dịch vụ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch0-l8', title: 'Bài 9: Vùng kinh tế', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch0-l9', title: 'Bài 10: Thực hành', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
      ],
    },
    {
      id: 'dia-ch1',
      title: 'Phần 2: Địa lí các ngành kinh tế',
      lessons: [
        { id: 'dia-ch1-l0', title: 'Bài 11: Công nghiệp điện tử', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch1-l1', title: 'Bài 12: Công nghiệp dệt may', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch1-l2', title: 'Bài 13: Du lịch', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
        { id: 'dia-ch1-l3', title: 'Bài 14: Bưu chính viễn thông', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-dia-li-lop-11-ket-noi-tri-thuc-c1599.html` },
      ],
    },
  ],
  gdktpl: [
    {
      id: 'gdktpl-ch0',
      title: 'Phần 1: Kinh tế',
      lessons: [
        { id: 'gdktpl-ch0-l0', title: 'Bài 1: Kinh tế thị trường', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch0-l1', title: 'Bài 2: Cung - cầu', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch0-l2', title: 'Bài 3: Doanh nghiệp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch0-l3', title: 'Bài 4: Thị trường lao động và việc làm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch0-l4', title: 'Bài 5: Ngân hàng và tín dụng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch0-l5', title: 'Bài 6: Tài chính', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch0-l6', title: 'Bài 7: Thuế và ngân sách nhà nước', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch0-l7', title: 'Bài 8: Đạo đức kinh doanh', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch0-l8', title: 'Bài 9: Chuẩn mực đạo đức', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
      ],
    },
    {
      id: 'gdktpl-ch1',
      title: 'Phần 2: Pháp luật',
      lessons: [
        { id: 'gdktpl-ch1-l0', title: 'Bài 10: Hiến pháp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch1-l1', title: 'Bài 11: Pháp luật và đời sống', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch1-l2', title: 'Bài 12: Quyền và nghĩa vụ công dân', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch1-l3', title: 'Bài 13: Thực hiện pháp luật', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch1-l4', title: 'Bài 14: Vi phạm pháp luật và trách nhiệm pháp lý', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
        { id: 'gdktpl-ch1-l5', title: 'Bài 15: Tổng ôn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-giao-duc-kinh-te-va-phap-luat-11-ket-noi-tri-thuc-c1589.html` },
      ],
    },
  ],
  tin: [
    {
      id: 'tin-ch0',
      title: 'Chủ đề 1: Thuật toán và lập trình',
      lessons: [
        { id: 'tin-ch0-l0', title: 'Bài 1: Thuật toán tìm kiếm', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch0-l1', title: 'Bài 2: Thuật toán sắp xếp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch0-l2', title: 'Bài 3: Đệ quy', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
      ],
    },
    {
      id: 'tin-ch1',
      title: 'Chủ đề 2: Cấu trúc dữ liệu',
      lessons: [
        { id: 'tin-ch1-l0', title: 'Bài 4: Kiểu dữ liệu động', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch1-l1', title: 'Bài 5: Ngăn xếp và hàng đợi', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch1-l2', title: 'Bài 6: Cây', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch1-l3', title: 'Bài 7: Đồ thị', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
      ],
    },
    {
      id: 'tin-ch2',
      title: 'Chủ đề 3: Lập trình hướng đối tượng',
      lessons: [
        { id: 'tin-ch2-l0', title: 'Bài 8: Lập trình hướng đối tượng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch2-l1', title: 'Bài 9: Lớp và đối tượng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch2-l2', title: 'Bài 10: Kế thừa', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch2-l3', title: 'Bài 11: Đa hình', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
      ],
    },
    {
      id: 'tin-ch3',
      title: 'Chủ đề 4: Cơ sở dữ liệu',
      lessons: [
        { id: 'tin-ch3-l0', title: 'Bài 12: Hệ CSDL', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch3-l1', title: 'Bài 13: SQL', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch3-l2', title: 'Bài 14: Thiết kế CSDL', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
      ],
    },
    {
      id: 'tin-ch4',
      title: 'Chủ đề 5: Mạng máy tính và Internet',
      lessons: [
        { id: 'tin-ch4-l0', title: 'Bài 15: Mạng máy tính', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch4-l1', title: 'Bài 16: TCP/IP', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch4-l2', title: 'Bài 17: An toàn mạng', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
      ],
    },
    {
      id: 'tin-ch5',
      title: 'Chủ đề 6: Trí tuệ nhân tạo',
      lessons: [
        { id: 'tin-ch5-l0', title: 'Bài 18: Khái niệm AI', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch5-l1', title: 'Bài 19: Học máy', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
        { id: 'tin-ch5-l2', title: 'Bài 20: Ứng dụng AI', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-tin-hoc-11-ket-noi-tri-thuc-c1587.html` },
      ],
    },
  ],
  congnghe: [
    {
      id: 'congnghe-ch0',
      title: 'Chương 1: Giới thiệu chung về công nghệ cơ khí',
      lessons: [
        { id: 'congnghe-ch0-l0', title: 'Bài 1: Giới thiệu công nghệ cơ khí', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
      ],
    },
    {
      id: 'congnghe-ch1',
      title: 'Chương 2: Vật liệu cơ khí',
      lessons: [
        { id: 'congnghe-ch1-l0', title: 'Bài 2: Vật liệu kim loại', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch1-l1', title: 'Bài 3: Vật liệu phi kim loại', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch1-l2', title: 'Bài 4: Vật liệu mới', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
      ],
    },
    {
      id: 'congnghe-ch2',
      title: 'Chương 3: Các phương pháp gia công cơ khí',
      lessons: [
        { id: 'congnghe-ch2-l0', title: 'Bài 5: Phương pháp gia công cắt gọt', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch2-l1', title: 'Bài 6: Phương pháp gia công áp lực', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch2-l2', title: 'Bài 7: Phương pháp gia công hàn', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
      ],
    },
    {
      id: 'congnghe-ch3',
      title: 'Chương 4: Công nghệ gia công',
      lessons: [
        { id: 'congnghe-ch3-l0', title: 'Bài 8: Tiện', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch3-l1', title: 'Bài 9: Phay', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch3-l2', title: 'Bài 10: Khoan', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch3-l3', title: 'Bài 11: Mài', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
      ],
    },
    {
      id: 'congnghe-ch4',
      title: 'Chương 5: Truyền động cơ khí',
      lessons: [
        { id: 'congnghe-ch4-l0', title: 'Bài 12: Truyền động cơ khí', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch4-l1', title: 'Bài 13: Ổ trục', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch4-l2', title: 'Bài 14: Khớp nối', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
      ],
    },
    {
      id: 'congnghe-ch5',
      title: 'Chương 6: Thiết bị cơ khí',
      lessons: [
        { id: 'congnghe-ch5-l0', title: 'Bài 15: Máy công cụ', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
        { id: 'congnghe-ch5-l1', title: 'Bài 16: Robot công nghiệp', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
      ],
    },
    {
      id: 'congnghe-ch6',
      title: 'Chương 7: An toàn lao động',
      lessons: [
        { id: 'congnghe-ch6-l0', title: 'Bài 17: An toàn lao động trong sản xuất cơ khí', loigiaihayUrl: `${LOIGIAIHAY_BASE}/sgk-cong-nghe-11-ket-noi-tri-thuc-c1493.html` },
      ],
    },
  ],
};
