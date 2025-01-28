const express = require("express")
const connectDb = require("./config/db")
const cors = require("cors");
const app = express();
const path = require("path");
const multer = require('multer');

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

// Define the absolute path to the image folder
const clientImagesPath = path.join(__dirname, "client_images");
const freelancerImagesPath = path.join(__dirname, "freelancer_images");
const portfolioImagesPath = path.join(__dirname, "service_portfolio_images");

// Serve static files from image folder
app.use("/client_images", express.static(clientImagesPath));
app.use("/freelancer_images", express.static(freelancerImagesPath));
app.use("/service_portfolio_images", express.static(portfolioImagesPath));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, portfolioImagesPath); // Save to service_portfolio_images folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename is the current timestamp with the original file extension
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.array('files'), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded');
    }

    const filePaths = req.files.map(file => `/service_portfolio_images/${file.filename}`); // Generate the URL to access the uploaded files

    res.status(200).json({
      message: 'Files uploaded successfully',
      filePaths: filePaths, // Send the URLs of the uploaded files to the frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading files');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})