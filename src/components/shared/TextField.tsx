// ** Imports
import TextField, { TextFieldProps } from '@mui/material/TextField'

// ** types
type Props = {
	placeHolder: string
	fieldName: string
	isPhone?: boolean
} & Omit<TextFieldProps, 'variant'>

const TextComponent: React.FC<Props> = ({
	placeHolder,
	fieldName,
	isPhone,
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
					color: '#000',
					paddingLeft: isPhone ? '4rem' : 1
				}
			}}
			inputProps={{
				sx: {
					'&::placeholder': {
						color: 'gray',
						padding: isPhone ? '1rem' : 1
					}
				},
				style: {
					background: '#FFF',
					boxShadow: '0 0 2px rgba(0, 0, 0, 0.1)',
					borderBottom: 'none'
				}
			}}
		/>
	)
}

export default TextComponent
