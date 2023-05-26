import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewCategoryForm = ({ handleCategorySave }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000");
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/videos")
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los videos:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  }, []);

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
      videos: videos,
    };

    axios
      .post("http://localhost:4000/categories", categoryData)
      .then((response) => {
        handleCategorySave({ ...response.data, color: color });
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error al guardar la categoría:", error);
      });
  };

  const handleClear = () => {
    setName("");
    setColor("");
  };

  const handleVideoEdit = (videoId) => {
    window.location.href = `/nuevo-video/${videoId}`;
  };

  const handleVideoDelete = (videoId) => {
    axios
      .delete(`http://localhost:3000/videos/${videoId}`)
      .then((response) => {
        const updatedVideos = videos.filter((video) => video.id !== videoId);
        setVideos(updatedVideos);
      })
      .catch((error) => {
        console.error("Error al eliminar el video:", error);
      });
  };
  const handleCategoryEdit = (categoryId) => {
    window.location.href = `/editar-categoria/${categoryId}`;
  };

  const handleCategoryDelete = (categoryId) => {
    axios
      .delete(`http://localhost:4000/categories/${categoryId}`)
      .then((response) => {
        const updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error("Error al eliminar la categoría:", error);
      });
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

      <h2 className="mt-4 text-white">Videos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-white">Nombre</th>
            <th className="text-white">Editar</th>
            <th className="text-white">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td className="text-white">{video.title}</td>
              <td>
                <Link
                  to={`/nuevo-video/${video.id}`}
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleVideoEdit(video.id)}
                >
                  Editar
                </Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleVideoDelete(video.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2 className="mt-4 text-white">Categorías</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-white">Nombre</th>
            <th className="text-white">Color</th>
            <th className="text-white">Editar</th>
            <th className="text-white">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="text-white">{category.name}</td>
              <td>
                <div
                  style={{
                    backgroundColor: category.color,
                    width: "50px",
                    height: "30px",
                  }}
                ></div>
              </td>
              <td>
                <Link
                  to={`/editar-categoria/${category.id}`}
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleCategoryEdit(category.id)}
                >
                  Editar
                </Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleCategoryDelete(category.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NewCategoryForm;
