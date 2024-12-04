import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
export default function TransactionsPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(5),
        color: '#fff',
    }));


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }} >
                        <Item>
                            <Button variant="contained">Traer Datos</Button>
                        </Item>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} >
                        <Item>size=4</Item>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Item>size=4</Item>
                    </Grid>
                    <Grid size={12}>

                        <div className='p-2'>
                            <TableContainer sx={{ maxHeight: 640 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align={"center"}
                                                style={{background: "#0C1017", color: 'white' }}
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
                                                style={{  background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Tipo
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{  background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Dia
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{  background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Hora
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{  background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Costo
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data_aux
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}  >
                                                    <TableCell key={index} align={"center"} sx={{ borderBottomColor: "#242a37", color: "white" }} >
                                                            {index+1}
                                                        </TableCell>
                                                        <TableCell key={index} align={"center"} sx={{ borderBottomColor: "#242a37", color: "white" }} >
                                                            {row.code}
                                                        </TableCell>
                                                        <TableCell key={index} align={"center"} sx={{ borderBottomColor: "#242a37", color: "white" }} >
                                                            {row.type}
                                                        </TableCell>
                                                        <TableCell key={index} align={"center"} sx={{ borderBottomColor: "#242a37", color: "white" }} >
                                                            {row.date_card}
                                                        </TableCell>
                                                        <TableCell key={index} align={"center"} sx={{ borderBottomColor: "#242a37", color: "white" }} >
                                                            {row.time_card}
                                                        </TableCell>
                                                        <TableCell key={index} align={"center"} sx={{ borderBottomColor: "#242a37", color: "white" }} >
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
                                count={data_aux.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{background: "#0C1017", color: 'white'}}
                            />

                        </div>
                    </Grid>

                </Grid>
            </Box>
        </>
    );

}
const data_aux = [
    {
        balance: 0,
        code: "199002193",
        cost: 0,
        date: "2024-12-03 22:36:18",
        date_card: "03/12/2024",
        id: 2,
        lat: "0.0",
        lon: "0.0",
        place: "Parada de prueba",
        previous: 0,
        time_card: "09:36:16",
        type: "6",
        upload: 0,
        uuid: "799fcd19-23b6-4a00-bed8-8ccc852a4758"
    }
]

