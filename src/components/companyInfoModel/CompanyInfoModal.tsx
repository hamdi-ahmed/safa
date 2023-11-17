import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	TextField
} from '@mui/material'
import { useState } from 'react'

// ** Shared Components
import TextComponent from '../shared/TextField'
import SharedSelect from '../shared/SelectComponent'

// ** types
import { RegisterForm } from '../../types/register'

// ** types
type Props = {
	formData: RegisterForm
	updateFormData: (step: string, data: any) => void
	handleNext: () => void
	handleBack: () => void
}

const CompanyInfoModal: React.FC<Props> = ({
	formData,
	updateFormData,
	handleNext,
	handleBack
}) => {
	// ** states
	const [selectedValue, setSelectedValue] = useState('')

	const options = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' }
	]

	const handleSelectChange = (event: SelectChangeEvent<string>) => {
		setSelectedValue(event.target.value as string)
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextComponent
					fieldName='company name'
					placeHolder='Enter your company name'
					type='text'
				/>
			</Grid>

			<Grid item xs={12}>
				<TextComponent
					fieldName='Address'
					placeHolder='Enter your address'
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
				<SharedSelect
					label='cities'
					value={selectedValue}
					onChange={handleSelectChange}
					options={options}
					placeholder='Choose your city'
				/>
			</Grid>

			<Grid item xs={12}>
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
				<Stack direction='row' spacing={1} justifyContent='end'>
					<Button
						variant='text'
						color='inherit'
						sx={{
							textTransform: 'capitalize',
							width: { md: '20%' },
							background: 'whitesmoke'
						}}
						onClick={handleBack}
					>
						Back
					</Button>
					<Button
						type='submit'
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

export default CompanyInfoModal
