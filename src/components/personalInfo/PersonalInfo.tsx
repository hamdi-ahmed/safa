// ** Imports
import { useState } from 'react'
import {
	Box,
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Stack,
	TextField
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Icon } from '@iconify/react'
import * as Yup from 'yup'
import { Form, FormikProvider, useFormik } from 'formik'

// ** Shared Components
import TextComponent from '../shared/TextField'
import SharedSelect from '../shared/SelectComponent'

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
	const [selectedValue, setSelectedValue] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [confirmationPassword, setConfirmationPassword] = useState(false)

	// ** function to show & hide password
	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const handleToggleConfirmPasswordVisibility = () => {
		setConfirmationPassword(!confirmationPassword)
	}

	const handleSelectChange = (event: SelectChangeEvent<string>) => {
		setSelectedValue(event.target.value as string)
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
			.min(8, 'Password must be at least 8 characters'),
		user_password_confirmation: Yup.string()
			.oneOf([Yup.ref('user_password'), ''], 'Passwords must match')
			.required('Confirm Password is required'),
		user_full_name: Yup.string().required('Full name is required'),
		user_phone: Yup.string()
			// .matches(/^\+20[0-9]{9}$/, 'Invalid phone number format')
			.required('Phone number is required'),
		user_nationality: Yup.string().required('Country is required')
	})

	// ** formik =>  submit handler
	const form = useFormik<RegisterForm>({
		enableReinitialize: true,
		initialValues: formData,
		validationSchema: generalInfoSchema,
		onSubmit: async (values: RegisterForm) => {
			console.log({ values })
			handleNext(values)
			// updateFormData('step1', values)
		}
	})

	const { errors, touched, getFieldProps } = form

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
								{...getFieldProps('user_nationality')}
								error={Boolean(
									touched.user_nationality && errors.user_nationality
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
								{...getFieldProps('user_phone')}
								error={Boolean(touched.user_phone && errors.user_phone)}
								helperText={touched.user_phone && errors.user_phone}
							/>
						</Stack>
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
								// onClick={handleNext}
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
