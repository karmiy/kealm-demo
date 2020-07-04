export function sum(...args: number[]) {
    return args.reduce((prev, cur) => prev + cur);
}