import supabase from "../../config/db.js";

async function CreateEvent(req, res) {
    const { userId } = req.params;
    const {name, description, date_start, date_end, location} = req.body;

    if (!name) {
        return res.send({
            message:"Event name cannot be empty!"
        })
    } else if (!description) {
        return res.send({
            message:"Event description cannot be empty!"
        })
    } else if (!date_start || !date_end) {
        return res.send({
            message:"Event starting and ending dates cannot be empty!"
        })
    } else if (!location) {
        return res.send({
            message:"Event's location cannot be empty!"
        })
    }

    const {data, error} = await supabase
        .from("events")
        .insert([{
            name,
            description,
            date_start,
            date_end,
            location,
            created_by: userId
    }]).select()

    if (error) {
        res.status(500).send({
            message:"Error Creating Event",
            error : error.message
        })
    }

    return res.status(201).send({
        message:"Event Created Successfully.",
        event : data
    })
}

export default CreateEvent