import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/properties") // change to deployed backend later
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newProp) => setProperties([...properties, newProp]));
  };

  return (
    <div>
      <h1>Real Estate App</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="image" placeholder="Image URL" onChange={handleChange} />
        <button type="submit">Add Property</button>
      </form>

      {properties.map((property) => (
        <div key={property._id} className="property-card">
          <h3>{property.title}</h3>
          <p>{property.description}</p>
          <p>Price: ${property.price}</p>
          <p>Location: {property.location}</p>
          <img src={property.image} alt={property.title} />
        </div>
      ))}
    </div>
  );
}

export default App;