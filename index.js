const express = require("express");
const posts = require("./models/post");
const sequelize = require("./db/db");
const users = require("./models/user");
const category = require("./models/category");


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


app.post("/creatPost", async (req, res) => {
     const { title, content, UserId, CategoryId } = req.body;
  //   const input = req.body
//   newPost = req.body;
  try {
    await posts.create({
      title: title,
      content: content,
      UserId: UserId,
      CategoryId: CategoryId,
    });
    res.json("New post created!");
  } catch (error) {
    res.json("there was an error:", error.message);
  }
});


app.put("/creatPost/:id", async (req, res) => {
  const reqId = Number(req.params.id);
  const { title, content, UserId  } = req.body;
  try {
    const updated = await posts.update(
      { title, content, UserId, CategoryId },
      { where: { id: reqId } }
    );
    res.send("Post Updated");
  } catch (error) {
    res.json("there was an error:", error.message);
  }
});


app.delete("/creatPost/:id", async (req, res) => {
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





