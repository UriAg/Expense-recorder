import { Button, Container } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import historyDataJson from '../info.json'
import { useEffect, useState } from "react";

console.log(historyDataJson);
const HistoryList = () => {
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        // Simula una carga asíncrona (puedes reemplazar esto con tu lógica de carga real)
        setTimeout(() => {
            setHistoryData(historyDataJson);
            setLoading(false);
        }, 2000); // Simulamos un retraso de 2 segundos para la carga
    }, []);

    if (loading) {
        return (
            <Container sx={{
                position:'absolute',
                backgroundColor:'#1e1e1e',
                height:'100vh',
                width:'100%',
                zIndex:'10000',
                top:'0',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <CircularProgress/>
                <Button sx={{ m: 2, cursor:'default' }}>
                    Cargando...
                </Button>
            </Container>
        );
    }

    return (
        <Container className="movementsHistory-container">

            { Object.values(historyData).length > 0 ? Object.values(historyData).map(elem=>(
                <Accordion className="accordion-container" key={elem.date} slotProps={{ transition: { unmountOnExit: false } }}>
                    <AccordionSummary className="accordion-summary" expandIcon={<ExpandMoreIcon sx={{color:'#e7e7e7'}} />} id={`${elem.date}-panel-header`} aria-controls={`${elem.date}-panel-content`}>
                        {elem.date}
                    </AccordionSummary>
                    {Object.values(elem.products).map(prop=>(
                        <>
                            <AccordionDetails className="accordion-details" key={prop.title}>
                                <List className="accordion-list" id={prop.title}>
                                    <ListItem className="accordion-listItem">
                                        <Container className="accordion-productDescription-container">
                                            <ListItemIcon className="accordion-listItemIcon-container">
                                                {
                                                    prop.subject === 'food' && (
                                                        <LunchDiningIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.subject === 'drinks' && (
                                                        <LocalBarIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.subject === 'study' && (
                                                        <SchoolIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.subject === 'income-cash' && (
                                                        <AttachMoneyIcon className="accordion-cashIncomeIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.subject === 'income-mp' && (
                                                        <PaymentIcon className="accordion-mpIncomeIcon"/>
                                                    )
                                                }
                                            </ListItemIcon>
                                            <ListItemText className={`accordion-listItemText-container${prop.income && "-income"}`} primary={`${prop.title} - $${prop.price}`}/>
                                        </Container>
                                    </ListItem>
                                </List>
                            </AccordionDetails>                      
                        </>
                    ))}
                    <Container className="totalCost-container">
                        <span className="totalCost-text">{`Total: $${elem.totalCost}`}</span>
                    </Container>
                </Accordion>
            ))
            :
            <>
                <Container>
                    No hay nada            
                </Container>
            </>
            }
        </Container>
    )
}


export default HistoryList;