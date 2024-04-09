import { Container, ThemeProvider } from "@mui/material";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import MaterialThemes from "../../MaterialThemes/MaterialThemes.jsx";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext.jsx";

const NavbarMobile = () =>{
    const { setItemFormVisibility, setIncomeFormVisibility } = useContext(DataContext)

    return(
        <ThemeProvider theme={MaterialThemes}>
            <Container className="navbarMobile-container" disableGutters={true}>

                <div to='/estadisticas' className="statistics-redirect">
                    <DataUsageIcon className="statistics-icon"/>
                </div>
                <div className="addNewExpense-container">
                    <AddCircleOutlineIcon onClick={()=>setItemFormVisibility(true)} className="add-icon"/>
                </div>
                <div className="incomes-redirect">
                    <MonetizationOnOutlinedIcon onClick={()=>setIncomeFormVisibility(true)} className="incomes-icon"/>
                </div>

            </Container>
        </ThemeProvider>
    )
}

export default NavbarMobile;