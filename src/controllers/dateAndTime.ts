import { Request, Response } from 'express';
import { Pool, PoolClient } from 'pg';
import pool from '../../db';
import queries from '../queries/dateAndTime.ts';



const addDatesAndTimes = async (req: Request, res: Response): Promise<void> => {
    const activityId = req.params.id;
    const { dates, times, full_refund_days, partial_refund_days, partial_refund_rate }: { dates: string[]; times: string[]; full_refund_days: number; partial_refund_days: number; partial_refund_rate: number } = req.body;
    let default_full_refund = 1;
    let default_partial_refund = 0;
    let default_rate = 100;

    if (full_refund_days !== null) { default_full_refund = full_refund_days; }
    if (partial_refund_days !== null) { default_partial_refund = partial_refund_days; }
    if (partial_refund_rate !== null) { default_rate = partial_refund_rate; }



    try {
        // Insert dates and get their IDs
        const dateResult = await pool.query(queries.addDateAndTime(activityId, dates, default_full_refund, default_partial_refund, default_rate));
        const dateIds = dateResult.rows; // Contains { date_id }

        // Prepare times for insertion
        // const timeQueries = dateIds.map((date: { id: number; activity_date: string }) => {
        //     const timeValues = times.map(time => `(${date.id}, '${time}', 0, 0)`).join(',');
        //     return `INSERT INTO time (date_id, time, max_capacity, current_capacity) VALUES ${timeValues};`;
        // });

        // Execute all time insertions
        for (const dateId of dateIds) {
            await pool.query(queries.addTimes(dateId.id, times));
        }

        res.status(201).send('Dates and times added successfully');
    } catch (error) {
        console.error('Error adding dates and times:', error);
        res.status(500).send('Error adding dates and times');
    }
};


const getDatesAndTimes = (req: Request, res: Response): any => {
    const id = req.params.id;
    console.log(queries.getDatesAndTimes, [id]);
    pool.query(queries.getDatesAndTimes, [id], (error: Error, result: any): any => {

        if (error) {
            console.error(error);
            return res.status(500).send('error getting  dates')
        }
        res.status(200).send(result.rows);
    });
}

export default { addDatesAndTimes, getDatesAndTimes };



