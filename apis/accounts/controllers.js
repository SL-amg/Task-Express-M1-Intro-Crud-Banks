const accounts = require("../../accounts");
const Account = require("../../models/Account");

// Fetch Get
exports.listAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

// Post
const creatNewAccount = async (newAccountData) => {
  console.log("Creating new book", newAccountData);
  const newAccount = await Account.create(newAccountData);
  return newAccount;
};
exports.creatAccount = (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const newAccount = creatNewAccount(req.body);
    res.status(201).json(newAccount);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
//in postmen {
//     "username": "Abdullah",
//     "funds": 300
// }

// delete

exports.deleteAccountController = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.deleteOne()
      res.status(204).json();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
// check the lesson
// in postman put only http://localhost:8000/accounts/6751e35d8a6cbab84ecc35c5 and the id is taken from mongo

//put

exports.updateAccountController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.updateOne(req.body)
      res.status(200).json();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }

  // const { accountId } = req.params;
  // const account = accounts.find((account) => account.id == accountId);
  // if (account) {
  //   const updatedAcoount = updateAccount(account, req.body);
  //   res.status(200).json(updatedAcoount);
  // } else {
  //   res.status(404).json("not found");
  // }
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
