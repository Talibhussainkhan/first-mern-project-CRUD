import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routes/product.route.js'


dotenv.config();
const app = express()
const port = process.env.PORT || 5000

const __dirname = path.resolve();
// allows us to accept json data in the body
app.use(express.json());

app.use("/api/product", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(port, () => {
  connectDB();
  console.log(`server started at http://localhost:5000`)
})
