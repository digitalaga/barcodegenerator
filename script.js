$("[name=tab]").each(function (i, d) {
  var p = $(this).prop("checked");
  if (p) {
    $("article").eq(i).addClass("on");
  }
});

$("[name=tab]").on("change", function () {
  var p = $(this).prop("checked");
  var i = $("[name=tab]").index(this);
  $("article").removeClass("on");
  $("article").eq(i).addClass("on");
});

var newBarcode = function (select_val) {
  let code_val = $("#" + select_val).val();
  let canvas = bwipjs.toCanvas("barcode", {
    bcid: select_val, // Barcode type
    text: code_val, // Text to encode
    scale: 3, // 3x scaling factor
    height: 10, // Bar height, in millimeters
    includetext: true, // Show human-readable text
    textxalign: "center"
  });
};

$(document).ready(function () {
  let select_val = $("input[type=radio]:checked").val();
  newBarcode(select_val);
});
$("input").on("change keyup", function () {
  let select_val = $("input[type=radio]:checked").val();
  newBarcode(select_val);
});
$(".barcode-png-download").on("click", function () {
  var canvas = document.getElementById("barcode");
  download(canvas, "barcode.png");
});
$(".barcode-svg-download").on("click", function () {
  htmlToImage
    .toSvg(document.getElementById("barcode"), {})
    .then(function (dataUrl) {
      let svg = decodeURIComponent(dataUrl.split(",")[1]);
      const base64doc = btoa(unescape(encodeURIComponent(svg)));
      const a = document.createElement("a");
      const e = new MouseEvent("click");
      a.download = "barcode.svg";
      a.href = "data:image/svg+xml;base64," + base64doc;
      a.dispatchEvent(e);
    });
});

function download(canvas, filename) {
  var canvas = document.getElementById("barcode");
  var lnk = document.createElement("a"),
    e;

  lnk.download = filename;

  lnk.href = canvas.toDataURL("image/png;base64");

  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false,
                false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}