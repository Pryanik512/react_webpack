import { CounterpartyType } from "src/type/CounterpartyType";

export type CounterpartyTableProps = {

    cpList: CounterpartyType[];
    onClickDeleteRowButton: (id: number) => void;
    onClickEditRow: (id: number) => void;

};