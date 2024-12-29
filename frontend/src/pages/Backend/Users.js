import Table from "../../Components/Table";
import { Button, Typography, Modal, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Users() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const columns = [
    { field: 'col1', headerName: 'ID', headerAlign: "center", flex: 1, },
    { field: 'col2', headerName: 'Name', headerAlign: "center", flex: 1, },
    { field: 'col3', headerName: 'email', headerAlign: "center", flex: 1 },
    { field: 'col4', headerName: 'Rolle', headerAlign: "center", flex: 1 },
    { field: 'col5', headerName: 'ist aktiv', headerAlign: "center", flex: 1 },
  ];


  const transformData = (apiData) => {
    return apiData.map((item, index) => ({
      id: index + 1,
      col1: item.id,
      col2: item.name,
      col3: item.email,
      col4: item.role.name,
      col5: item.is_active ? 'Ja' : 'Nein',
    }));
  };
  const handleCellClick = (params) => {
    navigate(`/backend/users/${params.row.col1}`);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/backend/users', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);
      setRows(transformData(data));
      if (response.ok) {

      } else {
        console.error("Fehler bei der API-Anfrage:", response.statusText);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const saveNewUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/backend/users', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      console.log(data);
      setRows(transformData(data));
      if (response.ok) {

      } else {
        console.error("Fehler bei der API-Anfrage:", response.statusText);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={openModal}>hinzufügen</Button>
      <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Benutzer</Typography>
      <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />


      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <TextField value={newUser?.name} label="Name" onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <TextField value={newUser?.email} label="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <Button variant="contained" onClick={saveNewUser}>Speichern</Button>
        </Box>
      </Modal>
    </>
  );
}
export default Users;