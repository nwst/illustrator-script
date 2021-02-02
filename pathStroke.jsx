/*
adobe Illustrator CS6 script
Version: 1.0.1
Copyright(c) Tomohiko Namu
https://namu-ws.com
*/

var selectObj = activeDocument.selection;
var arr = [];

// get value of objects positions
for(var i=0; i<selectObj.length; i++){
    arr.push([])
    if (selectObj[i].typename == "PathItem"){
        for(var j=0; j<selectObj[i].pathPoints.length; j++){
            var x = selectObj[i].pathPoints[j].anchor[0];
            var y = selectObj[i].pathPoints[j].anchor[1];
            
            arr[i].push([x,y])//array
        }
    }
}


// transpose array
function transpose (arg){
    var transposeArr = []
    for(var i=0; i<arg[0].length; i++){
        transposeArr.push([])
    }
    for(var j=0; j<transposeArr.length; j++){
        for(var k=0; k<arg.length; k++){
            transposeArr[j].push(arg[k][j])
        }
    }
    return transposeArr
}

// stroke
function stroke(arg){
    var shape = activeDocument.pathItems.add();
    shape.setEntirePath(arg);
    shape.stroked = true;
    shape.closed = false;
    shape.filled = false;
    shape.strokeWidth = 1;
}

// check number of path and stroke
function checkAndStroke(arg){
    // get number of objects paths
    var checkArr = []
    for(var i=0; i<arg.length; i++){
        checkArr.push(arg[i].length)
    }

    try{
        // comparison number of first object paths and number of other objects paths
        for(var j=0; j<checkArr.length; j++){
            if(checkArr[0] !== checkArr[j]){
                throw new Error('Defelent number of objects paths')
            }
        }

        // add new layer for stroke
        activeDocument.layers.add().name = "pathStroke";

        // stroke
        for(var m=0; m<transpose(arg).length; m++){
            stroke(transpose(arg)[m])
        }
    }catch(e) {
        alert(e)
    }

}

checkAndStroke(arr)









