import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import Person2Icon from '@mui/icons-material/Person2';
import MapIcon from '@mui/icons-material/Map';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import '../../public/styles/BottomNavbar.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
export default function LabelBottomNavigation() {
    const [value, setValue] = React.useState('recents');
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        switch (newValue) {
            case 'profile':
                navigate('/');
                break;
            case 'maps':
                navigate('/maps');
                break;
            case 'shows':
                navigate('/shows');
                break;
            case 'groups':
                // navigate('/groups');
                break;
            default:
                break;
        }
        // setValue(newValue);
    };

    return (
        <BottomNavigation
            className="sticky-bottom-nav"
            value={value}
            onChange={handleChange}
        >
            <BottomNavigationAction
                label="Map"
                value="maps"
                icon={<MapIcon sx={{ color: 'white' }} />}
            />
            <BottomNavigationAction
                label="Shows"
                value="shows"
                icon={<EventIcon sx={{ color: 'white' }} />}
            />
            <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={<Person2Icon sx={{ color: 'white' }} />}
            />
      
            <BottomNavigationAction
                label="groups"
                value="groups"
                icon={<GroupsIcon sx={{ color: 'white' }} />}
            />
        </BottomNavigation>
    );
}
