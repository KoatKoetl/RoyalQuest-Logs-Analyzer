import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `src/files/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export { storage };
