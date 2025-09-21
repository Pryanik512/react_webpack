import './main.css'
import {createRoot} from "react-dom/client";
import App from './app';
import 'flowbite';
import { CounterpartyProvider } from './contexts/CounterpartyProvider';



const rootElement = document.getElementById('root');

const root = createRoot(rootElement)

root.render(
    <CounterpartyProvider>
        <App/>
    </CounterpartyProvider>
)