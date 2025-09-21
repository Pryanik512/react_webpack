import { CounterpartyType } from "src/type/CounterpartyType";

class CounterpartyService {

    BASE_URL = "http://localhost:3000/counterparties";



    getCounterparties(): Promise<Response> {

        return fetch(this.BASE_URL, {
            method: "GET"
        })

    }

    createCounterparty(object: CounterpartyType): Promise<Response> {

        return fetch(this.BASE_URL, {
            method: "POST",
            body: JSON.stringify(object),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    updateCounterparty(object: CounterpartyType): Promise<Response> {

        return fetch(this.BASE_URL + "/" + object.id, {
            method: "PUT",
            body: JSON.stringify(object),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    removeCounterparty(id: string): Promise<Response> {

        return fetch(this.BASE_URL + "/" + id, {
            method: "DELETE"
        })
    }

}

export const counterpartyService = new CounterpartyService();