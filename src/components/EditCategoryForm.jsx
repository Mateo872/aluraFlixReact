import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditCategoryForm = ({ categories, handleCategorySave }) => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const selectedCategory = categories.find((cat) => cat.id === Number(id));
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [categories, id]);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setCategory((prevCategory) => ({
      ...prevCategory,
      name: newName,
    }));
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setCategory((prevCategory) => ({
      ...prevCategory,
      color: newColor,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:4000/categories/${category.id}`, {
        name: category.name,
        color: category.color,
      })
      .then((response) => {
        handleCategorySave(response.data);
        window.location.href = "/nueva-categoria";
      })
      .catch((error) => {
        console.error("Error al guardar la categoría:", error);
      });
  };

  if (!category) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container container_edit">
      <h1 className="mb-4 text-white">Editar categoría</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-white">
            Nombre de categoría:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={category.name}
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
            value={category.color}
            onChange={handleColorChange}
          />
        </div>

        <button className="btn btn-primary me-2" onClick={handleSubmit}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EditCategoryForm;
