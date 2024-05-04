import { Container, ThemeProvider } from "@mui/material";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import MaterialThemes from "../../MaterialThemes/MaterialThemes.jsx";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext.jsx";
import { Link, useLocation } from "react-router-dom";

const NavbarMobile = () =>{
    const { setItemFormVisibility, setIncomeFormVisibility } = useContext(DataContext);
    const location = useLocation();
    return(
        <ThemeProvider theme={MaterialThemes}>
            <Container className="navbarMobile-container" disableGutters={true}>

                <Link to='/estadisticas' className="statistics-redirect">
                    <DataUsageIcon className="statistics-icon"/>
                </Link>
                <div className="addNewExpense-container">
                    <AddCircleOutlineIcon onClick={()=>{
                        location.pathname === '/estadisticas' 
                        ? window.location.href = '/'
                        : setItemFormVisibility(true)
                        }} className="add-icon"/>
                </div>
                <div className="incomes-redirect">
                    <MonetizationOnOutlinedIcon onClick={()=>{
                        location.pathname === '/estadisticas' 
                        ? window.location.href = '/'
                        : setIncomeFormVisibility(true)
                    }} className="incomes-icon"/>
                </div>

            </Container>
        </ThemeProvider>
    )
}

export default NavbarMobile;