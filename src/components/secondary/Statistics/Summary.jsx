import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../context/DataContext.jsx"
import { Container } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SchoolIcon from '@mui/icons-material/School';
import RollerSkatingIcon from '@mui/icons-material/RollerSkating';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import IcecreamIcon from '@mui/icons-material/Icecream';
import MedicationIcon from '@mui/icons-material/Medication';

const Summary = () => {
    const {history, percentsAndValues} = useContext(DataContext)
    const [categoriesData, setCategoriesData] = useState({});
    const [totalCost, setTotalCost] = useState(0);
   
    useEffect(()=>{
        let elementsDetails = percentsAndValues();

        elementsDetails && setCategoriesData(elementsDetails.categories);
        elementsDetails && setTotalCost(elementsDetails.totalGlobal);
    }, []);



    return (
        <Container className="statistics-items">
            {
                Object.values(categoriesData).map(elem => (
                    elem.value != 0 && <Container key={elem.category} className="statistics-list-container" style={{display:'flex', justifyContent:'start', alignItems:'center'}}>
                        <List className="accordion-list" id={elem.category}>
                                    <ListItem className="accordion-listItem">
                                        <Container className="accordion-productDescription-container">
                                            <ListItemIcon className="accordion-listItemIcon-container">
                                                {
                                                    elem.category === 'food' && (
                                                        <LunchDiningIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    elem.category === 'drink' && (
                                                        <LocalBarIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    elem.category === 'clothes' && (
                                                        <RollerSkatingIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    elem.category === 'outings' && (
                                                        <TwoWheelerIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    elem.category === 'candys' && (
                                                        <IcecreamIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    elem.category === 'study' && (
                                                        <SchoolIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                                {
                                                    elem.category === 'pharmacy' && (
                                                        <MedicationIcon className="accordion-itemIcon"/>
                                                    )
                                                }
                                            </ListItemIcon>
                                        </Container>
                                    </ListItem>
                                </List>
                                {
                                    elem.category === 'food' && (
                                        <span className='statistics-item-details'>Categoría: Comida</span>
                                    )
                                }
                                {
                                    elem.category === 'drink' && (
                                        <span className='statistics-item-details'>Categoría: Bebida</span>
                                    )
                                }
                                {
                                    elem.category === 'clothes' && (
                                        <span className='statistics-item-details'>Categoría: Ropa</span>
                                    )
                                }
                                {
                                    elem.category === 'outings' && (
                                        <span className='statistics-item-details'>Categoría: Salidas</span>
                                    )
                                }
                                {
                                    elem.category === 'candys' && (
                                        <span className='statistics-item-details'>Categoría: Dulces</span>
                                    )
                                }
                                {
                                    elem.category === 'study' && (
                                        <span className='statistics-item-details'>Categoría: Estudio</span>
                                    )
                                }
                                {
                                    elem.category === 'pharmacy' && (
                                        <span className='statistics-item-details'>Categoría: Farmacia</span>
                                    )
                                }
                        <span className='statistics-item-details'>Subtotal: {elem.value.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                        })}</span>
                        <span className='statistics-item-details'>Porcentaje: % {elem.percent}</span>
                    </Container>
                ))
            }
                    <Container className="total-price-container">
                        <span>Total: {totalCost.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                        })}</span>
                    </Container>
        </Container>
    )
}

export default Summary