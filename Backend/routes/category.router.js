const express = require("express");
const Category = require("../models/category");
const { v4: uuid4 } = require("uuid");
const router = express.Router();
const response = require("../services/response.service")

router.post("/add", async (req, res) => {

    response(res, async () => {
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
    })
})

router.post("/removeById", async (req, res) => {

    response(res, async () => {
        const { _id } = req.body;
        await Category.findByIdAndDelete(_id);
        res.json({ message: "Silme işlemi başarılı." });
    })

})

router.post("/update", async (req, res) => {

    response(res, async () => {
        const { _id, name } = req.body;
        const category = Category.findOne({ _id: _id });
        await Category.findByIdAndUpdate(_id, req.body);
        res.json({ message: "Güncelleme işlemi başarılı." });
    })
})
router.get("/getAll", async (req, res) => {

    response(res, async () => {
        const categories = await Category.find();
        if (categories != null)
            res.json(categories);
        else
            res.json("category is null");
    })
})
module.exports = router;;



