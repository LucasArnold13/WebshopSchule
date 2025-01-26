import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrderFromCustomer } from "../../../api/orders";
import { Box } from "@mui/material";

import Ordercard from "../../../Components/Ordercard";

function Orders() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetOrders();
    }, []);

    const fetchAndSetOrders = async () => {
        try {
            const response = await fetchOrderFromCustomer();
            if (response.status === 200) {
                setOrders(response.data);
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };


    return (
        <>
            <Box sx={{ paddingTop : 2}}>
                {orders.map(order => (
                    <div onClick={() => navigate(`/customer/order/${order.id}`)} style={{ cursor: "pointer", display: "inline-block", margin: '1px 0px 15px 10px' }}>
                        <Ordercard
                            key={order.id}
                            date={order.createdAt}
                            state={order.status_id}
                            price={order.total_price_float}
                            quantity={3}
                        />
                    </div>


                ))}
            </Box>
        </>
    );
};

export default Orders;
