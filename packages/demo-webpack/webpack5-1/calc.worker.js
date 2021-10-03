let num;
for (let i = 0; i <= 20000000; i++) {
  if (i === 20000000) {
    num = 20000000;
  }
}
postMessage({
  value: num,
});