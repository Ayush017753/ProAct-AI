require("dotenv").config();

const express = require("express");

const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        status: "Online",
        message: "ProAct AI Backend Running"
    });

});

app.use("/api", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});