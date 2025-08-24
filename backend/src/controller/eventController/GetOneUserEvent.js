import supabase from "../../config/db.js";

async function GetOneUserEvent(req, res) {
    const { userId, eventId } = req.params;

    //Fetching one event with the specified event id created by this user (organizer)
     const { data: fetchUserEvent, error: fetchEventError} = await supabase
        .from("events")
        .select('*')
        .eq('id',eventId)
        .eq('created_by',userId)

        if (fetchEventError) {
            throw new Error(`Error fetching user's events: ${fetchEventError.message}`); 
        }

        if (!fetchUserEvent || fetchUserEvent.length === 0) {
            return res.status(404).send({
                message:"This Event does not exists."
        });
        }

        const UserEvent = fetchUserEvent;

        return res.status(200).send({
            message:"User Event Fetch Successful",
            data: UserEvent
        })

}

export default GetOneUserEvent