import Todos from "../model/todos.js";

export const Createtodos = async (req, res) => {
    try {
        const { name, description, author } = req.body;

        if (!name || !description || !author) {
            return res.status(400).json({ message: "Please complete the form" });
        }

        // Await the findOne() operation
        const verify = await Todos.findOne({ name });

        if (verify) {
            return res.status(400).json({ message: "Name is already used" });
        }

        // Correct way to create a new document
        const item = new Todos({ name, description, author });

        await item.save();

        return res.status(201).json({ message: "Todo created successfully", item });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const Showtodos = async (req, res) => {
    try {
        // Await the find() operation
        const items = await Todos.find();

        return res.status(200).json(items);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const ShowtodosById = async (req, res) => {
    try {
        // Await the find() operation
        const { id } = req.params
        const item = await Todos.findById(id);

        if(!item){
            return res.status(400).json({ message: "user is not founds"});
        }

        return res.status(200).json(item);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const ShowtodosAndUpdate = async (req, res) => {
    try {
        // Await the find() operation
        const { id } = req.params
        const { name, description } = req.body
        const item = await Todos.findByIdAndUpdate(id,
            {
                name, description
            },
            {
                new : true, runValidators: true
            }
        );

        if(!item){
            return res.status(404).json({ message: "user is not founds"});
        }
        
        return res.status(200).json({message:"Todo updated successfully",item});
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const ShowtodosAndDelete = async (req, res) => {
    try {
        // Await the find() operation
        const { id } = req.params
        const item = await Todos.findByIdAndDelete(id);

        if(!item){
            return res.status(400).json({ message: "user is not founds"});
        }
        
        return res.status(200).json(item);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};