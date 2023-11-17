import { StepConnector, stepConnectorClasses, styled } from '@mui/material'

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient( 95deg,#00bcd4 0%,rgb(233,64,87) 50%,#00bcd4 100%)'
		}
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient( 95deg,#00bcd4 0%,rgb(233,64,87) 50%,#00bcd4 100%)'
		}
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderRadius: 1
	}
}))
