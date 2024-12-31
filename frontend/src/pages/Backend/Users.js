import React, { useState, useEffect } from "react";
import Table from "../../Components/Table";
import { Button, Typography, Box  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../api/users";
import UserModal from "../../Components/Modals/UserModal";

function Users() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const columns = [
    { field: "col1", headerName: "ID", headerAlign: "center", flex: 1 },
    { field: "col2", headerName: "Name", headerAlign: "center", flex: 1 },
    { field: "col3", headerName: "Email", headerAlign: "center", flex: 1 },
    { field: "col4", headerName: "Rolle", headerAlign: "center", flex: 1 },
    { field: "col5", headerName: "Ist aktiv", headerAlign: "center", flex: 1 },
  ];

  const fetchAndSetUsers = async () => {
    try {
      const data = await fetchUsers();
      setRows(
        data.map((item, index) => ({
          id: index + 1,
          col1: item.id,
          col2: item.name,
          col3: item.email,
          col4: item.role.name,
          col5: item.is_active ? "Ja" : "Nein",
        }))
      );
    } catch (error) {
      console.error("Fehler beim Abrufen der Benutzer:", error);
    }
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 2,
      }}>
        <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Benutzer</Typography>
        <Button variant="contained" onClick={openModal}>Benutzer hinzufügen</Button>
      </Box>
      <Table rows={rows} columns={columns} handleCellClick={(params) => navigate(`/backend/users/${params.row.col1}`)} />


      <UserModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default Users;
