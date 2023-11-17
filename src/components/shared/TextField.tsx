// ** Imports
import TextField, { TextFieldProps } from '@mui/material/TextField'

// ** types
type Props = {
	placeHolder: string
	fieldName: string
	isPassword?: boolean
	confirmPassword?: boolean
} & Omit<TextFieldProps, 'variant'>

const TextComponent: React.FC<Props> = ({
	placeHolder,
	fieldName,
	...props
}) => {
	return (
		<TextField
			{...props}
			fullWidth
			label={fieldName}
			variant='filled'
			placeholder={placeHolder}
			InputLabelProps={{
				shrink: true,
				style: {
					fontWeight: 'bold',
					textTransform: 'uppercase',
					color: '#000'
				}
			}}
			inputProps={{
				sx: {
					'&::placeholder': {
						color: 'gray'
					}
				},
				style: {
					background: '#FFF',
					boxShadow: '0 0 1px rgba(0, 0, 0, 0.1)',
					borderBottom: 'none'
				}
			}}
		/>
	)
}

export default TextComponent
