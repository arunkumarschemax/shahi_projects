export enum CustomerOrderStatusEnum {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    CLOSED = 'CLOSED',
    CONFIRMED = 'CONFIRMED',
    COMPLETED = 'COMPLETED'

}

export const CustomerOrderStatusEnumDisplay = [
    { name: "OPEN", displayVal:'OPEN'},
    { name:'IN_PROGRESS', displayVal:'IN PROGRESS'},
    { name:'CLOSED', displayVal:'CLOSED'},
    { name:'CONFIRMED', displayVal:'CONFIRMED'},
    { name:'COMPLETED', displayVal:'COMPLETED'},
]