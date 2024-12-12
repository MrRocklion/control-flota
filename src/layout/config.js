
import { SvgIcon } from '@mui/material';
import {
  HomeIcon,
  MapIcon,
  BanknotesIcon,
  MegaphoneIcon,
  ArchiveBoxIcon,
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


];
