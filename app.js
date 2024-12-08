const express = require("express");
const accountsRouter = require("./apis/accounts/routes");
const app = express();
const port = 8000;
const path = require("path"); // from notion express to uplode image class to upload image form server
const connectDb = require('./database'); // to call from data base .js
 // this is the main configration must use for create or post U HAVE To USE IT

//setup

app.use(express.json());
app.use('/media', 
  express.static(path.join(__dirname, 'media')) // this will give you your path exatly to ur media file
); // from notion express to uplode image class to upload image form server
app.use("/accounts", accountsRouter)

connectDb();
// THE END of MY Server Must ADD -----
app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
