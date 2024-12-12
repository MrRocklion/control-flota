
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router';

export const SideNavItem = (props) => {
  const { active = false, disabled, icon, path, title } = props;
  const navigate = useNavigate(); 
  
    const cambiarVista = ( ) => {
      navigate(path);
  } 
  return (
    <li>
      <ButtonBase
        onClick={cambiarVista}
        sx={{
          alignItems: 'center',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '8px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: '#635BFF'
          }),
          ...(active==false && {
            '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
          }),

        }}
        
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'white'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'inherit',
            flexGrow: 1,
            fontSize:'1rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
