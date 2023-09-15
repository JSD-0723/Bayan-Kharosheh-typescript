"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.set("view engine", "pug");
app.get("/books", (req, res, next) => {
    try {
        const { query } = req.query;
        const books = getBooks();
        if (!query) {
            res.render("books", { filteredBooks: books });
        }
        else {
            const filteredBooks = books.filter((book) => book.name.toLowerCase().startsWith(query.toString().toLowerCase()));
            res.render("books", { filteredBooks });
        }
    }
    catch (error) {
        next(error);
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something wrong" });
});
app.listen(3000, () => {
    console.log(`server is running at ${PORT} `);
});
const getBooks = () => {
    try {
        const data = fs_1.default.readFileSync("books.json", "utf8");
        return JSON.parse(data);
    }
    catch (err) {
        return [];
    }
};
