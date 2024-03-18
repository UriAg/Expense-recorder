import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarMobile from './components/NavbarMobile.jsx';
import ExpensesMobile from './components/ExpensesMobile.jsx';
import './styles/css/main.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ExpensesMobile/>}/>
          {/* <Route path='/estadisticas' element={'Agregar componente'}/> */}
        </Routes>
        <NavbarMobile/>
      </BrowserRouter>
    </div>
  );
}

export default App;
