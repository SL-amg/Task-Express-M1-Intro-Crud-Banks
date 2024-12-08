const express = require("express");
const { listAccounts } = require("./controllers");
const { creatAccount } = require("./controllers");
const { deleteAccountController } = require("./controllers");
const { updateAccountController } = require("./controllers");
const { accountDetail } = require("./controllers");
const { accountQuery } = require("./controllers");
const multer = require('multer'); // add this from lesson
const router = express.Router();

const accounts = require("../../accounts");


const storage = multer.diskStorage({
    destination: './media',
    filename: (req, file, cb) => {
        cb(null, `${+new Date()}${file.originalname}`);
      },
  }); // add this from lesson upload image  multer

  const upload = multer({
    storage,
  }); // add this from lesson upload image  multer

// Fetch Get
router.get('/', listAccounts);

// Post
router.post('/', upload.single('image'), creatAccount); // the new updated function for image

// delete
router.delete('/:accountId', deleteAccountController);

//put
router.put('/:accountId', upload.single('image'), updateAccountController);// the new updated function for image

//single user
router.get('/:userName', accountDetail);

//Query Parameters
router.get('/', accountQuery);

// User Create
// router.post('/', upload.single('image'), userCreate); this is from Notion, we can use it in the function above

// User Update
// router.put('/:postId', upload.single('image'), userUpdate); this is from Notion, we can use it in the function above

module.exports = router;
