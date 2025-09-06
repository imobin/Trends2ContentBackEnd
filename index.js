const express = require("express");

const app = express();
app.use(express.json());


const user = [{id:"1", 
               name:"Iman Samiei",
               username:"Iman",
               password:"12345",
            postIDs:[1, 2]}]

const post = [{postID: "1", 
               title:"Test tile",
               content:"content1",
               createdby: "1",   
               categoryID: "3"
            }]

const category = [{
    categoryID : "1",
    name: "test category"
}]            



app.get("/", async (req, res) => {
    try {
    const allPost = post;
    res.send(allPost);
  } catch (error) {
    res.json("there was an error:", error.message);
  }
})

app.get("/:id", async (req, res) => {
  try {
    const reqId = Number(req.params.id);
    const thePost = post.find(i => i.postID == reqId)
    res.send(thePost);
  } catch (error) {
    res.json("there was an error:", error.message);
  }
});

app.post("/creatPost", async (req, res) => {
   //  const { postID, title, content, categoryID } = req.body;
  //   const input = req.body
  newPost = req.body;
  try {
    await post.push(newPost);
    res.json("New post added to the database!");
  } catch (error) {
    res.json("there was an error:", error.message);
  }
});


// app.put("/post/:id", async (req, res) => {
//   try {
//     const reqId = Number(req.params.id);
//     const { author, title, content } = req.body;
//     const thePost = await prisma.post.update({
//       where: { id: reqId },
//       data: {
//         author: author,
//         title: title,
//         content: content,
//         cover: "Test_Image",
//         date: new Date(),
//       },
//     });
//     res.send(thePost);
//   } catch (error) {
//     res.json("there was an error:", error.message);
//   }
// });


// app.delete("/post/:id", async (req, res) => {
//   try {
//     const reqId = Number(req.params.id);
//     const thePost = await prisma.post.delete({
//       where: { id: reqId },
//     });
//     res.send("Post deleted");
//   } catch (error) {
//     res.json("there was an error:", error.message);
//   }
// });





app.listen(3000, () => console.log("running on 3000"));





