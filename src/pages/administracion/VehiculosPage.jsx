import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Box from '@mui/material/Box';
const data = []
export default function VehiculosPage(){

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <>
            <Box sx={{ flexGrow: 1,p:5 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3 }}>

                    </Grid>
                    <Grid size={12}>
                        <div className='p-2'>
                            <TableContainer sx={{ maxHeight: 640 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Nro
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ minWidth: 100, background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Tarjeta
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Tipo
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Dia
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Hora
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Costo
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}  >
                                                        <TableCell   align={"center"}  >
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell align={"center"} >
                                                            {row.code}
                                                        </TableCell>
                                                        <TableCell align={"center"} >
                                                            {}
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            {row.date_card}
                                                        </TableCell>
                                                        <TableCell align={"center"}  >
                                                            {row.time_card}
                                                        </TableCell>
                                                        <TableCell align={"center"}  >
                                                            {row.cost}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{ background: "#0C1017", color: 'white' }}
                            />

                        </div>
                        </Grid>
                </Grid>
            </Box>
        </>
    );

}