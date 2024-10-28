const Certificate = require('../models/Certificate');
const xlsx = require('xlsx');
const path = require('path');

// Upload and process Excel file
const uploadExcel = async (req, res) => {
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Save each certificate entry to MongoDB
        for (let entry of data) {
            const { certificateId, studentName, internshipDomain, startDate, endDate } = entry;

            const certificate = new Certificate({
                certificateId,
                studentName,
                internshipDomain,
                startDate,
                endDate,
            });

            await certificate.save();
        }

        res.status(200).json({ message: 'Excel file uploaded and processed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch certificate by ID
const getCertificateById = async (req, res) => {
    try {
        const certificate = await Certificate.findOne({ certificateId: req.params.id });
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadExcel, getCertificateById };
