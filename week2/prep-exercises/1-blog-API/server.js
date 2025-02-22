const express = require('express')
 const fs = require('fs');
 const path = require('path');

const app = express();
const port = 3000;
//define the directory where blog files will be stored
const blogDirectory = path.resolve(__dirname, 'blogs');

 //check if the blog directory exists, if not , create it
if (!fs.existsSync(blogDirectory)) {
  fs.mkdirSync(blogDirectory);
}

//Middleware to parse JSON request bodies
app.use(express.json());
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
//Route to create new blog post
app.post('/blogs', (req, res) => {
  const { title , content } = req.body;
  
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }
  const filePath = path.join(blogDirectory, title);
  fs.writeFileSync(filePath, content);
  res.send('post created successfully');
})

//Route to update existing blog post by title
app.put('/blogs/:title', (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if(!content) {
    return res.status(400).send('Content is required');
  }
  const filePath = path.join(blogDirectory, title);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath ,content);
    res.send('post updated successfully');
  } else {
    res.status(404).send('Post not found');
  }
 })

 //Route to delete existing blog post by title
 app.delete('/blogs/:title', (req, res) => {
    const { title } = req.params;
    const filePath = path.join(blogDirectory, title);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.send('post deleted successfully');
    } else {
      res.status(404).send('Post not found to delete');
    }

 })

//Route to retrieve a single blog post
 app.get('/blogs/:title', (req, res) => {
  const { title } = req.params;
  const filePath = path.join(blogDirectory, title);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.send(content);
  } else {
    res.status(404).send('Post not found');
  }
 })

 //Route to retrieve all blog posts
 app.get('/blogs', (req, res) => {
  const files = fs.readdirSync(blogDirectory);
  const blogs = files
  .map(file => ({ title: file.replace('.txt', '') }));
    res.send(blogs);
  });

//Start the server
app.listen(port , () => {
  console.log(`Server is running on port ${port}`);
});