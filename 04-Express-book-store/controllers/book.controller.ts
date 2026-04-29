import "dotenv/config";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import db from "../db/index.js";
import { booksTable } from "../drizzle/schema.js";

//Interfaces
export const getBooks = async (req: Request, res: Response) => {
  try{
      const books = await db.select().from(booksTable);
      res.setHeader("X-App-Version", "1.0");
      res.status(200).json(books);
  } catch (error) {
    console.error("getBooks", error);
  }

}

export const getBookById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    // booksTable.id is UUID (string), so req.params.id should be used as a string.
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "id is required" });

    const rows = await db.select().from(booksTable).where(eq(booksTable.id, id)).limit(1);
    const book = rows[0];
    if (!book) return res.status(404).json({ error: "Book not found" });
    return res.status(200).json(book);
  } catch (error) {
    console.error("getBookById", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const postBook = async (req: Request, res:Response) => {
  const { title } = req.body;
  const { author } = req.body;
  if(!title?.trim() || !author?.trim()) return res.status(400).json( {error: 'Field required.'})
  const book = { title, author };
  try{
    await db.insert(booksTable).values(book);
    return res.status(201).json( {message: 'Book is created success'} );
  } catch(error){
    console.error("Error on inserting the data", error);
  }
}

export const deleteBookById = async (req: Request<{ id: string }>, res:Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "id is required" });

  try{
    await db.delete(booksTable).where(eq(booksTable.id, id));
    return res.status(200).json({ message: `The book with id ${id} has been deleted.` });
  }catch(err){
    console.error("Error on deleting please enter the valid Id", err);
  }
}