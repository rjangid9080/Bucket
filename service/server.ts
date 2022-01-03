import { Request, Response } from "express";
import bucketApp from "./app/app";
import * as dotenv from "dotenv";
import { MongoDB } from "./connection/mongoDB";
import { user } from "./routes/user";
import { product } from "./routes/product";
import ErrorMiddleware from "./middleware/error"

//use config.env file
dotenv.config({ path: "config.env" });


//connect database
MongoDB();

const Port: string | undefined = process.env.PORT;
bucketApp.use("/product", product);
bucketApp.use("/user", user);
bucketApp.get("/", (req: Request, res: Response) => {
  res.send("Hello this is server");
});


// Error middleware
bucketApp.use(ErrorMiddleware)
bucketApp.listen(Port, () => {
  console.log(`Server is live on http://localhost:${Port}`);
});
