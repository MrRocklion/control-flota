
import { useLocation, NavLink } from 'react-router';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronRightIcon ,ChevronUpDownIcon } from '@heroicons/react/24/outline';
import {
	Box,
	Button,
	Divider,
	Drawer,
	Stack,
	SvgIcon,
	Typography,
	useMediaQuery
} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { items } from './config';
import { items_views } from './config-views';
import { SideNavItem } from './side-nav-item';
import { Scrollbar } from '../components/scrollbar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React from 'react';
export const SideNav = (props) => {
	const { open, onClose } = props;
	const location = useLocation();
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));


	const [listMenu, setListMenu] = React.useState(true);

	const handleClick = () => {
		setListMenu(!listMenu);
	};


	const content = (
		<Scrollbar
			sx={{
				height: '100%',
				'& .simplebar-content': {
					height: '100%'
				},
				'& .simplebar-scrollbar:before': {
					background: 'neutral.400'
				}
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					backgroundColor: '#121621'
				}}
			>
				<Box sx={{ p: 3 }}>

					<Box
						sx={{
							alignItems: 'center',
							backgroundColor: 'rgba(255, 255, 255, 0.04)',
							borderRadius: 1,
							cursor: 'pointer',
							display: 'flex',
							justifyContent: 'space-between',
							mt: 2,
							p: '12px'
						}}
					>
						CTUCL
					</Box>
				</Box>
				<Divider sx={{ borderColor: 'neutral.700' }} />
				<Box
					component="nav"
					sx={{
						flexGrow: 1,
						px: 2,
						py: 3
					}}
				>
					<Stack
						component="ul"
						spacing={0.5}
						sx={{
							listStyle: 'none',
							p: 0,
							m: 0
						}}
					>
						{items.map((item) => {

							if (item.child) {
								return(
									<>
									<div
										key={item.title}
										className={
											`cursor-pointer group flex justify-start items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-green-400  ${location.pathname === item.path ? 'bg-gray-700 text-white' : ''}`
										}
										
										onClick={handleClick}
									>
									
										
											<item.icon
											className={
												`mr-3 h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-green-400 ${location.pathname === item.path ? 'text-white' : ''}`
											}
											aria-hidden="true"
										/>
											
											<ListItemText primary={item.title} />
											{listMenu ? <ChevronDownIcon style={{height:30}}/>: <ChevronRightIcon style={{height:30}} /> }
									
										</div>
										<Collapse in={listMenu}  timeout="auto" unmountOnExit >
										{item.childrens.map((x,index)=>{
											return(
												<NavLink
											to={x.path}
											key={index}
											className={
												`group ml-5 flex items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-green-400  ${location.pathname === x.path ? 'bg-gray-700 text-white' : ''}`
											}
										>
											<x.icon
												className={
													`mr-3 h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-green-400 ${location.pathname === x.path ? 'text-white' : ''}`
												}
												aria-hidden="true"
											/>
											<ListItemText primary={x.title} />
										</NavLink>
											);
											
										})}
										
										</Collapse>
									</>
									
								);

							} else {
								return (
									<NavLink
										to={item.path}
										key={item.title}
										className={
											`group flex items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-green-400  ${location.pathname === item.path ? 'bg-gray-700 text-white' : ''}`
										}
									>
										<item.icon
											className={
												`mr-3 h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-green-400 ${location.pathname === item.path ? 'text-white' : ''}`
											}
											aria-hidden="true"
										/>
										<ListItemText primary={item.title} />
									</NavLink>
								);
							}
						})}
					</Stack>
				</Box>


			</Box>
		</Scrollbar>
	);

	if (lgUp) {
		return (
			<Drawer
				anchor="left"
				open
				PaperProps={{
					sx: {
						backgroundColor: 'neutral.800',
						color: 'common.white',
						width: 280
					}
				}}
				variant="permanent"
			>
				{content}
			</Drawer>
		);
	}

	return (
		<Drawer
			anchor="left"
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					backgroundColor: 'neutral.800',
					color: 'common.white',
					width: 280
				}
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant="temporary"
		>
			{content}
		</Drawer>
	);
};

SideNav.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool
};