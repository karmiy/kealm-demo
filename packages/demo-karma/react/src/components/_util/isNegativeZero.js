const isNegativeZero = (number) => {
  return number === 0 && (1 / number) === -Infinity;
}
export default isNegativeZero;