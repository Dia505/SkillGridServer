const express = require("express")
const connectDb = require("./config/db")
const app = express();
const ClientRouter = require("./route/client_route")
const FreelancerRouter = require("./route/freelancer_route")
const ReviewRouter = require("./route/review_route")
const EmploymentRouter = require("./route/employment_route")
const EducationRouter = require("./route/education_route")
const ServiceRouter = require("./route/service_route")
const FreelancerServiceRouter = require("./route/freelancer_service_route")
const PortfolioRouter = require("./route/portfolio_route")

connectDb();

app.use(express.json());

app.use("/api/client", ClientRouter);
app.use("/api/freelancer", FreelancerRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/employment", EmploymentRouter);
app.use("/api/education", EducationRouter);
app.use("/api/service", ServiceRouter);
app.use("/api/freelancer_service", FreelancerServiceRouter);
app.use("/api/portfolio", PortfolioRouter)

const port = 3000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})