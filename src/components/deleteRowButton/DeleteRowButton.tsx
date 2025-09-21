const DeleteRowButton = ({ onDeleteRowClick } : any) => {


     return (
            <td className="px-6 py-4">
                <a href="#" 
                   className="ms-delete-row-btn font-medium text-red-600 dark:text-red-500 hover:underline" 
                   onClick={onDeleteRowClick}>
                    Удалить
                </a>
            </td>);
}


export default DeleteRowButton;