const newarraydata = data;
const fatarrayvalues = [];
const snfarrayvalues = [];
const floats = [];
const rates = [];
var ratenew = fixedrate;
var basefat = fatvalue;
var basesnf = snfvalue;

var fatRangeFrom = 2;
var fatRangeTo =   9;
var snfRangeFrom = 6;
var snfRangeTo = 10;

var assignRate = 0;
var fatAssignRate = 0;





for(var i = 0; i<newarraydata.length; i++){
    var getfield = newarraydata[i].ratechartmatrixvalue;
    const rangefr = newarraydata[i].matrixfatrangefrom;
    const rangeto = newarraydata[i].matrixfatrangeto;
    var incedecvalue = newarraydata[i].increvalue;
    const c1 = newarraydata[i].condition;


     if(getfield=="fat")
     {
       if(incedecvalue=="Inc"){
         fatAssignRate = Number(ratenew);

         for(var j = Number(rangefr); j<=Number(rangeto); j+=0.1){
             fatarrayvalues.push(j);
             snfarrayvalues.push(basesnf);
             rates.push(fatAssignRate);
             fatAssignRate = (Number(fatAssignRate) + Number(c1)).toFixed(2);

             var assignRate;
             assignRate = fatAssignRate;
            for(var x = 0; x<newarraydata.length; x++){
              var getfield = newarraydata[x].ratechartmatrixvalue;
              const rangefr = newarraydata[x].matrixfatrangefrom;
              const rangeto = newarraydata[x].matrixfatrangeto;
              var incedecvalue = newarraydata[x].increvalue;
              const c1 = newarraydata[x].condition;


                if(getfield=="snf"){
                  var isInArray = newarraydata.includes(basesnf);
                  if(isInArray)
                  assignRate = fatAssignRate;
                  console.log(isInArray); // true
                  if(incedecvalue=="Inc"){
                      assignRate = Number(ratenew);
                    for(var y = Number(rangefr); y<=Number(rangeto); y+=0.1){
                        fatarrayvalues.push(j);
                        snfarrayvalues.push(y.toFixed(2));
                        rates.push(assignRate);
                        assignRate = (Number(assignRate) + Number(c1)).toFixed(2);
                    }
                  }
                   else if (incedecvalue=="Dec") {
                     assignRate = ratenew;
                     console.log("last rate",assignRate);
                     for(var y = Number(rangefr); y>=Number(rangeto); y-=0.1){

                         fatarrayvalues.push(j);
                         snfarrayvalues.push(y.toFixed(2));
                         rates.push(assignRate);
                         assignRate = (Number(assignRate) - Number(c1)).toFixed(2);

                     }
                   }

                }

            }
         }
       }
       else if(incedecvalue=="Dec") {
        if(Number(rangefr)==Number(basefat)){
           fatAssignRate = ratenew;
        }

         for(var j = Number(rangefr); j>=Number(rangeto); j-=0.1){
             fatarrayvalues.push(j);
             snfarrayvalues.push(basesnf);
             rates.push(fatAssignRate);
             fatAssignRate = (Number(fatAssignRate) - Number(c1)).toFixed(2);

             assignRate = fatAssignRate;
           for(var x = 0; x<newarraydata.length; x++){
             var getfield = newarraydata[x].ratechartmatrixvalue;
             const rangefr = newarraydata[x].matrixfatrangefrom;
             const rangeto = newarraydata[x].matrixfatrangeto;
             var incedecvalue = newarraydata[x].increvalue;
             const c1 = newarraydata[x].condition;


               if(getfield=="snf"){
                 if(incedecvalue=="Inc"){
                   assignRate = ratenew;
                   for(var y = Number(rangefr); y<=Number(rangeto); y+=0.1){

                       fatarrayvalues.push(j);
                       snfarrayvalues.push(y.toFixed(2));
                       rates.push(assignRate);
                      assignRate = (Number(assignRate) + Number(c1)).toFixed(2);

                   }
                 }
                  else if (incedecvalue=="Dec") {
                    assignRate = ratenew;
                    console.log("end rate",assignRate);
                    for(var y = Number(rangefr); y>=Number(rangeto); y-=0.1){
                        fatarrayvalues.push(j);
                        snfarrayvalues.push(y.toFixed(2));
                        rates.push(assignRate);
                        assignRate = (Number(assignRate) - Number(c1)).toFixed(2);
                    }
                  }

               }

           }

         }

       }
     }

}
