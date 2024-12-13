import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import {
  HomeIcon,
  MapIcon,
  BanknotesIcon,
  MegaphoneIcon,
  AdjustmentsVerticalIcon,
  ComputerDesktopIcon,
  CalendarDateRangeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { icon } from 'leaflet';
export const items = [
  {
    title: 'Home',
    path: '/',
    icon: HomeIcon,
    child:false,
    childrens:[]
  },
  {
    title: 'GPS',
    path: '/gps',
    icon: MapIcon,
    child:false,
    childrens:[]
  },
  {
    title: 'Transacciones',
    path: '/transactions',
    icon: BanknotesIcon,
    child:false,
    childrens:[]
  },
  {
    title: 'Operaciones',
    path: '/monitoreo',
    icon: ComputerDesktopIcon,
    child:true,
    childrens:[
      {
        title:'Despachos',
        path:'/operaciones/despachos',
        icon:MegaphoneIcon
      },
      {
        title:'Intinerarios',
        path:'/operaciones/intinerarios',
        icon:CalendarDateRangeIcon
      },
      {
        title:'Rutas',
        path:'/operaciones/rutas',
        icon:ArrowPathIcon
      }
    ]
  },
  {
    title: 'Administracion',
    path: '/administracion',
    icon: AdjustmentsVerticalIcon,
    child:true,
    childrens:[
      {
        title:'Vehiculos',
        path:'/administracion/vehiculos',
        icon:DirectionsBusIcon
      },
      {
        title:'Socios',
        path:'/administracion/socios',
        icon:Diversity3Icon
      },
      {
        title:'Equipos',
        path:'/administracion/equipos',
        icon:TabletAndroidIcon
      }
    ]
  },


];
