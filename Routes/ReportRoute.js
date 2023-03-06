const express = require('express');
const router = express.Router();

const { AuthMiddleware } = require('../Middleware/AuthMiddleware')
const { createReport, getAllReports, getSingleReport, getMyReports, upload, UploadImageToCloudinary } = require('../Controller/reportController')

router.route('/create-report').post(AuthMiddleware, createReport)
router.route('/fetch-all-reports').get(AuthMiddleware, getAllReports)
router.route('/fetch-single-report/:id').get(AuthMiddleware, getSingleReport)
router.route('/fetch-my-report').get(AuthMiddleware, getMyReports)

router.route('/upload-to-cloudinary').post(AuthMiddleware, upload.single('image'), UploadImageToCloudinary )

module.exports = router

