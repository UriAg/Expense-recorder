import { createContext, useEffect, useState } from "react"

export const DataContext = createContext()

export const DataProvider = ({ children }) =>{
    const [history, setHistory] = useState([]);
    const [money, setMoney] = useState([]);

    useEffect(()=>{
        localStorage.getItem('history') ? setHistory(JSON.parse(localStorage.getItem('history'))) : setHistory([]);
        localStorage.getItem('money') ? setMoney(JSON.parse(localStorage.getItem('money'))) : setMoney([]);
    }, []);

    const [itemFormVisibility, setItemFormVisibility] = useState(false)
    const [incomeFormVisibility, setIncomeFormVisibility] = useState(false)

    const addNewItemToList = (props) =>{
        const itemsArray = {...history};

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        let isDateExisting = -1;
        Object.keys(itemsArray).forEach(key => {
            if (itemsArray[key].date === formattedDate) {
                isDateExisting = key;
            }
        });

        let exchangeTitle;
        if(props.category === 'exchange'){
            let newMoney = {...money};
            if(props.payment_method === 'tranfer'){
                exchangeTitle = 'Cambio de Mercado Pago a efectivo'
                newMoney['mercado_pago'] -= props.price;
                newMoney['efectivo'] += props.price;
            }else if(props.payment_method === 'cash'){
                exchangeTitle = 'Cambio de efectivo a Mercado Pago';
                newMoney['efectivo'] -= props.price;
                newMoney['mercado_pago'] += props.price;
            }
            setMoney(newMoney);
            localStorage.setItem('money', JSON.stringify(newMoney));
        }else if(props.category !== 'exchange'){
            let newMoney = {...money};
            if(props.payment_method === 'tranfer'){
                newMoney['mercado_pago'] -= props.price;
                newMoney['efectivo'] += props.price;
            }else if(props.payment_method === 'cash'){
                newMoney['efectivo'] -= props.price;
                newMoney['mercado_pago'] += props.price;
            }
            setMoney(newMoney);
            localStorage.setItem('money', JSON.stringify(newMoney));
        }

        if(isDateExisting !== -1){
            itemsArray[isDateExisting].products = {...itemsArray[isDateExisting].products, [`${Object.keys(itemsArray[isDateExisting].products).length + 1}`]:{
                title: props.category === 'exchange' ? exchangeTitle : props.title,
                quantity: props.quantity,
                price: props.price,
                category: props.category,
                outcome: props.category === 'exchange' && true
            }}
            itemsArray[isDateExisting].totalCost += (props.category === 'exchange' ? 0 :  props.price);
        }else{
            itemsArray[formattedDate]={
                date:formattedDate,
                products:{
                    0:{
                        title: props.category === 'exchange' ? exchangeTitle : props.title,
                        quantity: props.quantity,
                        price: props.price,
                        category: props.category,
                        outcome: props.category === 'exchange' && true
                    },
                },
                totalCost: props.category === 'exchange' ? 0 : props.price,
            }
        }
        setHistory(itemsArray);
        localStorage.setItem('history', JSON.stringify(itemsArray));
        setItemFormVisibility(false)
    }

    const addNewIncome = (props) =>{

        const moneyOptions = {...money};
        moneyOptions[props.income_type]
        ? moneyOptions[props.income_type] += props.amount
        : moneyOptions[props.income_type] = props.amount
        setMoney(moneyOptions);
        localStorage.setItem('money', JSON.stringify(moneyOptions));

        const itemsArray = {...history};

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        let isDateExisting = -1;
        Object.keys(itemsArray).forEach(key => {
            if (itemsArray[key].date === formattedDate) {
                isDateExisting = key;
            }
        });

        if(isDateExisting !== -1){
            itemsArray[isDateExisting].products = {...itemsArray[isDateExisting].products, [`${Object.keys(itemsArray[isDateExisting].products).length + 1}`]:{
                title: 'Ingreso',
                amount: props.amount,
                category: props.income_type === 'mercado_pago' ? 'income-mp' : 'income-cash',
                income: true
            }}
        }else{
            itemsArray[formattedDate]={
                date:formattedDate,
                products:{
                    0:{
                        title: 'Ingreso',
                        amount: props.amount,
                        category: props.income_type === 'mercado_pago' ? 'income-mp' : 'income-cash',
                        income: true
                    },
                },
                totalCost: 0,
            }
        }
        setHistory(itemsArray);
        localStorage.setItem('history', JSON.stringify(itemsArray));

        setIncomeFormVisibility(false);
    }

    return(
        <DataContext.Provider value={{
            history,
            addNewItemToList,
            money,
            addNewIncome,
            itemFormVisibility,
            setItemFormVisibility,
            incomeFormVisibility,
            setIncomeFormVisibility,
        }}>
            {children}
        </DataContext.Provider>
    )
}