import { SavedStudyItem } from '../types';

export const PRESET_LESSON_NOTES: SavedStudyItem[] = [
  {
    id: 'preset-toan-1',
    type: 'note',
    title: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số (Bậc 3 & Phân thức)',
    subject: 'Toán học 12',
    subjectId: 'toan',
    textbook: 'Kết nối tri thức với cuộc sống',
    date: 'Học kỳ 1 - Lớp 12',
    isFavorite: true,
    style: 'standard',
    grade: '12',
    content: `## 📌 BÀI SOẠN: KHẢO SÁT SỰ BIẾN THIÊN VÀ VẼ ĐỒ THỊ HÀM SỐ

### I. MỤC TIÊU BÀI HỌC
1. **Kiến thức**: Nắm vững sơ đồ 4 bước khảo sát hàm số, cách lập bảng biến thiên, tìm điểm cực trị, tìm đường tiệm cận đứng, tiệm cận ngang và tiệm cận xiên.
2. **Kỹ năng**: Vẽ chính xác đồ thị hàm đa thức bậc ba $y = ax^3 + bx^2 + cx + d$ và hàm phân thức hữu tỉ $y = \\frac{ax+b}{cx+d}$, $y = \\frac{ax^2+bx+c}{dx+e}$.
3. **Định hướng thi THPT**: Nhận dạng đồ thị, suy đồ thị chứa dấu trị tuyệt đối, tìm điều kiện tham số $m$ để hàm số có cực trị thỏa mãn điều kiện.

---

### II. KIẾN THỨC TRỌNG TÂM CỐT LÕI

#### 1. Sơ đồ 4 bước khảo sát hàm số chuẩn
- **Bước 1: Tập xác định**: Tìm $D$.
- **Bước 2: Sự biến thiên**:
  - Tính đạo hàm $y'$, giải phương trình $y' = 0$ để tìm điểm dừng.
  - Xét dấu của $y'$, suy ra các khoảng đồng biến và nghịch biến.
  - Tìm cực đại ($CĐ$), cực tiểu ($CT$).
  - Tính giới hạn tại vô cực và tại điểm gián đoạn; suy ra các đường tiệm cận (nếu có).
  - Lập Bảng biến thiên (BBT).
- **Bước 3: Vẽ đồ thị**:
  - Tìm giao điểm của đồ thị với trục tung ($Oy: x = 0$) và trục hoành ($Ox: y = 0$).
  - Xác định tâm đối xứng hoặc trục đối xứng của đồ thị.
  - Vẽ đồ thị uốn lượn chính xác qua các điểm đặc biệt.

#### 2. Đường tiệm cận của đồ thị hàm phân thức
- **Tiệm cận đứng (TCĐ)**: Đường thẳng $x = x_0$ nếu $\\lim_{x \\to x_0^+} y = \\pm \\infty$ hoặc $\\lim_{x \\to x_0^-} y = \\pm \\infty$.
- **Tiệm cận ngang (TCN)**: Đường thẳng $y = y_0$ nếu $\\lim_{x \\to +\\infty} y = y_0$ hoặc $\\lim_{x \\to -\\infty} y = y_0$.
- **Tiệm cận xiên (TCX)**: Đối với hàm phân thức bậc tử lớn hơn mẫu 1 bậc ($y = \\frac{P(x)}{Q(x)} = ax + b + \\frac{r}{Q(x)}$), đường thẳng $y = ax + b$ là TCX.

---

### III. HƯỚNG DẪN TRẢ LỜI CÂU HỎI TRONG SGK

> **Câu hỏi 1**: Cho hàm số $y = \\frac{2x - 1}{x + 1}$. Xác định các đường tiệm cận của đồ thị.
- **Lời giải**:
  - Tập xác định: $D = \\mathbb{R} \\setminus \\{-1\\}$.
  - $\\lim_{x \\to (-1)^+} y = -\\infty$, $\\lim_{x \\to (-1)^-} y = +\\infty \\implies$ Đường thẳng **$x = -1$ là tiệm cận đứng**.
  - $\\lim_{x \\to \\pm \\infty} y = \\lim_{x \\to \\pm \\infty} \\frac{2 - 1/x}{1 + 1/x} = 2 \\implies$ Đường thẳng **$y = 2$ là tiệm cận ngang**.
  - Giao điểm hai tiệm cận $I(-1; 2)$ chính là tâm đối xứng của hypebol.

---

### IV. BÀI TẬP CỦNG CỐ & BẪY PHÒNG THI
1. **Bẫy thường gặp**: Quên xét điều kiện mẫu số khác 0 trước khi kết luận tiệm cận đứng (phải kiểm tra xem nghiệm của mẫu có làm triệt tiêu nghiệm của tử số hay không).
2. **Mẹo Casio**: Nhập hàm số vào máy tính, bấm \`CALC\` với $x = 10^{9}$ để tìm tiệm cận ngang nhanh chóng.`,
  },
  {
    id: 'preset-van-1',
    type: 'note',
    title: 'Soạn bài: Đất Nước (Trích Mặt đường khát vọng - Nguyễn Khoa Điềm)',
    subject: 'Ngữ văn 12',
    subjectId: 'van',
    textbook: 'Kết nối tri thức với cuộc sống',
    date: 'Học kỳ 1 - Lớp 12',
    isFavorite: true,
    style: 'standard',
    grade: '12',
    content: `## 📌 BÀI SOẠN: ĐẤT NƯỚC (NGUYỄN KHOA ĐIỀM)

### I. TÌM HIỂU CHUNG
- **Tác giả**: Nguyễn Khoa Điềm sinh năm 1943 tại Thừa Thiên Huế. Thơ ông giàu chất suy tư, cảm xúc dồn nén, mang đậm chất triết luận của trí thức trẻ dấn thân.
- **Xuất xứ**: Đoạn trích thuộc phần đầu chương V của trường ca *Mặt đường khát vọng*, hoàn thành tại chiến khu Trị - Thiên năm 1971.
- **Tư tưởng cốt lõi**: **"Đất Nước của Nhân dân"** - tư tưởng bao trùm toàn bộ đoạn trích.

---

### II. ĐỌC HIỂU NỘI DUNG VĂN BẢN

#### 1. Sự hình thành và cội nguồn của Đất Nước (9 câu đầu)
- *"Khi ta lớn lên Đất Nước đã có rồi"*: Đất Nước không phải một khái niệm trừu tượng, xa vời mà đã hiện hữu tự nhiên, gắn với sự sinh thành của mỗi con người.
- Đất Nước khởi sinh từ:
  + Chuyện cổ tích trầu cau bà kể (truyền thống thủy chung, nghĩa tình).
  + Miếng trầu bà ăn, búi tóc sau đầu của mẹ (nếp sống bình dị, thuần phong mỹ tục).
  + Hạt gạo "một nắng hai sương xay, giã, dần, sàng" (truyền thống lao động nông nghiệp cần cù).
  + Tình nghĩa keo sơn: "Gừng cay muối mặn xin đừng quên nhau".
$\\implies$ **Nhận xét**: Nguyễn Khoa Điềm đã sử dụng nhuần nhuyễn chất liệu văn hóa dân gian (ca dao, cổ tích, phong tục) để định nghĩa Đất Nước một cách thân thương, máu thịt.

#### 2. Định nghĩa Đất Nước trên các bình diện
- **Bình diện không gian địa lý**:
  + Không gian gần gũi, riêng tư của tình yêu lứa đôi: *"Đất là nơi anh đến trường / Nước là nơi em tắm / Đất Nước là nơi ta hò hẹn"*.
  + Không gian rộng lớn, thiêng liêng của cộng đồng: Nơi non sông gấm vóc bọc lấy cội nguồn Rồng Tiên, nơi tổ chức Giỗ Tổ Hùng Vương mùng mười tháng ba.
- **Bình diện thời gian lịch sử**:
  + Quá khứ: Bốn nghìn năm dựng nước và giữ nước.
  + Hiện tại: Trách nhiệm của mỗi cá nhân - *"Trong anh và em hôm nay / Đều có một phần Đất Nước"*.
  + Tương lai: Lời nhắn nhủ các thế hệ mai sau mang Đất Nước đi xa đến những tháng ngày mơ mộng.

#### 3. Tư tưởng "Đất Nước của Nhân dân"
- Nhân dân đã hóa thân vào danh lam thắng cảnh:
  + Vợ chồng chung thủy làm nên hòn Trống Mái.
  + Người nghĩa quân dựng nên dáng núi Ngắm Vọng.
  + Dân nghèo góp sức tạo nên núi Bút, non Nghiên, con cóc, con gà...
- Chính những người vô danh, giản dị đã chiến đấu hy sinh bảo vệ non sông mà *"không ai nhớ mặt đặt tên / Nhưng họ đã làm ra Đất Nước"*.

---

### III. TỔNG KẾT
- **Nghệ thuật**: Giọng thơ trữ tình - chính luận, chất liệu dân gian hòa quyện cùng tư duy hiện đại, thể thơ tự do phóng khoáng.
- **Ý nghĩa**: Khơi gợi lòng yêu nước tha thiết và ý thức trách nhiệm của thế hệ trẻ đối với Tổ quốc.`,
  },
  {
    id: 'preset-ly-1',
    type: 'exercise',
    title: 'Giải bài: Khí lí tưởng & Phương trình Clapeyron - Mendeleev',
    subject: 'Vật lí 12',
    subjectId: 'ly',
    textbook: 'Cánh diều',
    date: 'Luyện đề',
    isFavorite: false,
    grade: '12',
    originalProblem: 'Một bình kín có dung tích 20 lít chứa khí Nitơ ở áp suất 10 atm và nhiệt độ 27°C. Do van bị hở, một lượng khí đã thoát ra ngoài. Khi kiểm tra lại, áp suất chỉ còn 6 atm ở nhiệt độ 17°C. Coi khí Nitơ là khí lí tưởng có khối lượng mol M = 28 g/mol. Tính khối lượng khí đã thoát ra khỏi bình.',
    content: `### 📌 LỜI GIẢI CHI TIẾT

#### 1. Tóm tắt đề bài & Đổi đơn vị
- Thể tích bình chứa không đổi: $V = 20\\text{ lít} = 20 \\cdot 10^{-3} \\text{ m}^3$.
- Trạng thái 1:
  + Áp suất: $p_1 = 10\\text{ atm} = 10 \\cdot 1,013 \\cdot 10^5 = 1,013 \\cdot 10^6\\text{ Pa}$.
  + Nhiệt độ tuyệt đối: $T_1 = 27 + 273 = 300\\text{ K}$.
  + Khối lượng ban đầu: $m_1$.
- Trạng thái 2 (sau khi khí rò rỉ):
  + Áp suất: $p_2 = 6\\text{ atm} = 6 \\cdot 1,013 \\cdot 10^5 = 6,078 \\cdot 10^5\\text{ Pa}$.
  + Nhiệt độ tuyệt đối: $T_2 = 17 + 273 = 290\\text{ K}$.
  + Khối lượng còn lại: $m_2$.
- Hằng số khí lí tưởng: $R = 8,314\\text{ J/(mol}\\cdot\\text{K)}$. Khối lượng mol: $\\mu = 28\\text{ g/mol} = 28 \\cdot 10^{-3}\\text{ kg/mol}$.

---

#### 2. Phương pháp áp dụng
Áp dụng phương trình trạng thái Clapeyron - Mendeleev cho khí lí tưởng:
$$p \\cdot V = \\frac{m}{\\mu} R T \\implies m = \\frac{p \\cdot V \\cdot \\mu}{R \\cdot T}$$

---

#### 3. Các bước giải chi tiết
- **Khối lượng khí ban đầu trong bình**:
  $$m_1 = \\frac{p_1 \\cdot V \\cdot \\mu}{R \\cdot T_1} = \\frac{1,013 \\cdot 10^6 \\cdot 20 \\cdot 10^{-3} \\cdot 28 \\cdot 10^{-3}}{8,314 \\cdot 300} \\approx 0,2275\\text{ kg} = 227,5\\text{ g}$$

- **Khối lượng khí còn lại trong bình**:
  $$m_2 = \\frac{p_2 \\cdot V \\cdot \\mu}{R \\cdot T_2} = \\frac{6,078 \\cdot 10^5 \\cdot 20 \\cdot 10^{-3} \\cdot 28 \\cdot 10^{-3}}{8,314 \\cdot 290} \\approx 0,1411\\text{ kg} = 141,1\\text{ g}$$

- **Khối lượng khí đã rò rỉ thoát ra**:
  $$\\Delta m = m_1 - m_2 = 227,5 - 141,1 = 86,4\\text{ g}$$

---

#### 4. Kết luận & Đáp số
- Khối lượng khí Nitơ đã thoát ra khỏi bình là: **$\\approx 86,4\\text{ g}$**.

#### 5. Bẫy phòng thi cần nhớ
- Học sinh thường quên cộng $273$ để đổi từ độ C sang độ Kelvin ($T = t + 273$).
- Khi dùng $R = 8,314$, các đơn vị bắt buộc phải quy về chuẩn SI ($p$ tính bằng $\\text{Pa}$, $V$ tính bằng $\\text{m}^3$, $\\mu$ tính bằng $\\text{kg/mol}$).`,
  },
];
