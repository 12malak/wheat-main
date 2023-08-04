// 1- calling the model
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const SECRETKEY = process.env.SECRETKEY;


const allUsers = (req, res) => {
  User.find({ role: 0 })
    .then((data) => {
     
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};


const newUserContactUs =  async (req, res) => {
  const userId  = req.params.id;
  const updatedUserData = req.body;
  const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  const updatedUser = await user.save();
  res.json(updatedUser);

};



const allProviders = (req, res) => {
  User.find({ role: 2 })
    .then((data) => {
     
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const allAdmins = (req, res) => {
  User.find({ role: 1 })
    .then((data) => {
     
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};


const newUser = async (req, res) => {
  const { firstName, email, password, role } = req.body;

  const user0 = await User.find({ email: email });
  if (user0.length == 0) {
    const hashPassword = await bcrypt.hash(password, 5);
    const user = new User({
      firstName: firstName,
      email: email,
      password: hashPassword,
      role: role,
    });
    const addUser = await user.save();
    console.log(addUser)
    const token = jwt.sign(
      { id: addUser._id, username: addUser.firstName, role: addUser.role },
      SECRETKEY,
      { expiresIn: "1h" }
    );

    res.json({ token, addUser });
  } else {
    // handle error
  }
};
const logout = (req, res) => {
  console.log("wesl");
  //window.location.href = 'http://localhost:3001/';
//  console.log( localStorage.getItem(auth)+"dddddd");
   localStorage.clear();

  console.log("wesl2");

  
};
// window.parent.postMessage('clearLocalStorage', '*');
// Update sign status and remove auth and roles from local storage
//localStorage.setItem('SignStatus', 'signUp');
// localStorage.removeItem('auth');
//localStorage.removeItem('roles');
// localStorage.removeItem("userid");
// localStorage.removeItem("curruntUser");
// Navigate to the home page and reload the site after logging out

//console.log( localStorage.removeItem("auth"));
const newUserLogin =  async (req , res) => {
  
  const {email , password } = req.body;
  const user = await User.find({ email: email });
  if(user.length != 0){
    // password check
    const validpassword = await bcrypt.compare(
      password,
      user[0].password
    );
    if (!validpassword) {
      return res.json({ error: "incorrect password" });
    }
if(validpassword){

  const token = jwt.sign({ id: user[0]._id, username: user[0].firstName ,role : user[0].role }, SECRETKEY, { expiresIn: '1h' });
const user0=user[0]
  res.json({ token ,user0});
}

}
};
const deleteUser = async (req, res) => {
  const userId = req.params.id;
   await User.findByIdAndDelete(userId);
   res.status(204).json(User);
};


const oneUser =  async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
 
  res.json(user);
};

 
const updateUser = async (req, res) => {
    const userId  = req.params.id;
    const updatedUserData = req.body;
    // updatedUserData.password= await bcrypt.hash(updatedUserData.password, 5)
    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    const updatedUser = await user.save();
    res.json(updatedUser);
};



// Protected route
const protected = async  (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, SECRETKEY, (err, decoded) => {
    if (err) {
      console.log("token error:", err); // Log the error object for debugging
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }
    console.log("token Authenticated");
    res.json({ message: 'Authenticated', user: decoded });
  });
};


module.exports = {
  allUsers,
  newUserContactUs,
  newUser,
  oneUser,
  updateUser,
  deleteUser,
  newUserLogin,
  protected,
  allProviders,
  allAdmins,
  logout
  
}; 
