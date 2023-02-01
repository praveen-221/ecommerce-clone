if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
// import routes
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/adminAppRoutes/admin")
const categoryRoutes = require("./routes/category/adminCategory");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));    // Make the folder 'uploads' accessible by browser using url path '/public'

// Routes
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api", cartRoutes);

// Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("[+] DB connected successfully :)");
})
.catch((err) => {
    console.log(`[#] Error in DB connection - ${err}`);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[+] Server running at port ${PORT}`);
})