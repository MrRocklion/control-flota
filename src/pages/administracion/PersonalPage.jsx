import { useState, useEffect } from 'react';
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
import { styled, alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, query, collection, onSnapshot,updateDoc  } from "firebase/firestore";
import { db } from '../../firebase/firebase-config';
import { DateField } from '@mui/x-date-pickers/DateField';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';


export default function PersonalPage() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dialogSocio, setDialogSocio] = useState(false);
    const [birthday, setBirthday] = useState(dayjs('01-01-1900'));
    const [page, setPage] = useState(0);
    const [socios, setSocios] = useState([]);
    const [nombres, setNombres] = useState('');
    const [empresa, setEmpresa] = useState(1);
    const [rol, setRol] = useState(1);
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [edit,setEdit] = useState(false)
    const [currentSocio,setCurrentSocio] = useState({})
    const [register,setRegister] = useState(0)
    const open = Boolean(anchorEl);
    const handleClick = (event,_data) => {
        setAnchorEl(event.currentTarget);
        setCurrentSocio(_data);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const createSocio =()=>{
        setNombres('')
        setRegister(0)
        setEmail('')
        setDireccion('')
        setTelefono('')
        setCedula('')
        setRol(1)
        setEmpresa(1)
        setDialogSocio(true);
    }
    const closeDialogSocio = () => {
        
        setDialogSocio(false);
        setEdit(false);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const createPersona = async () => {
        const year = birthday.year()
        const day = (birthday.date()).toString().padStart(2, '0');
        const month = (birthday.month() + 1).toString().padStart(2, '0');
        const uuid = uuidv4();
        const newData = {
            names:nombres,
            company:empresa,
            ci:cedula,
            phone:telefono,
            email:email,
            aux_phone:[],
            uuid:uuid,
            direction:direccion,
            birthday:day+'/'+month+'/'+year,
            job:rol,
            habilited:true,
            register:register,
        }
        console.log(newData);
        await setDoc(doc(db, "personal", uuid), newData);
        setDialogSocio(false)
    }
    const getData = async () => {
        const reference = query(collection(db, "personal"));
        onSnapshot(reference, (querySnapshot) => {
            const aux_data = [];
            querySnapshot.forEach((doc) => {
                aux_data.push(doc.data());
            });
            const sortedData = aux_data.sort((a, b) => {
                const register_a = parseInt(a.register)
                const register_b = parseInt(b.register)
                return register_a - register_b;
            });
            setSocios(sortedData)
        });
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
    const formatedJob = (_data) => {
        if (_data === 1) {
            return "Socio"
        } else if (_data === 2) {
            return "Monitoreo"
        }
        else if (_data === 3) {
            return "Taller"
        }
        else if (_data === 4) {
            return "Chofer"
        }
        else {
            return "Otros"
        }
    }
    const editarPersona =async()=>{

        setDialogSocio(false)
        const washingtonRef = doc(db, "personal", currentSocio.uuid);
        const year = birthday.year()
        const day = (birthday.date()).toString().padStart(2, '0');
        const month = (birthday.month() + 1).toString().padStart(2, '0');
        await updateDoc(washingtonRef, {
            names: nombres.toUpperCase(),
            ci: cedula,
            phone: telefono,
            email: email,
            direction: direccion.toUpperCase(),
            birthday: day + '/' + month + '/' + year,
          });
    }
    const editarSocio=()=>{
        console.log(currentSocio);
        setEdit(true);
        setNombres(currentSocio.names);
        setCedula(currentSocio.ci);
        setTelefono(currentSocio.phone);
        setDireccion(currentSocio.direction);
        setEmail(currentSocio.email);
        setEmpresa(currentSocio.company);
        setRol(currentSocio.job);
        handleClose();
        setDialogSocio(true);
        setBirthday(dayjs(currentSocio.birthday, "DD/MM/YYYY"));
        setRegister(currentSocio.register)
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <Box sx={{ flexGrow: 1, p: 5 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <button type="button" onClick={createSocio} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar Nuevo Socio</button>
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
                                                style={{ minWidth: 100, background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Nombre
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
                                                Rol
                                            </TableCell>
                                            <TableCell
                                                align={"center"}
                                                style={{ background: "#0C1017", color: 'white' }}
                                                sx={{ borderBottomColor: "#242a37" }}
                                            >
                                                Aciones
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {socios
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
                                                            {row.names}
                                                        </TableCell>
                                                        <TableCell align={"center"} >
                                                            {formatedEmpresa(row.company)}
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            {formatedJob(row.job)}
                                                        </TableCell>
                                                        <TableCell align={"center"}>
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
                                                                <MenuItem onClick={editarSocio} disableRipple>
                                                                    <EditIcon />
                                                                    Editar
                                                                </MenuItem>
                                                                <MenuItem onClick={handleClose} disableRipple>
                                                                    <InfoIcon />
                                                                    Mas Informacion
                                                                </MenuItem>
                                                                <MenuItem onClick={handleClose} disableRipple>
                                                                    <PersonAddDisabledIcon />
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
                                count={socios.length}
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
            <Dialog onClose={closeDialogSocio} open={dialogSocio} fullWidth maxWidth={"sm"} >
                <DialogTitle>
                    <h5 hidden={edit} className='font-sans font-bold text-gray-700 text-center'>Crear Nuevo Socio</h5>
                    <h5 hidden={!edit} className='font-sans font-bold text-gray-700 text-center'>Editar Socio Actual</h5>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <TextField
                                label="Nombres"
                                id="name_personal"
                                size="small"
                                onChange={(event) => { setNombres(event.target.value) }}
                                value={nombres}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                                <DateField
                                    label="Cumpleanos"
                                    value={birthday}
                                    onChange={(newValue) => setBirthday(newValue)}
                                    size='small'
                                    format="DD-MM-YYYY"
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-select-small-label">Empresa</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="empresa"
                                    label="Empresa"
                                    value={empresa}
                                    onChange={(event) => { setEmpresa(event.target.value) }}
                                    disabled={edit}
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
                                <InputLabel id="demo-select-small-label">Rol</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="rol"
                                    label="Rol"
                                    onChange={(event) => { setRol(event.target.value) }}
                                    value={rol}
                                    disabled={edit}
                                >
                                    <MenuItem value={1}>Socio</MenuItem>
                                    <MenuItem value={2}>Monitoreo</MenuItem>
                                    <MenuItem value={3}>Taller</MenuItem>
                                    <MenuItem value={4}>Chofer</MenuItem>
                                    <MenuItem value={5}>Otros</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                label="Registro"
                                id="name_personal"
                                type='number'
                                size="small"
                                disabled={edit}
                                onChange={(event) => { setRegister(event.target.value) }}
                                value={register}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Cedula"
                                id="cedula"
                                size="small"
                                onChange={(event) => { setCedula(event.target.value) }}
                                value={cedula}
                                fullWidth
                                type='text'
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Telefono"
                                id="telefono"
                                size="small"
                                onChange={(event) => { setTelefono(event.target.value) }}
                                value={telefono}
                                fullWidth
                                type='text'
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 12 }}>
                            <TextField
                                label="Direccion"
                                id="direccion"
                                size="small"
                                onChange={(event) => { setDireccion(event.target.value) }}
                                value={direccion}
                                fullWidth
                                type='text'
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <TextField
                                label="Email"
                                id="email"
                                size="small"
                                onChange={(event) => { setEmail(event.target.value) }}
                                value={email}
                                fullWidth
                                type='text'
                            />
                        </Grid>



                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Stack direction={"row"} gap={2}>
                        <button hidden={!edit} type="button" onClick={editarPersona} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                        <button  hidden={edit}  type="button" onClick={createPersona} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Persona</button>
                        <button type="button" onClick={closeDialogSocio} className="px-5 py-2.5 text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cerrar </button>
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