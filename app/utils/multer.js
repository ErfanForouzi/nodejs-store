const path = require("path");
const fs = require("fs");

const multer = require("multer");
const createError = require("http-errors");

function createRoute(req) {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    year,
    month,
    day
  );
  req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file?.originalname){
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    return cb(null, null);
  },
  filename: (req, file, cb) => {
    if(file?.originalname){
      const ext = path.extname(file.originalname);
    const fileName = new Date().getTime() + ext;
    req.body.filename = fileName;
    return cb(null, fileName);
    }
    return cb(null,null);
  },
});

function fileFilter(req, file, cb) {
    if(req?.headers['content-length'] > 1000000){
        return cb(createError.BadRequest("حجم عکس انتخاب شده نباید بیشتر از 2 مگابایت باشد"), false);
      }
  const ext = path.extname(file.originalname);
  const mimeTypes = [".png", ".jpeg", ".jpg", ".gif"];
  if (mimeTypes.includes(ext)) {
    const fileName = new Date().getTime() + ext;
    req.body.filename = fileName;
    return cb(null, fileName);
  }
  return cb(createError.BadRequest("فرمت عکس انتخاب شده معتبر نمیاشد", null));
}

const uploadFile = multer({ storage,fileFilter });

module.exports = {
  uploadFile,
};
