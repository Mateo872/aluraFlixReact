import React, { useState } from "react";
import axios from "axios";

const NewCategoryForm = ({ handleCategorySave }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const categoryData = {
      name: name,
      color: color,
    };

    axios
      .post("http://localhost:4000/categories", categoryData)
      .then((response) => {
        setName("");
        setColor("");
        handleCategorySave({ ...response.data, color: color });
      })
      .catch((error) => {
        console.error("Error al guardar la categoría:", error);
      });
  };

  const handleClear = () => {
    setName("");
    setColor("");
  };

  return (
    <div className="container">
      <h1 className="mb-4 text-white">Nueva categoría</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-white">
            Nombre de categoría:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="color" className="form-label text-white">
            Color del fondo:
          </label>
          <input
            type="color"
            id="color"
            className="form-control"
            value={color}
            onChange={handleColorChange}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={handleClear}
        >
          Limpiar
        </button>
      </form>
    </div>
  );
};

export default NewCategoryForm;
