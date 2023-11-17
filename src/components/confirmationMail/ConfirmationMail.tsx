import { Icon } from '@iconify/react'
import { Button, Stack, Typography } from '@mui/material'

// ** types
type Props = {
	handleFinish: () => void
	handleBack: () => void
}
const ConfirmationMail: React.FC<Props> = ({ handleBack, handleFinish }) => {
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
						onClick={handleBack}
					>
						Back
					</Button>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						sx={{ textTransform: 'capitalize', width: { md: '30%' } }}
						onClick={handleFinish}
					>
						Confirm
					</Button>
				</Stack>
			</Stack>
		</Stack>
	)
}

export default ConfirmationMail
