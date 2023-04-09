const router = require('express').Router();
const { json } = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const results = await Category.findAll({
      include: Product,
    })

    res.json(results)}
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  const results = await Category.findByPk(req.params.id, {
    include: Product
  })

  res,json(results)
});

router.post('/', async (req, res) => {
  const newCategory = await Category.create(req.body);

  return res.json(newCategory);
});

router.put('/:id', async (req, res) => {
  try {
    const newCategory = await Category.update(req.body, {
      where: {
        id:req.params.id
      }
    })
    const response = req.body
    console.log(newCategory)
    return res.status(200).json( {message: "successfully updated category.", response})
  } catch (error) {
    res.status(400).json({message: "Update unsuccessful", error})
  }
});

router.delete('/:id', async (req, res) => {
  const newCategory = await Category.destroy({ where: {id:req.params.id}})
  return res.json(newCategory)
});

module.exports = router;