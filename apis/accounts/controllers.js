const accounts = require("../../accounts");

// Fetch Get
exports.listAccounts = (req, res) => {
  res.status(200).json(accounts);
};

// Post
const creatNewAccount = (newAccountData) => {
  console.log("Creating new book", newAccountData);
  const newId = accounts.length + 1; // to add the id number 4 by using length of array //Generate an `id` for our new account.
  const newAccount = Object.assign({ id: newId }, newAccountData);
  console.log("My new book is: ", newAccount);
  return newAccount;
};
exports.creatAccount = (req, res) => {
  const newAccount = creatNewAccount(req.body);
  res.status(201).json(newAccount);
};

// delete
const deleteAccount = (accountIdToBeDeleted) => {
  const newModifiedAccountsList = accounts.filter(
    (account) => account.id != accountIdToBeDeleted
  );
  return newModifiedAccountsList;
};
exports.deleteAccountController = (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    const updatedAcoountList = deleteAccount(accountId);
    console.log("My new books are: ", updatedAcoountList);
    res.status(200).json(updatedAcoountList);
  } else {
    res.status(404).json("not found");
  }
};

//put
const updateAccount = (currentAccount, newAccountData) => {
  const theUpdatedAccountList = Object.assign(currentAccount, newAccountData);
  return theUpdatedAccountList;
};
exports.updateAccountController = (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    const updatedAcoount = updateAccount(account, req.body);
    res.status(200).json(updatedAcoount);
  } else {
    res.status(404).json("not found");
  }
};

//single user
exports.accountDetail = (req, res) => {
  const { userName } = req.params;
  const name = accounts.find(
    (name) => name.username.toLowerCase() === userName.toLowerCase()
  ); //to serach weather it is wirtn upper or lower case
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json(); // if we used http://localhost:8000/books/4 it will show 404 error
  }
};

//Query Parameters
exports.accountQuery = (req, res) => {
  const nameQuery = req.query.name.toLowerCase();
  const age = req.query.age;
  if (nameQuery) {
    res.status(200).json(`Name: ${nameQuery}, Age: ${age}`);
  } else {
    res.status(404).json();
  }
};
