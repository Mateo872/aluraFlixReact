import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Video from "./components/Video";
import Category from "./components/Category";
import NewVideoForm from "./components/NewVideoForm";
import "bootstrap/dist/css/bootstrap.min.css";
import NewCategoryForm from "./components/NewCategoryForm";
import EditCategoryForm from "./components/EditCategoryForm";

const App = () => {
  const [videosData, setVideosData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchVideosData();
    fetchCategories();
  }, []);

  const fetchVideosData = () => {
    axios
      .get("http://localhost:3000/videos")
      .then((response) => {
        setVideosData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos data:", error);
      });
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:4000/categories")
      .then((response) => {
        const categoriesWithIds = response.data.map((category, index) => ({
          ...category,
          id: index + 1,
        }));
        setCategories(categoriesWithIds);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleCategorySave = (category) => {
    const { color, ...categoryData } = category;
    axios
      .post("http://localhost:4000/categories", categoryData)
      .then((response) => {
        const updatedCategory = { ...response.data, color };
        setCategories((prevCategories) => [...prevCategories, updatedCategory]);
      })
      .catch((error) => {
        console.error("Error al guardar la categoría:", error);
      });
  };

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              videosData={videosData}
              categories={categories}
              handleCategorySave={handleCategorySave}
            />
          }
        />
        <Route
          path="/nuevo-video"
          element={
            <NewVideoForm
              categories={categories}
              setVideosData={setVideosData}
            />
          }
        />
        <Route
          path="/nueva-categoria"
          element={<NewCategoryForm handleCategorySave={handleCategorySave} />}
        />
        <Route
          path="/nuevo-video/:id?"
          element={
            <NewVideoForm
              categories={categories}
              setVideosData={setVideosData}
            />
          }
        />
        <Route
          path="/editar-categoria/:id"
          element={
            <EditCategoryForm
              categories={categories}
              handleCategorySave={handleCategorySave}
            />
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

const HomePage = ({ videosData, categories }) => {
  const uniqueCategories = useMemo(() => {
    if (videosData.length > 0 && categories.length > 0) {
      return [
        ...new Set(videosData.map((video) => video.category)),
        ...categories.map((category) => category.name),
      ];
    }
    return [];
  }, [videosData, categories]);

  return (
    <>
      <Banner videosData={videosData} />
      {uniqueCategories.map((category) => {
        const categoryData = categories.find((c) => c.name === category);
        const categoryColor = categoryData
          ? categoryData.color
          : getCategoryColor(category);
        const categoryVideos = videosData.filter(
          (video) => video.category === category
        );

        return (
          <div key={category}>
            <Category category={category} categoryColor={categoryColor} />
            <div className="slider">
              <div
                className="container_slider d-flex justify-content-between flex-nowrap gap-4"
                style={{ borderColor: categoryColor }}
              >
                {categoryVideos.map((video) => (
                  <Link to={video.link} key={video.id}>
                    <Video video={video} categoryColor={categoryColor} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const getCategoryColor = (category) => {
  switch (category) {
    case "Frontend":
      return "red";
    case "Backend":
      return "blue";
    case "Innovación y gestión":
      return "green";
    case "Diseño web":
      return "orange";
    default:
      return "gray";
  }
};

export default App;
