import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SchoolIcon from '@mui/icons-material/School';
import RollerSkatingIcon from '@mui/icons-material/RollerSkating';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import IcecreamIcon from '@mui/icons-material/Icecream';
 import MedicationIcon from '@mui/icons-material/Medication';

 const renderCustomAxisTick = ({ x, y, payload }) => {
  let path = '';
  switch (payload.value) {
    case 'food':
            path = <LunchDiningIcon x={x - 35} y={y-16} width={30} height={30} sx={{fill: "#626567"}}/>
        break;
    case 'drink':   
            path = <LocalBarIcon x={x - 35} y={y - 16} width={30} height={30} sx={{fill: "#626567"}}/>
        break;
    case 'clothes':
            path = <RollerSkatingIcon x={x - 35} y={y - 16} width={30} height={30} sx={{fill: "#626567"}}/>   
      break;
    case 'outings':
            path = <TwoWheelerIcon x={x - 35} y={y - 16} width={30} height={30} sx={{fill: "#626567"}}/> 
      break;
    case 'candys':
            path = <IcecreamIcon x={x - 35} y={y - 16} width={30} height={30} sx={{fill: "#626567"}}/>   
      break;
    case 'study':
            path = <SchoolIcon x={x - 35} y={y - 16} width={30} height={30} sx={{fill: "#626567"}}/>  
      break;
    case 'pharmacy':
            path = <MedicationIcon x={x - 35} y={y - 16} width={30} height={30} sx={{fill: "#626567"}}/>
        break;
    default:
        path = '';
  }

  return(
    path
  );
};

export default renderCustomAxisTick
