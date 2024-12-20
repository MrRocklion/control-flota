import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Avatar,
  Box,
  IconButton, 
  useMediaQuery
} from '@mui/material';

import { usePopover } from '../hooks/use-popover.js';
import { AccountPopover } from './account-popover';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
      sx: {
          bgcolor: stringToColor(name),
          cursor: 'pointer',
          height: 40,
          width: 40
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit" href="/" onClick={handleClick}>
      Monitoreo
    </Link>,
    <Link
      underline="none"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Transacciones
    </Link>,
  ];


  return (
    <>
      <Box
        component="header"
        className='app-bar-gradient'
        sx={{
          backdropFilter: 'blur(6px)',
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: 900
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton 
                onClick={onNavOpen}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
            <MenuIcon />
              </IconButton>
            )}
            <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Avatar 
            {...stringAvatar('hola david')} 
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
          
              />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
