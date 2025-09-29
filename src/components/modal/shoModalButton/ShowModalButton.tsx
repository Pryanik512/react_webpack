import { useContext } from "react";
import { CounterpartyContext } from "src/contexts/CounterpartyContext";
import { modalService } from "src/services/ModalService";

const ShowModalButton = () => {

    const { updatecounterpartyToEdit } = useContext(CounterpartyContext);

    function clickCreateCpButton() {
        modalService.showModal();

        updatecounterpartyToEdit(null);
    }


    return (
        /* <!-- Modal toggle -->*/
            <button
                data-modal-target="cp-creation-modal"
                data-modal-toggle="cp-creation-modal"
                className="ms-modal-btn block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={clickCreateCpButton}
            >
                Добавить
            </button>)
};

export default ShowModalButton;