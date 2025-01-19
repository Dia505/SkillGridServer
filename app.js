const express = require("express")
const connectDb = require("./config/db")
const cors = require("cors");
const app = express();
const path = require("path");

const ClientRouter = require("./route/client_route")
const FreelancerRouter = require("./route/freelancer_route")
const ReviewRouter = require("./route/review_route")
const EmploymentRouter = require("./route/employment_route")
const EducationRouter = require("./route/education_route")
const ServiceRouter = require("./route/service_route")
const FreelancerServiceRouter = require("./route/freelancer_service_route")
const PortfolioRouter = require("./route/portfolio_route")
const AppointmentRouter = require("./route/appointment_route")
const BillingAddressRouter = require("./route/billing_address_route")
const PaymentRouter = require("./route/payment_route")
const AuthRouter = require("./route/auth_route")

connectDb();

//CORS middleware applied before route defining
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  credentials: true,              // Allow cookies
}));

app.use(express.json());

app.use("/api/client", ClientRouter);
app.use("/api/freelancer", FreelancerRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/employment", EmploymentRouter);
app.use("/api/education", EducationRouter);
app.use("/api/service", ServiceRouter);
app.use("/api/freelancer-service", FreelancerServiceRouter);
app.use("/api/portfolio", PortfolioRouter);
app.use("/api/appointment", AppointmentRouter);
app.use("/api/billing-address", BillingAddressRouter);
app.use("/api/payment", PaymentRouter);

app.use("/api/auth", AuthRouter);

// Define the absolute path to the client_images folder
const clientImagesPath = path.join(__dirname, "client_images");
// Define the absolute path to the freelancer_images folder
const freelancerImagesPath = path.join(__dirname, "freelancer_images");

// Serve static files from client_images
app.use("/client_images", express.static(clientImagesPath));
// Serve static files from freelancer_images
app.use("/freelancer_images", express.static(freelancerImagesPath));

const port = 3000;
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})