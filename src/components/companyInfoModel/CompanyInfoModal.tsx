import {
	Button,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography
} from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import { APIS } from '../../utils/serviceUrls'

// ** Shared Components
import TextComponent from '../shared/TextField'

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
	// ** handle submit form
	const registerUser = async (formData: RegisterForm) => {
		try {
			await axios.post(APIS.AUTH.REGISTER, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			toast.success('Data registered successful', {
				position: toast.POSITION.TOP_RIGHT
			})
			handleNext(formData)
		} catch (error: any) {
			toast.error(error?.message)
			console.log(error)
		}
	}

	// ** formik => General info model validation
	const companyInfoSchema = Yup.object().shape({
		company_name: Yup.string().required('Company name is required'),

		company_address: Yup.string().required('Company address is required'),
		company_phone: Yup.string()
			.matches(
				/^[1-9][0-9٠-٩]{8,12}$/,
				'Phone number should not start with 0 and must be between 8 and 12 number'
			)
			.required('Phone number is required'),
		company_business_email: Yup.string()
			.email()
			.required('Email address is required'),
		company_city_id: Yup.string().required('City is required'),
		company_country_id: Yup.string().required('Country is required')
	})

	// ** formik =>  submit handler
	const form = useFormik<RegisterForm>({
		enableReinitialize: true,
		initialValues: formData,
		validationSchema: companyInfoSchema,
		onSubmit: (values: RegisterForm) => {
			registerUser(values)
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
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>CITY</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								label='COUNTRY'
								variant='outlined'
								placeholder='Choose your city'
								{...getFieldProps('company_city_id')}
								error={Boolean(
									touched.company_city_id && errors.company_city_id
								)}
							>
								<MenuItem value='' disabled>
									Choose your city
								</MenuItem>
								{cities.map((city) => (
									<MenuItem key={city.cityId} value={city?.cityId}>
										{city.cityName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						{touched.company_city_id && errors.company_city_id && (
							<Typography variant='caption' color='error'>
								{errors.company_city_id}
							</Typography>
						)}
					</Grid>

					<Grid item xs={12} md={6}>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>COUNTRY</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								label='COUNTRY'
								variant='outlined'
								placeholder='Choose your country'
								{...getFieldProps('company_country_id')}
								error={Boolean(
									touched.company_country_id && errors.company_country_id
								)}
							>
								<MenuItem value='' disabled>
									Choose your country
								</MenuItem>
								{countries.map((country) => (
									<MenuItem key={country.countryId} value={country?.value}>
										{country.countryName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						{touched.company_country_id && errors.company_country_id && (
							<Typography variant='caption' color='error'>
								{errors.company_country_id}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12} md={6}>
						<TextComponent
							fullWidth
							fieldName='Phone Number'
							placeHolder='Enter company phone'
							id='phone-number'
							{...getFieldProps('company_phone')}
							isPhone={true}
							error={Boolean(touched.company_phone && errors.company_phone)}
							InputProps={{
								startAdornment: (
									<InputAdornment
										variant='outlined'
										style={{
											width: '10%',
											margin: 'auto',
											backgroundColor: '#FFF !important'
										}}
										position='start'
									>
										{values?.company_country_id}
									</InputAdornment>
								)
							}}
						/>
						{touched.company_phone && errors.company_phone && (
							<Typography variant='caption' color='error'>
								{errors.company_phone}
							</Typography>
						)}
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
