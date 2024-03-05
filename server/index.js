const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const bodyParser = require('body-parser');
const Instruments = require('./models/intruments');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt

const dburl =
  'mongodb+srv://daraseyi086:daraseyi086@customer.ovxpbot.mongodb.net/?retryWrites=true&w=majority';
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  dburl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log('connected')
);

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());

  const targetURL = 'https://github.com/Afayomide/adotadvisor/tree/main/server';

app.get('/', (req, res) => {
  res.redirect(targetURL);

});
app.get("/api/search", (req,res) =>{
  res.redirect(targetURL);
})
app.get("/api", (req,res) =>{
  // res.send("active server, created by Afayomide Oluwaseyi. Go to <a href='/https://github.com/Afayomide/adotadvisor/tree/main/server'>Github</a> to see code")
  res.redirect(targetURL);
})

const secretKey = '9ffbceda69ff903370209d5029c4416b4890df44f9c19962430765595735a57d';
const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ authenticated: false, message: 'No token provided' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ authenticated: false, message: 'Invalid token' });
  }
};

function generateToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username },
    secretKey,
    { expiresIn: '1h' }
  );
}

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    req.app.set("name", username) 
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.cookie('token', token, { httpOnly: true });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/instruments', async (req, res) => {
  try {
    const instruments = await Instruments.find();
    res.json(instruments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { fullname, username, email, password } = req.body;

  if (!username || !password || !fullname || !email) {
    res.json({ success: false, message: 'All Fields are required' });
  }

  try {
    // Hash the password before saving it
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.json({ success: true });
  } 
  catch (error) {
    console.error('Error:', error.message);
    res.json({ success: false, message: 'Internal server error' });
  }
});

// ... Rest of your code



app.get('/api/user', (req, res) => {
  let name = res.app.get("name")
  res.json({ success: true, message: 'User route is protected', name});
});

app.post('/api/search', async (req, res) => {
  const { level } = req.body;

  try {
    // Query MongoDB based on user input
    const result = await Instruments.find({ RiskScore: level });

    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

app.get('/api/protected', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user});
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
