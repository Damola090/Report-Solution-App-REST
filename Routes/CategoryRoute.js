const express = require('express');
const router = express.Router();

const { getAllCategory, fetchCategoryReports, CreateCategory } = require('../Controller/categoryController');

const { AuthMiddleware } = require('../Middleware/AuthMiddleware');

router.route('/create-category').post(AuthMiddleware, CreateCategory);

router.route('/get-all-category').get(AuthMiddleware, getAllCategory);

router.route('/get-Reports-For-Category/:catId').get(AuthMiddleware, fetchCategoryReports);


module.exports = router;

