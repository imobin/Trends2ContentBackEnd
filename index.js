const express = require("express");
const posts = require("./models/post");
const sequelize = require("./db/db");
const users = require("./models/user");
const category = require("./models/category");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const verifyToken = require("./midleware/verification");
const AIblog = require("./AIblog")
dotenv.config();
// console.log(process.env.JWT_SECRET);
const app = express();
app.use(express.json());



users.hasMany(posts, { foreignKey: "UserId", onDelete: "CASCADE" });
posts.belongsTo(users, { foreignKey: "UserId" });


category.hasMany(posts, { foreignKey: "CategoryId", onDelete: "CASCADE" });
posts.belongsTo(category, { foreignKey: "CategoryId" });




app.get("/home", async (req, res) => {
    try {
    const allPost = await posts.findAll()
    res.send(allPost);
  } catch (error) {
    res.json("there was an error:", error.message);
  }
})


app.get("/home/:id", async (req, res) => {
  try {
    const reqId = Number(req.params.id);
    const thePost = await posts.findAll({ where: { id: reqId } })
    res.send(thePost);
  } catch (error) {
    res.json("there was an error 12:", error.message);
  }
});


app.post("/creatPost", verifyToken, async (req, res) => {
     const { title, content, UserId, CategoryId } = req.body;
    const input = req.body
  newPost = req.body;
  try {
    await posts.create({
      title: title,
      content: content,
      UserId: UserId,
      CategoryId: CategoryId,
    });
    res.json("New post created!");
  } catch (error) {
    console.log(error)
    res.json("there was an error form here:", error);
  }
});


app.post("/generatePost", async (req, res) => {
     const { keywords } = req.body;
    // CategoryId  
  try {
    const AIresult = await AIblog(keywords)
    res.json(AIresult);
  } catch (error) {
    console.log(error)
    res.json("there was an error form here:", error);
  }
});



app.put("/creatPost/:id", verifyToken, (req, res) => {
  // const reqId = Number(req.params.id);
  // const { title, content, UserId  } = req.body;
  // res.send(req.body)
  // try {
  //   const updated = posts.update(
  //     { title, content, UserId, CategoryId },
  //     { where: { id: reqId } }
  //   );
  //   res.send("Post Updated");
  // } catch (error) {
  //   res.json("there was an error:", error.message);
  // }
});


app.delete("/creatPost/:id", verifyToken, async (req, res) => {
  try {
    const reqId = Number(req.params.id);
    await posts.destroy({
      where: { id: reqId },
    });
    res.send("Post deleted");
  } catch (error) {
    res.json("there was an error:", error.message);
  }
})


app.get("/users", async (req, res) => {
    try {
    const allUser = await users.findAll()
    res.send(allUser);
  } catch (error) {
    res.send({"there was two error:": error});
  }
})


app.get("/users/:id", async (req, res) => {
    
   try {
    const reqId = Number(req.params.id);
    const theUser = await users.findAll({ where: { id: reqId } })
    res.send(theUser);
  } catch (error) {
    res.json("there was an error 13:", error.message);
  }
})


app.post("/users", async (req, res) => {
  const { name, username, password } = req.body;
  //   const input = req.body
//   newPost = req.body;
  try {
    await users.create({
      name: name,
      username: username,
      password: password,
    });
    res.json("New User created!");
  } catch (error) {
    res.json("there was an error:", error.message);
  }
})


app.put("/users/:id", async (req, res) => {
  const reqId = Number(req.params.id);
  const { name, username, password  } = req.body;
  try {
    const updated = await users.update(
      { name, username, password },
      { where: { id: reqId } }
    );
    res.send("User Information Updated");
  } catch (error) {
    res.json("there was an error:", error.message);
  }
});


app.delete("/users/:id", async (req, res) => {
  try {
    const reqId = Number(req.params.id);
    await users.destroy({
      where: { id: reqId },
    });
    res.send(reqId);
  } catch (error) {
    res.json("there was an error2:", error.message);
  }
})

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const queriedUserArray = await users.findAll({ where: { username: username } });
      const queriedUser = queriedUserArray[0]
      if (
        queriedUser &&
        queriedUser.username == username &&
        queriedUser.password == password
      ) {
        const payload = { username: username, password: password };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: "1h" }; // Token expires in 1 hour

        const token = jwt.sign(payload, secret, options);
        res.send(token)
      } else {
        resres.status(401).send("username or password is wrong!");
      }
    } else {
      res.send("Please fill out the required fields");
    }
  } catch (err) {
    // console.error(err);
    res.status(401).send("Something went wrong from login:", err);
  }
});


app.get("/categoryList", async (req, res) => {
    try {
       const allCategory = await category.findAll() 
       res.send(allCategory)
    } catch (error) {
        res.json("there was an error2:", error.message);
    }
})



app.get("/categoryList/:id", async (req, res) => {
    try {
       const reqId = Number(req.params.id)
       const allCategory = await category.findAll({
        where: {id : reqId },
       }) 
       res.send(allCategory)
    } catch (error) {
        res.json("there was an error2:", error.message);
    }
})



app.post("/creatCategory", async (req, res) => {
    try {
        const { name } = req.body
        await category.create({
            name: name,
        })
        res.send("category Created")
    } catch (error) {
        res.json("there was an error2:", error.message);
    }
})


app.put("/categoryList/:id", async (req, res) => {
    try {
       const reqId = Number(req.params.id)
       const { name } = req.body
       await category.update(
        { name : name},
        {where: {id : reqId },}) 
       res.send("Category Updated!")
    } catch (error) {
        res.json("there was an error2:", error.message);
    }
})


app.delete("/categoryList/:id", async (req, res) => {
    try {
       const reqId = Number(req.params.id)
       const allCategory = await category.destroy({
        where: {id : reqId },
       }) 
       res.send("Category Deleted!")
    } catch (error) {
        res.json("there was an error2:", error.message);
    }
})


sequelize.sync();


app.listen(3000, () => console.log("running on 3000"));





