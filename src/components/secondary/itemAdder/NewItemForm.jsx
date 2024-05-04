import { Box, Container, FormControl, Input, InputLabel, MenuItem, Select, ThemeProvider, TextField, Button, FormHelperText  } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useContext } from "react"
import { DataContext } from "../../../context/DataContext.jsx"
import MaterialThemes from "../../../MaterialThemes/MaterialThemes.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewItemForm = () => {
  const { setItemFormVisibility, addNewItemToList, money } = useContext(DataContext);

  const { handleSubmit, handleChange, values, errors, touched, setErrors } = useFormik({
    initialValues: {
      title: '',
      quantity: '',
      price: '',
      payment_method: '',
      category: '',
    },    

    onSubmit: async (values) => {
      try {
        const validationSchema = Yup.object({
          title: Yup.string()
            .required("El nombre del producto es obligatorio [Texto]"),
          quantity: Yup.string(),
          price: Yup.number()
            .required("El precio es obligatorio [Numero]").typeError('Por favor ingrese una cantidad numérica'),
          payment_method: Yup.string()
            .required("El método de pago obligatorio"),
          category: Yup.string()
            .required("La categoría es obligatoria"),
        })
        const result = await validationSchema.validate(values, { abortEarly: false });
        
        if(result){
          addNewItemToList(result);
        }
        
      } catch (validationError) {
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.params.path] = error.message;
        });
        setErrors(newErrors);
      }
    },
  });

  return (
    <ThemeProvider theme={MaterialThemes}>
      <Container className="global_form_container">
          <Box className="internal_form_container" component="form">
            <ArrowBackIosNewIcon className="go_back_icon" onClick={()=>setItemFormVisibility(false)}/>
          
            <TextField
              id="product_title"
              color="secondary"
              label="Producto"
              variant="standard"
              name="title"
              required={true}
              onChange={handleChange}
              value={values.title}
              error={touched.title && errors.title?true:false}
              helperText={errors.title?errors.title:''}
            />

            <TextField
              id="product_quantity"
              color="secondary"
              label="Cantidad"
              variant="standard"
              name="quantity"
              required={true}
              onChange={handleChange}
              value={values.quantity}
              error={touched.quantity && errors.quantity?true:false}
              helperText={errors.quantity?errors.quantity:''}
            />

            <FormControl variant="standard" color="secondary" required={true} error={touched.price && errors.price ? true : false}>
              <InputLabel htmlFor="standard-adornment-amount">Precio</InputLabel>
              <Input
                id="standard-adornment-amount"
                color="secondary"
                name="price"
                required={true}
                onChange={handleChange}
                value={values.price}
              />
              {touched.price && errors.price && (
                <FormHelperText error>{errors.price}</FormHelperText>
              )}
            </FormControl>

            <FormControl variant="standard" color="secondary" required={true} error={touched.payment_method && errors.payment_method ? true : false}>
              <InputLabel id="pay_method_select" color="secondary" required={true}>Método de pago</InputLabel>
              <Select
                labelId="pay_method_select"
                id="pay_method_select_container"
                label="pay_method"
                onChange={handleChange}
                color="secondary"
                name="payment_method"
                required={true}
                value={values.payment_method}
              >
                <MenuItem disabled={money["mercado_pago"] <= 0} value={'tranfer'}>Mercado Pago - {money["mercado_pago"].toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                })}</MenuItem>
                <MenuItem disabled={money["efectivo"] <= 0} value={'cash'}>Efectivo - {money["efectivo"].toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                })}</MenuItem>
              </Select>
              {touched.payment_method && errors.payment_method && (
                <FormHelperText error>{errors.payment_method}</FormHelperText>
              )}
            </FormControl>

            <FormControl variant="standard" color="secondary" required={true} error={touched.category && errors.category ? true : false}>
              <InputLabel id="demo-simple-select-label" color="secondary">Categoría</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="category"
                onChange={handleChange}
                color="secondary"
                name="category"
                required={true}
                value={values.category}
              >
                <MenuItem value={'food'}>Comida</MenuItem>
                <MenuItem value={'drink'}>Bebida</MenuItem>
                <MenuItem value={'clothes'}>Ropa</MenuItem>
                <MenuItem value={'outings'}>Salidas</MenuItem>
                <MenuItem value={'candys'}>Dulces</MenuItem>
                <MenuItem value={'study'}>Estudio</MenuItem>
                <MenuItem value={'pharmacy'}>Farmacia</MenuItem>
                <MenuItem value={'exchange'}>Cambio de dinero (Contrario al método de pago)</MenuItem>
              </Select>
              {touched.category && errors.category && (
                <FormHelperText error>{errors.category}</FormHelperText>
              )}
            </FormControl>

            <Button variant="outlined" color="secondary" onClick={handleSubmit}>Agregar</Button>
          </Box>
      </Container>
    </ThemeProvider>
  )
}

export default NewItemForm