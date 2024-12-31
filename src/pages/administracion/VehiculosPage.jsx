import { useState,useEffect, useRef } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc,updateDoc, collection ,getDocs } from "firebase/firestore"; 
import { db } from '../../firebase/firebase-config';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import { styled, alpha } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import Autocomplete from '@mui/material/Autocomplete';
import SettingsIcon from '@mui/icons-material/Settings';

export default function VehiculosPage() {

    const [dialogVehicle, setDialogVehicle] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [grupo, setGrupo] = useState(0);
    const [linea, setLinea] = useState(0);
    const [marca,setMarca] = useState(1);
    const [empresa,setEmpresa] = useState(0);
    const [carroceria,setCarroceria] = useState(1);
    const [asientos,setAsientos] = useState(0);
    const [chasis,setChasis] = useState('');
    const [placa,setPlaca] = useState('');
    const [modelo,setModelo] = useState('');
    const [socio,setSocio] = useState();
    const [vehicles,setVehicles] = useState([]);
    const [socios,setSocios] = useState([]);
    const [status,setStatus] = useState(0);
    const [habilited,setHabilited] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentVehicle,setCurrentVehicle] = useState({})
    const [dialogEdit,setDialogEdit] = useState(false);
    const allData = useRef([])
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event,_data) => {
        setAnchorEl(event.currentTarget);
        setCurrentVehicle(_data);
        setChasis(_data.chassis);
        setPlaca(_data.plate)
        setModelo(_data.model)
    };

    const handleClose = () => {setAnchorEl(null); };
    const handleLinea = (event) => setLinea(event.target.value);

    const handleMarca = (event) => setMarca(event.target.value);
    const handleCarroceria = (event) => setCarroceria(event.target.value);
    const openDialogVehicle = () => setDialogVehicle(true);
    const closedialogEdit =()=> setDialogEdit(false);
    const closeDialogVehicle = () => {setDialogVehicle(false)};
    
    const editarVehiculo=()=>{
        handleClose();
        setDialogEdit(true);
    }
  
    const createVehicle = async() => {
        const uuid = uuidv4();
        const is_exist = allData.current.some(obj => obj.register === socio.register);
        if(is_exist === false){
           
            const newData = {
                register:socio.register,
                partner:{id: socio.uuid,names:socio.names},
                lat:-3.9986953575376636,
                lon:-79.20557380361966,
                last_con:0,
                group:grupo,
                company:socio.company,
                place:'rt'+socio.register,
                line:linea,
                trademark:marca,
                model:modelo.toUpperCase(),
                chassis:chasis.toUpperCase(),
                plate:placa.toUpperCase(),
                state:0,
                bodywork:carroceria,
                uuid:uuid,
            }
            allData.current.push(newData)
            const sortedData = allData.current.sort((a, b) => {
                const register_a = parseInt(a.register)
                const register_b = parseInt(b.register)
                return register_a - register_b;
            });
            setVehicles(sortedData)
            console.log(newData);
            await setDoc(doc(db, "vehicles", uuid),newData);
            setDialogVehicle(false)
            Swal.fire({
                title: "Agregado",
                text: "Vehiculo Agregado Correctamente",
                icon: "success"
              });
        }else{
            Swal.fire({
                title: "Atencion",
                text: "Ya Existe ese vehiculo",
                icon: "warning"
              });
        }
        
    }

    const actualizarDatos = async()=>{
        
        setDialogEdit(false);
        const washingtonRef = doc(db, "vehicles", currentVehicle.uuid);
        await updateDoc(washingtonRef, {
            chassis: chasis,
            plate: placa,
            model:modelo
            });
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
            const sortedSocios = socios_filter.sort((a, b) => {
                const register_a = parseInt(a.register)
                const register_b = parseInt(b.register)
                return register_a - register_b;
            });
            setSocios(sortedSocios)
            //

            const aux_data = [];
            const querySnapshot = await getDocs(collection(db, "vehicles"));
            querySnapshot.forEach((doc) => {
                aux_data.push(doc.data());
            });
            const sortedData = aux_data.sort((a, b) => {
                const register_a = parseInt(a.register)
                const register_b = parseInt(b.register)
                return register_a - register_b;
            });
            setVehicles(sortedData)
            allData.current = sortedData
            setHabilited(false)
           
        }
        const formatedEmpresa = (_data) => {
            if (_data === 1) {
                return "Urbasur"
            } else if (_data === 2) {
                return "Urba Express"
            }
            else if (_data === 3) {
                return "Cuxibamba"
            }
            else {
                return "24 de Mayo"
            }
        }
    const procesarEstado =(_data)=>{
        if(_data === 0){
            return "inactivo"
        }else if(_data === 1){
            return "activo"
        }
        else{
            return "no especifico"
        }
    }
    const filtrarDatos =()=>{
        const aux_data = JSON.parse(JSON.stringify(allData.current));
        const filterByGroup = aux_data.filter((item)=> {
            if(grupo === 0){
                return(item)
            }else if(item.group === grupo){
                return(item)
            }
        })
        const filterByCompany = filterByGroup.filter((item)=> {
            if(empresa === 0){
                return(item)
            }else if(item.company === empresa){
                return(item)
            }
        })
        const filterByState = filterByCompany.filter((item)=> {
            if(status === 3){
                return(item)
            }else if(status === item.state){
                return(item)
            }
        })
        const filterberByLine = filterByState.filter((item)=> {
            if(linea === 0){
                return(item)
            }else if(linea === item.line){
                return(item)
            }
        })
        setVehicles(filterberByLine)
    }
    const administrarVehiculo = ()=>{
        navigate('/administracion/vehiculos');

    }

    const clearFiltros = ()=>{
        setGrupo(0)
        setEmpresa(0)
        setStatus(3)
        setLinea(0)
        setVehicles(allData.current)
    }
   useEffect(() => {
    getData();
      }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1, p: 5 }}>
                <Grid container spacing={2}>
                    {/* <Grid size={{ xs: 12, md: 2 }}>
                        <button type="button" onClick={getData} className="w-full px-5 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Traer Datos </button>
                    </Grid> */}
                    <Grid size={12}>
                        <Button variant="contained"  onClick={openDialogVehicle} >Agregar Nuevo Vehiculo </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2}}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Grupo</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={grupo}
                                label="Grupo"
                                onChange={(e)=>{setGrupo(e.target.value)}}
                            >
                                <MenuItem value={0}>Todos</MenuItem>
                                <MenuItem value={1}>Grupo 1</MenuItem>
                                <MenuItem value={2}>Grupo 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2}}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Empresa</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={empresa}
                                label="Empresa"
                                onChange={(e)=>{setEmpresa(e.target.value)}}
                            >
                                <MenuItem value={0}>Todas las Empresas</MenuItem>
                                <MenuItem value={1}>URBASUR</MenuItem>
                                <MenuItem value={2}>URBAEXPRESS</MenuItem>
                                <MenuItem value={3}>CUXIBAMBA</MenuItem>
                                <MenuItem value={4}>24 DE MAYO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2}}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Estado</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={status}
                                label="Estado"
                                onChange={(e)=>{setStatus(e.target.value)}}
                            >
                                <MenuItem value={3}>Todos</MenuItem>
                                <MenuItem value={0}>Inactivos</MenuItem>
                                <MenuItem value={1}>Activos</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2}}>
                    <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Linea</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={linea}
                                label="Linea"
                                onChange={handleLinea}
                            >
                                <MenuItem value={0}>Todas</MenuItem>
                                <MenuItem value={1}>Linea 1</MenuItem>
                                <MenuItem value={2}>Linea 2</MenuItem>
                                <MenuItem value={3}>Linea 3</MenuItem>
                                <MenuItem value={4}>Linea 4</MenuItem>
                                <MenuItem value={5}>Linea 5</MenuItem>
                                <MenuItem value={6}>Linea 6</MenuItem>
                                <MenuItem value={7}>Linea 7</MenuItem>
                                <MenuItem value={8}>Linea 8</MenuItem>
                                <MenuItem value={9}>Linea 9</MenuItem>
                                <MenuItem value={10}>Linea 10</MenuItem>
                                <MenuItem value={11}>Linea 11</MenuItem>
                                <MenuItem value={12}>Linea 12</MenuItem>
                            </Select>
                            </FormControl>
                            </Grid>
                    <Grid size={{ xs: 12, md: 2}}>
                        <Button variant="contained" onClick={filtrarDatos} fullWidth startIcon={<FilterAltIcon />}>
                            Filtrar
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2}}>
                        <Button color='warning'  variant="contained"  onClick={clearFiltros} fullWidth startIcon={<CleaningServicesIcon />}>
                            Limpiar Filtro
                        </Button>
                    </Grid>
                    <Grid size={12}>
                    <Autocomplete
                                value={socio}
                                onChange={(event, newValue) => {
                                    if (newValue === null) {
                                    setVehicles(allData.current);
                                    } else {
                                    setVehicles([newValue]);
                                    }
                                }}
                                sx={{width:250}}
                                size='small'
                                id="controllable-states-demo"
                                options={allData.current}
                                getOptionLabel={(option) => option.register.toString()}
                                renderInput={(params) => <TextField {...params} label="Buscar Unidad" />}
                            />
                    </Grid>
                    <Grid size={12}>
                    {
                        habilited?  <Skeleton variant="rounded"  hidden={true} sx={{width:"100%"}} height={640} />:
                  
                      
                        <div hidden={habilited} className='p-2'>
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
                                                Grupo
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
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                
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
                                                            {row.register}
                                                        </TableCell>
                                                       
                                                        <TableCell align={"center"} >
                                                            {formatedEmpresa(row.company)}
                                                        </TableCell>
                                                        <TableCell align={"center"} >
                                                            {row.group}
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            {row.partner.names}
                                                        </TableCell>
                                                        <TableCell align={"center"}  >
                                                            {procesarEstado(row.state)}
                                                        </TableCell>
                                                        <TableCell align={"center"}  >
                                                            L{row.line}
                                                        </TableCell>
                                                        <TableCell align={"center"}  >
                                                                <IconButton
                                                                        id="demo-customized-button"
                                                                        aria-controls={open ? 'demo-customized-menu' : undefined}
                                                                        aria-haspopup="true"
                                                                        aria-expanded={open ? 'true' : undefined}
                                                                        variant="contained"
                                                                        disableElevation
                                                                        onClick={(e)=>{handleClick(e,row)}}
                                                                    >
                                                                    <MoreVertIcon />
                                                                </IconButton>
                                                                <StyledMenu
                                                                    id="demo-customized-menu"
                                                                    MenuListProps={{
                                                                        'aria-labelledby': 'demo-customized-button',
                                                                    }}
                                                                    anchorEl={anchorEl}
                                                                    open={open}
                                                                    onClose={handleClose}
                                                                >
                                                                    <MenuItem onClick={editarVehiculo} disableRipple>
                                                                        <EditIcon />
                                                                        Editar
                                                                    </MenuItem>
                                                                    <MenuItem onClick={()=>{navigate(`/administracion/vehiculos/${row.uuid}`)}} disableRipple>
                                                                        <SettingsIcon />
                                                                        Administrar
                                                                    </MenuItem>
                                                                    <MenuItem onClick={handleClose} disableRipple>
                                                                        <BlockIcon />
                                                                        Deshabilitar
                                                                    </MenuItem>
                                                                </StyledMenu>
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
                    }
                    </Grid>
                </Grid>
            </Box>

            <Dialog sx={{zIndex:9}}  onClose={closeDialogVehicle} open={dialogVehicle} fullWidth maxWidth={"sm"} >
                <DialogTitle>
                    <h5  className='font-sans font-bold text-gray-700 text-center'>Crear Nuevo Vehiculo</h5>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Autocomplete
                                value={socio}
                                onChange={(event, newValue) => {
                                setSocio(newValue);
                                }}
                                size='small'
                                id="controllable-states-demo"
                                options={socios}
                                getOptionLabel={(option) => option.register}
                                renderInput={(params) => <TextField {...params} label="Registro" />}
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
                                onChange={(e)=>{setGrupo(e.target.value)}}
                            >
                                <MenuItem value={1}>Grupo 1</MenuItem>
                                <MenuItem value={2}>Grupo 2</MenuItem>
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
            
            <Dialog sx={{zIndex:1001}}  onClose={closedialogEdit} open={dialogEdit} fullWidth maxWidth={"xs"} >
                <DialogTitle>
                    <h5  className='font-sans font-bold text-gray-700 text-center'>Editar Unidad - {currentVehicle.register}</h5>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField fullWidth value={chasis} onChange={(e)=>{setChasis(e.target.value)}} id="outlined-basic" size='small' label="chasis" variant="outlined" />
                        </Grid>
                        <Grid size={12}>
                            <TextField fullWidth value={placa}  onChange={(e)=>{setPlaca(e.target.value)}} id="outlined-basic" size='small' label="placa" variant="outlined" />
                        </Grid>
                        <Grid size={12}>
                            <TextField fullWidth value={modelo} onChange={(e)=>{setModelo(e.target.value)}} id="outlined-basic" size='small' label="modelo" variant="outlined" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Stack direction={"row"} gap={2}>
                        <button type="button" onClick={actualizarDatos} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar</button>
                        <button type="button" onClick={closedialogEdit} className="px-5 py-2.5 text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cerrar </button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );

}

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));