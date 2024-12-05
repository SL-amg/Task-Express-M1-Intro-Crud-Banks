const express = require("express");
const accountsRouter = require("./apis/accounts/routes");
const app = express();
const port = 8000;
const connectDb = require('./database'); // to call from data base .js
 // this is the main configration must use for create or post U HAVE To USE IT

//setup

app.use(express.json());
app.use("/accounts", accountsRouter)

connectDb();
// THE END of MY Server Must ADD -----
app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
