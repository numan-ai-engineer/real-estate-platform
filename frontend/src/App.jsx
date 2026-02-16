import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
  });

  // GET all properties
  const fetchProperties = () => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ADD property
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        fetchProperties();
        setFormData({
          title: "",
          description: "",
          price: "",
          location: "",
          image: "",
        });
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Real Estate App</h1>

      {/* Add Property Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required /><br /><br />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required /><br /><br />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required /><br /><br />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required /><br /><br />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required /><br /><br />
        <button type="submit">Add Property</button>
      </form>

      {/* Property List */}
      {properties.map((property) => (
        <div key={property._id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
          <img src={property.image} alt="" width="200" />
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <p>Price: ${property.price}</p>
          <p>Location: {property.location}</p>
          <button onClick={() => handleDelete(property._id)}>
  Delete
</button>
<button  className="delete-btn" onClick={() => handleUpdate(property._id)}>
</button>
<button className="edit-btn" onClick={() => handleUpdate(property._id)}>
  Edit
</button>
        </div>
      ))}
    </div>
  );
}
const handleDelete = (id) => {
  fetch(`http://localhost:5000/api/properties/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => fetchProperties());
};
const handleUpdate = (id) => {
  const newTitle = prompt("Enter new title:");
  if (!newTitle) return;

  fetch(`http://localhost:5000/api/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle }),
  })
    .then((res) => res.json())
    .then(() => fetchProperties());
};
export default App;