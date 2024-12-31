import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from 'react-router';
import { db } from "../../firebase/firebase-config";
import TextField from '@mui/material/TextField';
import BarChart from "../../components/bar-chart";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function VehiculosAdminPage() {
    const [vehicle, setVehicle] = useState({});
    const { id } = useParams();
    const getData = async () => {
        const docRef = doc(db, "vehicles", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1, p: 5 }}>
                <Grid container spacing={2}>
                    <Grid size={{xs:12,md:4}}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <h5>
                                    Parametros Generales
                                </h5>
                            </Grid>
                            <Grid size={{xs:12,md:6}}>
                                <TextField size="small" id="outlined-basic" label="Carroceria" variant="outlined" />
                            </Grid>
                            <Grid size={{xs:12,md:6}}>
                                <TextField size="small" id="outlined-basic" label="Chasis" variant="outlined" />
                            </Grid>
                            <Grid size={{xs:12,md:6}}>
                                <TextField size="small" id="outlined-basic" label="Placa" variant="outlined" />
                            </Grid>
                            <Grid size={{xs:12,md:6}}>
                                <TextField size="small" id="outlined-basic" label="Asientos" variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{xs:12,md:6}}>
                        <BarChart/>
                    </Grid>
                    <Grid size={{xs:12,md:6}}>
                        <>
                            <TableContainer component={Paper}>
                                    <Table  aria-label="customized table">
                                        <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">Nro</StyledTableCell>
                                            <StyledTableCell align="left">Propietario</StyledTableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {rows.map((row,index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell align="left">{row.name}</StyledTableCell>
                                                <StyledTableCell align="left">{row.fat}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                            </TableContainer>       
                        </>
                    </Grid>
                    <Grid size={{xs:12,md:6}}>
                    <>
                            <TableContainer component={Paper}>
                                    <Table  aria-label="customized table">
                                        <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">Nro</StyledTableCell>
                                            <StyledTableCell align="left">Equipo</StyledTableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {rows.map((row,index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell align="left">{row.calories}</StyledTableCell>
                                                <StyledTableCell align="left">{row.fat}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                            </TableContainer>       
                        </>
                    </Grid>
                    <Grid size={{xs:12,md:6}}>
                    <>
                            <TableContainer component={Paper}>
                                    <Table  aria-label="customized table">
                                        <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">Calories</StyledTableCell>
                                            <StyledTableCell align="left">Fat</StyledTableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {rows.map((row,index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell align="left">{row.calories}</StyledTableCell>
                                                <StyledTableCell align="left">{row.fat}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                            </TableContainer>       
                        </>
                    </Grid>

                </Grid>
            </Box>
        </>
    );
}

const rows = [
    {
        name:15,
        fat:15,
        carbs:15,
        protein:15
    },
    {
        name:15,
        fat:15,
        carbs:15,
        protein:15
    },
    {
        name:15,
        fat:15,
        carbs:15,
        protein:15
    },
    {
        name:15,
        fat:15,
        carbs:15,
        protein:15
    },
    {
        name:15,
        fat:15,
        carbs:15,
        protein:15
    }
    
  ];