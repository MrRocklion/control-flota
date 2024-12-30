
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ActiveMarker from '../assets/active_2.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect, useRef } from 'react';
import { onSnapshot, doc,getDocs,collection } from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from '../firebase/firebase-config';
import { useMap } from 'react-leaflet';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ActiveIcon = L.icon({
    iconUrl: ActiveMarker,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

export default function GpsPage() {
    const [lineas, setLineas] = useState('L1');
    const [unidad, setUnidad] = useState({});
    const [download,setDownload] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const allData = useRef([]);
    const [vehicles,setVehicles] =useState([]);
    const [connected,setConnected] = useState(false)
    const [target, setTarget] = useState({
        latitud: -3.997382889382841,
        longitud: -79.20502255221956,
    });

    const handleLineas = (event) => setLineas(event.target.value);
    const handleUnidad = (event) => setUnidad(event.target.value);
    const descargarDatos =async()=>{
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
        setDownload(false)
    }
 
    useEffect(() => {
        let unsub;
        if (isConnected) {
          
            unsub = onSnapshot(doc(db, 'unidades', unidad.uuid), (doc) => {     
                const data = doc.data();   
                if (data) {   
                    setTarget({   
                        latitud: data.latitud,    
                        longitud: data.longitud,   
                    });   
                }   
            });   
           
        }
        return () => unsub && unsub();// eslint-disable-next-line
    }, [isConnected]);    

    return (
        <Box sx={{ flexGrow: 1,padding:5 }}>
            <Grid container spacing={2}>
            <Grid size={12}>
                    <Button
                        sx={{ height: '100%' }}
                        variant="contained"
                        onClick={descargarDatos}                   
                    >
                        Descargar
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <FormControl fullWidth>
                        <InputLabel id="lineas-label">Líneas</InputLabel>
                        <Select
                            labelId="lineas-label"
                            value={lineas}
                            onChange={handleLineas}
                            size="small"
                            label="Lineas"
                            disabled={download}
                        >
                            <MenuItem value="L1">L1</MenuItem>
                           
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                     <Autocomplete
                        value={unidad}
                        onChange={(event, newValue) => {
                            setUnidad(newValue);
                        }}
                        disabled={download}
                        size='small'
                        id="controllable-states-demo"
                        options={vehicles}
                        getOptionLabel={(option) => option.register}
                        renderInput={(params) => <TextField {...params} label="Registro" />}
                        />
                </Grid>
               
                <Grid size={{ xs: 12, md: 2 }}>
                    <Button
                        sx={{ height: '100%' }}
                        variant="contained"
                        onClick={() => setIsConnected(true)}
                        fullWidth
                        disabled={download === false && connected === true}
                    >
                        Conectar
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                    <Button
                        sx={{ height: '100%' }}
                        variant="contained"
                        onClick={() => setIsConnected(false)}
                        fullWidth
                        disabled={download}
                    >
                        Desconectar
                    </Button>
                </Grid>
                <Grid size={12}>
                    <Paper>
                        <MapContainer
                            center={[-3.9991794443483393, -79.20504768130307]}
                            zoom={16}
                            style={{ width: '100%', height: '600px' }}
                        >
                            <TileLayer
                                url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=3ehulS0hvMx4lCnoK9h0aYo9s6Bc2ACsT83OYbr2Tq3oICKY9Xc7OSJifmI5Q6ud"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                            />
                            <DynamicMarker target={target} />
                        </MapContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

function DynamicMarker({ target }) {
    const map = useMap();
    useEffect(() => {
        map.setView([target.latitud, target.longitud], map.getZoom());
    }, [target, map]);

    return (
        <Marker position={[target.latitud, target.longitud]} icon={ActiveIcon}>
            <Popup>UNIDAD ACTIVA</Popup>
        </Marker>
    );
}
