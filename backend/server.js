const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Setup CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Extract numbers, alphabets, and highest lowercase letter from data
function processData(data) {
  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[A-Za-z]$/.test(item)) {
      alphabets.push(item);
      if (
        /[a-z]/.test(item) &&
        (!highestLowercase || item > highestLowercase)
      ) {
        highestLowercase = item;
      }
    }
  });

  return { numbers, alphabets, highestLowercase };
}

// Handle POST request to process data
app.post("/bfhl", (req, res) => {
  console.log("POST request received");

  const { data } = req.body;

  if (!Array.isArray(data)) {
    console.log("Invalid input");
    return res.status(400).json({
      is_success: false,
      message: "Invalid input, expected an array.",
    });
  }

  const { numbers, alphabets, highestLowercase } = processData(data);

  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
  };

  console.log("Response:", response);
  res.json(response);
});

// Handle GET request with hardcoded operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
