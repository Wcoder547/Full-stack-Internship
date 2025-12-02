const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;


  console.log("Received contact submission:");
  console.log({ name, email, message });

  
  res.json({
    status: "success",
    message: "Form received",
    data: { name, email, message },
  });
});


app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
