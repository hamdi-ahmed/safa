import {
	ThemeProvider,
	CssBaseline,
	Container,
	Paper,
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
					{/* <Paper
						variant='outlined'
						sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
					> */}
					<StepForm />
					{/* </Paper> */}
				</Container>
			</ThemeProvider>
		</Stack>
	)
}

export default App
