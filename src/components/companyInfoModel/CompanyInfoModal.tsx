import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField
} from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import { APIS } from '../../utils/serviceUrls'

// ** Shared Components
import TextComponent from '../shared/TextField'
import SharedSelect from '../shared/SelectComponent'

// ** types
import { RegisterForm } from '../../types/register'
import { cities, countries } from '../../mocks/mocking'

// ** types
type Props = {
	formData: RegisterForm
	handleNext: (newData: RegisterForm) => void
	handleBack: (newData: RegisterForm) => void
}

const CompanyInfoModal: React.FC<Props> = ({
	formData,
	handleNext,
	handleBack
}) => {
	// ** toastify
	const { success, error } = toast

	// ** handle submit form
	const registerUser = (formData: RegisterForm) => {
		try {
			axios.post(APIS.AUTH.REGISTER, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			success('User added successfully')
			// handleNext(formData)
		} catch (error) {
			// error(error?.message)
			console.log(error)
		}
	}

	// ** formik => General info model validation
	const companyInfoSchema = Yup.object().shape({
		company_name: Yup.string().required('Company name is required'),

		company_address: Yup.string().required('Company address is required'),
		company_phone: Yup.string()
			// .matches(/^\+20[0-9]{9}$/, 'Invalid phone number format')
			.required('Phone number is required'),
		company_business_email: Yup.string()
			.email()
			.required('Email address is required'),
		company_city_id: Yup.string().required('City is required'),
		company_country_id: Yup.string().required('City is required')
	})

	// ** formik =>  submit handler
	const form = useFormik<RegisterForm>({
		enableReinitialize: true,
		initialValues: formData,
		validationSchema: companyInfoSchema,
		onSubmit: async (values: RegisterForm) => {
			await registerUser(values)
			// handleNext(values)
		}
	})

	const { errors, touched, getFieldProps, values } = form

	return (
		<FormikProvider value={form}>
			<Form noValidate autoComplete='off'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextComponent
							fieldName='company name'
							placeHolder='Enter your company name'
							type='text'
							{...getFieldProps('company_name')}
							error={Boolean(touched.company_name && errors.company_name)}
							helperText={touched.company_name && errors.company_name}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextComponent
							fieldName='Address'
							placeHolder='Enter your address'
							type='text'
							{...getFieldProps('company_address')}
							error={Boolean(touched.company_address && errors.company_address)}
							helperText={touched.company_address && errors.company_address}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextComponent
							fieldName='business email'
							placeHolder='Enter your business email'
							type='text'
							{...getFieldProps('company_business_email')}
							error={Boolean(
								touched.company_business_email && errors.company_business_email
							)}
							helperText={
								touched.company_business_email && errors.company_business_email
							}
						/>
					</Grid>

					<Grid item xs={12}>
						<Select
							labelId='country-code'
							id='demo-simple-select'
							label='CITY'
							variant='outlined'
							fullWidth
							sx={{
								'&.MuiInput-underline:before': {
									content: 'none'
								},
								'& .MuiSelect-select': {
									display: 'flex'
								}
							}}
							{...getFieldProps('company_city_id')}
							error={Boolean(touched.company_city_id && errors.company_city_id)}
						>
							{cities.map((city) => (
								<MenuItem key={city.cityId} value={city?.cityId}>
									{city.cityName}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={12}>
						<Stack direction='row' alignItems='center' justifyContent='center'>
							<Select
								labelId='country-code'
								id='demo-simple-select'
								variant='outlined'
								sx={{
									'&.MuiInput-underline:before': {
										content: 'none'
									},
									'& .MuiSelect-select': {
										display: 'flex'
									}
								}}
								{...getFieldProps('company_country_id')}
								error={Boolean(
									touched.company_country_id && errors.company_country_id
								)}
							>
								{countries.map((country) => (
									<MenuItem key={country.countryId} value={country?.value}>
										{country.countryKey}
									</MenuItem>
								))}
							</Select>

							<TextField
								fullWidth
								id='phone-number'
								label='Phone Number'
								{...getFieldProps('company_phone')}
								error={Boolean(touched.company_phone && errors.company_phone)}
								helperText={touched.company_phone && errors.company_phone}
							/>
						</Stack>
					</Grid>

					<Grid item xs={12}>
						<Stack direction='row' spacing={1} justifyContent='end'>
							<Button
								variant='text'
								color='inherit'
								sx={{
									textTransform: 'capitalize',
									width: { md: '20%' },
									background: 'whitesmoke'
								}}
								onClick={() => handleBack(values)}
							>
								Back
							</Button>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								sx={{ textTransform: 'capitalize', width: { md: '30%' } }}
							>
								Submit
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Form>
		</FormikProvider>
	)
}

export default CompanyInfoModal
