import {
	ThemeProvider,
	CssBaseline,
	Container,
	createTheme,
	Stack
} from '@mui/material'

// ** Components
import StepForm from './components/stepForm/StepForm'

const App = () => {
	// **
	const theme = createTheme()
	return (
		<Stack
			sx={{
				background: 'whitesmoke',
				height: '100vh',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container component='main' maxWidth='md' sx={{ mb: 4 }}>
					<StepForm />
				</Container>
			</ThemeProvider>
		</Stack>
	)
}

export default App
