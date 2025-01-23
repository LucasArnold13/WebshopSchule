import React, { useState, useCallback } from "react";
import { Modal, Box, TextField, Typography, Paper } from "@mui/material";
import { searchCustomers } from "../../api/customers";
import _ from "lodash";
import { useNavigate } from 'react-router-dom';

function SearchCustomerModal({open, setOpen})
{
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]); 
    const [searchQuery, setSearchQuery] = useState("");

    
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };
    const handleChange = (event) => {
        const query = event.target.value;
        console.log(query);
        setSearchQuery(query);
        debouncedSearch(query);
    };


    
    const handleSearch = async (query) => {
      try {
    
          const response = await searchCustomers(query);
          setCustomers(response.data)
    
      } catch (error) {
          console.error('Fehler bei der Suche:', error);
      }
    };
    const debouncedSearch = useCallback(
      _.debounce((query) => {
          handleSearch(query);
      }, 500), 
      []
    );


    const onClose = () => {
        setOpen(false);
        setCustomers([]);
        setSearchQuery("");
    };


    return (
        <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              sx={{ width: "100%" }}
              value={searchQuery}
              onChange={handleChange}

            />
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "0.5rem",
            }}
          >

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 2fr",
                alignItems: "center",
                backgroundColor: "rgba(22, 139, 248, 0.9)",
                padding: 2,
                fontWeight: "bold",
                borderBottom: "2px solid #ccc",
              }}
            >
              <Typography variant="body1">ID</Typography>
              <Typography variant="body1">Vorname</Typography>
              <Typography variant="body1">Nachname</Typography>
              <Typography variant="body1">Email</Typography>
            </Box>

            {/* Produktliste */}
            {customers?.length > 0 ? (
              customers.map((item) => (
                <Paper
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 2fr",
                    alignItems: "center",
                    padding: 2,
                    marginTop: 1,
                    marginBottom: 1,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(22, 139, 248, 0.27)",
                    },
                  }}
                  onClick={() =>   navigate(`/backend/orders/new?customerId=${item.id}`)}
                  key={item.id}
                >
                  <Typography variant="body1">{item.id}</Typography>
                  <Typography variant="body1">{item.firstname}</Typography>
                  <Typography variant="body1">{item.lastname}</Typography>
                  <Typography variant="body1">{item.email}</Typography>
                </Paper>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: "gray",
                  marginTop: "1rem",
                }}
              >
                Keine Kunden gefunden.
              </Typography>
            )}
          </Box>


        </Box>
      </Modal>

    );
}

export default SearchCustomerModal;