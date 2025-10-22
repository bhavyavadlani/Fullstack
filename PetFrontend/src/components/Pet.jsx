import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Pet() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    owner: ""
  });

  const [petList, setPetList] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState("");
  const [viewPet, setViewPet] = useState(null);

  // Base API URL (connected to PetBackend)
  const baseUrl = `${import.meta.env.VITE_API_URL}/petapi`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editMode) {
        const response = await axios.put(`${baseUrl}/update`, {
          id: editId,
          ...formData,
        });
        if (response.status === 200) {
          setMessage(response.data);
          resetForm();
          fetchPets();
        }
      } else {
        const response = await axios.post(`${baseUrl}/add`, formData);
        if (response.status === 200) {
          setMessage(response.data);
          resetForm();
          fetchPets();
        }
      }
    } catch (err) {
      setError("Failed to save pet");
      console.error("Save error:", err);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", type: "", age: "", owner: "" });
    setEditMode(false);
    setEditId(null);
    setError("");
    setMessage("");
  };

  const fetchPets = async () => {
    try {
      const response = await axios.get(`${baseUrl}/viewall`);
      setPetList(response.data);
    } catch (err) {
      setError("Failed to fetch pets");
      console.error("Fetch error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        const response = await axios.delete(`${baseUrl}/delete/${id}`);
        setMessage(response.data);
        fetchPets();
      } catch {
        setError("Failed to delete pet");
      }
    }
  };

  const handleEdit = (pet) => {
    setFormData({
      name: pet.name,
      type: pet.type,
      age: pet.age,
      owner: pet.owner,
    });
    setEditId(pet.id);
    setEditMode(true);
    setError("");
    setMessage("");
  };

  const handleViewById = async () => {
    if (!viewId) {
      setError("Please enter a Pet ID");
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/viewbyid/${viewId}`);
      setViewPet(response.data);
      setError("");
    } catch {
      setError("Pet not found");
      setViewPet(null);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Add / Update Pet */}
      <div className="pet-form-container">
        <h3>{editMode ? "Update Pet" : "Add Pet"}</h3>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Type:</label>
            <input
              type="text"
              id="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Owner:</label>
            <input
              type="text"
              id="owner"
              value={formData.owner}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            {editMode ? "Update Pet" : "Add Pet"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* View by ID */}
      <div style={{ marginTop: "30px" }}>
        <h3>View Pet by ID</h3>
        <input
          type="number"
          placeholder="Enter Pet ID"
          value={viewId}
          onChange={(e) => setViewId(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleViewById}>View</button>

        {viewPet && (
          <div
            style={{
              marginTop: "15px",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h4>Pet Details</h4>
            <p><strong>ID:</strong> {viewPet.id}</p>
            <p><strong>Name:</strong> {viewPet.name}</p>
            <p><strong>Type:</strong> {viewPet.type}</p>
            <p><strong>Age:</strong> {viewPet.age}</p>
            <p><strong>Owner:</strong> {viewPet.owner}</p>
          </div>
        )}
      </div>

      {/* All Pets Table */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ textAlign: "center" }}>All Pets</h3>
        {petList.length === 0 ? (
          <p style={{ textAlign: "center" }}>No pets found</p>
        ) : (
          <table
            border="1"
            width="100%"
            cellPadding="8"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Age</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {petList.map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.id}</td>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.age}</td>
                  <td>{pet.owner}</td>
                  <td>
                    <button onClick={() => handleEdit(pet)}>Edit</button>
                    <button onClick={() => handleDelete(pet.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
