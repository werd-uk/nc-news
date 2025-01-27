const app = require("./app");

app.listen(3000, (err) => {
    if (err) console.log("Error in starting listener");
    console.log("listening on port 3000");
});
