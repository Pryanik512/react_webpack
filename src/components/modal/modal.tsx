import { useContext, useEffect, useState } from "react";
import { CounterpartyContext } from "src/contexts/CounterpartyContext";
import { CounterPartyEditModalPropType } from "src/type/CounterPartyEditModalPropType";
import { CounterpartyType } from "src/type/CounterpartyType";

const CounterpartyEditModal = () => {

    const [name, setName] = useState('');
    const [inn, setInn] = useState('');
    const [address, setAddress] = useState('');
    const [kpp, setKpp] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const { counterparties, counterpartyToEdit, updateCounterparty, createCounterparty, updatecounterpartyToEdit } = useContext(CounterpartyContext);
    

    useEffect(()=> {
        
        if (counterpartyToEdit) {

            setName(counterpartyToEdit.name);
            setInn(String(counterpartyToEdit.inn));
            setAddress(counterpartyToEdit.address);
            setKpp(String(counterpartyToEdit.kpp));

            setIsEdit(true);
        } else {
            setIsEdit(false);
        }
    
    }, [counterpartyToEdit]) 


    function addCounterparty(cp: CounterpartyType, isEdit: boolean) {
       
        if (isEdit) {           
          
            updateCounterparty(cp);
        } else {

            createCounterparty(cp);
        }
       
    }
    


    function clickedSaveButton() {
        let cp = null;

        if (isEdit) {
            cp = counterpartyToEdit;

            cp.name = name;
            cp.address = address;
            cp.kpp = Number(kpp);
            cp.inn = Number(inn);

        } else {

            cp = {
                id: String(counterparties.length + 1),
                name: name,
                inn: Number(inn),
                kpp: Number(kpp),
                address: address
            }
        }

        addCounterparty(cp, isEdit);

        setName('');
        setInn('');
        setAddress('');
        setKpp('');
        updatecounterpartyToEdit(null);
    }

    return (
        <>
            {/* <!-- Main modal --> */}
            {/* <!-- w-full --> */}
            <div
                id="cp-creation-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                {/* Modal content */}
                <div
                    className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700"
                    style={{ borderWidth: 10 }}
                >
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Контрагент
                    </h3>
                    <button
                        type="button"
                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="cp-creation-modal"
                    >
                        <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5">
                    <form className="space-y-4" action="#">
                        <input
                        type="number"
                        name="modal-cp-id"
                        id="modal-cp-id"
                        hidden={true}
                        />
                        <div>
                        <label
                            htmlFor="modal-cp-name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Наименование
                        </label>
                        <input
                            type="text"
                            name="modal-cp-name"
                            id="modal-cp-name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required={true}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="modal-cp-inn"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            ИНН
                        </label>
                        <input
                            type="number"
                            name="modal-cp-inn"
                            id="modal-cp-inn"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required={true}
                            value={inn}
                            onChange={(e) => setInn(e.target.value)}
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="modal-cp-address"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Адрес
                        </label>
                        <input
                            type="text"
                            name="modal-cp-address"
                            id="modal-cp-address"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required={true}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="modal-cp-kpp"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            КПП
                        </label>
                        <input
                            type="number"
                            name="modal-cp-kpp"
                            id="modal-cp-kpp"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required={true}
                            value={kpp}
                            onChange={(e) => setKpp(e.target.value)}
                        />
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            data-modal-hide="cp-creation-modal"
                            type="button"
                            id="modal-cp-submit-form"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={clickedSaveButton}
                        >
                            Сохранить
                        </button>
                        <button
                            data-modal-hide="cp-creation-modal"
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Отменить
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>

        </>
    );
};

export default CounterpartyEditModal;