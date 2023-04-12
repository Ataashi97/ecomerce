const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: Product
  })
  res.json(tags)
});

router.get('/:id', async (req, res) => {
  const tagData = await Tag.findByPk(req.params.id, {
    include: Product
  })
  res.json(tagData)
 
});

router.post('/', async (req, res) => {
  const newTag = await Tag.create(req.body)
 
  res.json(newTag)
  
});

router.put('/:id', async (req, res) => {
  const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
 
  res.json(updateTag)
});

router.delete('/:id', async (req, res) => {
  const tagDelete = await Tag.destroy({ where: {id: req.params.id}})
  res.json(tagDelete);
});

module.exports = router;