var Guest = function(name, email, primary){
  this.username = name;
  this.email = email;
  this.items = [];
  this.transaction_id = primary;
}

Guest.prototype.addItem = function(item){
  this.items.push(item)
}
