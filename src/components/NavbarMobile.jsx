import { Container, ThemeProvider } from "@mui/material";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Link } from "react-router-dom";
import MaterialThemes from "../MaterialThemes/MaterialThemes.jsx";

const NavbarMobile = () =>{
    return(
        <ThemeProvider theme={MaterialThemes}>
            <Container className="navbarMobile-container" disableGutters={true}>

                <Link to='/estadisticas' className="statistics-redirect">
                    <DataUsageIcon className="statistics-icon"/>
                </Link>
                <div className="addNewExpense-container">
                    <AddCircleOutlineIcon className="add-icon"/>
                </div>
                <Link to='/ingresos' className="incomes-redirect">
                    <MonetizationOnOutlinedIcon className="incomes-icon"/>
                </Link>

            </Container>
        </ThemeProvider>
    )
}

export default NavbarMobile;