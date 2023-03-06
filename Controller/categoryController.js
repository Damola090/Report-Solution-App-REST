const Category = require('../Models/Category');
const Report = require('../Models/Report');


const CreateCategory = async(req, res, next) => {

    try {

        const category = await Category.create(req.body)

        res.status(200).json({
            success : true,
            category : category
        })

    } catch (err) {
        res.status(400).json({
            success : false,
            message : "Unable to Create a New Category"
        })
    }
}

const getAllCategory = async (req, res, next) => {

    try {

        const Allcategory = await Category.find()

        res.status(200).json({
            success: true,
            Allcategory: Allcategory,
        })

    } catch (err) {

        res.status(400).json({
            success: false,
            Allcategory: "Not Found"
        })

    }
    
}

const fetchCategoryReports = async (req, res, next) => {

    try {

        const category = await Category.findById(req.params.catId)

        console.log(category)

        if (category !== null) {
            const Reports = await Report.find()

            let filteredReports = []
            for (let i = 0; i < Reports.length; i++) {
                if (Reports[i].category === category.categoryName) {
                    filteredReports.push(Reports[i])
                    console.log('pushed')
                } else {
                    console.log('loop failed ')
                }
            }
            res.status(200).json({
                success: true,
                Reports: filteredReports
            })
        } else {

            res.status(404).json({
                success : false,
                message : "Category Not Found"
            })
        }

    } catch (err) {

        res.status(500).json({
            success : false,
            message : "something went wrong in the server"
        })

    }
}


module.exports = {
    getAllCategory,
    fetchCategoryReports,
    CreateCategory
}
