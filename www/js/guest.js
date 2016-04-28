var Guest = function(name, email, billId){
  this.username = name;
  this.email = email;
  this.items = [];
  this.primary_customer = null;
  this.id = billId
}

Guest.prototype.addItem = function(item){
  this.items.push(item)
}

Guest.prototype.findPrimaryId = function(){
  console.log(this.id);
  $.ajax({
    data: this.id,
    url: 'http://slice-it-app.herokuapp.com/bills/' + this.id + ".json",
    method: "GET",
    dataType: "json"
  }).done(function(response){
    console.log("I GOT HERE SECOND:  " + response.primary_customer);
    this.primary_customer = response.primary_customer
  });
}
