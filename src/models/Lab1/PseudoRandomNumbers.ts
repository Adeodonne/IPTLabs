export default interface PseudoRandomNumbers {
    m: number,
    a: number,
    c: number,
    x0: number,
    n: number,
    x?: number[],
    period?: number,
    date? : Date,
}