const router = require('express').Router();
let Blog = require('../models/blog');

router.route('/').get((req, res) => {
  Blog.find()
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const title = req.body.title;
  const date = Date.parse(req.body.date);

  const newBlog = new Blog({
    username,
    description,
    title,
    date,
  });

  newBlog.save()
  .then(() => res.json('Blog added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json('blog deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      blog.username = req.body.username;
      blog.description = req.body.description;
      blog.title = req.body.title;
      blog.date = Date.parse(req.body.date);

      blog.save()
        .then(() => res.json('blog updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;