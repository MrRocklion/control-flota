import React from 'react'
import { NavLink,useLocation } from 'react-router';
import {
    HomeIcon,
    MapIcon,
    BanknotesIcon,
    VideoCameraIcon,
    SparklesIcon
} from '@heroicons/react/24/outline'

export default function SideBar() {

    const location = useLocation();

    return (<>

        <aside className="side-bar-container w-96 divide-y divide-slate-400/25">
            <header className="h-1/5 justify-center content-center">
                <p className="font-bold text-2xl text-center text-white">
                    CTUCL CONTEO
                </p>

            </header>
            <nav className=" flex flex-col gap-2  h-3/5 p-4  ">
                {routes.map((route) => (
                    <NavLink
                        to={route.href}
                        key={route.href}
                        className={
                            `group flex items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-green-400  ${location.pathname === route.href? 'bg-gray-700 text-white' : ''}`
                        }
                    >
                        <route.icon
                            className={
                                `mr-3 h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-green-400 ${location.pathname === route.href ? 'text-white' : ''}`
                            }
                            aria-hidden="true"
                        />
                        {route.label}
                    </NavLink>
                ))}
            </nav>
            
        </aside>

    </>)
}


const routes = [
    {
        label: 'Home',
        icon: HomeIcon,
        href: '/',
        activate: false,
    },
    {
        label: 'Gps',
        icon: MapIcon,
        href: '/gps',
        activate: false,
    },
    {
        label: 'Transacciones',
        icon: BanknotesIcon,
        href: '/transactions',
        activate: true,
    },
    {
        label: 'Monitoreo',
        icon: VideoCameraIcon,
        href: '/cameras',
        activate: false,
    },


]