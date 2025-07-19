import './styles.css'
import {createRoot} from "react-dom/client";
import logo from './assets/react.svg';
import Button from './components/button/button';



const rootElement = document.getElementById('root');

const root = createRoot(rootElement)

root.render(
    <div className='layout'>
        <Button/>
        <img src={logo} style={{width: 200, height: 200}} alt='Logo'/>
    </div>
)