import "dotenv/config";
import { eq, ilike } from "drizzle-orm";
import type { Request, Response } from "express";
import db from "../db/index.js";
import { booksTable } from "../drizzle/schema.js";
import { sql } from "drizzle-orm";

type CreateBookBody = {
  title: string;
  authorId: string;      // uuid string
  description?: string;
};

//Interfaces
export const getBooks = async (req: Request, res: Response) => {
  try{
      const search = req.query.search;

      if (search) {
        const books = await db
        .select().from(booksTable)
        .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);

        return res.json(books)
      }

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

    const [book] = await db.select().from(booksTable).where(eq(booksTable.id, id)).limit(1);
    if (!book) return res.status(404).json({ error: "Book not found" });
    return res.status(200).json(book);
  } catch (error) {
    console.error("getBookById", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const postBook = async (req: Request<CreateBookBody>, res:Response) => {
  const { title, authorId, description} = req.body;

  if(!title?.trim() || !authorId?.trim()){
    return res.status(400).json( {error: 'Field required.'})
  } 

  try{
    const [result] = await db.insert(booksTable).values({ title, authorId, description }).returning({ id: booksTable.id });

    if (!result) return res.status(500).json({ error: "Insert failed" });
    
    return res.status(201).json({ message: "Book is created success", id: result.id });
  } catch(error){
    console.error("Error on inserting the data", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteBookById = async (req: Request<{ id: string }>, res:Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "id is required" });

  try{
    const [result] = await db
      .delete(booksTable)
      .where(eq(booksTable.id, id))
      .returning({ id: booksTable.id });

    if (!result) return res.status(404).json({ error: "Book not found." });

    return res.status(200).json({ message: `The book with id ${result.id} has been deleted.` });
  }catch(err){
    console.error("Error on deleting please enter the valid Id", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}