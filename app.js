const express = require("express");
const app = express();
const port = 8000;
app.use(express.json()); // this is the main configration must use for create or post U HAVE To USE IT

//setup
const accounts = require("./accounts");
// // to test my sterver is working
// app.get("/", (req, res) => {
//     res.send({ name: "Abdullah Al Abbas", age: "36", Job: "KOC" });
//   }); // to test my server this only to test

//Task one GET -------------------------------------------
//In the response, send the `accounts` data, using the `json` method because we need to convert it to `json`.
app.get("/accounts", (req, res) => {
  // to call my array from accounts.js that we have crated
  res.status(200).json(accounts); // to call array .. and add status 200 for get
}); // check in postmen

//Task two creat Account  -------------------------------------------
const creatNewAccount = (newAccountData) => {
  console.log("Creating new book", newAccountData);
  const newId = accounts.length + 1; // to add the id number 4 by using length of array //Generate an `id` for our new account.
  const newAccount = Object.assign({ id: newId }, newAccountData);
  console.log("My new book is: ", newAccount);
  return newAccount;
};

app.post("/accounts", (req, res) => {
  const newAccount = creatNewAccount(req.body);
  res.status(201).json(newAccount);
});

////Task three Delete Account  -------------------------------------------

const deleteAccount = (accountIdToBeDeleted) => {
  const newModifiedAccountsList = accounts.filter(
    (account) => account.id != accountIdToBeDeleted
  );
  // console.log("My new books are: ", newModifiedAccountsList)
  return newModifiedAccountsList;
};

app.delete("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params; // have to make this
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    const updatedAcoountList = deleteAccount(accountId);
    console.log("My new books are: ", updatedAcoountList);
    res.status(200).json(updatedAcoountList); // if you put 204 it will not show in postman .,. therefor put 200 to show when calling back
  } else {
    res.status(404).json("not found");
  } //// 3. Find the account with the same `id`, if it doesn't exist, return a response with `404` status code and `not found` message.
}); // then creat a function at top

////Task four Update Account Put -------------------------------------------
const updateAccount = (currentAccount, newAccountData) => {
  const theUpdatedAccountList = Object.assign(currentAccount, newAccountData);
  return theUpdatedAccountList;
};

app.put("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params; // have to make this
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    const updatedAcoount = updateAccount(account, req.body);
    res.status(200).json(updatedAcoount);
  } else {
    res.status(404).json("not found");
  } //// 3. Find the account with the same `id`, if it doesn't exist, return a response with `404` status code and `not found` message.
}); // then creat a function at top

////Task Five Retrieve a single account by username -------------------------------------------

app.get("/accounts/:userName", (req, res) => {
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
});

////Task Five Retrieve a Query Parameters -------------------------------------------
app.get("/accounts", (req, res) => {
  const nameQuery = req.query.name.toLowerCase();
  const age = req.query.age;
  if (nameQuery) {
    res.status(200).json(`Name: ${nameQuery}, Age: ${age}`);
  } else {
    res.status(404).json();
  }
});

// THE END of MY Server Must ADD -----
app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
