const express = require("express");
const { listAccounts } = require("./controllers");
const { creatAccount } = require("./controllers");
const { deleteAccountController } = require("./controllers");
const { updateAccountController } = require("./controllers");
const { accountDetail } = require("./controllers");
const { accountQuery } = require("./controllers");

const router = express.Router();

const accounts = require("../../accounts");

// Fetch Get
router.get('/', listAccounts);

// Post
router.post('/', creatAccount);

// delete
router.delete('/:accountId', deleteAccountController);

//put
router.put('/:accountId', updateAccountController);

//single user
router.get('/:userName', accountDetail);

//Query Parameters
router.get('/', accountQuery);

module.exports = router;
