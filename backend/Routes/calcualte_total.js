import { Express } from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router()
// Routes 
router.post('/calculate_total', async (req, res) => {

    try{
        const {id} = req.params
        const book = await Book.findById(id)
        const total = book.reduce((total, book) => total + book.price, 0);
    } catch(error){console.log('something went wrong', error)}
})
