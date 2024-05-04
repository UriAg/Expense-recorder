import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, CartesianGrid, Legend, ComposedChart } from 'recharts';
import { Button, CircularProgress, Container } from '@mui/material';
import { DataContext } from '../../../context/DataContext.jsx';
import renderCustomAxisTick from './XAxisTick.jsx';
import Summary from './Summary.jsx';


function Statistics() {  
  const { history, percentsAndValues } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  
  useEffect(() => {  
    let itemsInfo = [];
    const DATA = percentsAndValues();

    Object.values(DATA).map(elem => {
      Object.values(elem).map(item =>{
        if(item.value != 0){
          itemsInfo.push({categoria:item.category, precio:item.value});
        }
      })
    })

    itemsInfo && setTimeout(() => {
      setData(itemsInfo);
      setLoading(false);
    }, 2000);
  }, []);
  
  if (loading) {
      return (
          <Container sx={{
              position:'absolute',
              backgroundColor:'#1e1e1e',
              height:'100vh',
              width:'100%!important',
              maxWidth: 'none!important',
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
      
  }else{
    return (
      <Container className='statistics_global_container'>
        <h1 className='statistics-title'>Estadisticas de compras</h1>
        {
          data.length > 0 ?
          <>
            <ResponsiveContainer className='graph-responsive-container' height={"auto"} aspect={1}>

              <ComposedChart
                layout="vertical"
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  bottom: 20,
                }}
                style={{fontSize:'3em!important'}}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" tickSize={2}/>
                <YAxis dataKey="categoria" type="category" tick={renderCustomAxisTick} />
                <Tooltip />
                <Legend width={"100%"}/>
                <Bar dataKey="precio" barSize={20} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>

            <hr style={{border:"none" ,borderTop: "1px dashed #6265678f"}}/>

            <Container className='summary-container'>
            <h2 className='statistics-title'>Resumen</h2>
            <Summary/>
            </Container>
          </>
        :
        <Container className='no-statistics-container'>
          <h2 className='no-statistics-title'>No hay anotaciones todavía</h2>
        </Container>
        }
      </Container>
    )
  }
}

export default Statistics