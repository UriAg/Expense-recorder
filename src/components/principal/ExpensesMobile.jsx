import { useContext } from "react";
import { Container, ThemeProvider } from "@mui/material";
import MaterialThemes from "../../MaterialThemes/MaterialThemes.jsx";
import HistoryList from "../secondary/HistoryList/HistoryList.jsx";
import NewItemForm from "../secondary/itemAdder/NewItemForm.jsx";
import { DataContext } from "../../context/DataContext.jsx";
import NewIncomeForm from "../secondary/Incomes/NewIncomeForm.jsx";
import EditItemForm from "../secondary/HistoryList/editItemList.jsx";
const GastosMobile = () =>{

  const { itemFormVisibility, incomeFormVisibility, editItemForm, money } = useContext(DataContext);

  return (
    <ThemeProvider theme={MaterialThemes}>
        <Container className='expensesMobile-container' disableGutters={true}>

          <Container className="titleAndMoney-container">
            <h1 className="app-title">Restante:</h1>
            <Container className="remainingMoney-container">
              <h2 className="mp-money"><span>Mercado pago</span>: {money.mercado_pago ? money.mercado_pago.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
              }) : 0}</h2>
              <h2 className="cash"><span>Efectivo</span>: {money.efectivo ? money.efectivo.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
              }) : 0}</h2>
            </Container>
          </Container>
          <hr className="top-separation"/>
          <HistoryList/>
          {itemFormVisibility && <NewItemForm/>}
          {incomeFormVisibility && <NewIncomeForm/>}
          {editItemForm && <EditItemForm/>}
        </Container>
    </ThemeProvider>
  )
}

export default GastosMobile;