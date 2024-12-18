import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Ordercard from "../../../Components/Ordercard";

function Orders() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    console.log("orders");
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/frontend/customer/21/orders', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.ok) {
                    setOrders(data); // Nur setzen, wenn die Antwort erfolgreich ist
                } else {
                    console.error("Fehler bei der API-Anfrage:", response.statusText);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchOrders(); // Asynchrone Funktion aufrufen
    }, []); 


    return (
        <>
            {orders.map(order => (
                <div onClick={() => navigate(`/customer/order/${order.id}`)} style={{ cursor: "pointer", display: "inline-block",margin: '1px 0px 15px 10px'  }}>
                <Ordercard
                    key={order.id}
                    date={order.createdAt}
                    state={order.status_id}
                    price={order.total_price_float}
                    quantity={3}
                />
                </div>

            ))}
        </>
    );
};

export default Orders;
