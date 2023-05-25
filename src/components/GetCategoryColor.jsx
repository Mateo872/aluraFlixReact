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

export default getCategoryColor;
