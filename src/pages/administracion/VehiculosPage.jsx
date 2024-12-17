import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc,query, collection ,getDocs } from "firebase/firestore"; 
import { db } from '../../firebase/firebase-config';


const data = []
export default function VehiculosPage() {
    const [dialogVehicle, setDialogVehicle] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [grupo, setGrupo] = useState(1);
    const [empresa, setEmpresa] = useState(1);
    const [linea, setLinea] = useState(1);
    const [marca,setMarca] = useState(1);
    const [carroceria,setCarroceria] = useState(1);
    const [registro,setRegistro] = useState('');
    const [asientos,setAsientos] = useState(0);
    const [chasis,setChasis] = useState('');
    const [placa,setPlaca] = useState('');
    const [modelo,setModelo] = useState('');
    const [socio,setSocio] = useState();
    const [vehicles,setVehicles] = useState([]);
    const [socios,setSocios] = useState([]);

    const handleGrupo = (event) => {
      setGrupo(event.target.value);
    };
    const handleLinea = (event) => setLinea(event.target.value);
    const handleEmpresa = (event) => setEmpresa(event.target.value);
    const handleMarca = (event) => setMarca(event.target.value);
    const handleCarroceria = (event) => setCarroceria(event.target.value);
    const openDialogVehicle = () => setDialogVehicle(true);
    const closeDialogVehicle = () => setDialogVehicle(false);

  
    const createVehicle = async() => {
        const uuid = uuidv4();
        const newData = {
            registro:socio.register,
            socio:{id: socio.uuid,nombre:socio.names},
            latitud:-3.9986953575376636,
            longitud:-79.20557380361966,
            ultima_con:0,
            grupo:grupo,
            empresa:empresa,
            place:'rt'+registro.toString(),
            linea:linea,
            marca:marca,
            modelo:modelo.toUpperCase(),
            chasis:chasis.toUpperCase(),
            placa:placa.toUpperCase(),
            estado:0,
            carroceria:carroceria,
            uuid:uuid,
        }
        console.log(newData);
        await setDoc(doc(db, "unidades", uuid),newData);
        setDialogVehicle(false)
    }   
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getData =  async() => {
            const aux_personal = [];
            const querySnapshot2 = await getDocs(collection(db, "personal"));
            querySnapshot2.forEach((doc) => {
                aux_personal.push(doc.data());
            });

            const socios_filter =  aux_personal.filter((item)=> item.job === 1);
            console.log(socios_filter)
            setSocios(socios_filter)
            //

            const aux_data = [];
            const querySnapshot = await getDocs(collection(db, "unidades"));
            querySnapshot.forEach((doc) => {
                aux_data.push(doc.data());
            });
            const sortedData = aux_data.sort((a, b) => {
                const register_a = parseInt(a.registro)
                const register_b = parseInt(b.registro)
                return register_a - register_b;
            });
            setVehicles(sortedData)
           
        }
    const procesarEmpresa =(_data)=>{
        if(_data == 1){
            return "urbasur"
        }else{
            return "no especifico"
        }
    }
    const procesarEstado =(_data)=>{
        if(_data == 0){
            return "inactivo"
        }else if(_data == 1){
            return "activo"
        }
        else{
            return "no especifico"
        }
    }
   useEffect(() => {
         
      }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1, p: 5 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <button type="button" onClick={getData} className="w-full px-5 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Traer Datos </button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <button type="button" onClick={openDialogVehicle} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar Nuevo Vehiculo </button>
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
                                                Registro
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Empresa
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Socio
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Estado
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Linea
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {vehicles
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}  >
                                                        <TableCell align={"center"}  >
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell align={"center"} >
                                                            {row.registro}
                                                        </TableCell>
                                                        <TableCell align={"center"} >
                                                            {procesarEmpresa(row.empresa)}
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            {row.socio.nombre}
                                                        </TableCell>
                                                        <TableCell align={"center"}  >
                                                            {procesarEstado(row.estado)}
                                                        </TableCell>
                                                        <TableCell align={"center"}  >
                                                            L{row.linea}
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
                                count={vehicles.length}
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

            <Dialog onClose={closeDialogVehicle} open={dialogVehicle} fullWidth maxWidth={"sm"} >
                <DialogTitle>
                    <h5 className='font-sans font-bold text-gray-700 text-center'>Cree un Nuevo vehiculo</h5>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                    
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Autocomplete
                                value={socio}
                                onChange={(event, newValue) => {
                                setSocio(newValue);
                                }}
                                size='small'
                                id="controllable-states-demo"
                                options={socios}
                                getOptionLabel={(option) => option.names}
                                renderInput={(params) => <TextField {...params} label="Seleccione un socio" />}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Grupo</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={grupo}
                                label="Grupo"
                                onChange={handleGrupo}
                            >
                                <MenuItem value={1}>Grupo 1</MenuItem>
                                <MenuItem value={2}>Grupo 2</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Empresa</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={empresa}
                                label="Empresa"
                                onChange={handleEmpresa}
                            >
                                <MenuItem value={1}>URBASUR</MenuItem>
                                <MenuItem value={2}>URBAEXPRESS</MenuItem>
                                <MenuItem value={3}>CUXIBAMBA</MenuItem>
                                <MenuItem value={4}>24 DE MAYO</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Linea</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={linea}
                                label="Linea"
                                onChange={handleLinea}
                            >
                                <MenuItem value={1}>LINEA 1</MenuItem>
                                <MenuItem value={2}>LINEA 2</MenuItem>
                                <MenuItem value={3}>LINEA 3</MenuItem>
                                <MenuItem value={4}>LINEA 4</MenuItem>
                                <MenuItem value={5}>LINEA 5</MenuItem>
                                <MenuItem value={6}>LINEA 6</MenuItem>
                                <MenuItem value={7}>LINEA 7</MenuItem>
                                <MenuItem value={8}>LINEA 8</MenuItem>
                                <MenuItem value={9}>LINEA 9</MenuItem>
                                <MenuItem value={10}>LINEA 10</MenuItem>
                                <MenuItem value={11}>LINEA 11</MenuItem>
                                <MenuItem value={12}>LINEA 12</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-select-small-label">Marca</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={marca}
                                    label="Marca"
                                    onChange={handleMarca}
                                >
                                    <MenuItem value={1}>MERCEDES</MenuItem>
                                    <MenuItem value={2}>HINO</MenuItem>
                                    <MenuItem value={3}>VOLKSWAGEN</MenuItem>
                                    <MenuItem value={4}>CHEVROLET</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth size="small">
                                <InputLabel id="demo-select-small-label">Carroceria</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={carroceria}
                                    label="Carroceria"
                                    onChange={handleCarroceria}
                                >
                                    <MenuItem value={1}>OLIMPICA</MenuItem>
                                    <MenuItem value={2}>INMAY</MenuItem>
                                    <MenuItem value={3}>GENIUS</MenuItem>
                                    <MenuItem value={4}>SERMAN</MenuItem>
                                    <MenuItem value={5}>GUZMAN</MenuItem>
                                    <MenuItem value={6}>VIPESA</MenuItem>
                                    <MenuItem value={7}>IMCE</MenuItem>
                                    <MenuItem value={8}>IMPEDSA</MenuItem>
                                    <MenuItem value={9}>CAPABA</MenuItem>
                                    <MenuItem value={10}>CEPEDA</MenuItem>
                                    <MenuItem value={11}>CUEVA</MenuItem>
                                    <MenuItem value={12}>VARMA</MenuItem>
                                    <MenuItem value={13}>OTRAS</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                                label="Asientos"
                                id="outlined-size-small"
                                size="small"
                                fullWidth
                                type='number'
                                onChange={(event)=>{setAsientos(event.target.value)}}
                                value={asientos}
                            />
                        </Grid>
                        
                        <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                                label="Chasis"
                                id="outlined-size-small"
                                size="small"
                                fullWidth
                                onChange={(event)=>{setChasis(event.target.value)}}
                                value={chasis}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                                label="Placa"
                                id="outlined-size-small"
                                size="small"
                                fullWidth
                                onChange={(event)=>{setPlaca(event.target.value)}}
                                value={placa}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                    label="Modelo"
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth
                                    onChange={(event)=>{setModelo(event.target.value)}}
                                    value={modelo}
                                />
                        </Grid>
                        
                        
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Stack direction={"row"} gap={2}>
                        <button type="button" onClick={createVehicle} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Vehiculo</button>
                        <button type="button" onClick={closeDialogVehicle} className="px-5 py-2.5 text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cerrar </button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );

}
const test_options = [
    {
        nombres:"JOAN DAVID ENCARNACION DIAZ",
        empresa:"URBASUR",
        ci:1104598782,
        tlfn:"0937887589",
        email:"none",
        tlfnos_aux:["098496565","0998465","46549878979879"],
        uuid:"sadasdsa-ewqadsfsa-8d4s5ad-asd8sad",
        direccion:"av las orquideas 15-78",
        fecha_nacimiento:"19/07/1999",
        cargo:0,
        habilitado:true
    },
    {
        nombres:"JUAN JOSE PARDO ZAMORA",
        empresa:"URBASUR",
        ci:1104598782,
        tlfn:"0937887589",
        email:"none",
        tlfnos_aux:["098496565","0998465","46549878979879"],
        uuid:"sadasdsa-ewqadsfsa-8d4s5ad-asd8sad",
        direccion:"av las orquideas 15-78",
        fecha_nacimiento:"19/07/1999",
        cargo:0,
        habilitado:true
    },
    {
        nombres:"JORGE DAVID MARTINEZ CABRERA",
        empresa:"URBASUR",
        ci:1104598782,
        tlfn:"0937887589",
        email:"none",
        tlfnos_aux:["098496565","0998465","46549878979879"],
        uuid:"sadasdsa-ewqadsfsa-8d4s5ad-asd8sad",
        direccion:"av las orquideas 15-78",
        fecha_nacimiento:"19/07/1999",
        cargo:0,
        habilitado:true
    }
]