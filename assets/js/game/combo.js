function combo(){
  this.comboSteps = [null, null, null];

  this.getComboSteps = function(){
    return this.comboSteps;
  }

  this.setComboSteps = function(keyPressed){
    for(var i = 0; i < size; i++){
      if(comboSteps[i] == null){
        comboSteps[i] = keyPressed;

        if(i = (comboSteps.length - 1)){
          //find out what combo it is and return it
        }else{
          //return
        }

      }else{
        //combo step i not null so go on to the next one
        continue
      }
    }
  };
}
