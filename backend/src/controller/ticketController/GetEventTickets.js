import supabase from "../../config/db.js";

async function GetEventTickets(req, res) {
    const { eventId } = req.params;

    try {
        const {data: FetchTickets, error: FetchTicketError} = await supabase
        .from("ticket_types")
        .select("id, name, price, quantity")
        .eq("event_id",eventId)

        if ( FetchTicketError ) {
            return res.status(400).json({
                message:"Error in Fetching Tickets for this event.",
                error: FetchTicketError.message
            })
        }

        const AvailableTickets = FetchTickets;
           
        console.log(AvailableTickets);

        return res.status(200).json({
            message:"Tickets for this Event",
            Tickets: AvailableTickets
        })

    } catch (ServerError) {
        return res.status(500).json({
            message:"Internal Server Error",
            error: ServerError.message
        })
    }
}

export default GetEventTickets