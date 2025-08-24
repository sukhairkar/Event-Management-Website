import supabase from "../../config/db.js";

async function GetAllUserEvents(req, res) {
    const { userId } = req.params;

    //Fetching All Events created by this user (organizer)
     const { data: fetchUserEvents, error: fetchEventError} = await supabase
        .from("events")
        .select('*')
        .eq('created_by',userId)

        if (fetchEventError) {
            throw new Error(`Error fetching user's events: ${fetchEventError.message}`); 
        }

        if (!fetchUserEvents || fetchUserEvents.length === 0) {
            return res.status(404).send({
                message:"No Events Found."
            });
        }

        const AllUserEvents = fetchUserEvents;

        return res.status(200).send({
            message:"User Events Fetch Successful",
            data: AllUserEvents
        })

}

export default GetAllUserEvents