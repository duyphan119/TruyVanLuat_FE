function getItem(
  code: string,
  title: string,
  punishment: string,
  apply_for: string,
  obj: any
) {
  const [_, c1, c2, c3] = code.split("_");
  return {
    type: "vi_pham",
    detail: `Điểm ${
      c3 === "dd" ? "đ" : c3
    } Khoản ${c2} Điều ${c1} Nghị định 100/2019/NĐ-CP`,
    code,
    title,
    punishment,
    apply_for,
    obj,
  };
}

const p1 = "Phạt tiền từ 200.000 đồng đến 400.000 đồng";
const a1 = "Xe ô tô";

export const violationData = [
  getItem(
    "diem_5_1_a",
    "Không chấp hành hiệu lệnh, chỉ dẫn của biển báo hiệu, vạch kẻ đường",
    p1,
    a1,
    {
      doituong_chudong: ["xe_o_to"],
      doituong_bidong: ["bien_bao_hieu", "vach_ke_duong"],
      hanhdong_chudong: ["khong_chap_hieu_lenh", "khong_chap_hanh_chi_dan"],
      hanhdong_bidong: [],
    }
  ),
  getItem(
    "diem_5_1_b",
    "Chuyển hướng không nhường quyền đi trước cho: Người đi bộ, xe lăn của người khuyết tật qua đường tại nơi có vạch kẻ đường dành cho người đi bộ; xe thô sơ đang đi trên phần đường dành cho xe thô sơ",
    p1,
    a1,
    {
      doituong_chudong: ["xe_o_to"],
      doituong_bidong: ["nguoi_di_bo", "xe_lan_cua_nguoi_khuyet_tat"],
      hanhdong_chudong: ["chuyen_huong", "nhuong_quyen_di_truoc"],
      hanhdong_bidong: [],
    }
  ),
];
