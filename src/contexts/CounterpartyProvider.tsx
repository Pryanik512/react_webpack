import { ReactNode, useState } from "react";
import { CounterpartyType } from "src/type/CounterpartyType";
import { CounterpartyContext } from "./CounterpartyContext";
import { counterpartyService } from "src/services/CounterpartyService";

type ThemeProviderProps = {
    children: ReactNode;
};

export const CounterpartyProvider = ({ children }: ThemeProviderProps) => {

    const [counterPartiesList, setCounterPartiesList] = useState(null as CounterpartyType[]);

    const [counterpartyToEdit, setCounterpartyToEdit] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    
    const initCpListRef = () => {


        setIsLoading(true)
        counterpartyService.getCounterparties()
            .then(response => response.json())
            .then(data => {
                setCounterPartiesList(data as CounterpartyType[]);
            })
            .catch(err => {
                alert("Failed to read counterparties!");
                setCounterPartiesList([]);
            })
            .finally(() =>  setIsLoading(false)); 
    }


     const createCpRef = (object: CounterpartyType) => {

        setIsLoading(true)
        counterpartyService.createCounterparty(object)
        .then(response => response.json())
             .then(data => {

                let tmpList = [... counterPartiesList, data];


                setCounterPartiesList(tmpList);
             })
            .catch(err => {
                alert("Failed to create new counterparty:");
               
            })
            .finally(() =>  setIsLoading(false)); 
    }

     const updateCpRef = (object: CounterpartyType) => {

        setIsLoading(true)
        counterpartyService.updateCounterparty(object)
                .then(response => response.json())
                .then(data => {
                    let tmpList = counterPartiesList
                        .map((item) => {

                            return item.id === String(data.id) ?  
                                {
                                    id: String(data.id),
                                    name: data.name,
                                    address: data.address,
                                    inn: data.inn,
                                    kpp: data.kpp,
                                } :
                                item;
                    });
                    
                    setCounterPartiesList(tmpList);

                })
                .catch(err => {
                    alert("Failed to update counterparty with  id: " + object.id);
                })
                .finally(() =>  setIsLoading(false));
    }

     const deleteCpRef = (id: string) => {

        
        setIsLoading(true);

        counterpartyService.removeCounterparty(id)
            .then(response => response.json())
            .then(data => {

                let tmpList = counterPartiesList
                        .filter((item) => Number(item.id) !== Number(data.id));

                console.log("DMAR list after DELETE operation:");
                console.log(tmpList);

                setCounterPartiesList(tmpList);
               
            })
            .catch(err => {
                alert("Failed to delete counterparty with id: " + id);
            })
            .finally(() =>  setIsLoading(false)); 
    }

    const updateCpToEdit = (object: CounterpartyType) => {
        setCounterpartyToEdit(object);
    }

    const setLoading = (flag: boolean) => {
        setIsLoading(flag);
    }

    return (
        <CounterpartyContext.Provider value={{
            initCounterparties: initCpListRef,
            createCounterparty: createCpRef,
            updateCounterparty: updateCpRef,
            deleteCounterparty: deleteCpRef,
            counterparties: counterPartiesList,
            counterpartyToEdit: counterpartyToEdit,
            updatecounterpartyToEdit: updateCpToEdit,
            isLoading,
            setIsLoadingFlag: setLoading
         }}>
            {children}
        </CounterpartyContext.Provider>
    );
};

