import multer, { Multer } from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "file/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload: Multer = multer({ storage: storage });

export default upload;
