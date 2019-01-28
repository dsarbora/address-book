// ### Business / Back-End Logic for AddressBook -----------
function AddressBook() {
  this.contacts = []
  this.currentId= 0
};

AddressBook.prototype.addContact = function(contact) {
  this.contacts.push(contact);
}


// ### Business / Back-End Logic for Contacts -----------
function Contact(firstName,lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// ### User / Front-End Logic
$(document).ready(function() {

});
