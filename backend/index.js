import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoutes.js";
const app = express();

//Middleware for parsing request body
app.use(express.json());
app.get("/", (request, response) => {
  console.log(request);
  response.status(234).send("My First MERN Stack Project");
});

app.use("/books", booksRoute);

// //Routes to save a new book
// app.post("/books", async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.author ||
//       !request.body.publishYear
//     ) {
//       return response.status(400).send({
//         message: "Send all equired fields: title, author, publishYear",
//       });
//     }
//     const newBook = {
//       title: request.body.title,
//       author: request.body.author,
//       publishYear: request.body.publishYear,
//     };

//     const book = await Book.create(newBook);
//     return response.status(201).send(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// //Routes to get all books from database
// app.get("/books", async (request, response) => {
//   try {
//     const books = await Book.find({});
//     return response.status(200).json({
//       count: books.length,
//       data: books,
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// //Routes to get a book by id from database
// app.get("/books/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const book = await Book.findById(id);
//     // const books = await Book.find({});
//     return response.status(200).json(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// //Route for updating a book
// app.put("/books/:id", async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.author ||
//       !request.body.publishYear
//     ) {
//       response.status(400).send({
//         message: "Send all required details: title, author, publishYear",
//       });
//     }
//     const { id } = request.params;
//     const result = await Book.findByIdAndUpdate(id, request.body);
//     if (!result) {
//       return response.status(404).send({
//         message: "Book not found",
//       });
//     }
//     return response.status(200).send({
//       message: "Book updated succesfully",
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// //Route to delete a book
// app.delete("/books/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const result = await Book.findByIdAndDelete(id);
//     if (!result) {
//       return response.status(404).json({ message: "Book not found" });
//     }
//     return response.status(200).send({
//       message: "Book deleted succesfully",
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({
//       message: error.message,
//     });
//   }
// });

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App is connected to databse`);
    app.listen(PORT, () => {
      console.log(`App is listening at port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
