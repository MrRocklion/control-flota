import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { onSnapshot, query, collection } from "firebase/firestore"
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
import { db } from '../firebase/firebase-config';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function TransactionsPage() {
    const [tipo, setTipo] = useState('0')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [date, setDate] = useState(dayjs('2024-11-12'));
 

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleTipo = (event) => setTipo(event.target.value);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getData = async () => {
        const reference = query(collection(db, "transactions"));
        onSnapshot(reference, (querySnapshot) => {
            const aux_data = [];
            querySnapshot.forEach((doc) => {
                aux_data.push(doc.data());
            });
            const sortedData = aux_data.sort((a, b) => {
                const dateA = new Date(a.date_card.split('/').reverse().join('-') + ' ' + a.time_card);
                const dateB = new Date(b.date_card.split('/').reverse().join('-') + ' ' + b.time_card);
                return dateB - dateA;
            });
            setData(sortedData)
        });
    }


    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <Box sx={{ flexGrow: 1,padding:5 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 12 }} >
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 2 }} >
                                    <LocalizationProvider  dateAdapter={AdapterDayjs}>

                                        <DatePicker
                                            label="Fecha de Inicio"
                                            value={date}
                                            onChange={(newValue) => setDate(newValue)}
                                        />

                                    </LocalizationProvider>
                                </Grid>
                                <Grid size={{ xs: 12, md: 2 }} >
                                    <LocalizationProvider  dateAdapter={AdapterDayjs}>

                                        <DatePicker
                                            label="Fecha Final"
                                            value={date}
                                            onChange={(newValue) => setDate(newValue)}
                                        />

                                    </LocalizationProvider>
                                </Grid>
                                <Grid size={{ xs: 12, md: 2 }} >
                                    <FormControl fullWidth>
                                        <InputLabel id="lineas-label">Tipo de Tarjeta</InputLabel>
                                        <Select
                                            labelId="lineas-label"
                                            value={tipo}
                                            onChange={handleTipo}
                                            size="normal"
                                            label="Tipo de Tarjeta"
                                        >
                                            <MenuItem value="0">Todas</MenuItem>
                                            <MenuItem value="3">Especial</MenuItem>
                                            <MenuItem value="6">Fiscalizador</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 2 }} >
                                    <Button variant="contained" fullWidth sx={{"height":"100%"}}>Filtrar</Button>
                                </Grid>
                                <Grid size={{ xs: 12, md: 2 }} >
                                    <Button variant="contained" fullWidth sx={{"height":"100%"}}>Limpiar</Button>
                                </Grid>
                            </Grid>
                       
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
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.uuid}  >
                                                        <TableCell key={index} align={"center"}  >
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell align={"center"} >
                                                            {row.code}
                                                        </TableCell>
                                                        <TableCell align={"center"} >
                                                            {row.type}
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
// const data_aux = [
//     {
//         balance: 0,
//         code: "199002193",
//         cost: 0,
//         date: "2024-12-03 22:36:18",
//         date_card: "03/12/2024",
//         id: 2,
//         lat: "0.0",
//         lon: "0.0",
//         place: "Parada de prueba",
//         previous: 0,
//         time_card: "09:36:16",
//         type: "6",
//         upload: 0,
//         uuid: "799fcd19-23b6-4a00-bed8-8ccc852a4758"
//     }
// ]

