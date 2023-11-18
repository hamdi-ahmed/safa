import { Icon } from '@iconify/react'
import { Button, Stack, Typography } from '@mui/material'
import { RegisterForm } from '../../types/register'

// ** types
type Props = {
	handleFinish: (newData: RegisterForm, finalStep?: boolean) => void
	handleBack: (newData: RegisterForm) => void
	formData: RegisterForm
}

const ConfirmationMail: React.FC<Props> = ({
	handleBack,
	handleFinish,
	formData
}) => {
	return (
		<Stack alignItems='center' justifyContent='center'>
			<Icon
				width={100}
				height={100}
				icon='noto:open-mailbox-with-raised-flag'
			/>
			<Typography variant='h6' color='danger'>
				We will send a message for this e-mail
			</Typography>
			<Typography variant='h6'>test@example.com</Typography>

			<Stack>
				<Stack direction='row' spacing={1} justifyContent='end'>
					<Button
						variant='text'
						color='inherit'
						sx={{
							textTransform: 'capitalize',
							width: { md: '20%' },
							background: 'whitesmoke'
						}}
						onClick={() => handleBack(formData)}
					>
						Back
					</Button>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						sx={{ textTransform: 'capitalize', width: { md: '30%' } }}
						onClick={() => handleFinish(formData, true)}
					>
						Confirm
					</Button>
				</Stack>
			</Stack>
		</Stack>
	)
}

export default ConfirmationMail
