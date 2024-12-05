import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ActiveMarker from '../assets/active_2.png';
import InactiveMarker from '../assets/inactive.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
const ActiveIcon = L.icon({
    iconUrl: ActiveMarker, // Ruta de la imagen
    iconSize: [32, 32], // Tamaño del ícono (opcional)
    iconAnchor: [16, 32], // Punto del ícono que se anclará en el mapa (opcional)
    popupAnchor: [0, -32], // Punto donde se mostrará el popup (opcional)
  });

const InactiveIcon = L.icon({
    iconUrl: InactiveMarker, // Ruta de la imagen
    iconSize: [32, 32], // Tamaño del ícono (opcional)
    iconAnchor: [16, 32], // Punto del ícono que se anclará en el mapa (opcional)
    popupAnchor: [0, -32], // Punto donde se mostrará el popup (opcional)
  });

  
export default function GpsPage() {

    const [topico, setTopico] = useState('/devices/l2/rt1505');
    const [lineas,setLineas] = useState('L1');

    const handleLineas = (event) => {
      setLineas(event.target.value);
    };
  


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(3),
        textAlign: 'center',
        color: '#fff',
    }));


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 12 }} >
                        <Item>
                        <FormControl color='success'  focused sx={{width:220}}>
                            <InputLabel id="demo-simple-select-label">Lineas</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={lineas}
                                label="Lineas"
                                onChange={handleLineas}
                                sx={{color:"#fff"}}
                                >
                                <MenuItem value={'L1'}>L1</MenuItem>
                                <MenuItem value={'L2'}>L2</MenuItem>
                                <MenuItem value={'L3'}>L3</MenuItem>
                                <MenuItem value={'L4'}>L4</MenuItem>
                                <MenuItem value={'L5'}>L5</MenuItem>
                                <MenuItem value={'L6'}>L6</MenuItem>
                                <MenuItem value={'L7'}>L7</MenuItem>
                                <MenuItem value={'L8'}>L8</MenuItem>
                                <MenuItem value={'L9'}>L9</MenuItem>
                                <MenuItem value={'L10'}>L10</MenuItem>
                                <MenuItem value={'L11'}>L11</MenuItem>
                                <MenuItem value={'L12'}>L12</MenuItem>
                            </Select>
                        </FormControl>
                        </Item>
                    </Grid>

                    <Grid size={12}>
                        <Item>

                            <MapContainer
                                center={[-3.9991794443483393, -79.20504768130307]}
                                zoom={22}
                                style={{ width: '100%', height: '600px', margin: 'auto' }}
                            >
                                <TileLayer
                                    url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=3ehulS0hvMx4lCnoK9h0aYo9s6Bc2ACsT83OYbr2Tq3oICKY9Xc7OSJifmI5Q6ud"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                                />
                                <Marker position={[-3.9991794443483393, -79.20504768130307]} icon={ActiveIcon}>
                                <Popup>
                                    ¡Este marcador tiene un ícono personalizado!
                                </Popup>
                                </Marker>
                            </MapContainer>

                        </Item>
                    </Grid>

                </Grid>
            </Box>
        </>
    );

}