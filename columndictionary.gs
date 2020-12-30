// the column names - in any order - that we expect from the Google Sheet

var requiredColumns = [
  'Key',
  'createdby',
  'Status',
  'Name',	
  'Description',	
  'Image',	
  'Dictionary',	
  'AINoun',
  'Width',
  'Height'  
  ];

var columnMap = {};

function getColumnNumberByName(sheet, name) {

  var range = sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var values = range.getValues();
  for (var row in values) {
    for (var col in values[row]) {
      if (values[row][col] == name) {
        columnMap[name] = parseInt(col)+1;
      }
    }
  }
}