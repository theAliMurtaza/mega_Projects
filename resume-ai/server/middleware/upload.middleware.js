import multer from "multer";

// Memory storage for text extraction (no cloud needed for analysis)
const memoryStorage = multer.memoryStorage();

export const uploadResume = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, TXT, DOC, DOCX files are allowed"), false);
    }
  },
}).single("resume");

// Wrap multer in a promise for cleaner async/await usage
export const handleUpload = (req, res) =>
  new Promise((resolve, reject) => {
    uploadResume(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") reject(new Error("File too large. Max 5MB."));
        else reject(err);
      } else if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
