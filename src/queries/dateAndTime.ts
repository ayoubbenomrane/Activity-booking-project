const addDateAndTime =
    (activityId: string, dates: string[], full_refund_days: number, partial_refund_days: number, partial_refund_rate: number): string => {
        const dateValues = dates.map(date => `(${activityId},'${date}',${full_refund_days},${partial_refund_days},${partial_refund_rate})`).join(',');
        const query = `INSERT INTO activity_date (activity_id, activity_date,full_refund_days,partial_refund_days,partial_refund_rate) VALUES ${dateValues} RETURNING id`;
        console.log('Date Query:', query); // Log the generated query
        return query;
    };
//  `INSERT INTO activity_date (activity_id, activity_date,full_refund_days,partial_refund_days,partial_refund_rate) VALUES ${dateValues} RETURNING id`;

const addTimes = (dateId: string, times: string[]): string => {
    const timeValues = times.map(time => `(${dateId},'${time}',0,0)`).join(',');
    const query = `INSERT INTO time (date_id,time,max_capacity,current_capacity) VALUES ${timeValues}`;
    console.log('Time Query:', query); // Log the generated query
    return query;
};

const getDatesAndTimes = `
    SELECT 
        ad.activity_date,
        t.time,
        t.max_capacity,
        t.current_capacity,
        full_refund_days,
        partial_refund_days,
        partial_refund_rate
        
    FROM 
        activity_date ad
    JOIN 
        time t ON ad.id = t.date_id
    WHERE
        ad.activity_id = $1; 
`;


export default { addDateAndTime, addTimes, getDatesAndTimes }