import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ActiveMarker from '../assets/active_2.png';
import InactiveMarker from '../assets/inactive.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from '../firebase/firebase-config';
import { useMap } from 'react-leaflet';

const ActiveIcon = L.icon({
    iconUrl: ActiveMarker,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

export default function GpsPage() {
    const [lineas, setLineas] = useState('L1');
    const [unidad, setUnidad] = useState('rt1505');
    const [isConnected, setIsConnected] = useState(false);
    const [target, setTarget] = useState({
        latitud: -3.997382889382841,
        longitud: -79.20502255221956,
    });

    const handleLineas = (event) => setLineas(event.target.value);
    const handleUnidad = (event) => setUnidad(event.target.value);

    useEffect(() => {
        let unsub;
        if (isConnected) {
            unsub = onSnapshot(doc(db, 'unidades', unidad), (doc) => {
                const data = doc.data();
                if (data) {
                    setTarget({
                        latitud: data.latitud,
                        longitud: data.longitud,
                    });
                }
            });
        }
        return () => unsub && unsub(); // Cancelar suscripción al desmontar
    }, [isConnected]);

    return (
        <Box sx={{ flexGrow: 1,padding:5 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <FormControl fullWidth>
                        <InputLabel id="lineas-label">Líneas</InputLabel>
                        <Select
                            labelId="lineas-label"
                            value={lineas}
                            onChange={handleLineas}
                            size="small"
                            label="Lineas"
                        >
                            <MenuItem value="L1">L1</MenuItem>
                           
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <FormControl
                        fullWidth
                        disabled={lineas === '#'}
                    >
                        <InputLabel id="unidades-label">Unidad</InputLabel>
                        <Select
                            labelId="unidades-label"
                            value={unidad}
                            onChange={handleUnidad}
                            label="Unidad"
                            size="small"
                        >
                            <MenuItem value="rt1505">RT-1505</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                    <Button
                        sx={{ height: '100%' }}
                        variant="contained"
                        onClick={() => setIsConnected(true)}
                        fullWidth
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
