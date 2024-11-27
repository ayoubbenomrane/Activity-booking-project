const queries = {
    addDate: `
        INSERT INTO activity_date (activity_id, activity_date, full_refund_days, partial_refund_days, partial_refund_rate)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `,
    addTime: `
        INSERT INTO time (date_id, time, max_capacity, current_capacity)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `,
    getDatesAndTimes: `
        SELECT ad.activity_date, ad.full_refund_days, ad.partial_refund_days, ad.partial_refund_rate,
               at.time, at.max_capacity, at.current_capacity
        FROM activity_date ad
        LEFT JOIN activity_time at ON ad.id = at.activity_date_id
        WHERE ad.activity_id = $1;
    `
};

export default queries;
