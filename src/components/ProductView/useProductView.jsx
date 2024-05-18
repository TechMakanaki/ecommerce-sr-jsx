import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useProductView = () => {
  const { Id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/shops/${Id}?populate=*`)
      .then(({ data }) => {
        console.log("API Response:", data); // Log the API response
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError(error);
      });
  }, [Id]);

  return { product, error };
};

export default useProductView;
