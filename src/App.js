import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext.jsx';
import NavbarMobile from './components/principal/NavbarMobile.jsx';
import ExpensesMobile from './components/principal/ExpensesMobile.jsx';
import Statistics from './components/secondary/Statistics/Statistics.jsx';
import './styles/css/main.css';
import './App.css';
function App() {
  return (
    <div className="App">
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ExpensesMobile/>}/>
            <Route path='/estadisticas' element={<Statistics/>}/>
          </Routes>
          <NavbarMobile/>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
