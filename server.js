const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// MongoDB Connection used mongo instead of localhost for contanerisation purpose
mongoose.connect('mongodb://mongo:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema and model for Todo items
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new todo
app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({ text: req.body.text, completed: false });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).send('Todo not found');
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).send('Todo not found');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});