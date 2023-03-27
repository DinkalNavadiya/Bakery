import express from 'express';
import Products from '../Modal/Product.js';
const router = express.Router()
router.get("/product", async (req, res) => {
  const product = await Products.find();
  res.status(200).send(product);
})

router.delete("/:id", async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");    //200 define success code
  } catch (error) {
    res.status(500).send(error);     //200 define error code
  }
});
export default router