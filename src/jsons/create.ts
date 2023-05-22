function getItem(code: string, title: string) {
  const [_, c1, c2, c3] = code.split("_");
  return {
    type: "bien_phap_khac_phuc",
    detail: `Điểm ${
      c3 === "dd" ? "đ" : c3
    } Khoản ${c2} Điều ${c1} Nghị định 100/2019/NĐ-CP`,
    code,
    title,
  };
}

export const data1 = [
  getItem(
    "diem_4_1_a",
    "Buộc khôi phục lại tình trạng ban đầu đã bị thay đổi do vi phạm hành chính gây ra"
  ),
  getItem(
    "diem_4_1_b",
    "Buộc tháo dỡ công trình, phần công trình xây dựng không có giấy phép hoặc xây dựng không đúng với giấy phép"
  ),
  getItem(
    "diem_4_1_c",
    "Buộc thực hiện biện pháp để khắc phục tình trạng ô nhiễm môi trường do vi phạm hành chính gây ra"
  ),
  getItem("diem_4_1_d", "Buộc tái xuất phương tiện khỏi Việt Nam"),
  getItem(
    "diem_4_1_dd",
    "Buộc nộp lại số lợi bất hợp pháp có được do thực hiện vi phạm hành chính"
  ),
  getItem(
    "diem_4_2_a",
    "Buộc phải tháo dỡ các vật che khuất biển báo hiệu đường bộ, đèn tín hiệu giao thông hoặc buộc phải di dời cây trồng không đúng quy định"
  ),
  getItem(
    "diem_4_2_b",
    "Buộc phải thu dọn thóc, lúa, rơm, rạ, nông, lâm, hải sản, rác, chất phế thải, phương tiện, vật tư, vật liệu, hàng hóa, máy móc, thiết bị, biển hiệu, biển quảng cáo, đinh, vật sắc nhọn, dây, các loại vật dụng, vật cản khác"
  ),
  getItem(
    "diem_4_2_c",
    "Buộc phải thực hiện ngay các biện pháp bảo đảm an toàn giao thông theo quy định hoặc buộc phải treo biển báo thông tin công trình có đầy đủ nội dung theo quy định"
  ),
  getItem(
    "diem_4_2_d",
    "Buộc phải xây dựng lại bến xe, bãi đỗ xe, trạm dừng nghỉ, trạm thu phí đường bộ theo đúng quy định, bảo đảm tiêu chuẩn kỹ thuật"
  ),
  getItem(
    "diem_4_2_dd",
    "Buộc phải bổ sung hoặc sửa chữa các biển báo hiệu bị mất, bị hư hỏng và khắc phục các hư hỏng của công trình đường bộ"
  ),
  getItem(
    "diem_4_2_e",
    "Buộc phải lắp đầy đủ thiết bị hoặc thay thế thiết bị đủ tiêu chuẩn an toàn kỹ thuật hoặc khôi phục lại tính năng kỹ thuật của phương tiện, thiết bị theo quy định hoặc tháo bỏ những thiết bị lắp thêm không đúng quy định"
  ),
  getItem(
    "diem_4_2_g",
    "Buộc phải bố trí phương tiện khác để chở số hành khách vượt quá quy định được phép chở của phương tiện"
  ),
  getItem(
    "diem_4_2_h",
    "Buộc phải đăng ký, niêm yết đầy đủ, chính xác các thông tin theo quy định"
  ),
  getItem(
    "diem_4_2_i",
    "Buộc phải gắn hộp đèn với chữ “TAXI” hoặc buộc phải niêm yết cụm từ “XE TAXI”, “XE HỢP ĐỒNG”, “XE DU LỊCH” theo đúng quy định"
  ),
  getItem(
    "diem_4_2_k",
    "Buộc phải cấp “thẻ nhận dạng lái xe” cho lái xe theo quy định"
  ),
  getItem(
    "diem_4_2_l",
    "Buộc phải tổ chức tập huấn nghiệp vụ hoặc tổ chức khám sức khỏe định kỳ cho lái xe và nhân viên phục vụ trên xe theo quy định"
  ),
  getItem(
    "diem_4_2_m",
    "Buộc phải ký hợp đồng với lái xe và nhân viên phục vụ trên xe"
  ),
  getItem(
    "diem_4_2_n",
    "Buộc phải xây dựng và thực hiện quy trình bảo đảm an toàn giao thông theo quy định"
  ),
  getItem(
    "diem_4_2_o",
    "Buộc phải bố trí người trực tiếp điều hành hoạt động vận tải đủ điều kiện theo quy định"
  ),
  getItem(
    "diem_4_2_p",
    "Buộc phải lắp đặt camera, dây an toàn, đồng hồ tính tiền cước, thiết bị in hóa đơn, thiết bị giám sát hành trình trên xe theo đúng quy định"
  ),
  getItem(
    "diem_4_2_q",
    "Buộc phải cung cấp, cập nhật, truyền, lưu trữ, quản lý các thông tin từ thiết bị giám sát hành trình, camera lắp trên xe ô tô theo quy định"
  ),
  getItem(
    "diem_4_2_r",
    "Buộc phải cung cấp tên đăng nhập, mật khẩu truy cập vào phần mềm xử lý dữ liệu từ thiết bị giám sát hành trình của xe ô tô hoặc máy chủ của đơn vị cho cơ quan có thẩm quyền theo quy định"
  ),
  getItem(
    "diem_4_2_s",
    "Buộc phải lập, cập nhật, lưu trữ đầy đủ, chính xác lý lịch phương tiện, lý lịch hành nghề của lái xe, các hồ sơ, tài liệu có liên quan trong quá trình quản lý, điều hành hoạt động vận tải của đơn vị theo quy định"
  ),
  getItem(
    "diem_4_2_t",
    "Buộc phải khôi phục lại nhãn hiệu, màu sơn ghi trong Giấy đăng ký xe theo quy định hoặc buộc phải thực hiện đúng quy định về biển số, quy định về kẻ chữ trên thành xe và cửa xe"
  ),
  getItem(
    "diem_4_2_u",
    "Buộc phải khôi phục lại hình dáng, kích thước, tình trạng an toàn kỹ thuật ban đầu của xe và đăng kiểm lại trước khi đưa phương tiện ra tham gia giao thông"
  ),
  getItem(
    "diem_4_2_v",
    "Buộc phải thực hiện điều chỉnh thùng xe theo đúng quy định hiện hành, đăng kiểm lại và điều chỉnh lại khối lượng hàng hóa cho phép chuyên chở ghi trong Giấy chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường theo quy định hiện hành trước khi đưa phương tiện ra tham gia giao thông"
  ),
  getItem(
    "diem_4_2_x",
    "Buộc phải làm thủ tục đăng ký xe, đăng ký sang tên hoặc thủ tục đổi lại, thu hồi Giấy đăng ký xe, biển số xe, Giấy chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường theo quy định"
  ),
  getItem(
    "diem_4_2_y",
    "Buộc phải đưa phương tiện quay trở lại Khu kinh tế thương mại đặc biệt, Khu kinh tế cửa khẩu quốc tế"
  ),
];
