import { useContext, useState } from "react";
import DeleteRowButton from "../deleteRowButton/DeleteRowButton";
import { CounterpartyContext } from "src/contexts/CounterpartyContext";




const CounterpartyTable = () => {


     const { counterparties, 
                deleteCounterparty,
                updatecounterpartyToEdit } = useContext(CounterpartyContext);


    const tableHeads = ['Наименование', 'ИНН', 'Адрес', 'КПП', ''];

    function showEditModal(counterpartyId: string) {
        const bodyElement = document.querySelector('body')
        bodyElement.classList.add('overflow-hidden');

        const saveCounterpatyModalBtn = document.querySelector('#cp-creation-modal');
        saveCounterpatyModalBtn.classList.remove('hidden');
        saveCounterpatyModalBtn.classList.add('flex');
        saveCounterpatyModalBtn.setAttribute('aria-modal','true');
        saveCounterpatyModalBtn.setAttribute('role','dialog');
        saveCounterpatyModalBtn.removeAttribute('aria-hidden');

        let cpToEdit = counterparties.filter((cc) => cc.id == counterpartyId)[0];

        updatecounterpartyToEdit({...cpToEdit});

    }

    function removeCounterparty(id: string) {
        deleteCounterparty(id);
           
    }

    return (
        <table className="ms-table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="ms-table-head text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {tableHeads.map((h, i) => {
                    return  (<th scope="col" className="px-6 py-3">{h}</th>);
                    })}
                </tr>
            </thead>
            <tbody className="ms-table-body">
                 {counterparties.map((c) => {
                   return  (
                   <tr onDoubleClick={() => showEditModal(c.id)} key={c.id + c.name} id={String(c.id)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" key={c.id + c.name} className="ms-edit-row-btn px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{c.name}</th>
                        <td className="ms-edit-row-btn px-6 py-4">{c.inn}</td>
                        <td className="ms-edit-row-btn px-6 py-4">{c.address}</td>
                        <td className="ms-edit-row-btn px-6 py-4">{c.kpp}</td>
                        <DeleteRowButton onDeleteRowClick={() => removeCounterparty(c.id)} /> 
                    </tr>);
                })}

            </tbody>
        </table>
    )


};


export default CounterpartyTable;