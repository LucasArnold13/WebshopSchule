import { useParams } from "react-router-dom";

function Order()
{
    const { id } = useParams(); // Holt die ID aus der URL

    return (
        <p>Bestellung {id}</p>
    );
}
export default Order; 