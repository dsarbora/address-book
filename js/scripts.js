// ### Business / Back-End Logic for AddressBook -----------
function AddressBook() {
  this.contacts = [],
  this.currentId= 0
};

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id){
  for(var i = 0; i < this.contacts.length; i++){
    if (this.contacts[i]) {
      if(this.contacts[i].id == id){
        return this.contacts[i];
      }
    }
  };
  return false;
};

AddressBook.prototype.deleteContact = function(id){
  for(var i = 0; i < this.contacts.length; i++){
    if (this.contacts[i]) {
      if(this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
};

// ### Business / Back-End Logic for Contacts -----------
function Contact(firstName,lastName, phoneNumber, email, address, address2) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.address = address;
  this.address2 = address2;
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// ### User / Front-End Logic
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactsInfo = "";
  addressBook.contacts.forEach(function(contact){
    htmlForContactsInfo += "<li id = " + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>"
  });
  contactsList.html(htmlForContactsInfo);
}; 
var fields = [".first-name", ".last-name", ".phone-number", ".email", ".address", ".address2"];
function cleanFields(){
  fields.forEach(function(field){
    var fieldVal = $("span"+field).html();
    if(fieldVal == ''){
      $("p"+field).hide();
    }
  });
};

function showContact(contactID){
  var contact = addressBook.findContact(contactID);
  $("span.first-name").html(contact.firstName);
  $("span.last-name").html(contact.lastName);
  $("span.phone-number").html(contact.phoneNumber);
  $('span.email').html(contact.email);
  $('span.address').html(contact.address);
  $('span.address2').html(contact.address2);
  $("#show-contact").show();
  $("p").show();
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class = 'deleteButton' id =" + contact.id + ">Delete</button>");
};

function hideContact(contactID){
  addressBook.deleteContact(contactID);
  $("#show-contact").hide();
  displayContactDetails(addressBook);
};

function attachContactListeners(){
  $("ul#contacts").on("click", "li", function(){
    showContact(this.id);
    cleanFields();
  }); //end ul#contacts.on("click")
  $("#buttons").on("click", ".deleteButton", function(){
    hideContact(this.id)

  }); //end buttons.on("click")
}; //end function "attachContactListeners"

$(document).ready(function() {
  $("form#new-contact").submit(function(event) {
    attachContactListeners();
    event.preventDefault();
    var inputtedFirstName = $("#new-first-name").val();
    var inputtedLastName = $("#new-last-name").val();
    var inputtedPhoneNumber = $("#new-phone-number").val();
    var inputtedEmail = $("#new-email").val();
    var inputtedAddress = $("#new-address").val();
    var inputtedAddress2 = $("#new-address2").val();
    $("#new-first-name").val('');
    $("#new-last-name").val('');
    $("#new-phone-number").val('');
    $("#new-email").val('');
    $("#new-address").val('');
    $("#new-address2").val('');
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedAddress, inputtedAddress2);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });

});
