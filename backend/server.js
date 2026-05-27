import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const submissions = [];

app.get("/", (req, res) => {
  res.json({ message: "She Can Foundation backend is running" });
});

app.post("/api/submit", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  submissions.push({
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });

  return res.status(200).json({
    success: true,
    message: "Form Submitted Successfully",
  });
});

app.get("/api/submissions", (req, res) => {
  res.json({ success: true, data: submissions });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});