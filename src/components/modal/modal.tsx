import { useContext, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { CounterpartyContext } from "src/contexts/CounterpartyContext";
import { modalService } from "src/services/ModalService";
import { CounterPartyEditModalPropType } from "src/type/CounterPartyEditModalPropType";
import { CounterpartyType } from "src/type/CounterpartyType";
import './modal.module.css'

const CounterpartyEditModal = () => {

    const dummy = {
        id: ''
        ,name:''
        ,kpp: Number('')
        ,inn:  Number('')
        ,address: ''
    };

    const [isEdit, setIsEdit] = useState(false);

    const [initValue, setInitValue] = useState<CounterpartyType>(dummy);

    const { counterparties, counterpartyToEdit, updateCounterparty, createCounterparty, updatecounterpartyToEdit } = useContext(CounterpartyContext);
    

    useEffect(()=> {
        
        if (counterpartyToEdit) {

            setInitValue(counterpartyToEdit);

            setIsEdit(true);
        } else {

            setInitValue(dummy)
        }
    
    }, [counterpartyToEdit]) 


    function addCounterparty(cp: CounterpartyType, isEdit: boolean) {
       
        if (isEdit) {           
          
            updateCounterparty(cp);
        } else {

            createCounterparty(cp);
        }
       
    }
    

    function clickedSaveButton(values: CounterpartyType) {
        let cp = null;

        if (isEdit) {
            cp = counterpartyToEdit;

            cp.name = values.name;
            cp.address = values.address;
            cp.kpp = Number(values.kpp);
            cp.inn = Number(values.inn);

        } else {

            cp = {
                id: String(counterparties.length + 1),
                name: values.name,
                inn: Number(values.inn),
                kpp: Number(values.kpp),
                address: values.address
            }
        }

        addCounterparty(cp, isEdit);
        updatecounterpartyToEdit(null);
    }

    const validateForm = (values: CounterpartyType) => {
                                    if (values.name && values.name.length < 3) {

                                        return {name: {message: 'Наименование слишком короткое'} };
                                    }

                                    return undefined;
                        };

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
                        onClick={modalService.hideModal}
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
                    <Form<CounterpartyType> 
                            initialValues={initValue}
                            onSubmit={clickedSaveButton} 
                            validate={validateForm}> 
                        {props => (
                            <form className="space-y-4" onSubmit={props.handleSubmit}>
                                <input
                                type="number"
                                name="modal-cp-id"
                                id="modal-cp-id"
                                hidden={true}
                                value={props.values.name}
                                />
                                <div>
                                <label
                                    htmlFor="modal-cp-name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Наименование
                                </label>

                                <Field name='name' type="text">
                                    {
                                        props => {
                                            return ( 
                                            <>
                                                <input
                                                    type={props.input.type}                                        
                                                    name="modal-cp-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required={true}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                                {props.meta.error && <span className="validation-message" >{props.meta.error.message}</span>}
                                            </>
                                        );
                                        }
                                    }
                                </Field>
                               
                                </div>
                                <div>
                                <label
                                    htmlFor="modal-cp-inn"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    ИНН
                                </label>
                                <Field name='inn' type="text">
                                    {
                                        props => {
                                            return ( 
                                            <>
                                                <input
                                                    type={props.input.type}                                          
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required={true}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                                {props.meta.error && <span className="validation-message" >{props.meta.error.message}</span>}
                                            </>
                                        );
                                        }
                                    }
                                </Field>
                                </div>
                                <div>
                                <label
                                    htmlFor="modal-cp-address"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Адрес
                                </label>
                                <Field name='address' type="text">
                                    {
                                        props => {
                                            return ( 
                                            <>
                                                <input
                                                    type={props.input.type}                                        
                                                    name="modal-cp-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required={true}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                                {props.meta.error && <span className="validation-message" >{props.meta.error.message}</span>}
                                            </>
                                        );
                                        }
                                    }
                                </Field>
                                </div>
                                <div>
                                <label
                                    htmlFor="modal-cp-kpp"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    КПП
                                </label>
                                <Field name='kpp' type="text">
                                    {
                                        props => {
                                            return ( 
                                            <>
                                                <input
                                                    type={props.input.type}                                        
                                                    name="modal-cp-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required={true}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                                {props.meta.error && <span className="validation-message" >{props.meta.error.message}</span>}
                                            </>
                                        );
                                        }
                                    }
                                </Field>
                                </div>
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    data-modal-hide="cp-creation-modal"
                                    type="submit"
                                    id="modal-cp-submit-form"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Сохранить
                                </button>
                                <button
                                    data-modal-hide="cp-creation-modal"
                                    type="button"
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={modalService.hideModal}
                                >
                                    Отменить
                                </button>
                                </div>
                            </form>
                        )}
                    </Form>

                    </div>
                </div>
                </div>
            </div>

        </>
    );
};

export default CounterpartyEditModal;