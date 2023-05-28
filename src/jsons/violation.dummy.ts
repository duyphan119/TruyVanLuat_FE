function getItem(
  code: string,
  title: string,
  punishment: string,
  apply_for: string,
  note: string,
  addition_punishment: string,
  addition_punishment_code: string
) {
  const [_, _c1, _c2, _c3] = code.split(`_`);
  const [__, __c1, __c2, __c3] = addition_punishment_code.split(`_`);
  return {
    type: `vi_pham`,
    detail: `${
      _c3 ? `Điểm ${_c3 === `dd` ? `đ` : _c3} ` : ""
    }Khoản ${_c2} Điều ${_c1} Nghị định 100/2019/NĐ-CP`,
    code,
    title,
    punishment,
    apply_for,
    note,
    addition_punishment,
    ...(addition_punishment_code !== ""
      ? {
          addition_punishment_code,
          addition_punishment_detail: `Điểm ${
            _c3 === `dd` ? `đ` : _c3
          } Khoản ${_c2} Điều ${_c1} Nghị định 100/2019/NĐ-CP`,
        }
      : {}),
  };
}
export const violationData = [
  getItem(
    `diem_5_1_a`,
    `Không chấp hành hiệu lệnh, chỉ dẫn của biển báo hiệu, vạch kẻ đường`,
    `Phạt tiền từ 200.000 đồng đến 400.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_1_b`,
    `Chuyển hướng không nhường quyền đi trước cho: Người đi bộ, xe lăn của người khuyết tật qua đường tại nơi có vạch kẻ đường dành cho người đi bộ; xe thô sơ đang đi trên phần đường dành cho xe thô sơ`,
    `Phạt tiền từ 200.000 đồng đến 400.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_1_c`,
    `Chuyển hướng không nhường đường cho: Các xe đi ngược chiều; người đi bộ, xe lăn của người khuyết tật đang qua đường tại nơi không có vạch kẻ đường cho người đi bộ`,
    `Phạt tiền từ 200.000 đồng đến 400.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_1_d`,
    `Khi dừng xe, đỗ xe không có tín hiệu báo cho người điều khiển phương tiện khác biết`,
    `Phạt tiền từ 200.000 đồng đến 400.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_1_dd`,
    `Khi đỗ xe chiếm một phần đường xe chạy không đặt ngay báo hiệu nguy hiểm theo quy định`,
    `Phạt tiền từ 200.000 đồng đến 400.000 đồng`,
    `Xe ô tô`,
    `Trừ hành vi vi phạm quy định tại điểm c khoản 6 Điều này và trường hợp đỗ xe tại vị trí quy định được phép đỗ xe`,
    ``,
    ``
  ),
  getItem(
    `diem_5_1_e`,
    `Không gắn biển báo hiệu ở phía trước xe kéo, phía sau xe được kéo; điều khiển xe kéo rơ moóc không có biển báo hiệu theo quy định`,
    `Phạt tiền từ 200.000 đồng đến 400.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_1_g`,
    `Bấm còi trong đô thị và khu đông dân cư trong thời gian từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau`,
    `Phạt tiền từ 200.000 đồng đến 400.000 đồng`,
    `Xe ô tô`,
    `Trừ các xe ưu tiên đang đi làm nhiệm vụ theo quy định.`,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_a`,
    `Chuyển làn đường không đúng nơi cho phép hoặc không có tín hiệu báo trước`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    `Trừ các hành vi vi phạm quy định tại điểm g khoản 5 Điều này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_b`,
    `Điều khiển xe chạy tốc độ thấp hơn các xe khác đi cùng chiều mà không đi về bên phải phần đường xe chạy, trừ trường hợp các xe khác đi cùng chiều chạy quá tốc độ quy định`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_c`,
    `Chở người trên buồng lái quá số lượng quy định`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_d`,
    `Không tuân thủ các quy định về nhường đường tại nơi đường bộ giao nhau`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    `Trừ các hành vi vi phạm quy định tại điểm m, điểm n khoản 3 Điều này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_dd`,
    `Điều khiển xe có liên quan trực tiếp đến vụ tai nạn giao thông mà không dừng lại, không giữ nguyên hiện trường, không tham gia cấp cứu người bị nạn`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    `Trừ hành vi vi phạm quy định tại điểm b khoản 8 Điều này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_e`,
    `Xe được quyền ưu tiên lắp đặt, sử dụng thiết bị phát tín hiệu ưu tiên không đúng quy định hoặc sử dụng thiết bị phát tín hiệu ưu tiên mà không có giấy phép của cơ quan có thẩm quyền cấp hoặc có giấy phép của cơ quan có thẩm quyền cấp nhưng không còn giá trị sử dụng theo quy định`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_g`,
    `Dừng xe, đỗ xe trên phần đường xe chạy ở đoạn đường ngoài đô thị nơi có lề đường rộng; dừng xe, đỗ xe không sát mép đường phía bên phải theo chiều đi ở nơi đường có lề đường hẹp hoặc không có lề đường; dừng xe, đỗ xe ngược với chiều lưu thông của làn đường; dừng xe, đỗ xe trên dải phân cách cố định ở giữa hai phần đường xe chạy; đỗ xe trên dốc không chèn bánh; mở cửa xe, để cửa xe mở không bảo đảm an toàn`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_h`,
    `Dừng xe không sát theo lề đường, hè phố phía bên phải theo chiều đi hoặc bánh xe gần nhất cách lề đường, hè phố quá 0,25 m; dừng xe trên đường xe điện, đường dành riêng cho xe buýt; dừng xe trên miệng cống thoát nước, miệng hầm của đường điện thoại, điện cao thế, chỗ dành riêng cho xe chữa cháy lấy nước; rời vị trí lái, tắt máy khi dừng xe; dừng xe, đỗ xe không đúng vị trí quy định ở những đoạn có bố trí nơi dừng xe, đỗ xe; dừng xe, đỗ xe trên phần đường dành cho người đi bộ qua đường; dừng xe nơi có biển “Cấm dừng xe và đỗ xe”`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    `Trừ hành vi vi phạm quy định tại điểm i khoản 4, điểm b khoản 6 Điều này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_i`,
    `Quay đầu xe trái quy định trong khu dân cư`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_2_k`,
    `Quay đầu xe ở phần đường dành cho người đi bộ qua đường, trên cầu, đầu cầu, ngầm, gầm cầu vượt, trừ trường hợp tổ chức giao thông tại những khu vực này có bố trí nơi quay đầu xe`,
    `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_a`,
    `Điều khiển xe chạy quá tốc độ quy định từ 05 km/h đến dưới 10 km/h;`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_b`,
    `Bấm còi, rú ga liên tục; bấm còi hơi, sử dụng đèn chiếu xa trong đô thị, khu đông dân cư, trừ các xe ưu tiên đang đi làm nhiệm vụ theo quy định`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_c`,
    `Chuyển hướng không giảm tốc độ hoặc không có tín hiệu báo hướng rẽ`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    `Trừ trường hợp điều khiển xe đi theo hướng cong của đoạn đường bộ ở nơi đường không giao nhau cùng mức`,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_d`,
    `Không tuân thủ các quy định về dừng xe, đỗ xe tại nơi đường bộ giao nhau cùng mức với đường sắt; dừng xe, đỗ xe trong phạm vi an toàn của đường sắt`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    `Trừ hành vi vi phạm quy định tại điểm b khoản 2, điểm b khoản 3 Điều 49 Nghị định này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_dd`,
    `Dừng xe, đỗ xe tại vị trí: nơi đường bộ giao nhau hoặc trong phạm vi 05 m tính từ mép đường giao nhau; điểm dừng đón, trả khách của xe buýt; trước cổng hoặc trong phạm vi 05 m hai bên cổng trụ sở cơ quan, tổ chức có bố trí đường cho xe ô tô ra vào; nơi phần đường có bề rộng chỉ đủ cho một làn xe; che khuất biển báo hiệu đường bộ; nơi mở dải phân cách giữa;`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_e`,
    `Đỗ xe không sát theo lề đường, hè phố phía bên phải theo chiều đi hoặc bánh xe gần nhất cách lề đường, hè phố quá 0,25 m; đỗ xe trên đường xe điện, đường dành riêng cho xe buýt; đỗ xe trên miệng cống thoát nước, miệng hầm của đường điện thoại, điện cao thế, chỗ dành riêng cho xe chữa cháy lấy nước; đỗ, để xe ở hè phố trái quy định của pháp luật; đỗ xe nơi có biển “Cấm đỗ xe” hoặc biển “Cấm dừng xe và đỗ xe”`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    `Trừ hành vi vi phạm quy định tại điểm i khoản 4, điểm b khoản 6 Điều này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_g`,
    `Không sử dụng hoặc sử dụng không đủ đèn chiếu sáng trong thời gian từ 19 giờ ngày hôm trước đến 05 giờ ngày hôm sau, khi sương mù, thời tiết xấu hạn chế tầm nhìn; sử dụng đèn chiếu xa khi tránh xe đi ngược chiều;`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_h`,
    `Điều khiển xe ô tô kéo theo xe khác, vật khác (trừ trường hợp kéo theo một rơ moóc, sơ mi rơ moóc hoặc một xe ô tô, xe máy chuyên dùng khác khi xe này không tự chạy được); điều khiển xe ô tô đẩy xe khác, vật khác; điều khiển xe kéo rơ moóc, sơ mi rơ moóc kéo thêm rơ moóc hoặc xe khác, vật khác; không nối chắc chắn, an toàn giữa xe kéo và xe được kéo khi kéo nhau;`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_i`,
    `Chở người trên xe được kéo`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    `Trừ người điều khiển`,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_k`,
    `Quay đầu xe tại nơi đường bộ giao nhau cùng mức với đường sắt; quay đầu xe tại nơi đường hẹp, đường dốc, đoạn đường cong tầm nhìn bị che khuất, nơi có biển báo “Cấm quay đầu xe”`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_l`,
    `Không giữ khoảng cách an toàn để xảy ra va chạm với xe chạy liền trước hoặc không giữ khoảng cách theo quy định của biển báo hiệu “Cự ly tối thiểu giữa hai xe”`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    `Trừ các hành vi vi phạm quy định tại điểm g khoản 5 Điều này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_m`,
    `Không giảm tốc độ và nhường đường khi điều khiển xe chạy từ trong ngõ, đường nhánh ra đường chính`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_n`,
    `Không nhường đường cho xe đi trên đường ưu tiên, đường chính từ bất kỳ hướng nào tới tại nơi đường giao nhau`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_o`,
    `Lùi xe ở đường một chiều, đường có biển “Cấm đi ngược chiều”, khu vực cấm dừng, trên phần đường dành cho người đi bộ qua đường, nơi đường bộ giao nhau, nơi đường bộ giao nhau cùng mức với đường sắt, nơi tầm nhìn bị che khuất; lùi xe không quan sát hoặc không có tín hiệu báo trước`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    `Trừ hành vi vi phạm quy định tại điểm a khoản 8 Điều này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_p`,
    `Không thắt dây an toàn khi điều khiển xe chạy trên đường`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_q`,
    `Chở người trên xe ô tô không thắt dây an toàn (tại vị trí có trang bị dây an toàn) khi xe đang chạy`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_r`,
    `Chạy trong hầm đường bộ không sử dụng đèn chiếu sáng gần`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_3_s`,
    `Điều khiển xe chạy dưới tốc độ tối thiểu trên những đoạn đường bộ có quy định tốc độ tối thiểu cho phép`,
    `Phạt tiền từ 800.000 đồng đến 1.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_4_a`,
    `Dùng tay sử dụng điện thoại di động khi đang điều khiển xe chạy trên đường;`,
    `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_4_b`,
    `Đi vào khu vực cấm, đường có biển báo hiệu có nội dung cấm đi vào đối với loại phương tiện đang điều khiển`,
    `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    `Xe ô tô`,
    `Trừ các hành vi vi phạm quy định tại điểm c khoản 5, điểm a khoản 8 Điều này và các trường hợp xe ưu tiên đang đi làm nhiệm vụ khẩn cấp theo quy định`,
    ``,
    ``
  ),
  getItem(
    `diem_5_4_c`,
    `Điều khiển xe không đủ điều kiện để thu phí theo hình thức điện tử tự động không dừng đi vào làn đường dành riêng thu phí theo hình thức điện tử tự động không dừng tại các trạm thu phí;`,
    `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_4_d`,
    `Dừng xe, đỗ xe tại vị trí: Bên trái đường một chiều hoặc bên trái (theo hướng lưu thông) của đường đôi; trên đoạn đường cong hoặc gần đầu dốc nơi tầm nhìn bị che khuất; trên cầu, gầm cầu vượt, song song với một xe khác đang dừng, đỗ`,
    `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    `Xe ô tô`,
    `Trừ hành vi vi phạm quy định tại điểm b khoản 6 Điều này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_4_dd`,
    `Dừng xe, đỗ xe, quay đầu xe trái quy định gây ùn tắc giao thông;`,
    `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_4_e`,
    `Xe không được quyền ưu tiên lắp đặt, sử dụng thiết bị phát tín hiệu của xe được quyền ưu tiên;`,
    `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_4_g`,
    `Không thực hiện biện pháp bảo đảm an toàn theo quy định khi xe ô tô bị hư hỏng ngay tại nơi đường bộ giao nhau cùng mức với đường sắt;`,
    `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_4_h`,
    `Không nhường đường cho xe xin vượt khi có đủ điều kiện an toàn;`,
    `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_4_i`,
    `Lùi xe, quay đầu xe trong hầm đường bộ; dừng xe, đỗ xe, vượt xe trong hầm đường bộ không đúng nơi quy định.`,
    `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    `Xe ô tô`,
    `Trừ người điều khiển`,
    ``,
    ``
  ),
  getItem(
    `diem_5_5_a`,
    `Không chấp hành hiệu lệnh của đèn tín hiệu giao thông;`,
    `Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_5_b`,
    `Không chấp hành hiệu lệnh, hướng dẫn của người điều khiển giao thông hoặc người kiểm soát giao thông`,
    `Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_5_c`,
    `Trừ hành vi vi phạm quy định tại điểm i khoản 4, điểm b khoản 6 Điều này`,
    `Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng`,
    `Xe ô tô`,
    `Trừ các hành vi vi phạm quy định tại điểm a khoản 8 Điều này và các trường hợp xe ưu tiên đang đi làm nhiệm vụ khẩn cấp theo quy định`,
    ``,
    ``
  ),
  getItem(
    `diem_5_5_d`,
    `Vượt xe trong những trường hợp không được vượt, vượt xe tại đoạn đường có biển báo hiệu có nội dung cấm vượt (đối với loại phương tiện đang điều khiển); không có báo hiệu trước khi vượt; vượt bên phải xe khác trong trường hợp không được phép, trừ trường hợp tại đoạn đường có nhiều làn đường cho xe đi cùng chiều được phân biệt bằng vạch kẻ phân làn đường mà xe chạy trên làn đường bên phải chạy nhanh hơn xe đang chạy trên làn đường bên trái`,
    `Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_5_dd`,
    `Điều khiển xe không đi bên phải theo chiều đi của mình; đi không đúng phần đường hoặc làn đường quy định (làn cùng chiều hoặc làn ngược chiều) trừ hành vi quy định tại điểm c khoản 4 Điều này; điều khiển xe đi qua dải phân cách cố định ở giữa hai phần đường xe chạy; điều khiển xe đi trên hè phố, trừ trường hợp điều khiển xe đi qua hè phố để vào nhà`,
    `Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_5_e`,
    `Không tuân thủ các quy định khi vào hoặc ra đường cao tốc; điều khiển xe chạy ở làn dừng xe khẩn cấp hoặc phần lề đường của đường cao tốc; chuyển làn đường không đúng nơi cho phép hoặc không có tín hiệu báo trước khi chạy trên đường cao tốc; không tuân thủ quy định về khoảng cách an toàn đối với xe chạy liền trước khi chạy trên đường cao tốc`,
    `Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_5_g`,
    `Không tuân thủ các quy định khi vào hoặc ra đường cao tốc; điều khiển xe chạy ở làn dừng xe khẩn cấp hoặc phần lề đường của đường cao tốc; chuyển làn đường không đúng nơi cho phép hoặc không có tín hiệu báo trước khi chạy trên đường cao tốc; không tuân thủ quy định về khoảng cách an toàn đối với xe chạy liền trước khi chạy trên đường cao tốc;`,
    `Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_5_h`,
    `Không nhường đường hoặc gây cản trở xe được quyền ưu tiên đang phát tín hiệu ưu tiên đi làm nhiệm vụ`,
    `Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_5_i`,
    `Điều khiển xe chạy quá tốc độ quy định từ 10 km/h đến 20 km/h.`,
    `Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng`,
    `Xe ô tô`,
    `Trừ người điều khiển`,
    ``,
    ``
  ),
  getItem(
    `diem_5_6_a`,
    `Điều khiển xe chạy quá tốc độ quy định trên 20 km/h đến 35 km/h`,
    `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_6_b`,
    `Dừng xe, đỗ xe trên đường cao tốc không đúng nơi quy định; không có báo hiệu để người lái xe khác biết khi buộc phải dừng xe, đỗ xe trên đường cao tốc không đúng nơi quy định; quay đầu xe trên đường cao tốc;`,
    `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_6_c`,
    `Điều khiển xe trên đường mà trong máu hoặc hơi thở có nồng độ cồn nhưng chưa vượt quá 50 miligam/100 mililít máu hoặc chưa vượt quá 0,25 miligam/1 lít khí thở`,
    `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_7_a`,
    `Không chú ý quan sát, điều khiển xe chạy quá tốc độ quy định gây tai nạn giao thông; dừng xe, đỗ xe, quay đầu xe, lùi xe, tránh xe, vượt xe, chuyển hướng, chuyển làn đường không đúng quy định gây tai nạn giao thông; không đi đúng phần đường, làn đường, không giữ khoảng cách an toàn giữa hai xe theo quy định gây tai nạn giao thông hoặc đi vào đường có biển báo hiệu có nội dung cấm đi vào đối với loại phương tiện đang điều khiển, đi ngược chiều của đường một chiều, đi ngược chiều trên đường có biển “Cấm đi ngược chiều” gây tai nạn giao thông`,
    `Phạt tiền từ 10.000.000 đồng đến 12.000.000 đồng`,
    `Xe ô tô`,
    `Trừ các hành vi vi phạm quy định tại điểm a khoản 8 Điều này`,
    ``,
    ``
  ),
  getItem(
    `diem_5_7_b`,
    `Điều khiển xe lạng lách, đánh võng; chạy quá tốc độ đuổi nhau trên đường bộ; dùng chân điều khiển vô lăng xe khi xe đang chạy trên đường;`,
    `Phạt tiền từ 10.000.000 đồng đến 12.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_7_c`,
    `Điều khiển xe chạy quá tốc độ quy định trên 35 km/h.`,
    `Phạt tiền từ 10.000.000 đồng đến 12.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_8_a`,
    `Điều khiển xe đi ngược chiều trên đường cao tốc, lùi xe trên đường cao tốc, trừ các xe ưu tiên đang đi làm nhiệm vụ khẩn cấp theo quy định;`,
    `Phạt tiền từ 16.000.000 đồng đến 18.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_8_b`,
    `Gây tai nạn giao thông không dừng lại, không giữ nguyên hiện trường, bỏ trốn không đến trình báo với cơ quan có thẩm quyền, không tham gia cấp cứu người bị nạn;`,
    `Phạt tiền từ 16.000.000 đồng đến 18.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_8_c`,
    `Điều khiển xe trên đường mà trong máu hoặc hơi thở có nồng độ cồn vượt quá 50 miligam đến 80 miligam/100 mililít máu hoặc vượt quá 0,25 miligam đến 0,4 miligam/1 lít khí thở.`,
    `Phạt tiền từ 16.000.000 đồng đến 18.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `khoan_5_9`,
    `Điều khiển xe lạng lách, đánh võng; chạy quá tốc độ đuổi nhau trên đường bộ; dùng chân điều khiển vô lăng xe khi xe đang chạy trên đường; không chấp hành hiệu lệnh dừng xe của người thi hành công vụ hoặc gây tai nạn giao thông.`,
    `Phạt tiền từ 18.000.000 đồng đến 20.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_10_a`,
    `Điều khiển xe trên đường mà trong máu hoặc hơi thở có nồng độ cồn vượt quá 80 miligam/100 mililít máu hoặc vượt quá 0,4 miligam/1 lít khí thở;`,
    `Phạt tiền từ 30.000.000 đồng đến 40.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_10_b`,
    `Không chấp hành yêu cầu kiểm tra về nồng độ cồn của người thi hành công vụ;`,
    `Phạt tiền từ 30.000.000 đồng đến 40.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_10_c`,
    `Điều khiển xe trên đường mà trong cơ thể có chất ma túy;`,
    `Phạt tiền từ 30.000.000 đồng đến 40.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
  getItem(
    `diem_5_10_d`,
    `Không chấp hành yêu cầu kiểm tra về chất ma túy của người thi hành công vụ.`,
    `Phạt tiền từ 30.000.000 đồng đến 40.000.000 đồng`,
    `Xe ô tô`,
    ``,
    ``,
    ``
  ),
];
