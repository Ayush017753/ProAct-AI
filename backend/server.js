require("dotenv").config();

const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "Online",
        message: "ProAct AI Backend Running"
    });
});

app.use("/api", aiRoutes);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

server.on("error", (err) => {
    console.error("Server Error:", err);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
});