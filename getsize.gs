function getSize(blob) {
  var docfile = DocumentApp.create("tempfiletogetimage").getId();
  var body = DocumentApp.openById(docfile).getBody();
  var paragraph = body.appendParagraph("");
  var img = paragraph.addPositionedImage(blob).setTopOffset(0).setLeftOffset(0);
  var fileid = DriveApp.getFileById(docfile);
  fileid.setTrashed(true);
  return { width: img.getWidth(), height: img.getHeight() };
}