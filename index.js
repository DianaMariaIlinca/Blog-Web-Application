import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set("view engine", "ejs"); 
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let BlogList = [];


app.get("/", (req, res) => {
  res.render("index.ejs", { blogList: BlogList });
});


app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/price", (req, res) => {
  res.render("price.ejs");
});


app.post("/check", (req, res) => {
  const name = req.body["name"];
  const post = req.body["pt"];

  BlogList.push({
    id: BlogList.length + 1, // Assign a unique ID
    title: name,
    description: post,
  });

  res.redirect("/");  
});


app.post("/delete/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const initialLength = BlogList.length;

  BlogList = BlogList.filter((blog) => blog.id !== blogId);
  console.log(`Deleted Blog ID: ${blogId}, Initial Length: ${initialLength}, New Length: ${BlogList.length}`);
  
  res.redirect("/"); 
});


app.get("/edit/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogToEdit = BlogList.find(blog => blog.id === blogId);

  if (!blogToEdit) {
    return res.send("<h1>Blog post not found</h1>");
  }

  res.render("edit.ejs", 
    { blog: blogToEdit

     }); 
});


app.post("/edit/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const editIndex = BlogList.findIndex((blog) => blog.id === blogId);

  if (editIndex === -1) {
    return res.send("<h1>Something went wrong</h1>");
  }

  const updatedTitle = req.body.blogTitle;
  const updatedDescription = req.body.blogDes;

  BlogList[editIndex].title = updatedTitle; 
  BlogList[editIndex].description = updatedDescription; 

  res.redirect("/"); 
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
