const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Function to process the input data
function processData(data) {
  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;

  // Separate numbers and alphabets, find the highest lowercase alphabet
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

// POST endpoint to process data
app.post("/bfhl", (req, res) => {
  const { data, user_name, email, roll_number } = req.body;

  // Validate data format
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input, expected an array of data.",
    });
  }

  // Validate user details
  if (!user_name || !email || !roll_number) {
    return res.status(400).json({
      is_success: false,
      message: "Missing user details: name, email, or roll number.",
    });
  }

  const { numbers, alphabets, highestLowercase } = processData(data);

  // Response object
  const response = {
    is_success: true,
    user_id: `${user_name.toLowerCase().replace(/\s+/g, "_")}_17091999`, // Custom user ID
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
  };

  res.json(response);
});

// GET endpoint for the operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// No need to explicitly call `app.listen()` for Vercel, it will handle it automatically
