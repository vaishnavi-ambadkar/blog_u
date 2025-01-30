
// const express = require('express');
// const mongoose = require('mongoose');
// const fileUpload = require('express-fileupload');
// const postRoutes = require('./routes/postRoutes');
// const cloudinary = require('cloudinary').v2;
// const cors = require('cors');
// const Post = require('./models/Post'); // Import the Post model

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: 'dar0bjrax',
//   api_key: '176993643569666',
//   api_secret: '_2IWSycsEs6u6qUIwGgVEsdc6Q0',
// });

// // MongoDB connection
// mongoose.connect('mongodb+srv://ambadkarvaishnavi667:Sunitaambadkar@signup.q9zwd.mongodb.net/blog?retryWrites=true&w=majority&appName=signup', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Route to handle adding new post
// app.post('/api/posts', async (req, res) => {
//   const { title, description } = req.body;
//   let imageUrl = null;

//   // Check if file is present
//   if (req.files && req.files.image) {
//     try {
//       const file = req.files.image;
//       const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
//       imageUrl = uploadResult.secure_url; // Cloudinary image URL
//     } catch (err) {
//       console.error('Error uploading image:', err);
//       return res.status(500).json({ message: 'Error uploading image', error: err });
//     }
//   }

//   try {
//     // Create a new post in MongoDB
//     const newPost = await Post.create({
//       title,
//       description,
//       imageUrl,
//     });

//     res.status(200).json({ message: 'Post created successfully!', post: newPost });
//   } catch (err) {
//     console.error('Error creating post:', err);
//     res.status(500).json({ message: 'Error creating post', error: err });
//   }
// });

// // Add this route to fetch all posts
// app.get('/api/posts', async (req, res) => {
//   try {
//     const posts = await Post.find(); // Fetch all posts from MongoDB
//     res.status(200).json(posts);
//   } catch (err) {
//     console.error('Error fetching posts:', err);
//     res.status(500).json({ message: 'Error fetching posts', error: err });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
// const express = require('express');
// const mongoose = require('mongoose');
// const fileUpload = require('express-fileupload');
// const cors = require('cors');
// const cloudinary = require('cloudinary').v2;
// const postRoutes = require('./routes/postRoutes');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: 'dar0bjrax', // Replace with your actual Cloudinary cloud name
//   api_key: '176993643569666', // Replace with your actual API key
//   api_secret: '_2IWSycsEs6u6qUIwGgVEsdc6Q0', // Replace with your actual API secret
// });
// console.log('Cloudinary configured successfully!');

// // MongoDB connection
// mongoose.connect('mongodb+srv://ambadkarvaishnavi667:Sunitaambadkar@signup.q9zwd.mongodb.net/blog?retryWrites=true&w=majority&appName=signup', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Routes
// app.use('/api/posts', (req, res, next) => {
//   req.cloudinary = cloudinary; // Attach Cloudinary to the request object
//   next();
// }, postRoutes);

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const postRoutes = require('./routes/postRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: [""], // Your frontend's Vercel URL
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dar0bjrax', // Replace with your actual Cloudinary cloud name
  api_key: '176993643569666', // Replace with your actual API key
  api_secret: '_2IWSycsEs6u6qUIwGgVEsdc6Q0', // Replace with your actual API secret
});
console.log('Cloudinary configured successfully!');

// MongoDB connection
mongoose.connect('mongodb+srv://ambadkarvaishnavi667:Sunitaambadkar@signup.q9zwd.mongodb.net/blog?retryWrites=true&w=majority&appName=signup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/posts', (req, res, next) => {
  req.cloudinary = cloudinary; // Attach Cloudinary to the request object
  next();
}, postRoutes);

// DELETE route to handle deleting a blog post by ID
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Attempt to delete the post by ID
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return a success message if deleted
    res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Error deleting post', error: err });
  }
});
app.get("/", (req, res) => {
  res.json("Hello");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
