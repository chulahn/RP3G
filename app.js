/ app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (make sure you have a MongoDB instance running)
mongoose.connect('mongodb://localhost/mern_crud_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Item = mongoose.model('Item', {
  name: String,
  description: String,
});

// Define API routes for CRUD operations
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.put('/api/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedItem);
});

app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndRemove(req.params.id);
  res.json({ message: 'Item deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});