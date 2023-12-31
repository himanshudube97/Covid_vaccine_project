import express from "express";
import {errorMiddleware}  from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


import centre from "./routes.js/centreRoutes.js";
import user from "./routes.js/userRoutes.js";

app.use("/api/v1", centre );
app.use("/api/v1", user);

// app.get("/h", async(req, res)=>{
//     let result = await Blog.updateMany({noOfLikes: 0})
//     res.json({
//         result
//     })
// } )
// cron.schedule("*/5 * * * * *", function () {
//     console.log("hello")
// })

// cron.schedule("*/15 * * * * *", function () {
//     let heap = process.memoryUsage().heapUsed / 1024 / 1024;
//     let date = new Date().toISOString();
//     const freeMemory = Math.round((os.freemem() * 100) / os.totalmem()) + "%";
  
//     //                 date | heap used | free memory
//     let csv = `${date}, ${heap}, ${freeMemory}\n`;
  
//     // storing log In .csv file
//     fs.appendFile("demo.csv", csv, function (err) {
//       if (err) throw err;
//       console.log("server details logged!");
//     });
//   });

app.use(errorMiddleware);
export default app;