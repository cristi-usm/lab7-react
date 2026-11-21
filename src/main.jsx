import React from 'react'
import { createRoot } from 'react-dom/client'
import { FormProvider } from './context/FormContext'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')).render(<React.StrictMode><FormProvider><App /></FormProvider></React.StrictMode>)
