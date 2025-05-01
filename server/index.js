const express = require('express');
const connectDatabase = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const path = require('path');
const multer = require('multer');  // Make sure to require multer for file uploads

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDatabase();

// Static file serving for uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer file upload setup (example for a POST route to upload images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');  // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Unique filename
  }
});

const upload = multer({ storage: storage });

// Upload route (example)
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Route to get product details
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
