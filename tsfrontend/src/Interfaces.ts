export interface posts{
    title:string,
    body:string,
    userId:number|null
}
//exploring generic funcnality
export interface answers<T extends string|string[]>{
    ans:T;
}