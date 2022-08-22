const app = require("./app");
const baseurl = process.env.BASE_URL;
const port = process.env.PORT || 3000;

const logger = () => {
  if(!baseurl)
    console.log(`server started and listen to the port ${port}`);
  else
    console.log(`server started and listen to ${baseurl}`)
}

app.listen(port, logger);
