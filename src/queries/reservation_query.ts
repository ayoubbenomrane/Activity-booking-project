const makeReserevation = 'INSERT INTO reservation(activity_time_id,booker_name,reservation_time) VALUES($1,$2,$3) RETURNING reservation_time';
const getReservations = `
SELECT 
    r.id AS reservation_id,
    r.booker_name,
    r.reservation_time,
    t.time AS activity_time,
    ad.activity_date,
    a.name AS activity_name
FROM 
    reservation r
JOIN 
    time t ON r.activity_time_id = t.id
JOIN 
    activity_date ad ON t.date_id = ad.id
JOIN 
    activity a ON ad.activity_id = a.id
WHERE 
    a.id = $1;
`
const getActivityTime = 'SELECT activity_time_id FROM reservation WHERE id=$1';
const getActivityDateId = 'SELECT date_id,time FROM time WHERE id=$1 ';
const getActivityDate = 'SELECT activity_date,full_refund_days,partial_refund_days,partial_refund_rate FROM activity_date where id=$1 ';

export default { makeReserevation, getReservations, getActivityDate, getActivityDateId, getActivityTime }