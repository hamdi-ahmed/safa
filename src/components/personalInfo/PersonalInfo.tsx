// ** Imports
import { useState } from 'react'
import {
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Stack,
	Typography
} from '@mui/material'
import Select from '@mui/material/Select'
import { Icon } from '@iconify/react'
import * as Yup from 'yup'
import { Form, FormikProvider, useFormik } from 'formik'

// ** Shared Components
import TextComponent from '../shared/TextField'

// ** types
import { RegisterForm } from '../../types/register'
import { countries } from '../../mocks/mocking'

// ** types
type Props = {
	formData: RegisterForm
	handleNext: (newData: any) => void
}

const PersonalInfo: React.FC<Props> = ({ formData, handleNext }) => {
	// ** states
	const [showPassword, setShowPassword] = useState(false)
	const [confirmationPassword, setConfirmationPassword] = useState(false)

	// ** function to show & hide password
	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const handleToggleConfirmPasswordVisibility = () => {
		setConfirmationPassword(!confirmationPassword)
	}

	// ** icons style
	const iconStyle = {
		backgroundColor: '#FFF !important'
	}

	// ** formik => General info model validation
	const generalInfoSchema = Yup.object().shape({
		user_email: Yup.string().email().required('Email address is required'),
		user_password: Yup.string()
			.required('Password is required')
			.min(8, 'Password must be at least 8 characters')
			.max(20, 'Password should not be greater than 20 characters')
			.matches(
				/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
				'Password should be at least 8 char, at least one small letter, one capital letter '
			),
		user_password_confirmation: Yup.string()
			.oneOf([Yup.ref('user_password'), ''], 'Passwords must match')
			.required('Confirm Password is required'),
		user_full_name: Yup.string().required('Full name is required'),
		user_phone: Yup.string()
			.matches(
				/^[1-9][0-9٠-٩]{8,12}$/,
				'Phone number should not start with 0 and must be between 8 and 12 number'
			)
			.required('Phone number is required'),
		user_nationality: Yup.string().required('Country is required')
	})

	// ** formik =>  submit handler
	const form = useFormik<RegisterForm>({
		enableReinitialize: true,
		initialValues: formData,
		validationSchema: generalInfoSchema,
		onSubmit: async (values: RegisterForm) => {
			handleNext(values)
		}
	})

	const { errors, touched, getFieldProps, values } = form

	return (
		<FormikProvider value={form}>
			<Form noValidate>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextComponent
							fieldName='full name'
							placeHolder='Enter your full name'
							type='text'
							{...getFieldProps('user_full_name')}
							error={Boolean(touched.user_full_name && errors.user_full_name)}
							helperText={touched.user_full_name && errors.user_full_name}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextComponent
							fieldName='business email'
							placeHolder='Enter your business email'
							type='text'
							{...getFieldProps('user_email')}
							error={Boolean(touched.user_email && errors.user_email)}
							helperText={touched.user_email && errors.user_email}
						/>
					</Grid>

					<Grid item xs={12} md={6}>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>COUNTRY</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								label='COUNTRY'
								variant='outlined'
								defaultValue='Choose your country'
								{...getFieldProps('user_nationality')}
								error={Boolean(
									touched.user_nationality && errors.user_nationality
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
						{touched.user_nationality && errors.user_nationality && (
							<Typography variant='caption' color='error'>
								{errors.user_nationality}
							</Typography>
						)}
					</Grid>

					<Grid item xs={12} md={6}>
						<TextComponent
							fieldName='Phone Number'
							placeHolder='Enter you phone number'
							fullWidth
							isPhone={true}
							id='phone-number'
							margin='none'
							{...getFieldProps('user_phone')}
							InputProps={{
								startAdornment: (
									<InputAdornment
										style={{
											width: '10%',
											margin: 'auto',
											backgroundColor: '#FFF !important'
										}}
										position='start'
									>
										{values?.user_nationality}
									</InputAdornment>
								)
							}}
							error={Boolean(touched.user_phone && errors.user_phone)}
						/>
						{touched.user_phone && errors.user_phone && (
							<Typography variant='caption' color='error'>
								{errors.user_phone}
							</Typography>
						)}
					</Grid>

					<Grid item xs={12}>
						<TextComponent
							fieldName='password'
							placeHolder='Enter your password'
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment: (
									<InputAdornment style={iconStyle} position='end'>
										<IconButton
											onClick={handleTogglePasswordVisibility}
											edge='end'
										>
											{showPassword ? (
												<Icon icon='material-symbols-light:visibility-outline' />
											) : (
												<Icon icon='material-symbols-light:visibility-off-outline' />
											)}
										</IconButton>
									</InputAdornment>
								)
							}}
							{...getFieldProps('user_password')}
							error={Boolean(touched.user_password && errors.user_password)}
							helperText={touched.user_password && errors.user_password}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextComponent
							fieldName='password'
							placeHolder='Enter your confirmation password'
							type={confirmationPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment: (
									<InputAdornment style={iconStyle} position='end'>
										<IconButton
											onClick={handleToggleConfirmPasswordVisibility}
											edge='end'
										>
											{confirmationPassword ? (
												<Icon icon='material-symbols-light:visibility-outline' />
											) : (
												<Icon icon='material-symbols-light:visibility-off-outline' />
											)}
										</IconButton>
									</InputAdornment>
								)
							}}
							{...getFieldProps('user_password_confirmation')}
							error={Boolean(
								touched.user_password_confirmation &&
									errors.user_password_confirmation
							)}
							helperText={
								touched.user_password_confirmation &&
								errors.user_password_confirmation
							}
						/>
					</Grid>

					<Grid item xs={12}>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='center'
						>
							<Button
								variant='text'
								color='inherit'
								sx={{
									textTransform: 'capitalize',
									width: { md: '30%' },
									background: 'whitesmoke'
								}}
							>
								<Icon width={25} height={25} icon='eva:arrow-left-outline' />
								Back to login
							</Button>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								sx={{ textTransform: 'capitalize', width: { md: '30%' } }}
							>
								Next
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Form>
		</FormikProvider>
	)
}

export default PersonalInfo
