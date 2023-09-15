import express, { Request, Response, NextFunction } from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());
app.set("view engine", "pug");

app.get("/books", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req.query;
    const books = getBooks();

    if (!query) {
      res.render("books", { filteredBooks: books });
    } else {
      const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().startsWith(query.toString().toLowerCase())
      );
      res.render("books", { filteredBooks });
    }
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something wrong" });
});

app.listen(3000, () => {
  console.log(`server is running at ${PORT} `);
});

const getBooks = (): any[] => {
  try {
    const data = fs.readFileSync("books.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};
