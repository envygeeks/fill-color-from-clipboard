var isHex = function(color) {
  var regex = /^#?[a-f\d]{6}$/i;
  if (color == null || color == "") return false;
  return regex.exec(color) !== null;
};

var toRGB = function(color) {

  var result = /^#?([a-f\d]{2})+([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  result ? rgb = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
  } : null;

  if (result) {
    // Create new color Object.
    return MSColor.colorWithRed_green_blue_alpha(rgb.r/255,
      rgb.g/255, rgb.b/255, 1);
  }
};

var fillColorFromClipboard = function(context) {
  var selectedLayers = context.selection;
  if (selectedLayers.count() > 0) {
    var ptype = NSPasteboardTypeString;
    var paste = NSPasteboard.generalPasteboard();
    var color = paste.stringForType(ptype);
    var match = null;

    if (isHex(color)) {
      rColor = toRGB(color);
      selectedLayers.forEach((layer) => {
        var fill = layer.style().fills().firstObject();
        fill.setFillType(0);
        fill.color = rColor;
      })
    }
  }
};
