const DomComputedStyle = dom => {
  return getComputedStyle ? getComputedStyle(dom) : dom.currentStyle;
}
export default DomComputedStyle