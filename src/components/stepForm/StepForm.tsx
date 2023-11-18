// ** Imports
import { useState } from 'react'
import {
	Paper,
	Stack,
	Step,
	StepLabel,
	Stepper,
	Typography
} from '@mui/material'
import { Icon } from '@iconify/react'

// ** Components
import PersonalInfo from '../personalInfo/PersonalInfo'
import CompanyInfoModal from '../companyInfoModel/CompanyInfoModal'
import ConfirmationMail from '../confirmationMail/ConfirmationMail'

// ** types
import { RegisterForm } from '../../types/register'
import { ColorlibConnector } from '../../styles/lineStyle'

// ** ICONS
const iconStyle = {
	width: 50,
	height: 50,
	background: '#FFF',
	padding: '10px',
	borderRadius: '50%'
}
const icons = [
	<Icon icon='tdesign:user' style={iconStyle} />,
	<Icon icon='mdi:company' style={iconStyle} />,
	<Icon icon='icon-park-outline:protect' style={iconStyle} />
]

const StepForm = () => {
	// ** states
	const [activeStep, setActiveStep] = useState(0)
	const [formData, setFormData] = useState<RegisterForm>({
		user_email: '',
		user_full_name: '',
		user_is_admin: '',
		user_nationality: '',
		user_password: '',
		user_password_confirmation: '',
		user_phone: '',
		user_position: '',
		user_status: '',
		company_address: '',
		company_business_email: '',
		company_city_id: '',
		company_country_id: '',
		company_name: '',
		company_phone: ''
	})

	// ** final step
	const finalStepForm = (newData: RegisterForm) => {
		console.log({ newData })
	}

	// ** handle changing move from step to another
	const handleNext = (newData: RegisterForm, finalStep = false) => {
		if (finalStep) {
			finalStepForm(newData)
			return
		}
		setFormData((prev) => ({ ...prev, ...newData }))
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = (newData: any) => {
		setFormData((prev) => ({ ...prev, ...newData }))
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const getStepContent = (stepIndex: number) => {
		switch (stepIndex) {
			case 0:
				return <PersonalInfo formData={formData} handleNext={handleNext} />
			case 1:
				return (
					<CompanyInfoModal
						formData={formData}
						handleBack={handleBack}
						handleNext={handleNext}
					/>
				)
			case 2:
				return (
					<ConfirmationMail
						handleBack={handleBack}
						handleFinish={handleNext}
						formData={formData}
					/>
				)
			default:
				return 'Unknown stepIndex'
		}
	}

	return (
		<Stack spacing={3}>
			<Stepper
				activeStep={activeStep}
				alternativeLabel
				connector={<ColorlibConnector />}
			>
				{icons.map((icon, index) => (
					<Step key={index}>
						<StepLabel
							style={{
								borderColor: activeStep === index ? '#d9534f' : '#00bcd4'
							}}
							icon={
								<span
									style={{
										color: activeStep === index ? '#d9534f' : '#00bcd4'
									}}
								>
									{icons[index]}
								</span>
							}
						></StepLabel>
					</Step>
				))}
			</Stepper>

			<Stack>
				<Typography textAlign='center' variant='h6' fontWeight='bolder'>
					Tell us more about you
				</Typography>
				<Paper variant='outlined' sx={{ padding: 2 }}>
					{getStepContent(activeStep)}
				</Paper>
			</Stack>
		</Stack>
	)
}

export default StepForm
