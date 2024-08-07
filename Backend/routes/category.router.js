const express = require("express");
const Category = require("../models/category");
const { v4: uuid4 } = require("uuid");
const router = express.Router();


router.post("/add", async (req, res) => {
    try {

        const { name } = req.body;
        const checkName = await Category.findOne({ name: name });
        if (checkName != null) {
            res.status(500).json({ message: "Bu kategori adı daha önce eklenmiş." });
        }
        else {
            const category = new Category({
                _id: uuid4(),
                name: name

            });

            await category.save();
            res.json({ message: "Kayıt Başarılı" });
        }


    } catch (error) {

        res.status(500).json({ message: error.message });
    }
})

router.post("/removeById", async (req, res) => {

    try {
        const { _id } = req.body;
        await Category.findByIdAndDelete(_id);
        res.json({ message: "Silme işlemi başarılı." });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
})

router.post("/update", async (req, res) => {

    try {
        const { _id, name } = req.body;
        const category = Category.findOne(_id);
        category.name = name;
        await Category.findByIdAndUpdate(_id, category);
        res.json({ message: "Güncelleme işlemi başarılı." });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
})
router.get("/getAll", async (req, res) => {


    try {
        const categories = await  Category.find();
        if (categories != null)
            res.json(categories);
        else
            res.json("category is null");
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
})

module.exports = router;;



