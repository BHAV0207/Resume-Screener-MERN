require("dotenv").config();

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://resume-screener-mern-1.onrender.com",
      "https://cozy-horse-11712e.netlify.app", // ✅ Add this
    ],
    credentials: true, // ✅ Allow cookies & auth headers if needed
  })
);

app.use(express.json)
app.use(express.urlencoded({ extended: true }));

