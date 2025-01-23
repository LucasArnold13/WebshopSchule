import { useEffect, useState } from "react";
import { fetchCategoryWithName } from "../../api/categories";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Card, CardMedia, CardContent,Grid2 } from "@mui/material";


function FrontendCategory() {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    

    const fetchAndSetCategory = async () => {
        try {
            const response = await fetchCategoryWithName(categoryName);
            setCategory(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    useEffect(() => {
        Promise.all([fetchAndSetCategory()]).finally(() => {
            setLoading(false);
        });
    }, [categoryName, loading]);

    if (loading) {
        return <p>Kategorie wird geladen...</p>;
    }

    return (
        <>
            <Typography variant="h1">{category.name}</Typography>
            <Typography variant="body1">{category.description}</Typography>
            <Grid2 container spacing={3} sx={{ marginTop: 4 }}>
                {category.products.map((product) => (

                    <Card 
                    key={product.id} 
                    sx={{ maxWidth: 345 }}
                    onClick={() => (navigate(`/product/${product.name}`))}
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image={product.image_url}
                            alt={product.name}
                            sx={{ objectFit: "cover" }}
                        />
                        <CardContent>
                            <Typography variant="h5" sx={{ textAlign: "center", marginTop: "4px" }}>
                                {product.name}
                            </Typography>
                            <Typography variant="h6" sx={{ textAlign: "center", marginTop: "4px" }}>
                                {product.price} €
                            </Typography>
                        </CardContent>
                    </Card>



                ))}
            </Grid2>




        </>
    );
}
export default FrontendCategory;