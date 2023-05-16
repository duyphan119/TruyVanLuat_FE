import mongoose, { Model } from "mongoose";

const schema = new mongoose.Schema({
  code: String,
  href: String,
  short_code: String,
  html: String,
  dieus: Array<{
    title: String;
    code: String;
    khoans: Array<{
      title: String;
      code: String;
      diems: Array<{
        title: String;
        code: String;
      }>;
    }>;
  }>,
});
let VanBan: Model<any>;
if (mongoose.models.VanBan) {
  VanBan = mongoose.model("VanBan");
} else {
  VanBan = mongoose.model("VanBan", schema);
}

export default VanBan;
