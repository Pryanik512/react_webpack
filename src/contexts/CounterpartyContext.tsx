import { createContext } from "react";
import { CounterpartyType } from "src/type/CounterpartyType";

interface CounterpartyContextType {
   
    initCounterparties: () => void;
    createCounterparty: (object: CounterpartyType) => void;
    updateCounterparty: (object: CounterpartyType) => void;
    deleteCounterparty: (id: string) => void;
    counterparties: CounterpartyType[];
    counterpartyToEdit: CounterpartyType;
    updatecounterpartyToEdit: (object: CounterpartyType) => void;
    isLoading: boolean,
    setIsLoadingFlag: (flag: boolean) => void;
   
}

export const CounterpartyContext = createContext<CounterpartyContextType>(null);