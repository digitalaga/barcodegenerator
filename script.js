function render(e) {
  var value = (typeof e !== 'string') ? e.target.value : e;
  JsBarcode("#barcode", value, {format: 'CODE128'});
}

document.getElementById("input").addEventListener("input", render, false);

render("IDEO");
