const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service")



router.post("/add", upload.array("images"), async (req, res) => {

    response(res, async () => {
        const { name, stock, price, categories } = req.body;
        const productId = uuidv4();

        let product = new Product({
            _id: productId,
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            categories: categories,
            isActive: true,
            createdDate: new Date(),
            imageUrls: req.files

        })

        await product.save();
    })

})
router.post("/removeById", async (req, res) => {

    response(res, async () => {
        const { _id } = req.body;

        const product = await Product.findById(_id);

        for (const image of product.imageUrls) {
            fs.unlink(image.path, () => { });
        }

        await Product.findByIdAndDelete(_id);
        res.json({ message: "Silme işlemi başarılı." });
    })

})
router.post("/getAll", async (req, res) => {

    response(res, async () => {

        const { pageNumber, pageSize, search } = req.body;

        let productCount = await Product.find({
            $or: [
                {
                    name: { $regex: search, $options: 'i' }
                }
            ]
        }).count();


        let products = await Product.find({
            $or: [
                {
                    name: { $regex: search, $options: 'i' }
                }
            ]
        })
            .sort({ name: 1 })
            .populate("categories")
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)

        let totalPageCount = Math.ceil(productCount / pageSize);

        let model = {

            data: products,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalPageCount: totalPageCount,
            isFirstPage: pageNumber == 1 ? true : false,
            isLastPage: totalPageCount == pageNumber ? true : false
        }
        res.json(model);

    })
})
router.get("/getById", async (req, res) => {

    const { _id } = req.body;

    let product = await Product.findById(_id);
    res.json(product);

})
router.post("/update", update.array("images"), async (req, res) => {

    response(res, async () => {
        const { _id, name, stock, price, categories } = req.body;

        const product = await Product.findById(_id);

        for (const image of product.imageUrls) {
            fs.unlink(image.path, () => { })
        }


        let imageUrls = { ...product.imageUrls, ...req.files };

        product = {
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            imageUrls: imageUrls,
            categories: categories
        };

        await Product.findByIdAndUpdate(_id, product);

        res.json({ message: "Güncelleme işlemi yapıldı." })
    })




})
router.post("/removeImageByProductId", async (req, res) => {

    const { _id, index } = req.body;

    let product = await Product.findById(_id);

    if (product.imageUrls.length == 1) {
        res.status(500).json({ message: "Son ürün resmini silemezsiniz!" });

    }
    else {
        let image = product.imageUrls[index];
        product.imageUrls.splice(index, 1);
        await Product.findByIdAndUpdate(_id, product);
        fs.unlink(image.path, () => { })
        res.json({ message: "Resim kaldırıldı." })

    }

})
router.post("/changeActiveStatus", async (req, res) => {

    response(res, async () => {

        const {_id} = req.body;

        const product = await Product.findById(_id);

        product.isActive = !product.isActive;

        await Product.findByIdAndUpdate(_id,product);
        
        res.json({message:"Ürünün durumu değiştirildi."})

    })

})

module.exports = router;
