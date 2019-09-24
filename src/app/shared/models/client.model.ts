export class Client {
    id: string;
    name: string;
    lastName: string;

    constructor(values?: any) {
        Object.assign(this, values);
    }
}
