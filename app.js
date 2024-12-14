const express = require("express")
const connectDb = require("./config/db")
const app = express();
const ClientRouter = require("./route/client_route")
const FreelancerRouter = require("./route/freelancer_route")
const ReviewRouter = require("./route/review_route")

connectDb();

app.use(express.json());

app.use("/api/client", ClientRouter);
app.use("/api/freelancer", FreelancerRouter);
app.use("/api/review", ReviewRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})