// SharedSelect.tsx
import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

interface Option {
	label: string
	value: string
}

interface SharedSelectProps {
	label: string
	value: string
	onChange: (event: SelectChangeEvent<string>) => void
	options: Option[]
	placeholder: string
}

const SharedSelect: React.FC<SharedSelectProps> = ({
	label,
	value,
	onChange,
	options,
	placeholder
}) => {
	return (
		<FormControl fullWidth variant='filled'>
			<InputLabel>{label}</InputLabel>
			<Select
				style={{ backgroundColor: 'transparent' }}
				value={value}
				onChange={onChange}
				label={label}
				variant='filled'
			>
				{placeholder && (
					<MenuItem value={placeholder} disabled>
						{placeholder}
					</MenuItem>
				)}
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default SharedSelect
