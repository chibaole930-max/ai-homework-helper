import { SubjectId, CurriculumChapter } from '../types';

export const SUBJECT_CURRICULUM: Record<SubjectId, CurriculumChapter[]> = {
  dia: [
    {
      id: 'dia-phan-1',
      title: 'Phần 1: Địa lí tự nhiên',
      description: 'Vị trí địa lí, phạm vi lãnh thổ, thiên nhiên nhiệt đới ẩm gió mùa & tài nguyên môi trường',
      lessons: [
        {
          id: 'dia-b1',
          number: 'Bài 1',
          title: 'Vị trí địa lí và phạm vi lãnh thổ',
          description: 'Đặc điểm vị trí địa lí, tọa độ các điểm cực (23°23\'B, 8°34\'B, 102°09\'Đ, 109°28\'Đ), ý nghĩa chiến lược',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b2',
          number: 'Bài 2',
          title: 'Thiên nhiên nhiệt đới ẩm gió mùa',
          description: 'Khí hậu gió mùa, chế độ nhiệt ẩm, gió mùa mùa đông & mùa hạ, ảnh hưởng đến cảnh quan',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b3',
          number: 'Bài 3',
          title: 'Sự phân hóa đa dạng của thiên nhiên',
          description: 'Phân hóa theo Bắc - Nam, theo Đông - Tây và phân hóa theo đai cao',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b4',
          number: 'Bài 4',
          title: 'Thực hành: Trình bày một số giải pháp sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường',
          description: 'Khai thác bền vững tài nguyên đất, nước, rừng, khoáng sản và giải pháp giảm nhẹ thiên tai',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b5',
          number: 'Bài 5',
          title: 'Vấn đề sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường',
          description: 'Thực trạng suy thoái tài nguyên sinh vật, đất, nước và các chiến lược bảo vệ môi trường',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
      ],
    },
    {
      id: 'dia-phan-2',
      title: 'Phần 2: Địa lí dân cư',
      description: 'Quy mô, gia tăng, cơ cấu dân số, lao động, việc làm và đô thị hóa',
      lessons: [
        {
          id: 'dia-b6',
          number: 'Bài 6',
          title: 'Quy mô, gia tăng và cơ cấu dân số',
          description: 'Quy mô dân số, tỷ lệ gia tăng tự nhiên, cơ cấu theo tuổi, giới tính và cơ cấu lao động',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b7',
          number: 'Bài 7',
          title: 'Phân bố dân cư và các loại hình quần cư',
          description: 'Mật độ dân số các vùng, quần cư nông thôn và thành thị, chiến lược phân bố lại dân cư',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b8',
          number: 'Bài 8',
          title: 'Lao động và việc làm',
          description: 'Nguồn lao động dồi dào, chất lượng nâng cao, vấn đề giải quyết việc làm ở nước ta',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b9',
          number: 'Bài 9',
          title: 'Đô thị hóa',
          description: 'Đặc điểm đô thị hóa ở Việt Nam, mạng lưới đô thị và ảnh hưởng của đô thị hóa đến kinh tế - xã hội',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b10',
          number: 'Bài 10',
          title: 'Thực hành: Viết báo cáo về một chủ đề dân cư ở Việt Nam',
          description: 'Thu thập tư liệu, biểu đồ dân số, viết báo cáo về cơ cấu dân số vàng và già hóa dân số',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
      ],
    },
    {
      id: 'dia-phan-3',
      title: 'Phần 3: Địa lí các ngành kinh tế',
      description: 'Chuyển dịch cơ cấu, nông nghiệp, lâm nghiệp, thủy sản, công nghiệp, dịch vụ và du lịch',
      lessons: [
        {
          id: 'dia-b11',
          number: 'Bài 11',
          title: 'Chuyển dịch cơ cấu kinh tế',
          description: 'Chuyển dịch cơ cấu theo ngành, theo thành phần kinh tế và theo lãnh thổ',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b12',
          number: 'Bài 12',
          title: 'Vấn đề phát triển nông nghiệp, lâm nghiệp và thuỷ sản',
          description: 'Điều kiện phát triển, cơ cấu ngành, nông nghiệp công nghệ cao và bảo đảm an ninh lương thực',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b13',
          number: 'Bài 13',
          title: 'Vấn đề phát triển lâm nghiệp và thuỷ sản',
          description: 'Tài nguyên rừng, nuôi trồng và đánh bắt thủy hải sản, các ngư trường trọng điểm',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b14',
          number: 'Bài 14',
          title: 'Thực hành: Vẽ biểu đồ, nhận xét và giải thích tình hình phát triển của ngành nông nghiệp, lâm nghiệp và thuỷ sản',
          description: 'Kỹ năng xử lí số liệu, vẽ biểu đồ tròn, cột, đường và nhận xét chuyên sâu',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b15',
          number: 'Bài 15',
          title: 'Vấn đề phát triển ngành công nghiệp',
          description: 'Cơ cấu ngành công nghiệp, các trung tâm công nghiệp lớn và xu hướng hiện đại hóa',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b16',
          number: 'Bài 16',
          title: 'Một số ngành công nghiệp trọng điểm',
          description: 'Công nghiệp năng lượng (than, dầu khí, điện), chế biến lương thực thực phẩm, sản xuất hàng tiêu dùng',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b17',
          number: 'Bài 17',
          title: 'Thực hành: Viết báo cáo về một ngành công nghiệp trọng điểm',
          description: 'Phương pháp viết báo cáo, phân tích tiềm năng và định hướng phát triển ngành công nghiệp',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b18',
          number: 'Bài 18',
          title: 'Vấn đề phát triển ngành giao thông vận tải và bưu chính viễn thông',
          description: 'Mạng lưới đường bộ, đường sắt, đường biển, đường hàng không và chuyển đổi số viễn thông',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b19',
          number: 'Bài 19',
          title: 'Vấn đề phát triển ngành thương mại và du lịch',
          description: 'Nội thương, ngoại thương (xuất nhập khẩu), tài nguyên du lịch và các trung tâm du lịch quốc gia',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b20',
          number: 'Bài 20',
          title: 'Thực hành: Tìm hiểu sự phát triển và phân bố ngành du lịch',
          description: 'Phân tích bản đồ du lịch Việt Nam, các di sản thế giới và sản phẩm du lịch đặc sắc',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
      ],
    },
    {
      id: 'dia-phan-4',
      title: 'Phần 4: Địa lí các vùng kinh tế',
      description: 'Khai thác thế mạnh các vùng kinh tế trọng điểm & phát triển kinh tế biển đảo',
      lessons: [
        {
          id: 'dia-b21',
          number: 'Bài 21',
          title: 'Khai thác thế mạnh ở Trung du và miền núi Bắc Bộ',
          description: 'Khoáng sản, thủy điện, cây công nghiệp cận nhiệt và ôn đới, kinh tế cửa khẩu',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b22',
          number: 'Bài 22',
          title: 'Phát triển kinh tế - xã hội ở Đồng bằng sông Hồng',
          description: 'Thế mạnh tự nhiên và kinh tế - xã hội, chuyển dịch cơ cấu ngành kinh tế ở ĐBSH',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b23',
          number: 'Bài 23',
          title: 'Thực hành: Tìm hiểu sự phát triển kinh tế - xã hội ở Đồng bằng sông Hồng',
          description: 'Đánh giá vị thế của vùng thủ đô và vùng kinh tế trọng điểm Bắc Bộ',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b24',
          number: 'Bài 24',
          title: 'Phát triển kinh tế - xã hội ở Bắc Trung Bộ',
          description: 'Cơ cấu nông - lâm - ngư nghiệp, công nghiệp và cơ sở hạ tầng giao thông kết nối Đông - Tây',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b25',
          number: 'Bài 25',
          title: 'Phát triển kinh tế - xã hội ở Duyên hải Nam Trung Bộ',
          description: 'Thế mạnh kinh tế biển (đánh bắt, làm muối, du lịch, cảng biển nước sâu) và công nghiệp',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b26',
          number: 'Bài 26',
          title: 'Khai thác thế mạnh ở Tây Nguyên',
          description: 'Cây công nghiệp lâu năm (cà phê, cao su, hồ tiêu), thủy năng và bảo vệ rừng đầu nguồn',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b27',
          number: 'Bài 27',
          title: 'Thực hành: Tìm hiểu sự phát triển cây công nghiệp ở Tây Nguyên',
          description: 'Phân tích bảng số liệu diện tích, sản lượng cà phê, hồ tiêu và giải pháp nâng cao giá trị',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b28',
          number: 'Bài 28',
          title: 'Khai thác thế mạnh ở Đông Nam Bộ',
          description: 'Đầu tàu kinh tế của cả nước, phát triển công nghiệp công nghệ cao, dầu khí và dịch vụ hiện đại',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b29',
          number: 'Bài 29',
          title: 'Thực hành: Tìm hiểu sự phát triển kinh tế - xã hội ở Đông Nam Bộ',
          description: 'Phân tích vùng kinh tế trọng điểm phía Nam và vai trò trung tâm của TP. Hồ Chí Minh',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b30',
          number: 'Bài 30',
          title: 'Phát triển kinh tế - xã hội ở Đồng bằng sông Cửu Long',
          description: 'Vựa lúa và vựa thủy sản lớn nhất nước, vấn đề thích ứng với biến đổi khí hậu và xâm nhập mặn',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b31',
          number: 'Bài 31',
          title: 'Thực hành: Tìm hiểu tác động của biến đổi khí hậu đến Đồng bằng sông Cửu Long',
          description: 'Đánh giá nguy cơ nước biển dâng, sạt lở bờ sông bờ biển và giải pháp sống chung với hạn mặn',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
        {
          id: 'dia-b32',
          number: 'Bài 32',
          title: 'Phát triển kinh tế biển và các đảo, quần đảo',
          description: 'Khai thác sinh vật biển, khoáng sản, du lịch biển đảo, giao thông hàng hải và chủ quyền Hoàng Sa, Trường Sa',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
      ],
    },
    {
      id: 'dia-phan-5',
      title: 'Phần 5: Địa lí địa phương',
      description: 'Tìm hiểu và nghiên cứu địa lí tỉnh / thành phố nơi em sinh sống',
      lessons: [
        {
          id: 'dia-b33',
          number: 'Bài 33',
          title: 'Thực hành: Tìm hiểu địa lí địa phương',
          description: 'Phương pháp thu thập tài liệu, khảo sát thực tế và viết báo cáo địa lí kinh tế - xã hội địa phương',
          loigiaihayUrl: 'https://loigiaihay.com/sgk-dia-li-lop-12-ket-noi-tri-thuc-c1859.html',
        },
      ],
    },
  ],

  toan: [
    {
      id: 'toan-c1',
      title: 'Chương 1: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số',
      description: 'Tính đơn điệu, cực trị, GTLN - GTNN, đường tiệm cận và khảo sát hàm số',
      lessons: [
        { id: 'toan-b1', number: 'Bài 1', title: 'Tính đơn điệu và cực trị của hàm số', description: 'Quy tắc xét dấu đạo hàm, điều kiện cực đại và cực tiểu' },
        { id: 'toan-b2', number: 'Bài 2', title: 'Giá trị lớn nhất và giá trị nhỏ nhất của hàm số', description: 'Tìm GTLN, GTNN trên đoạn và khoảng' },
        { id: 'toan-b3', number: 'Bài 3', title: 'Đường tiệm cận của đồ thị hàm số', description: 'Tiệm cận đứng, tiệm cận ngang và tiệm cận xiên' },
        { id: 'toan-b4', number: 'Bài 4', title: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số', description: 'Sơ đồ khảo sát hàm bậc 3, hàm phân thức bậc 1/bậc 1 và bậc 2/bậc 1' },
        { id: 'toan-b5', number: 'Bài 5', title: 'Ứng dụng đạo hàm giải quyết bài toán thực tế', description: 'Bài toán tối ưu kinh tế, tối ưu hình học và chuyển động' },
      ],
    },
    {
      id: 'toan-c2',
      title: 'Chương 2: Vectơ và hệ toạ độ trong không gian',
      description: 'Vectơ trong không gian, hệ trục toạ độ Oxyz và các phép toán toạ độ',
      lessons: [
        { id: 'toan-b6', number: 'Bài 6', title: 'Vectơ và các phép toán trong không gian', description: 'Tổng, hiệu, tích vectơ với một số, tích vô hướng' },
        { id: 'toan-b7', number: 'Bài 7', title: 'Hệ toạ độ trong không gian Oxyz', description: 'Toạ độ điểm, toạ độ vectơ, độ dài và góc giữa 2 vectơ' },
        { id: 'toan-b8', number: 'Bài 8', title: 'Biểu thức toạ độ của các phép toán vectơ', description: 'Tích có hướng và ứng dụng tính diện tích, thể tích' },
      ],
    },
    {
      id: 'toan-c3',
      title: 'Chương 3: Các số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm',
      description: 'Khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn',
      lessons: [
        { id: 'toan-b9', number: 'Bài 9', title: 'Khoảng biến thiên và khoảng tứ phân vị của mẫu ghép nhóm', description: 'Công thức tính Q1, Q2, Q3 và ý nghĩa thực tế' },
        { id: 'toan-b10', number: 'Bài 10', title: 'Phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm', description: 'Đo độ phân tán và độ rủi ro của dữ liệu' },
      ],
    },
    {
      id: 'toan-c4',
      title: 'Chương 4: Nguyên hàm và tích phân',
      description: 'Định nghĩa nguyên hàm, phương pháp tính tích phân và ứng dụng hình học',
      lessons: [
        { id: 'toan-b11', number: 'Bài 11', title: 'Nguyên hàm', description: 'Bảng nguyên hàm cơ bản và các tính chất' },
        { id: 'toan-b12', number: 'Bài 12', title: 'Tích phân xác định', description: 'Định nghĩa, tính chất và phương pháp đổi biến, từng phần' },
        { id: 'toan-b13', number: 'Bài 13', title: 'Ứng dụng hình học của tích phân', description: 'Tính diện tích hình phẳng và thể tích khối tròn xoay' },
      ],
    },
    {
      id: 'toan-c5',
      title: 'Chương 5: Phương trình mặt phẳng, đường thẳng và mặt cầu trong Oxyz',
      description: 'Phương trình tổng quát mặt phẳng, phương trình tham số đường thẳng và mặt cầu',
      lessons: [
        { id: 'toan-b14', number: 'Bài 14', title: 'Phương trình mặt phẳng', description: 'Véctơ pháp tuyến, viết phương trình mặt phẳng qua 3 điểm, vuông góc' },
        { id: 'toan-b15', number: 'Bài 15', title: 'Phương trình đường thẳng trong không gian', description: 'Véctơ chỉ phương, phương trình tham số và chính tắc' },
        { id: 'toan-b16', number: 'Bài 16', title: 'Phương trình mặt cầu', description: 'Tâm, bán kính và vị trí tương đối mặt cầu với mặt phẳng' },
      ],
    },
    {
      id: 'toan-c6',
      title: 'Chương 6: Xác suất có điều kiện',
      description: 'Xác suất có điều kiện, công thức nhân, xác suất toàn phần và công thức Bayes',
      lessons: [
        { id: 'toan-b17', number: 'Bài 17', title: 'Xác suất có điều kiện và công thức nhân', description: 'P(A|B) và quy tắc nhân xác suất biến cố phụ thuộc' },
        { id: 'toan-b18', number: 'Bài 18', title: 'Công thức xác suất toàn phần và công thức Bayes', description: 'Ứng dụng giải quyết bài toán chẩn đoán y khoa, kiểm tra chất lượng' },
      ],
    },
  ],

  van: [
    {
      id: 'van-tap1',
      title: 'Tập 1: Bài 1 - Khả năng lớn lao của tiểu thuyết',
      description: 'Khai phá tiềm năng nghệ thuật của tiểu thuyết hiện thực trào phúng',
      lessons: [
        { id: 'van-b1-1', number: 'Văn bản 1', title: 'Xuân Tóc Đỏ cứu quốc (Trích Số đỏ - Vũ Trọng Phụng)', description: 'Nghệ thuật trào phúng sắc sảo qua nhân vật Xuân Tóc Đỏ', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-xuan-toc-do-cuu-quoc-sgk-ngu-van-12-tap-1-ket-noi-tri-thuc-a155694.html' },
        { id: 'van-b1-2', number: 'Văn bản 2', title: 'Mùa lá rụng trong vườn (Ma Văn Kháng)', description: 'Thân phận con người Quyến qua bức tranh đời thường', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-noi-buon-chien-tranh-sgk-ngu-van-12-tap-1-ket-noi-tri-thuc-a155915.html' },
        { id: 'van-b1-3', number: 'Thực hành Tiếng Việt', title: 'Biện pháp tu từ nói mỉa, nghịch ngữ: Đặc điểm và tác dụng' },
        { id: 'van-b1-4', number: 'Viết', title: 'Viết bài văn nghị luận so sánh, đánh giá hai tác phẩm truyện' },
        { id: 'van-b1-5', number: 'Nói và nghe', title: 'Trình bày kết quả đánh giá so sánh hai tác phẩm truyện' },
        { id: 'van-b1-6', number: 'Thực hành đọc', title: 'Trên xuồng cứu nạn (Trích cuộc đời của Pi)' },
      ],
    },
    {
      id: 'van-b2',
      title: 'Tập 1: Bài 2 - Những thế giới thơ',
      description: 'Vẻ đẹp đa dạng của thơ ca hiện đại và cổ điển',
      lessons: [
        { id: 'van-b2-1', number: 'Văn bản 1', title: 'Cảm hoài (Trích Nỗi lòng - Đặng Dung)', description: 'Nỗi lòng chí khí bất khuất của Đặng Dung', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-cam-hoai-sgk-ngu-van-12-tap-1-ket-noi-tri-thuc-a157303.html' },
        { id: 'van-b2-2', number: 'Văn bản 2', title: 'Tây Tiến (Quang Dũng)', description: 'Vẻ đẹp bi tráng của người lính Tây Tiến', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-tay-tien-sgk-ngu-van-12-tap-1-ket-noi-tri-thuc-a157693.html' },
        { id: 'van-b2-3', number: 'Văn bản 3', title: 'Đàn ghi ta của Lor-ca (Thanh Thảo)', description: 'Hình tượng Lor-ca và âm hưởng tượng trưng siêu thực', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-dan-ghi-ta-cua-lor-ca-sgk-ngu-van-12-tap-1-ket-noi-tri-thuc-a157717.html' },
        { id: 'van-b2-4', number: 'Thực hành Tiếng Việt', title: 'Tác dụng của một số biện pháp tu từ trong thơ' },
        { id: 'van-b2-5', number: 'Viết', title: 'Viết bài văn nghị luận so sánh, đánh giá hai tác phẩm thơ' },
        { id: 'van-b2-6', number: 'Nói và nghe', title: 'Trình bày kết quả so sánh, đánh giá hai tác phẩm thơ' },
        { id: 'van-b2-7', number: 'Thực hành đọc', title: 'Bài thơ số 28 (Ta-go)' },
      ],
    },
    {
      id: 'van-b3',
      title: 'Tập 1: Bài 3 - Lập luận trong văn bản nghị luận',
      description: 'Kỹ năng phân tích và viết văn bản nghị luận xã hội',
      lessons: [
        { id: 'van-b3-1', number: 'Văn bản 1', title: 'Nhìn về vốn văn hóa dân tộc (Trần Đình Hượu)', description: 'Những hạn chế và giá trị của văn hóa truyền thống', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-nhin-ve-von-van-hoa-dan-toc-sgk-ngu-van-12-tap-1-ket-noi-tri-thuc-a158404.html' },
        { id: 'van-b3-2', number: 'Văn bản 2', title: 'Năng lực sáng tạo (Phan Đình Diệu)', description: 'Bản chất và điều kiện phát huy năng lực sáng tạo' },
        { id: 'van-b3-3', number: 'Văn bản 3', title: 'Mấy ý nghĩ về thơ (Nguyễn Đình Thi)', description: 'Quan niệm thẩm mĩ về thơ của Nguyễn Đình Thi' },
        { id: 'van-b3-4', number: 'Thực hành Tiếng Việt', title: 'Lỗi logic, lỗi câu mơ hồ và cách sửa' },
        { id: 'van-b3-5', number: 'Viết', title: 'Viết bài văn nghị luận về một vấn đề liên quan đến tuổi trẻ (những hoài bão, ước mơ)' },
        { id: 'van-b3-6', number: 'Nói và nghe', title: 'Thuyết trình về một vấn đề liên quan đến tuổi trẻ' },
      ],
    },
    {
      id: 'van-b4',
      title: 'Tập 1: Bài 4 - Yếu tố kì ảo trong truyện kể',
      description: 'Yếu tố kì ảo và chức năng thẩm mĩ, triết luận của truyện kể',
      lessons: [
        { id: 'van-b4-1', number: 'Văn bản 1', title: 'Hải khẩu linh từ (Đền thiêng cửa bể - Đoàn Thị Điểm)', description: 'Khát vọng bảo vệ chủ quyền biển đảo qua truyền thuyết', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-hai-khau-linh-tu-sgk-ngu-van-12-tap-1-ket-noi-tri-thuc-a159091.html' },
        { id: 'van-b4-2', number: 'Văn bản 2', title: 'Muối của rừng (Nguyễn Huy Thiệp)', description: 'Thông điệp trái tim nhân hậu, tôn trọng thiên nhiên', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-muoi-cua-rung-sgk-ngu-van-12-tap-1-ket-noi-tri-thuc-a159100.html' },
        { id: 'van-b4-3', number: 'Thực hành Tiếng Việt', title: 'Nghệ thuật sử dụng điển cố trong tác phẩm văn học' },
        { id: 'van-b4-4', number: 'Viết', title: 'Viết bài văn nghị luận về việc vay mượn – cải biến – sáng tạo trong một tác phẩm văn học' },
        { id: 'van-b4-5', number: 'Nói và nghe', title: 'Trình bày về việc vay mượn – cải biến – sáng tạo trong một tác phẩm văn học' },
        { id: 'van-b4-6', number: 'Thực hành đọc', title: 'Bến trần gian (Lưu Sơn Minh)' },
      ],
    },
    {
      id: 'van-b5',
      title: 'Tập 1: Bài 5 - Tiếng cười của hài kịch',
      description: 'Nghệ thuật gây cười và ý nghĩa phê phán của hài kịch',
      lessons: [
        { id: 'van-b5-1', number: 'Văn bản 1', title: 'Nhân vật quan trọng (Trích Quan thanh tra - Nikolai Gogol)', description: 'Tiếng cười châm biếm bộ máy hành chính Nga hoàng', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-nhan-vat-quan-trong-sgk-ngu-van-12-tap-1-ket-noi-tri-thuc-a159970.html' },
        { id: 'van-b5-2', number: 'Văn bản 2', title: 'Giấu của (Trích Quẫn - Lộng Chương)', description: 'Bi kịch và hài kịch trong nạn đói 1945' },
        { id: 'van-b5-3', number: 'Viết', title: 'Viết báo cáo nghiên cứu về một vấn đề tự nhiên, xã hội' },
        { id: 'van-b5-4', number: 'Nói và nghe', title: 'Trình bày báo cáo kết quả nghiên cứu về một vấn đề tự nhiên hoặc xã hội' },
        { id: 'van-b5-5', number: 'Thực hành đọc', title: 'Cẩn thận hão (Bô-mác-se)' },
      ],
    },
    {
      id: 'van-b6',
      title: 'Tập 2: Bài 6 - Hồ Chí Minh: Văn hóa phải soi đường cho quốc dân đi',
      description: 'Vẻ đẹp văn chương và tư tưởng vĩ đại của Chủ tịch Hồ Chí Minh',
      lessons: [
        { id: 'van-b6-1', number: 'Văn bản 1', title: 'Tác gia Hồ Chí Minh', description: 'Sự nghiệp sáng tác và phong cách nghệ thuật Hồ Chí Minh', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-tac-gia-ho-chi-minh-sgk-ngu-van-12-tap-2-ket-noi-tri-thuc-a160936.html' },
        { id: 'van-b6-2', number: 'Văn bản 2', title: 'Tuyên ngôn độc lập (Hồ Chí Minh)', description: 'Áng văn chính luận mẫu mực khai sinh nước Việt Nam Dân chủ Cộng hòa', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-tuyen-ngon-doc-lap-sgk-ngu-van-12-tap-2-ket-noi-tri-thuc-a161220.html' },
        { id: 'van-b6-3', number: 'Văn bản 3', title: 'Mộ (Chiều tối) + Nguyên tiêu (Rằm tháng giêng)', description: 'Vẻ đẹp cổ điển và hiện đại trong thơ Hồ Chí Minh', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-mo-chieu-toi-nguyen-tieu-ram-thang-gieng-sgk-ngu-van-12-tap-2-ket-noi-tri-thuc-a161399.html' },
        { id: 'van-b6-4', number: 'Văn bản 4', title: 'Những trò lố hay là Va-ren và Phan Bội Châu (Nguyễn Ái Quốc)', description: 'Đối lập Va-ren và Phan Bội Châu, tư thế vĩ đại của người chiến sĩ' },
        { id: 'van-b6-5', number: 'Thực hành Tiếng Việt', title: 'Một số biện pháp làm tăng tính khẳng định, phủ định trong văn bản nghị luận' },
        { id: 'van-b6-6', number: 'Nói và nghe', title: 'Trình bày kết quả của bài tập dự án' },
        { id: 'van-b6-7', number: 'Thực hành đọc', title: 'Vọng nguyệt + Cảnh khuya' },
      ],
    },
    {
      id: 'van-b7',
      title: 'Tập 2: Bài 7 - Sự thật trong tác phẩm kí',
      description: 'Chất liệu hiện thực và giá trị tư liệu của tác phẩm kí',
      lessons: [
        { id: 'van-b7-1', number: 'Văn bản 1', title: 'Nghệ thuật băm thịt gà (Trích Việc làng - Ngô Tất Tố)', description: 'Phơi bày thực trạng quan lại và tục lệ nhũng nhiễu ở nông thôn', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-nghe-thuat-bam-thit-ga-sgk-ngu-van-12-tap-2-ket-noi-tri-thuc-a161805.html' },
        { id: 'van-b7-2', number: 'Văn bản 2', title: 'Bước vào đời (Trích Nhớ nghĩ chiều hôm - Đào Duy Anh)', description: 'Hồi kí chân thực về buổi bước vào đời của học giả Đào Duy Anh' },
        { id: 'van-b7-3', number: 'Thực hành Tiếng Việt', title: 'Ngôn ngữ trang trọng và ngôn ngữ thân mật' },
        { id: 'van-b7-4', number: 'Viết', title: 'Viết bài văn nghị luận bàn về một vấn đề liên quan đến tuổi trẻ (cách ứng xử trong các mối quan hệ gia đình, xã hội)' },
        { id: 'van-b7-5', number: 'Nói và nghe', title: 'Trình bày quan điểm về một vấn đề liên quan đến tuổi trẻ' },
        { id: 'van-b7-6', number: 'Thực hành đọc', title: 'Vĩ tuyến 17' },
      ],
    },
    {
      id: 'van-b8',
      title: 'Tập 2: Bài 8 - Dữ liệu trong văn bản thông tin',
      description: 'Nhận diện và sử dụng hiệu quả dữ liệu trong văn bản thông tin',
      lessons: [
        { id: 'van-b8-1', number: 'Văn bản 1', title: 'Pa-ra-na (Parana) (Trích Nhiệt đới buồn - Cờ-lốt Lê-vi-Xtơ-rốt)', description: 'Thông tin khoa học xã hội được chuyển tải hấp dẫn', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-pa-ra-na-parana-sgk-ngu-van-12-tap-2-ket-noi-tri-thuc-a162168.html' },
        { id: 'van-b8-2', number: 'Văn bản 2', title: 'Giáo dục khai phóng Việt Nam nhìn từ Đông Kinh Nghĩa Thục (Nguyễn Nam)', description: 'Giá trị của phong trào giáo dục khai phóng đầu thế kỉ XX' },
        { id: 'van-b8-3', number: 'Văn bản 3', title: 'Đời muối (Trích Đời muối: Lịch sử thế giới - Mác Kơ-len-xki)', description: 'Lịch sử và vai trò của muối trong nền văn minh nhân loại' },
        { id: 'van-b8-4', number: 'Thực hành Tiếng Việt', title: 'Tôn trọng và bảo vệ quyền sở hữu trí tuệ' },
        { id: 'van-b8-5', number: 'Viết', title: 'Viết thư trao đổi về công việc hoặc một vấn đề đáng quan tâm' },
        { id: 'van-b8-6', number: 'Nói và nghe', title: 'Tranh biện về một vấn đề đời sống' },
      ],
    },
    {
      id: 'van-b9',
      title: 'Tập 2: Bài 9 - Văn học và cuộc đời',
      description: 'Mối quan hệ gắn bó mật thiết giữa văn học và hiện thực cuộc sống',
      lessons: [
        { id: 'van-b9-1', number: 'Văn bản 1', title: 'Vội vàng (Xuân Diệu)', description: 'Quan niệm sống vội vàng, tận hưởng vẻ đẹp cuộc đời', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-voi-vang-sgk-ngu-van-12-tap-2-ket-noi-tri-thuc-a162623.html' },
        { id: 'van-b9-2', number: 'Văn bản 2', title: 'Trở về (Trích Ông già và biển cả - Ơ-nít Hê-minh-uê)', description: 'Tư tưởng con người không bị đánh bại' },
        { id: 'van-b9-3', number: 'Văn bản 3', title: 'Hồn Trương Ba, da hàng thịt (Lưu Quang Vũ)', description: 'Bi kịch sống nhờ và khát vọng được là chính mình', loigiaihayUrl: 'https://loigiaihay.com/soan-bai-hon-truong-ba-da-hang-thit-sgk-ngu-van-12-tap-2-ket-noi-tri-thuc-a162693.html' },
        { id: 'van-b9-4', number: 'Thực hành Tiếng Việt', title: 'Giữ gìn và phát triển tiếng Việt' },
        { id: 'van-b9-5', number: 'Viết', title: 'Viết bài phát biểu trong lễ phát động một phong trào hoặc một hoạt động xã hội' },
        { id: 'van-b9-6', number: 'Nói và nghe', title: 'Thuyết trình về một vấn đề liên quan đến cơ hội và thách thức đối với đất nước' },
        { id: 'van-b9-7', number: 'Thực hành đọc', title: 'Khúc đồng quê (Trích Cô bé nhìn mưa - Đặng Thị Hạnh)' },
      ],
    },
  ],

  ly: [
    {
      id: 'ly-c1',
      title: 'Chương 1: Vật lí nhiệt',
      description: 'Mô hình phân tử, thang nhiệt độ, nội năng và các định luật nhiệt động lực học',
      lessons: [
        { id: 'ly-b1', number: 'Bài 1', title: 'Cấu trúc của chất và sự chuyển thể' },
        { id: 'ly-b2', number: 'Bài 2', title: 'Thang nhiệt độ Celsius và Kelvin' },
        { id: 'ly-b3', number: 'Bài 3', title: 'Nội năng và định luật I nhiệt động lực học' },
        { id: 'ly-b4', number: 'Bài 4', title: 'Nhiệt dung riêng và nhiệt nóng chảy riêng' },
        { id: 'ly-b5', number: 'Bài 5', title: 'Nhiệt hóa hơi riêng' },
      ],
    },
    {
      id: 'ly-c2',
      title: 'Chương 2: Khí lí tưởng',
      description: 'Thuyết động học phân tử, phương trình trạng thái và các định luật chất khí',
      lessons: [
        { id: 'ly-b6', number: 'Bài 6', title: 'Mô hình động học phân tử chất khí' },
        { id: 'ly-b7', number: 'Bài 7', title: 'Định luật Boyle về quá trình đẳng nhiệt' },
        { id: 'ly-b8', number: 'Bài 8', title: 'Định luật Charles về quá trình đẳng áp' },
        { id: 'ly-b9', number: 'Bài 9', title: 'Phương trình trạng thái khí lí tưởng' },
      ],
    },
    {
      id: 'ly-c3',
      title: 'Chương 3: Từ trường',
      description: 'Từ trường, lực từ, cảm ứng từ, hiện tượng cảm ứng điện từ và dòng điện xoay chiều',
      lessons: [
        { id: 'ly-b10', number: 'Bài 10', title: 'Từ trường và đường sức từ' },
        { id: 'ly-b11', number: 'Bài 11', title: 'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện' },
        { id: 'ly-b12', number: 'Bài 12', title: 'Cảm ứng từ và từ thông' },
        { id: 'ly-b13', number: 'Bài 13', title: 'Hiện tượng cảm ứng điện từ và định luật Faraday' },
        { id: 'ly-b14', number: 'Bài 14', title: 'Đại cương về dòng điện xoay chiều' },
      ],
    },
    {
      id: 'ly-c4',
      title: 'Chương 4: Vật lí hạt nhân',
      description: 'Cấu tạo hạt nhân, độ hụt khối, năng lượng liên kết, phóng xạ và phản ứng hạt nhân',
      lessons: [
        { id: 'ly-b15', number: 'Bài 15', title: 'Cấu tạo hạt nhân và năng lượng liên kết' },
        { id: 'ly-b16', number: 'Bài 16', title: 'Hiện tượng phóng xạ và định luật phóng xạ' },
        { id: 'ly-b17', number: 'Bài 17', title: 'Phản ứng phân hạch và phản ứng nhiệt hạch' },
        { id: 'ly-b18', number: 'Bài 18', title: 'Ứng dụng và an toàn bức xạ' },
      ],
    },
  ],

  hoa: [
    {
      id: 'hoa-c1',
      title: 'Chương 1: Ester - Lipid',
      description: 'Cấu tạo, tính chất hóa học, phản ứng xà phòng hóa và chất giặt rửa',
      lessons: [
        { id: 'hoa-b1', number: 'Bài 1', title: 'Ester (Đồng phân, danh pháp và phản ứng thủy phân)' },
        { id: 'hoa-b2', number: 'Bài 2', title: 'Lipid và chất béo (Triglyceride, omega-3, omega-6)' },
        { id: 'hoa-b3', number: 'Bài 3', title: 'Xà phòng và chất giặt rửa tổng hợp' },
      ],
    },
    {
      id: 'hoa-c2',
      title: 'Chương 2: Carbohydrate',
      description: 'Monosaccharide, disaccharide và polysaccharide trong đời sống',
      lessons: [
        { id: 'hoa-b4', number: 'Bài 4', title: 'Glucose và Fructose (Phản ứng tráng gương, lên men)' },
        { id: 'hoa-b5', number: 'Bài 5', title: 'Saccharose và Maltose' },
        { id: 'hoa-b6', number: 'Bài 6', title: 'Tinh bột và Cellulose' },
      ],
    },
    {
      id: 'hoa-c3',
      title: 'Chương 3: Hợp chất chứa Nitrogen',
      description: 'Amine, Amino acid, Peptide và Protein',
      lessons: [
        { id: 'hoa-b7', number: 'Bài 7', title: 'Amine (Phân loại, tính base và anilin)' },
        { id: 'hoa-b8', number: 'Bài 8', title: 'Amino acid (Tính lưỡng tính, điểm đẳng điện)' },
        { id: 'hoa-b9', number: 'Bài 9', title: 'Peptide và Protein (Cấu trúc, phản ứng màu biuret)' },
        { id: 'hoa-b10', number: 'Bài 10', title: 'Enzyme và acid nucleic' },
      ],
    },
    {
      id: 'hoa-c4',
      title: 'Chương 4: Polymer',
      description: 'Đại cương về polymer, phản ứng trùng hợp, trùng ngưng và vật liệu composite',
      lessons: [
        { id: 'hoa-b11', number: 'Bài 11', title: 'Đại cương về polymer' },
        { id: 'hoa-b12', number: 'Bài 12', title: 'Vật liệu polymer (Chất dẻo, tơ, cao su, keo dán)' },
      ],
    },
    {
      id: 'hoa-c5',
      title: 'Chương 5: Pin điện và điện phân',
      description: 'Thế điện cực chuẩn, pin Galvani và điện phân dung dịch',
      lessons: [
        { id: 'hoa-b13', number: 'Bài 13', title: 'Thế điện cực chuẩn của kim loại' },
        { id: 'hoa-b14', number: 'Bài 14', title: 'Pin điện hóa và ắc quy' },
        { id: 'hoa-b15', number: 'Bài 15', title: 'Điện phân và ứng dụng mạ điện, tinh luyện kim loại' },
      ],
    },
    {
      id: 'hoa-c6',
      title: 'Chương 6: Kim loại chuyển tiếp và phức chất',
      description: 'Đặc điểm kim loại chuyển tiếp dãy thứ nhất và đại cương về phức chất',
      lessons: [
        { id: 'hoa-b16', number: 'Bài 16', title: 'Đại cương về phức chất' },
        { id: 'hoa-b17', number: 'Bài 17', title: 'Sự hình thành liên kết và danh pháp phức chất' },
        { id: 'hoa-b18', number: 'Bài 18', title: 'Ứng dụng của phức chất trong y học và công nghệ' },
      ],
    },
  ],

  sinh: [
    {
      id: 'sinh-c1',
      title: 'Chương 1: Di truyền phân tử và di truyền nhiễm sắc thể',
      description: 'Gen, mã di truyền, nhân đôi DNA, phiên mã, dịch mã và đột biến gen',
      lessons: [
        { id: 'sinh-b1', number: 'Bài 1', title: 'Gen, mã di truyền và quá trình tái bản DNA' },
        { id: 'sinh-b2', number: 'Bài 2', title: 'Phiên mã và dịch mã' },
        { id: 'sinh-b3', number: 'Bài 3', title: 'Điều hòa hoạt động gen (Mô hình Operon Lac)' },
        { id: 'sinh-b4', number: 'Bài 4', title: 'Đột biến gen' },
        { id: 'sinh-b5', number: 'Bài 5', title: 'Nhiễm sắc thể và đột biến cấu trúc, số lượng NST' },
      ],
    },
    {
      id: 'sinh-c2',
      title: 'Chương 2: Quy luật di truyền và di truyền quần thể',
      description: 'Mendel, tương tác gen, liên kết gen, hoán vị gen và trạng thái cân bằng Hardy-Weinberg',
      lessons: [
        { id: 'sinh-b6', number: 'Bài 6', title: 'Các quy luật di truyền của Mendel' },
        { id: 'sinh-b7', number: 'Bài 7', title: 'Liên kết gen và hoán vị gen' },
        { id: 'sinh-b8', number: 'Bài 8', title: 'Di truyền liên kết giới tính và di truyền ngoài nhân' },
        { id: 'sinh-b9', number: 'Bài 9', title: 'Di truyền học quần thể và định luật Hardy-Weinberg' },
      ],
    },
    {
      id: 'sinh-c3',
      title: 'Chương 3: Tiến hóa và sinh thái học',
      description: 'Thuyết tiến hóa hiện đại, sinh thái học cá thể, quần xã và hệ sinh thái',
      lessons: [
        { id: 'sinh-b10', number: 'Bài 10', title: 'Học thuyết tiến hóa tổng hợp hiện đại' },
        { id: 'sinh-b11', number: 'Bài 11', title: 'Quần xã sinh vật và diễn thế sinh thái' },
        { id: 'sinh-b12', number: 'Bài 12', title: 'Hệ sinh thái, chu trình sinh địa hóa và bảo vệ sinh quyển' },
      ],
    },
  ],

  su: [
    {
      id: 'su-c1',
      title: 'Chủ đề 1: Thế giới trong và sau Chiến tranh Lạnh',
      description: 'Trật tự thế giới hai cực Ianta, Liên Hợp Quốc và xu thế đa cực',
      lessons: [
        { id: 'su-b1', number: 'Bài 1', title: 'Liên Hợp Quốc: Mục tiêu, nguyên tắc và vai trò duy trì hòa bình' },
        { id: 'su-b2', number: 'Bài 2', title: 'Trật tự thế giới trong Chiến tranh Lạnh' },
        { id: 'su-b3', number: 'Bài 3', title: 'Trật tự thế giới sau Chiến tranh Lạnh và xu thế đa cực' },
      ],
    },
    {
      id: 'su-c2',
      title: 'Chủ đề 2: ASEAN: Những chặng đường lịch sử',
      description: 'Sự thành lập, phát triển và xây dựng Cộng đồng ASEAN',
      lessons: [
        { id: 'su-b4', number: 'Bài 4', title: 'Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á (ASEAN)' },
        { id: 'su-b5', number: 'Bài 5', title: 'Cộng đồng ASEAN: Tầm nhìn và triển vọng' },
      ],
    },
    {
      id: 'su-c3',
      title: 'Chủ đề 3: Cách mạng tháng Tám 1945 và các cuộc kháng chiến bảo vệ Tổ quốc',
      description: 'Nghệ thuật quân sự, Điện Biên Phủ 1954 và Đại thắng mùa Xuân 1975',
      lessons: [
        { id: 'su-b6', number: 'Bài 6', title: 'Cách mạng tháng Tám năm 1945' },
        { id: 'su-b7', number: 'Bài 7', title: 'Cuộc kháng chiến chống thực dân Pháp (1945 - 1954) & Điện Biên Phủ' },
        { id: 'su-b8', number: 'Bài 8', title: 'Cuộc kháng chiến chống Mỹ, cứu nước (1954 - 1975) & Đại thắng mùa Xuân 1975' },
        { id: 'su-b9', number: 'Bài 9', title: 'Đấu tranh bảo vệ biên giới và chủ quyền biển đảo' },
      ],
    },
    {
      id: 'su-c4',
      title: 'Chủ đề 4: Công cuộc Đổi mới ở Việt Nam từ năm 1986 đến nay',
      description: 'Bối cảnh, đường lối đổi mới toàn diện và thành tựu kinh tế, xã hội, đối ngoại',
      lessons: [
        { id: 'su-b10', number: 'Bài 10', title: 'Đường lối Đổi mới của Đảng từ Đại hội VI (1986)' },
        { id: 'su-b11', number: 'Bài 11', title: 'Thành tựu và bài học kinh nghiệm của công cuộc Đổi mới' },
      ],
    },
  ],

  anh: [
    {
      id: 'anh-u1',
      title: 'Unit 1: Life Stories',
      description: 'Grammar: Past Simple vs. Past Continuous, Vocabulary about inspiring lives',
      lessons: [
        { id: 'anh-l1', number: 'Lesson 1', title: 'Getting Started: Exceptional role models' },
        { id: 'anh-l2', number: 'Lesson 2', title: 'Language: Pronunciation, Vocabulary & Past tenses' },
        { id: 'anh-l3', number: 'Lesson 3', title: 'Reading: Stories of determination and success' },
        { id: 'anh-l4', number: 'Lesson 4', title: 'Writing: Writing a biography' },
      ],
    },
    {
      id: 'anh-u2',
      title: 'Unit 2: A Multicultural World',
      description: 'Grammar: Articles (a/an/the/zero article), Culture and identity',
      lessons: [
        { id: 'anh-l5', number: 'Lesson 1', title: 'Getting Started: Cultural diversity' },
        { id: 'anh-l6', number: 'Lesson 2', title: 'Language: Article rules and vocabulary' },
        { id: 'anh-l7', number: 'Lesson 3', title: 'Reading: Preserving traditions in a globalized world' },
      ],
    },
    {
      id: 'anh-u3',
      title: 'Unit 3: Green Living',
      description: 'Grammar: Gerunds and Infinitives, Environmental protection',
      lessons: [
        { id: 'anh-l8', number: 'Lesson 1', title: 'Getting Started: Sustainable lifestyle habits' },
        { id: 'anh-l9', number: 'Lesson 2', title: 'Language: Complex sentence structures' },
        { id: 'anh-l10', number: 'Lesson 3', title: 'Reading: Eco-friendly innovations and carbon footprint' },
      ],
    },
    {
      id: 'anh-u4',
      title: 'Unit 4: Urbanisation',
      description: 'Grammar: Subjunctive mood / Conditional sentences, Smart cities',
      lessons: [
        { id: 'anh-l11', number: 'Lesson 1', title: 'Getting Started: Pros and cons of moving to megacities' },
        { id: 'anh-l12', number: 'Lesson 2', title: 'Language: Phrasal verbs & Advanced conditionals' },
        { id: 'anh-l13', number: 'Lesson 3', title: 'Reading: Sustainable urban development' },
      ],
    },
    {
      id: 'anh-u5',
      title: 'Unit 5: Artificial Intelligence & The Future of Work',
      description: 'Grammar: Passive voice with modals, Relative clauses',
      lessons: [
        { id: 'anh-l14', number: 'Lesson 1', title: 'Getting Started: AI tools and future careers' },
        { id: 'anh-l15', number: 'Lesson 2', title: 'Language: Technical collocations & Passive forms' },
        { id: 'anh-l16', number: 'Lesson 3', title: 'Reading: How automation transforms workplaces' },
      ],
    },
  ],

  gdktpl: [
    {
      id: 'gdktpl-c1',
      title: 'Chủ đề 1: Tăng trưởng và phát triển kinh tế',
      description: 'Các chỉ tiêu GDP, GNI, tăng trưởng bền vững và phát triển bao trùm',
      lessons: [
        { id: 'gdktpl-b1', number: 'Bài 1', title: 'Tăng trưởng và phát triển kinh tế' },
        { id: 'gdktpl-b2', number: 'Bài 2', title: 'Hội nhập kinh tế quốc tế và toàn cầu hóa' },
        { id: 'gdktpl-b3', number: 'Bài 3', title: 'Bảo hiểm và an sinh xã hội' },
      ],
    },
    {
      id: 'gdktpl-c2',
      title: 'Chủ đề 2: Pháp luật và quyền công dân',
      description: 'Quyền tự do kinh doanh, sở hữu tài sản và nghĩa vụ pháp lý của công dân',
      lessons: [
        { id: 'gdktpl-b4', number: 'Bài 4', title: 'Quyền và nghĩa vụ của công dân về kinh tế' },
        { id: 'gdktpl-b5', number: 'Bài 5', title: 'Quyền và nghĩa vụ của công dân về văn hóa, xã hội' },
        { id: 'gdktpl-b6', number: 'Bài 6', title: 'Bảo vệ quyền con người và pháp quyền xã hội chủ nghĩa' },
      ],
    },
  ],

  tin: [
    {
      id: 'tin-c1',
      title: 'Chủ đề A & B: Mạng máy tính và Dữ liệu số',
      description: 'Kiến trúc mạng Internet, giao thức TCP/IP, điện toán đám mây và an toàn số',
      lessons: [
        { id: 'tin-b1', number: 'Bài 1', title: 'Cơ sở mạng máy tính và giao thức mạng' },
        { id: 'tin-b2', number: 'Bài 2', title: 'Bảo mật thông tin và an toàn trên không gian mạng' },
        { id: 'tin-b3', number: 'Bài 3', title: 'Điện toán đám mây và kết nối vạn vật (IoT)' },
      ],
    },
    {
      id: 'tin-c2',
      title: 'Chủ đề F: Trí tuệ nhân tạo (AI) và Thiết kế Web',
      description: 'Ứng dụng AI hiện đại, học máy và xây dựng trang web với HTML/CSS/JavaScript',
      lessons: [
        { id: 'tin-b4', number: 'Bài 4', title: 'Khái niệm cơ bản về Trí tuệ nhân tạo (AI)' },
        { id: 'tin-b5', number: 'Bài 5', title: 'Ứng dụng của AI trong đời sống và cảnh báo rủi ro' },
        { id: 'tin-b6', number: 'Bài 6', title: 'Thiết kế trang web với ngôn ngữ HTML và CSS' },
      ],
    },
  ],

  congnghe: [
    {
      id: 'cn-c1',
      title: 'Chuyên đề Công nghệ Điện - Điện tử 12',
      description: 'Hệ thống điện quốc gia, an toàn điện và vi điều khiển',
      lessons: [
        { id: 'cn-b1', number: 'Bài 1', title: 'Hệ thống điện quốc gia và lưới điện truyền tải' },
        { id: 'cn-b2', number: 'Bài 2', title: 'Sản xuất điện năng từ năng lượng tái tạo' },
        { id: 'cn-b3', number: 'Bài 3', title: 'Mạch điện tử điều khiển và cảm biến thông minh' },
      ],
    },
    {
      id: 'cn-c2',
      title: 'Chuyên đề Công nghệ Lâm nghiệp & Thủy sản 12',
      description: 'Quản lí rừng bền vững và nuôi trồng thủy sản công nghệ cao',
      lessons: [
        { id: 'cn-b4', number: 'Bài 4', title: 'Quản lí và bảo vệ tài nguyên rừng' },
        { id: 'cn-b5', number: 'Bài 5', title: 'Kỹ thuật nuôi trồng thủy sản công nghệ cao' },
      ],
    },
  ],
};
