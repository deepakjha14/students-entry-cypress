export function csvToJson(data: any) {
    var lines=data.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
  
        var obj: any = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    // console.log(result)
    return result
  }