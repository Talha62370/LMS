import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  // Tells multer where to save the files
  destination: function (req, file, cb) {
    // Make sure this 'public/uploads' folder exists in your server!
    cb(null, 'public/uploads/');
  },
  
  // Tells multer how to name the file
  filename: function (req, file, cb) {
    // Create a unique filename to prevent files from being overwritten
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export default upload;