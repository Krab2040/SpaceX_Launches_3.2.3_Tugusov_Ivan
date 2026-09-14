import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css'
import './index.sass'
import App from './app/App'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element not found')
}

createRoot(rootElement).render(
    <StrictMode>
        <MantineProvider>
            <App />
        </MantineProvider>
    </StrictMode>,
)
