const yahooFinance = require('yahoo-finance2').default;
const { RegisterForm } = require("../model/Register.model")
let bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const fetch = require('node-fetch')
let RegisterUser = async (req, res) => {
  let { username, email, phone, password, confirmPassword } = req.body
  if (password != confirmPassword) {
    return res.send({ status: 0, msg: "passwords don't match" })
  }
  let existingUser = await RegisterForm.findOne({ email })
  if (existingUser) {
    return res.send({ status: 0, msg: 'Email already registered, User Already Exits!' })
  }
  let PassHash = await bcrypt.hash(password, 10)
  let FormDetais = new RegisterForm({
    username,
    email,
    phone,
    password: PassHash
  })
  FormDetais.save().then(() => {
    res.send({ status: 1, msg: "insert succesfully" })
  }).catch((err) => {
    res.send({ status: 0, msg: 'Insert Unsucessfull', err })
  })
}

let Loginuser = async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = await RegisterForm.findOne({ username });
    if (!user) {
      return res.send({ status: 0, msg: "User not Found" });
    }

    let usermatch = await bcrypt.compare(password, user.password);
    if (!usermatch) {
      return res.send({ status: 0, msg: "Incorrect Password" });
    }

    let token = jwt.sign(
      { id: user._id, username: user.username, phone: user.phone, email: user.email, profileimage: user.profileimage },
      process.env.SECRETKEY,
      { expiresIn: "1h" }
    );

    res.send({
      status: 1,
      msg: "login succesfully",
      token,
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.send({ status: 0, msg: "Login Failed", err });
  }
};
let Updateprofilephoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.send({ status: 0, msg: "No file received" });
    }

    const userId = req.user.id;
    const imagePath = `/uploads/${req.file.filename}`;

    await RegisterForm.findByIdAndUpdate(userId, { profileimage: imagePath });
    const updatedUser = await RegisterForm.findById(userId);
    const token = jwt.sign({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      profileimage: updatedUser.profileimage
    }, process.env.SECRETKEY, { expiresIn: "1h" });

    res.send({ status: 1, msg: "Profile image updated", path: imagePath, token });
  } catch (err) {
    res.status(500).send({ status: 0, msg: "Upload failed", err: err.message || err });
  }
}
let Removeprofilephoto = async (req, res) => {
  try {
    const userId = req.user.id;

    await RegisterForm.findByIdAndUpdate(userId, { profileimage: "" });
    const updatedUser = await RegisterForm.findById(userId);

    const token = jwt.sign({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      profileimage: updatedUser.profileimage || ""
    }, process.env.SECRETKEY, { expiresIn: "1h" });

    res.send({ status: 1, msg: "Profile image removed", token });
  } catch (err) {
    res.status(500).send({ status: 0, msg: "Upload failed", err: err.message || err });
  }
}
let LiveStock = async (req, res) => {
  const { symbol = "TCS.NS", interval = "1h", range = "1d" } = req.query;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;

  try {
    console.log("⇢ Fetching:", url);

    const yahooRes = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const chartData = await yahooRes.json();
    if (!chartData?.chart?.result?.[0]) {
      return res.send({ status: 0, msg: "No chart data available." });
    }

    const summary = await yahooFinance.quoteSummary(symbol, {
      modules: [
        "summaryDetail",
        "financialData",
        "defaultKeyStatistics"
      ]
    })


    res.send({
      status: 1,
      data: {
        chart: chartData.chart,
        summary: summary
      }
    });

  } catch (err) {
    res.send({ status: 0, msg: "Stock data fetch failed", err });
  }
}

let Dropdown = async (req, res) => {
  const { q } = req.query;
  try {
    const DropdownResult = await yahooFinance.search(q);
    res.json({ status: 1, data: DropdownResult });
  } catch (e) {
    res.send({ status: 0, msg: "Dropdown api failed", e });
  }
}

module.exports = { RegisterUser, Loginuser, Updateprofilephoto, Removeprofilephoto, LiveStock, Dropdown }