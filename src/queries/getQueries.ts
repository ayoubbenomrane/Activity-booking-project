const getByLocation = 'SELECT * FROM activity where location_id=$1 '

const getByCountry = `
SELECT * 
FROM activity 
JOIN location ON activity.location_id = location.id  
JOIN country ON location.country_id = country.id
WHERE country.id = $1;

`;
const getByCategory = `
SELECT * FROM 
        activity
    JOIN
        category_activity on category_activity.activity_id=activity.id
    WHERE
        category_activity.category_id=$1;
`;
const getByInterest = `
SELECT * FROM 
        activity
    JOIN
        interest_activity on interest_activity.activity_id=activity.id
    WHERE
        interest_activity.interest_id=$1
`;


const getByPrice = `SELECT * FROM activity where actual_price>$1 AND actual_price<$2 `
export default { getByLocation, getByCountry, getByCategory, getByInterest, getByPrice };