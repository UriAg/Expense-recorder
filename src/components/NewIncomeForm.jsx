import { Box, Container, FormControl, Input, InputLabel, MenuItem, Select, ThemeProvider, Button, FormHelperText  } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useContext } from "react"
import { DataContext } from "../context/DataContext.jsx"
import MaterialThemes from "../MaterialThemes/MaterialThemes.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewIncomeForm = () => {
  const { setIncomeFormVisibility, addNewIncome } = useContext(DataContext);

  const { handleSubmit, handleChange, values, errors, touched, setErrors } = useFormik({
    initialValues: {
      amount: '',
      income_type: '',      
    },    

    onSubmit: async (values) => {
      try {
        const validationSchema = Yup.object({
          amount: Yup.number()
          .required("La cantidad a ingresar es obligatoria").typeError('Por favor ingrese una cantidad numérica'),
          income_type: Yup.string()
          .required("El tipo de ingreso es obligatorio"),
        })
        const result = await validationSchema.validate(values, { abortEarly: false });
        
        if(result){
          addNewIncome(result)
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
            <ArrowBackIosNewIcon className="go_back_icon" onClick={()=>setIncomeFormVisibility(false)}/>
          


            <FormControl variant="standard" color="secondary" required={true} error={touched.amount && errors.amount ? true : false}>
              <InputLabel htmlFor="standard-adornment-amount">Monto</InputLabel>
              <Input
                id="standard-adornment-amount"
                color="secondary"
                name="amount"
                required={true}
                onChange={handleChange}
                value={values.amount}
              />
              {touched.amount && errors.amount && (
                <FormHelperText error>{errors.amount}</FormHelperText>
              )}
            </FormControl>

            <FormControl variant="standard" color="secondary" required={true} error={touched.income_type && errors.income_type ? true : false}>
              <InputLabel id="income_type_select" color="secondary" required={true}>Método de pago</InputLabel>
              <Select
                labelId="income_type_select"
                id="income_type_select_container"
                label="income_method"
                onChange={handleChange}
                color="secondary"
                name="income_type"
                required={true}
                value={values.income_type}
              >
                <MenuItem value={'mercado_pago'}>Mercado pago</MenuItem>
                <MenuItem value={'efectivo'}>Efectivo</MenuItem>
              </Select>
              {touched.income_type && errors.income_type && (
                <FormHelperText error>{errors.income_type}</FormHelperText>
              )}
            </FormControl>

            <Button variant="outlined" color="secondary" onClick={handleSubmit}>Ingresar</Button>
          </Box>
      </Container>
    </ThemeProvider>
  )
}

export default NewIncomeForm