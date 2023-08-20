import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {FlightProvider} from "@/context/FlightContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FlightProvider>
            <App/>
        </FlightProvider>
    </React.StrictMode>,
)
