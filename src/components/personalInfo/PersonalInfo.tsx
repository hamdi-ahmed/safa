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
	TextField
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Icon } from '@iconify/react'

// ** Shared Components
import TextComponent from '../shared/TextField'
import SharedSelect from '../shared/SelectComponent'

// ** types
import { StepOne } from '../../types/register'

// ** types
type Props = {
	formData: StepOne
	updateFormData: (step: string, data: any) => void
	handleNext: () => void
}

const PersonalInfo: React.FC<Props> = ({
	formData,
	updateFormData,
	handleNext
}) => {
	// ** states
	const [selectedValue, setSelectedValue] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [confirmationPassword, setConfirmationPassword] = useState(false)

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const handleToggleConfirmPasswordVisibility = () => {
		setConfirmationPassword(!confirmationPassword)
	}

	const handleSelectChange = (event: SelectChangeEvent<string>) => {
		setSelectedValue(event.target.value as string)
	}

	const iconStyle = {
		backgroundColor: '#FFF !important'
	}

	const options = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' }
	]

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextComponent
					fieldName='full name'
					placeHolder='Enter your full name'
					type='text'
				/>
			</Grid>

			<Grid item xs={12}>
				<TextComponent
					fieldName='business email'
					placeHolder='Enter your business email'
					type='text'
				/>
			</Grid>

			<Grid item xs={12} md={6}>
				<SharedSelect
					label='country'
					value={selectedValue}
					onChange={handleSelectChange}
					options={options}
					placeholder='Choose your country'
				/>
			</Grid>

			<Grid item xs={12} md={6}>
				<Stack direction='row' alignItems='center' justifyContent='center'>
					<FormControl sx={{ width: '30%' }}>
						<InputLabel id='country-code-label'>Code</InputLabel>
						<Select
							labelId='country-code-label'
							id='country-code'
							label='Country Code'
						>
							<MenuItem value='20'>+20</MenuItem>
							<MenuItem value='966'>+966</MenuItem>
						</Select>
					</FormControl>

					<TextField fullWidth id='phone-number' label='Phone Number' />
				</Stack>
			</Grid>

			<Grid item xs={12}>
				<TextComponent
					fieldName='password'
					placeHolder='Enter your password'
					type={showPassword ? 'text' : 'password'}
					isPassword={true}
					InputProps={{
						endAdornment: (
							<InputAdornment style={iconStyle} position='end'>
								<IconButton onClick={handleTogglePasswordVisibility} edge='end'>
									{showPassword ? (
										<Icon icon='material-symbols-light:visibility-outline' />
									) : (
										<Icon icon='material-symbols-light:visibility-off-outline' />
									)}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
			</Grid>

			<Grid item xs={12}>
				<TextComponent
					fieldName='password'
					placeHolder='Enter your confirmation password'
					type={confirmationPassword ? 'text' : 'password'}
					confirmPassword={true}
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
						// type='submit'
						variant='contained'
						color='primary'
						sx={{ textTransform: 'capitalize', width: { md: '30%' } }}
						onClick={handleNext}
					>
						Next
					</Button>
				</Stack>
			</Grid>
		</Grid>
	)
}

export default PersonalInfo
