import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../client/public/uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 2000000 } });

export default upload;
