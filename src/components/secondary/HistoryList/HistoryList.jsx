import { DataContext } from "../../../context/DataContext.jsx";
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
import RollerSkatingIcon from '@mui/icons-material/RollerSkating';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MedicationIcon from '@mui/icons-material/Medication';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useEffect, useState } from "react";

const HistoryList = () => {
    const { history, setProductEdit, setEditItemForm, deleteItem } = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setHistoryData(history);
            historyData && setLoading(false);
        }, 2000);
    }, [history]);

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
                <Accordion className="accordion-container" key={elem.date} slotProps={{ transition: { unmountOnExit: true } }}>
                    <AccordionSummary className="accordion-summary" expandIcon={<ExpandMoreIcon sx={{color:'#e7e7e7'}} />} id={`${elem.date}-panel-header`} aria-controls={`${elem.date}-panel-content`}>
                        {elem.date} - {elem.totalCost.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                        })}
                    </AccordionSummary>
                    {Object.values(elem.products).map(prop=>(
                        <>
                            <AccordionDetails className="accordion-details" key={prop.title}>
                                <List className="accordion-list" id={prop.title}>
                                    <ListItem className="accordion-listItem">
                                        <Container className="accordion-productDescription-container">
                                            <ListItemIcon className="accordion-listItemIcon-container">
                                                {
                                                    prop.category === 'food' && (
                                                        <LunchDiningIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.category === 'drink' && (
                                                        <LocalBarIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.category === 'clothes' && (
                                                        <RollerSkatingIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.category === 'outings' && (
                                                        <TwoWheelerIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.category === 'candys' && (
                                                        <IcecreamIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.category === 'study' && (
                                                        <SchoolIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.category === 'pharmacy' && (
                                                        <MedicationIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.category === 'exchange' && (
                                                        <CurrencyExchangeIcon sx={{color: '#901c1c!important'}} className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.category === 'income-cash' && (
                                                        <AttachMoneyIcon sx={{color: '#efb710cd!important'}} className="accordion-cashIncomeIcon"/>
                                                    )
                                                }
                                                {
                                                    prop.category === 'income-mp' && (
                                                        <PaymentIcon sx={{color: '#2d76be!important'}} className="accordion-mpIncomeIcon"/>
                                                    )
                                                }
                                            </ListItemIcon>
                                            {prop.income === true && <ListItemText sx={{color: '#1c9023!important'}} className={`accordion-listItemText-container-income`} primary={`${prop.title} - $${prop.amount}`}/>}
                                            {prop.outcome === true && <ListItemText sx={{color: '#901c1c!important'}} className={`accordion-listItemText-container-outcome`} primary={`${prop.title} - $${prop.price}`}/>}
                                            {!prop.outcome && !prop.income && <ListItemText className={`accordion-listItemText-container`} primary={`${prop.title} ${prop.quantity && `(${prop.quantity})`} - $${prop.price}`}/>}
                                            <Container className="actions_container">
                                                {!prop.outcome && !prop.income && <EditIcon className="edit_icon" onClick={()=>{setProductEdit({prevProduct:{...prop}, date:`${elem.date}`}); setEditItemForm(true);}}/>}
                                                <DeleteIcon className="delete_icon" onClick={()=>deleteItem({...prop, date:`${elem.date}`})}/>
                                            </Container>
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
                <Container className="empty_list_container">
                    <h3 className="empty_title">No hay anotaciones todavía</h3>
                </Container>
            </>
            }
        </Container>
    )
}


export default HistoryList;