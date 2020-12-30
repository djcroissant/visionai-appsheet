function getFileByName(fileName, fileInFolder){
  
  var filecount = 0;
  var dupFileArray = [];
  var folderID = "";
  
  var files = DriveApp.getFilesByName(fileName);
  
  while(files.hasNext()){
    var file = files.next();
    dupFileArray.push(file.getId());
    
    filecount++;
  };
  
  if(filecount > 1){
    if(typeof fileInFolder === 'undefined'){
      folderID = {"id":false,"error":"More than one file with name: "+fileName+". \nTry adding the file's folder name as a reference in Argument 2 of this function."}
      
    }else{
      //iterate through list of files with the same name
      for(fl = 0; fl < dupFileArray.length; fl++){
        var activeFile = DriveApp.getFileById(dupFileArray[fl]);
        var folders = activeFile.getParents();
        var folder = ""
        var foldercount = 0;
        
        //Get the folder name for each file
        while(folders.hasNext()){
          folder = folders.next().getName(); 
          foldercount++;
        };
        
        if(folder === fileInFolder && foldercount > 1){
          folderID = {"id":false,"error":"There is more than one parent folder: "+fileInFolder+" for file "+fileName}
        };
        
        if(folder === fileInFolder){
          folderID = {"id":dupFileArray[fl],"error":false};
          
        }else{
          folderID = {"id":false,"error":"There are multiple files named: "+fileName+". \nBut none of them are in folder, "+fileInFolder}
        };
      };
    };
    
  }else if(filecount === 0){
    folderID = {"id":false,"error":"No file in your drive exists with name: "+fileName};
    
  }else{ //IF there is only 1 file with fileName
    folderID = {"id":dupFileArray[0],"error":false};
  };
  
  return folderID;
}