import supabase from "../../config/db.js"

async function UserBuyTicket(req, res) {
    const { eventId } = req.params;
    const { userId, ticketTypeId, quantity} = req.body;

    try {
        // Fetching Ticket of the particular event for user to buy 
        const {data: TicketType, error: TicketError} = await supabase
        .from("ticket_types")
        .select("id, name, quantity, price")
        .eq("id",ticketTypeId)
        .eq("event_id",eventId)
        .single()

        //Check's if there is an error in fetching tickets
        if ( !TicketType || TicketError) {
            return res.status(404).json({
                message:"Ticket Type Not Found for this event.",
                error : TicketError
            })
        }

        //Check if required credentials are provided
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                message:"Quantity of Tickets cannot be zero or less"
            })
        }

        //Check if Tickets are available to buy or not 
        if (TicketType.quantity <= 0) {
            return res.status(400).json({
                message:"Tickets are sold out."
            })
        }

        // Check if enough stock exists
        if (TicketType.quantity < quantity) {
            return res.status(400).json({
                message: "Not enough tickets available."
            });
        }

        const TicketName  = TicketType.name
        const Price = TicketType.price;

        // Update the Ticket's Stock (Eg: Decrease the stock by 1 after buying 1 ticket)
        const {error: UpdateError} = await supabase
        .from("ticket_types")
        .update({quantity: TicketType.quantity - quantity})
        .eq("event_id",eventId)
        .eq("id",ticketTypeId)
        .gte("quantity",quantity) 

        if (UpdateError) {
            return res.status(500).json({
                message:"Error Updating the ticket's stock",
                error: UpdateError.message
            })
        }

        //Inserting purchased ticket's information in the Ticket's Table
        const TicketsToInsert = Array.from({length: quantity}, ()=> ({
            event_id: eventId,
            user_id: userId,
            ticket_type_id: ticketTypeId,
            status:"active",
            qr_code: null
        }))


        const {data: NewTicket, error: InsertError} = await supabase
        .from("tickets")
        .insert(TicketsToInsert)
        .select();

        if (InsertError) {
            return res.status(500).json({
                message:"Error Inserting New ticket",
                error: InsertError.message
            })
        }

        return res.status(201).json({
            message:"Ticket Purchased Successfully.",
            Ticket: NewTicket.map(t => ({
                    ...t,
                    TicketName,
                    Price
                })), 
            }
        )

    }  catch (ServerError) {
        return res.status(500).json({
            message:"Internal Server Error",
            error: ServerError.message
        })
    }
}

export default UserBuyTicket