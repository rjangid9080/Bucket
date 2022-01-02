import { Request, Response } from "express";
import bucketApp from "./app/app";
import * as dotenv from "dotenv";
import { MongoDB } from "./connection/mongoDB";
import { auth } from "./routes/auth";
import { product } from "./routes/product";

//use config.env file
dotenv.config({ path: "config.env" });


//connect database
MongoDB();

const Port: string | undefined = process.env.PORT;
bucketApp.use("/product", product);
bucketApp.use("/user", auth);
bucketApp.get("/", (req: Request, res: Response) => {
  res.send("Hello this is server");
});

bucketApp.listen(Port, () => {
  console.log(`Server is live on http://localhost:${Port}`);
});
