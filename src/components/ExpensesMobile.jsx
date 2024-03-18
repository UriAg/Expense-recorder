import { Container, ThemeProvider } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MaterialThemes from "../MaterialThemes/MaterialThemes.jsx";
import HistoryList from "./HistoryList.jsx";

const GastosMobile = () =>{
  return (
    <ThemeProvider theme={MaterialThemes}>
        <Container className='expensesMobile-container' disableGutters={true}>

          <Container className="titleAndMoney-container">
            <h1 className="app-title">Restante:</h1>
            <Container className="remainingMoney-container">
              <h2 className="mp-money"><span>Mercado pago</span>: $40.000</h2>
              <h2 className="cash"><span>Efectivo</span>: $20.000</h2>
            </Container>
          </Container>
          <hr className="top-separation"/>
          <HistoryList/>

        </Container>
    </ThemeProvider>
  )
}

export default GastosMobile;