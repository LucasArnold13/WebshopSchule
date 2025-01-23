import { useParams } from "react-router-dom";
import { fetchProductWithName } from "../../api/products";
import { useEffect, useState } from "react";

function FrontendProduct() {

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { productName } = useParams();

  const fetchAndSetProduct = async () => {
    try {
     const response = await fetchProductWithName(productName);
     setProduct(response.data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  };

  useEffect(() => {

    Promise.all([fetchAndSetProduct()]).finally(() => {
      setLoading(false);
    });
  }, [loading]);

  if (loading) {
    return <p>Produkt wird geladen...</p>;
  }

  return (
    <>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <img src={product.image_url} alt={product.name} />
    </>
  );
}

export default FrontendProduct;