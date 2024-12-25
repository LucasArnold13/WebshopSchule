import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';


function Table({rows, columns, handleCellClick})
{
    const theme = createTheme({
        components: {
          MuiDataGrid: {
            styleOverrides: {
              columnHeaders: {
                backgroundColor: "rgba(45, 89, 235, 0.9)  !important", // Hintergrund global anpassen
                color: "black", // Textfarbe
              },
              root: {
                '--DataGrid-containerBackground': 'rgba(45, 89, 235, 0.9)',
              },
            },
          },
        },
      });

      return (
        <>
            <ThemeProvider theme={theme}>
            <div style={{ height: "100%", width: '100%'}}>
                <DataGrid
                    disableRowSelectionOnClick 
                    rows={rows}
                    height={1700}
                    columns={columns}
                    onCellClick={handleCellClick}
                    sx={{
                        "& .MuiDataGrid-cell:focus": {
                            outline: "none", 
                          },
                          "& .MuiDataGrid-columnHeader:focus": {
                            outline: "none",
                          },
                        "& .MuiDataGrid-columnHeaders": {
                        },
                        '& .MuiDataGrid-cell': {
                            backgroundColor:  "rgba(255, 255, 255, 0.9) !important", 
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                          },
                        }} />
            </div>
            </ThemeProvider>
        </>

    );
}

export default Table;