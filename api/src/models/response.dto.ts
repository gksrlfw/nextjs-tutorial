
/*
    T: 타입
    K: property name
    P: something we're not giving?
*/
export type ResponseObject<K extends string, T> = {
    [P in K]: T;
}