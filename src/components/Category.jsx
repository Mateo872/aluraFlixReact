const Category = ({ category, categoryColor }) => {
  const categoryStyle = {
    backgroundColor: categoryColor,
  };

  return (
    <h3 className="category_title" style={categoryStyle}>
      {category}
    </h3>
  );
};

export default Category;
