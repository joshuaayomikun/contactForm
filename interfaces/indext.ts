export interface IContact {
    id?: number,
    fullName: string,
    emailAddress: string, 
    mobile: string,
    city:string,
    submit: boolean,
    presentAction?:number,
    isDeleted?: boolean
}
export interface IObjectFill {
    field: string,
    value:any,
    presentAction?: number
}
export interface IAction {
    type: any,
    payload: IContact
}