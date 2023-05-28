function f(y: any) {
  const x = { ...y };
  const [_, _c1, _c2, _c3] = x.id.split(`_`);
  let detail = "";
  if (x.id.startsWith("diem")) {
    detail = `${
      _c3 ? `Điểm ${_c3 === `dd` ? `đ` : _c3} ` : ""
    }Khoản ${_c2} Điều ${_c1} Nghị định 100/2019/NĐ-CP`;
  } else {
    detail = `Khoản ${_c2} Điều ${_c1} Nghị định 100/2019/NĐ-CP`;
  }
  if (x.note !== "") x.note[0] = x.note[0].toUpperCase();
  return {
    ...x,
    detail: `${
      _c3 ? `Điểm ${_c3 === `dd` ? `đ` : _c3} ` : ""
    }Khoản ${_c2} Điều ${_c1} Nghị định 100/2019/NĐ-CP`,
  };
}

export const violations = [
  f({
    id: `diem_6_1_a`,
    content: `Không chấp hành hiệu lệnh, chỉ dẫn của biển báo hiệu, vạch kẻ đường`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: `trừ các hành vi vi phạm quy định tại điểm c, điểm đ, điểm e, điểm h khoản 2; điểm d, điểm g, điểm i, điểm m khoản 3; điểm a, điểm b, điểm c, điểm d, điểm e khoản 4; khoản 5; điểm b khoản 6; điểm a, điểm b khoản 7; điểm d khoản 8 Điều này`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_b`,
    content: `Không có báo hiệu xin vượt trước khi vượt;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_c`,
    content: `Không giữ khoảng cách an toàn để xảy ra va chạm với xe chạy liền trước hoặc không giữ khoảng cách theo quy định của biển báo hiệu “Cự ly tối thiểu giữa hai xe”;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_d`,
    content: `Chuyển hướng không nhường quyền đi trước cho: Người đi bộ, xe lăn của người khuyết tật qua đường tại nơi có vạch kẻ đường dành cho người đi bộ; xe thô sơ đang đi trên phần đường dành cho xe thô sơ;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_dd`,
    content: `Chuyển hướng không nhường đường cho: Các xe đi ngược chiều; người đi bộ, xe lăn của người khuyết tật đang qua đường tại nơi không có vạch kẻ đường cho người đi bộ;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_e`,
    content: `Lùi xe mô tô ba bánh không quan sát hoặc không có tín hiệu báo trước;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_g`,
    content: `Chở người ngồi trên xe sử dụng ô (dù);`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_h`,
    content: `Không tuân thủ các quy định về nhường đường tại nơi đường giao nhau`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: `trừ các hành vi vi phạm quy định tại điểm b, điểm e khoản 2 Điều này;`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_i`,
    content: `Chuyển làn đường không đúng nơi được phép hoặc không có tín hiệu báo trước;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_k`,
    content: `Điều khiển xe chạy dàn hàng ngang từ 03 xe trở lên;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_l`,
    content: `Không sử dụng đèn chiếu sáng trong thời gian từ 19 giờ ngày hôm trước đến 05 giờ ngày hôm sau hoặc khi sương mù, thời tiết xấu hạn chế tầm nhìn;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_m`,
    content: `Tránh xe không đúng quy định; sử dụng đèn chiếu xa khi tránh xe đi ngược chiều; không nhường đường cho xe đi ngược chiều theo quy định tại nơi đường hẹp, đường dốc, nơi có chướng ngại vật;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_n`,
    content: `Bấm còi trong thời gian từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau, sử dụng đèn chiếu xa trong đô thị, khu đông dân cư, trừ các xe ưu tiên đang đi làm nhiệm vụ theo quy định;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_o`,
    content: `Xe được quyền ưu tiên lắp đặt, sử dụng thiết bị phát tín hiệu ưu tiên không đúng quy định hoặc sử dụng thiết bị phát tín hiệu ưu tiên mà không có Giấy phép của cơ quan có thẩm quyền cấp hoặc có Giấy phép của cơ quan có thẩm quyền cấp nhưng không còn giá trị sử dụng theo quy định;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_p`,
    content: `Quay đầu xe tại nơi không được quay đầu xe, trừ hành vi vi phạm quy định tại điểm d khoản 4 Điều này;`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_1_q`,
    content: `Điều khiển xe chạy dưới tốc độ tối thiểu trên những đoạn đường bộ có quy định tốc độ tối thiểu cho phép.`,
    punishment: `Phạt tiền từ 100.000 đồng đến 200.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),

  f({
    id: `diem_6_2_a`,
    content: `Dừng xe, đỗ xe trên phần đường xe chạy ở đoạn đường ngoài đô thị nơi có lề đường;`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_b`,
    content: `Không giảm tốc độ và nhường đường khi điều khiển xe chạy từ trong ngõ, đường nhánh ra đường chính;`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_c`,
    content: `Điều khiển xe chạy quá tốc độ quy định từ 05 km/h đến dưới 10 km/h;`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_d`,
    content: `Điều khiển xe chạy tốc độ thấp mà không đi bên phải phần đường xe chạy gây cản trở giao thông;`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_dd`,
    content: `Dừng xe, đỗ xe ở lòng đường đô thị gây cản trở giao thông; tụ tập từ 03 xe trở lên ở lòng đường, trong hầm đường bộ; đỗ, để xe ở lòng đường đô thị, hè phố trái quy định của pháp luật;`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_e`,
    content: `Không nhường đường cho xe xin vượt khi có đủ điều kiện an toàn; không nhường đường cho xe đi trên đường ưu tiên, đường chính từ bất kỳ hướng nào tới tại nơi đường giao nhau;`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_g`,
    content: `Xe không được quyền ưu tiên lắp đặt, sử dụng thiết bị phát tín hiệu của xe được quyền ưu tiên;`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_h`,
    content: `Dừng xe, đỗ xe trên đường xe điện, điểm dừng đón trả khách của xe buýt, nơi đường bộ giao nhau, trên phần đường dành cho người đi bộ qua đường; dừng xe nơi có biển “Cấm dừng xe và đỗ xe”; đỗ xe tại nơi có biển “Cấm đỗ xe” hoặc biển “Cấm dừng xe và đỗ xe”; không tuân thủ các quy định về dừng xe, đỗ xe tại nơi đường bộ giao nhau cùng mức với đường sắt; dừng xe, đỗ xe trong phạm vi an toàn của đường sắt`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: `trừ hành vi vi phạm quy định tại điểm b khoản 2, điểm b khoản 3 Điều 49 Nghị định này`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_i`,
    content: `Không đội “mũ bảo hiểm cho người đi mô tô, xe máy” hoặc đội “mũ bảo hiểm cho người đi mô tô, xe máy” không cài quai đúng quy cách khi điều khiển xe tham gia giao thông trên đường bộ;`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_k`,
    content: `Chở người ngồi trên xe không đội “mũ bảo hiểm cho người đi mô tô, xe máy” hoặc đội “mũ bảo hiểm cho người đi mô tô, xe máy” không cài quai đúng quy cách`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: `trừ trường hợp chở người bệnh đi cấp cứu, trẻ em dưới 06 tuổi, áp giải người có hành vi vi phạm pháp luật;`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_l`,
    content: `Chở theo 02 người trên xe, trừ trường hợp chở người bệnh đi cấp cứu, trẻ em dưới 14 tuổi, áp giải người có hành vi vi phạm pháp luật;`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_2_m`,
    content: `Ngồi phía sau vòng tay qua người ngồi trước để điều khiển xe, trừ trường hợp chở trẻ em ngồi phía trước.`,
    punishment: `Phạt tiền từ 200.000 đồng đến 300.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_a`,
    content: `Chuyển hướng không giảm tốc độ hoặc không có tín hiệu báo hướng rẽ`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: `trừ trường hợp điều khiển xe đi theo hướng cong của đoạn đường bộ ở nơi đường không giao nhau cùng mức`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_b`,
    content: `Chở theo từ 03 người trở lên trên xe;`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_c`,
    content: `Bấm còi, rú ga (nẹt pô) liên tục trong đô thị, khu đông dân cư, trừ các xe ưu tiên đang đi làm nhiệm vụ theo quy định;`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_d`,
    content: `Dừng xe, đỗ xe trên cầu;`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_dd`,
    content: `Điều khiển xe thành đoàn gây cản trở giao thông, trừ trường hợp được cơ quan có thẩm quyền cấp phép;`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_e`,
    content: `Điều khiển xe có liên quan trực tiếp đến vụ tai nạn giao thông mà không dừng lại, không giữ nguyên hiện trường, không tham gia cấp cứu người bị nạn`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: `trừ hành vi vi phạm quy định tại điểm đ khoản 8 Điều này;`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_g`,
    content: `Điều khiển xe không đi bên phải theo chiều đi của mình; đi không đúng phần đường, làn đường quy định (làn cùng chiều hoặc làn ngược chiều); điều khiển xe đi qua dải phân cách cố định ở giữa hai phần đường xe chạy; điều khiển xe đi trên hè phố, trừ trường hợp điều khiển xe đi qua hè phố để vào nhà;`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_h`,
    content: `Vượt bên phải trong trường hợp không được phép;`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_i`,
    content: `Đi vào khu vực cấm, đường có biển báo hiệu có nội dung cấm đi vào đối với loại phương tiện đang điều khiển`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: `trừ các hành vi vi phạm quy định tại khoản 5, điểm b khoản 6 Điều này và các trường hợp xe ưu tiên đang đi làm nhiệm vụ khẩn cấp theo quy định;`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_k`,
    content: `Người đang điều khiển xe hoặc chở người ngồi trên xe bám, kéo, đẩy xe khác, vật khác, dẫn dắt súc vật, mang vác vật cồng kềnh; chở người đứng trên yên, giá đèo hàng hoặc ngồi trên tay lái; xếp hàng hóa trên xe vượt quá giới hạn quy định; điều khiển xe kéo theo xe khác, vật khác;`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_l`,
    content: `Chở hàng vượt trọng tải thiết kế được ghi trong Giấy đăng ký xe đối với loại xe có quy định về trọng tải thiết kế;`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_3_m`,
    content: `Chạy trong hầm đường bộ không sử dụng đèn chiếu sáng gần.`,
    punishment: `Phạt tiền từ 400.000 đồng đến 600.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_4_a`,
    content: `Điều khiển xe chạy quá tốc độ quy định từ 10 km/h đến 20 km/h;`,
    punishment: `Phạt tiền từ 600.000 đồng đến 1.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_4_b`,
    content: `Dừng xe, đỗ xe trong hầm đường bộ không đúng nơi quy định;`,
    punishment: `Phạt tiền từ 600.000 đồng đến 1.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_4_c`,
    content: `Vượt xe trong những trường hợp không được vượt, vượt xe tại đoạn đường có biển báo hiệu có nội dung cấm vượt đối với loại phương tiện đang điều khiển`,
    punishment: `Phạt tiền từ 600.000 đồng đến 1.000.000 đồng`,
    note: `trừ các hành vi vi phạm quy định tại điểm h khoản 3 Điều này;`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_4_d`,
    content: `Vượt xe trong hầm đường bộ không đúng nơi quy định; quay đầu xe trong hầm đường bộ;`,
    punishment: `Phạt tiền từ 600.000 đồng đến 1.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_4_dd`,
    content: `Không nhường đường hoặc gây cản trở xe được quyền ưu tiên đang phát tín hiệu ưu tiên đi làm nhiệm vụ;`,
    punishment: `Phạt tiền từ 600.000 đồng đến 1.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_4_e`,
    content: `Không chấp hành hiệu lệnh của đèn tín hiệu giao thông;`,
    punishment: `Phạt tiền từ 600.000 đồng đến 1.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_4_g`,
    content: `Không chấp hành hiệu lệnh, hướng dẫn của người điều khiển giao thông hoặc người kiểm soát giao thông;`,
    punishment: `Phạt tiền từ 600.000 đồng đến 1.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_4_h`,
    content: `Người đang điều khiển xe sử dụng ô (dù), điện thoại di động, thiết bị âm thanh, trừ thiết bị trợ thính.`,
    punishment: `Phạt tiền từ 600.000 đồng đến 1.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `khoan_6_5`,
    content: `Đi ngược chiều của đường một chiều, đi ngược chiều trên đường có biển “Cấm đi ngược chiều”`,
    punishment: `Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng`,
    note: `trừ hành vi vi phạm quy định tại điểm b khoản 6 Điều này và các trường hợp xe ưu tiên đang đi làm nhiệm vụ khẩn cấp theo quy định.`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_6_a`,
    content: `Sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy;`,
    punishment: `Phạt tiền từ 2.000.000 đồng đến 3.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_6_b`,
    content: `Điều khiển xe đi vào đường cao tốc, trừ xe phục vụ việc quản lý, bảo trì đường cao tốc;`,
    punishment: `Phạt tiền từ 2.000.000 đồng đến 3.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_6_c`,
    content: `Điều khiển xe trên đường mà trong máu hoặc hơi thở có nồng độ cồn nhưng chưa vượt quá 50 miligam/100 mililít máu hoặc chưa vượt quá 0,25 miligam/1 lít khí thở.`,
    punishment: `Phạt tiền từ 2.000.000 đồng đến 3.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_7_a`,
    content: `Điều khiển xe chạy quá tốc độ quy định trên 20 km/h;`,
    punishment: `Phạt tiền từ 4.000.000 đồng đến 5.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_7_b`,
    content: `Không chú ý quan sát, điều khiển xe chạy quá tốc độ quy định gây tai nạn giao thông; đi vào đường cao tốc, dừng xe, đỗ xe, quay đầu xe, lùi xe, tránh xe, vượt xe, chuyển hướng, chuyển làn đường không đúng quy định gây tai nạn giao thông; không đi đúng phần đường, làn đường, không giữ khoảng cách an toàn giữa hai xe theo quy định gây tai nạn giao thông hoặc đi vào đường có biển báo hiệu có nội dung cấm đi vào đối với loại phương tiện đang điều khiển, đi ngược chiều của đường một chiều, đi ngược chiều trên đường có biển “Cấm đi ngược chiều” gây tai nạn giao thông`,
    punishment: `Phạt tiền từ 4.000.000 đồng đến 5.000.000 đồng`,
    note: `trừ hành vi vi phạm quy định tại điểm d khoản 8 Điều này;`,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_7_c`,
    content: `Điều khiển xe trên đường mà trong máu hoặc hơi thở có nồng độ cồn vượt quá 50 miligam đến 80 miligam/100 mililít máu hoặc vượt quá 0,25 miligam đến 0,4 miligam/1 lít khí thở.`,
    punishment: `Phạt tiền từ 4.000.000 đồng đến 5.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_8_a`,
    content: `Buông cả hai tay khi đang điều khiển xe; dùng chân điều khiển xe; ngồi về một bên điều khiển xe; nằm trên yên xe điều khiển xe; thay người điều khiển khi xe đang chạy; quay người về phía sau để điều khiển xe hoặc bịt mắt điều khiển xe;`,
    punishment: `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_8_b`,
    content: `Điều khiển xe lạng lách hoặc đánh võng trên đường bộ trong, ngoài đô thị;`,
    punishment: `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_8_c`,
    content: `Điều khiển xe chạy bằng một bánh đối với xe hai bánh, chạy bằng hai bánh đối với xe ba bánh;`,
    punishment: `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_8_d`,
    content: `Điều khiển xe thành nhóm từ 02 xe trở lên chạy quá tốc độ quy định;`,
    punishment: `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_8_dd`,
    content: `Gây tai nạn giao thông không dừng lại, không giữ nguyên hiện trường, bỏ trốn không đến trình báo với cơ quan có thẩm quyền, không tham gia cấp cứu người bị nạn;`,
    punishment: `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_8_e`,
    content: `Điều khiển xe trên đường mà trong máu hoặc hơi thở có nồng độ cồn vượt quá 80 miligam/100 mililít máu hoặc vượt quá 0,4 miligam/1 lít khí thở;`,
    punishment: `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_8_g`,
    content: `Không chấp hành yêu cầu kiểm tra về nồng độ cồn của người thi hành công vụ;`,
    punishment: `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_8_h`,
    content: `Điều khiển xe trên đường mà trong cơ thể có chất ma túy;`,
    punishment: `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `diem_6_8_i`,
    content: `Không chấp hành yêu cầu kiểm tra về chất ma túy của người thi hành công vụ.`,
    punishment: `Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `khoan_6_9_1`,
    content: `Buông cả hai tay khi đang điều khiển xe; dùng chân điều khiển xe; ngồi về một bên điều khiển xe; nằm trên yên xe điều khiển xe; thay người điều khiển khi xe đang chạy; quay người về phía sau để điều khiển xe hoặc bịt mắt điều khiển xe gây tai nạn giao thông hoặc không chấp hành hiệu lệnh dừng xe của người thi hành công vụ.`,
    punishment: `Phạt tiền từ 10.000.000 đồng đến 14.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `khoan_6_9_2`,
    content: `Điều khiển xe lạng lách hoặc đánh võng trên đường bộ trong, ngoài đô thị gây tai nạn giao thông hoặc không chấp hành hiệu lệnh dừng xe của người thi hành công vụ.`,
    punishment: `Phạt tiền từ 10.000.000 đồng đến 14.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `khoan_6_9_3`,
    content: `Điều khiển xe chạy bằng một bánh đối với xe hai bánh, chạy bằng hai bánh đối với xe ba bánh gây tai nạn giao thông hoặc không chấp hành hiệu lệnh dừng xe của người thi hành công vụ.`,
    punishment: `Phạt tiền từ 10.000.000 đồng đến 14.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
  f({
    id: `khoan_6_9_4`,
    content: `Điều khiển xe thành nhóm từ 02 xe trở lên chạy quá tốc độ quy định gây tai nạn giao thông hoặc không chấp hành hiệu lệnh dừng xe của người thi hành công vụ.`,
    punishment: `Phạt tiền từ 10.000.000 đồng đến 14.000.000 đồng`,
    note: ``,
    violator: `Xe máy`,
  }),
];
