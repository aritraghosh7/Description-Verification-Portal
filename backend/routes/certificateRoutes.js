const express = require('express');
const { uploadExcel, getCertificateById } = require('../controllers/certificateController');
const multer = require('multer');

const router = express.Router();

// Set up Multer for Excel uploads
const upload = multer({ dest: 'uploads/' });

// Admin upload route
router.post('/upload', upload.single('file'), uploadExcel); // Ensure 'file' matches the field name in FormData

// Student certificate retrieval
router.get('/:id', getCertificateById);

module.exports = router;