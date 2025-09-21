import CounterpartyEditModal from "./components/modal/modal";
import CounterpartyTable from "./components/table/table";
import './app.css';
import { useContext, useEffect, useState } from "react";
import ShowModalButton from "./components/modal/shoModalButton/ShowModalButton";
import { CounterpartyContext } from "./contexts/CounterpartyContext";
import Loader from "./components/Loader";

const App = () => {

    const { initCounterparties, 
            isLoading,
            counterparties } = useContext(CounterpartyContext);

    

    useEffect(() => {
        initCounterparties();
    }, []);

   
    return (
        counterparties && !isLoading ? 
            <>
                    <header>
                        <img className="ms-logo" src="https://www.moysklad.ru/local/templates/moysklad-new/images/header-logo.svg"/>    
                        <ShowModalButton />        
                        <CounterpartyEditModal/>
                    </header>

                    <div className="ms-main-view relative overflow-x-auto">
                        <CounterpartyTable/>
                    </div>

                    
                    <footer> 
                        <span className="ms-footer">© 2007–2024 ООО «Логнекс»</span>
                    </footer>

            </> : 
            <Loader/>
    );
};

export default App;