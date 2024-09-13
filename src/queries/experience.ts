const getExperiences: string = "SELECT * FROM activity";
const getExperienceById: string = "SELECT * FROM activity WHERE id = $1";
const addExperience: string = "INSERT INTO activity(name, description, original_price, actual_price, duration, star_rating, destination_id, location_id, activity_provider_id, min_age, max_age) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
const deleteExperience: string = "DELETE FROM activity WHERE id = $1";
const updateName: string = "UPDATE activity SET name = $2 WHERE id = $1";
const updateDescription: string = "UPDATE activity SET description = $2 WHERE id = $1";
const updateOriginalPrice: string = "UPDATE activity SET original_price = $2 WHERE id = $1";
const updateActualPrice: string = "UPDATE activity SET actual_price = $2 WHERE id = $1";
const updateDuration: string = "UPDATE activity SET duration = $2 WHERE id = $1";
const updateStarRating: string = "UP DATE activity SET star_rating = $2 WHERE id = $1";
const updateDestinationId: string = "UPDATE activity SET destination_id = $2 WHERE id = $1";
const updateLocationId: string = "UPDATE activity SET location_id = $2 WHERE id = $1";
const updateMinAge: string = "UPDATE activity SET min_age = $2 WHERE id = $1";
const updateMaxAge: string = "UPDATE activity SET max_age = $2 WHERE id = $1";
const addDate: string = "INSERT INTO activity_date(activity_id,activity_date) VALUES ($1,$2)";
export default {
    getExperiences,
    getExperienceById,
    addExperience,
    deleteExperience,
    updateName,
    updateDescription,
    updateOriginalPrice,
    updateActualPrice,
    updateDuration,
    updateStarRating,
    updateDestinationId,
    updateLocationId,
    updateMinAge,
    updateMaxAge,
    addDate
};



// body exampleee
// {
//     "name":"Manhattan Helicopter Tour",
//     "description":"Enjoy a bird's eye perspective of NYC on a narrated helicopter tour as you cruise over Manhattan's iconic skyscrapers, come face to face with the Statue of Liberty, and head uptown past Central Park.",
//     "original_price":"230.27",
//     "actual_price":"200",
//     "duration":"00:15",
//     "star_rating":"4.7",
//     "destination_id":"1",
//     "location_id":"1",
//     "activity_provider_id":"1",
//     "min_age":"0",
//     "max_age":"0"
// }



