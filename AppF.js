// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/items').then((response) => setItems(response.data));
  }, []);

  const addItem = () => {
    axios.post('/api/items', { name, description }).then((response) => {
      setItems([...items, response.data]);
      setName('');
      setDescription('');
    });
  };

  const deleteItem = (id) => {
    axios.delete(`/api/items/${id}`).then(() => {
      setItems(items.filter((item) => item._id !== id));
    });
  };

  return (
    <div className="App">
      <h1>Item CRUD App</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;