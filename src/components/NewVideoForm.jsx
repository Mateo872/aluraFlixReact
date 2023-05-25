import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NewVideoForm = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]); // Estado para almacenar todas las categorías
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories")
      .then((response) => {
        setCategories(response.data); // Almacenar las categorías en el estado
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const validateForm = () => {
    if (!title || !link || !thumbnail || !category || !description) {
      setErrorMessage("Por favor, complete todos los campos.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const videoData = {
      title: title,
      link: link,
      thumbnail: thumbnail,
      category: category,
      description: description,
    };

    axios
      .post("http://localhost:3000/videos", videoData)
      .then((response) => {
        console.log("Video guardado:", response.data);
        setTitle("");
        setLink("");
        setThumbnail("");
        setCategory("");
        setDescription("");
        setErrorMessage(""); // Limpiar el mensaje de error
      })
      .catch((error) => {
        console.error("Error al guardar el video:", error);
      });
  };

  const handleClear = () => {
    setTitle("");
    setLink("");
    setThumbnail("");
    setCategory("");
    setDescription("");
    setErrorMessage("");
  };

  return (
    <div className="container">
      <h1 className="mb-4 text-white">Nuevo video</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-white">
            Título:
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="link" className="form-label text-white">
            Enlace del video:
          </label>
          <input
            type="text"
            id="link"
            className="form-control"
            value={link}
            onChange={handleLinkChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label text-white">
            Enlace de la miniatura:
          </label>
          <input
            type="text"
            id="thumbnail"
            className="form-control"
            value={thumbnail}
            onChange={handleThumbnailChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label text-white">
            Categoría:
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Seleccionar categoría</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Innovación y gestión">Innovación y gestión</option>
            <option value="Diseño web">Diseño web</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label text-white">
            Descripción:
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
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
        <Link
          to="/nueva-categoria"
          type="button"
          className={`btn btn-secondary`}
        >
          Nueva categoría
        </Link>
      </form>
    </div>
  );
};

export default NewVideoForm;
