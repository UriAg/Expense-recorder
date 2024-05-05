import { createContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export const DataContext = createContext()

export const DataProvider = ({ children }) =>{
    const [history, setHistory] = useState([]);
    const [money, setMoney] = useState({});

    useEffect(()=>{
        localStorage.getItem('history') ? setHistory(JSON.parse(localStorage.getItem('history'))) : setHistory([]);
        localStorage.getItem('money') ? setMoney(JSON.parse(localStorage.getItem('money'))) : setMoney({"mercado_pago":0, "efectivo":0});
    }, []);

    const [itemFormVisibility, setItemFormVisibility] = useState(false);
    const [incomeFormVisibility, setIncomeFormVisibility] = useState(false);
    const [editItemForm, setEditItemForm] = useState(false);
    const [productEdit, setProductEdit] = useState([])

    const addNewItemToList = (props) =>{
        const itemsArray = {...history};

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const itemCode = uuidv4();

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
            }else if(props.payment_method === 'cash'){
                newMoney['efectivo'] -= props.price;
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
                payment_method: props.payment_method,
                code: itemCode,
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
                        payment_method: props.payment_method,
                        code: itemCode,
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
        const itemCode = uuidv4();

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
                code: itemCode,
                income_type: props.income_type,
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
                        code: itemCode,
                        income_type: props.income_type,
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

    const editItem = (props) =>{
        const list = {...history}
        const moneyOptions = {...money};
        let exists;

        const value = Object.keys(list).find(elemKey => {
            if (list[elemKey].date === props.date) {
                exists = elemKey;
            }
        });
        
        if(exists){

            const productEdited = Object.values(list[exists].products).forEach(product => {
                if(product.code === props.prevProduct.code){
                    if(props.prevProduct.payment_method !== props.nextProduct.payment_method){
                        
                        if(props.prevProduct.payment_method === 'tranfer'){
                            moneyOptions['mercado_pago'] += props.prevProduct.price;
                            moneyOptions['efectivo'] -= props.nextProduct.price;
                        }else{
                            moneyOptions['efectivo'] += props.prevProduct.price;
                            moneyOptions['mercado_pago'] -= props.nextProduct.price;
                        }
                        
                        
                        list[exists].totalCost += (props.nextProduct.price - props.prevProduct.price);
                        product.price = props.nextProduct.price;
                        product.payment_method = props.nextProduct.payment_method;
                        
                    }
                    if(props.prevProduct.payment_method === props.nextProduct.payment_method){
                        
                        if(props.prevProduct.payment_method === 'tranfer'){
                            moneyOptions['mercado_pago'] += (props.prevProduct.price - props.nextProduct.price);
                        }else{
                            moneyOptions['efectivo'] += (props.prevProduct.price - props.nextProduct.price);
                        }
                        
                        
                        list[exists].totalCost += (props.nextProduct.price - props.prevProduct.price);
                        product.price = props.nextProduct.price;
                        product.payment_method = props.nextProduct.payment_method;

                    }
                    if(props.prevProduct.quantity !== props.nextProduct.quantity){
                        product.quantity = props.nextProduct.quantity;
                    }
                    if(props.prevProduct.title !== props.nextProduct.title){
                        product.title = props.nextProduct.title;
                    }           
                    if(props.prevProduct.code !== props.nextProduct.code){
                        product.code = props.nextProduct.code;
                    }           
                    if(props.prevProduct.category !== props.nextProduct.category){
                        product.category = props.nextProduct.category;
                    }           
                }
            });

            setMoney(moneyOptions);
            localStorage.setItem('money', JSON.stringify(moneyOptions));

            setHistory(list);
            localStorage.setItem('history', JSON.stringify(list));
            setEditItemForm(false);
        }
    }

    const deleteItem = (props) =>{
        const list = {...history}
        const moneyOptions = {...money};
        let exists

        Object.keys(list).find(elemKey => {
            if (list[elemKey].date === props.date) {
                exists = elemKey;
            }
        });
        
        if(exists){

            const moneyChange = Object.values(list[exists].products).filter(product => {
                if(product.code === props.code){
                    if(product.income){
                        moneyOptions[product.income_type] -= product.amount
                    }else if(product.outcome){
                        if(product.payment_method === 'tranfer'){
                            moneyOptions['mercado_pago'] += product.price;
                            moneyOptions['efectivo'] -= product.price;
                        }else if(product.payment_method === 'cash'){
                            moneyOptions['efectivo'] += product.price;
                            moneyOptions['mercado_pago'] -= product.price;
                        }
                    }else{
                        if(product.payment_method === 'tranfer'){
                            moneyOptions['mercado_pago'] += product.price;
                        }else if(product.payment_method === 'cash'){
                            moneyOptions['efectivo'] += product.price;
                        }
                        list[exists].totalCost -= product.price;
                    }

                    setMoney(moneyOptions);
                    localStorage.setItem('money', JSON.stringify(moneyOptions));
                }
            });

            let newDatesList = list;
            const newList = Object.values(list[exists].products).filter(product => product.code !== props.code);
            newList.length > 0 
            ? newDatesList[exists].products = newList
            : newDatesList = Object.values(list).filter(elem => elem.date !== props.date)
            setHistory(newDatesList);
            localStorage.setItem('history', JSON.stringify(newDatesList));
        }
    }

    const percentsAndValues = () => {
        let categories = {
            food: {
                category: 'food',
                value: 0,
                percent: 0,
            },
            drink: {
                category: 'drink',
                value: 0,
                percent: 0,
            },
            clothes: {
                category: 'clothes',
                value: 0,
                percent: 0,
            },
            outings: {
                category: 'outings',
                value: 0,
                percent: 0,
            },
            candys: {
                category: 'candys',
                value: 0,
                percent: 0,
            },
            study: {
                category: 'study',
                value: 0,
                percent: 0,
            },
            pharmacy: {
                category: 'pharmacy',
                value: 0,
                percent: 0,
            }
        }

        const TOTAL_GLOBAL = Object.values(history).reduce((acc, product) => {
            return acc + product.totalCost;
        }, 0);
        Object.values(history).map(dates => {
            Object.values(dates.products).map(product =>{
                switch(product.category){
                    case "food":
                        categories.food.value+=product.price;
                    break;
                    case "drink":
                        categories.drink.value += product.price;
                    break;
                    case "clothes":
                        categories.clothes.value += product.price;
                    break;
                    case "outings":
                        categories.outings.value += product.price;
                    break;
                    case "candys":
                        categories.candys.value += product.price;
                    break;
                    case "study":
                        categories.study.value += product.price;
                    break;
                    case "pharmacy":
                        categories.pharmacy.value += product.price;
                    break;
                }
            })
        })

        Object.values(categories).map(elem => {
            if(elem.value !== 0){
                elem.percent = ((elem.value / TOTAL_GLOBAL) * 100).toFixed(1);
            }
        });

        return {totalGlobal: TOTAL_GLOBAL, categories}
    }

    return(
        <DataContext.Provider value={{
            history,
            addNewItemToList,
            money,
            addNewIncome,
            productEdit,
            setProductEdit,
            itemFormVisibility,
            setItemFormVisibility,
            incomeFormVisibility,
            setIncomeFormVisibility,
            editItemForm,
            setEditItemForm,
            editItem,
            deleteItem,
            percentsAndValues
        }}>
            {children}
        </DataContext.Provider>
    )
}