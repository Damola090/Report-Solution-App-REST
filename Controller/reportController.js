const Category = require('../Models/Category');
const Report = require('../Models/Report');
const User = require('../Models/User');
const mutler = require('multer');
const cloudinary = require('cloudinary').v2;


//Create Report   - done
//Get All Reports - done 
//Get individual Report  - done 
//Get All Report Created by a user - done 
//Get Report By category - frontend (good user experience)

const createReport = async (req, res, next) => {

    try {

        req.body.user = req.user._id

        const category = await Category.findOne({ categoryName : req.body.category }).exec()
        
        req.body.categorylink = category._id

        const report = await Report.create(req.body)

        res.status(200).json({
            success: true,
            report: report
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to create Report",
            err
        })

    }
}

const getAllReports = async (req, res, next) => {

    try {

        const allreports = await Report.find({}).populate('user')

        if (allreports.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No Report Found'
            })

            return;
        }

        res.status(200).json({
            success: true,
            allreports
        })

    } catch (err) {

        res.status(500).json({
            success: false,
            message: 'Something went wrong with the server'
        })
    }
}

const getSingleReport = async (req, res, next) => {

    try {

        const Report_id = req.params.id

        const singleReport = await Report.findById(Report_id).populate('user')

        if (singleReport === null) {
            res.status(404).json({
                success: false,
                message: 'Report not Found'
            })

            return;

        }

        res.status(200).json({
            success: true,
            singleReport
        })

    } catch (err) {

        res.status(404).json({
            success: false,
            message: 'Report Not found'
        })
    }
}

const getMyReports = async (req, res, next) => {

    try {

        const userId = await User.findById(req.user._id)

        const reportByUser = await Report.find({ user : userId }).populate('user')

        if (!userId || !reportByUser) {
            throw new Error("Error Fetching report, please Try again")

        }
    
        res.status(200).json({
            success : true,
            reportByUser
        })

    } catch (err) {

        res.status(404).json({
            success : true,
            message : "Report Not found For this user"
        })

    }
}

const storage = mutler.diskStorage({})


const upload = mutler({
    storage: storage

})


const UploadImageToCloudinary = async (req, res, next) => {

    try { 

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'products'
        })

        const cloudinaryObj = {
            public_id : result.public_id,
            url : result.secure_url
        }

        res.status(200).json({
            success : true,
            message : "Uploaded Successfully",
            cloudinaryObj
        })

    } catch (err) {

        res.status(400).json({
            success : false,
            message : "unable To Upload to Cloudinary"
        })

    }
}

module.exports = {
    createReport,
    getAllReports,
    getSingleReport,
    getMyReports,
    upload,
    UploadImageToCloudinary
}