import { CounterpartyType } from "./CounterpartyType"


export type CounterPartyEditModalPropType = {

    cpToEdit: CounterpartyType,
    lastCpIndex: number,
    onClickSaveButton: (cp: CounterpartyType, isEdit: boolean) => void
}