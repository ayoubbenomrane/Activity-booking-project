import { Request, Response } from "express";
import pool from '../../db';
import queries from '../queries/reservation_query.ts';

const makeReserevation = (req: Request, res: Response): void => {
    const id = req.params.id;
    if (isNaN(Number(id))) {
        res.status(400).send('id provided is not a number')
    }
    const { name } = req.body;

    const currentDate = new Date();

    const timestamp = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const test = timestamp
    console.log(timestamp);
    pool.query(queries.makeReserevation, [id, name, test], (error: Error, result: any): any => {
        if (error) {
            console.error('error making resrevation', error)
            return res.status(500).send('error making reservation')
        }
        res.status(200).send(result.rows[0]);
    });


}
const getReserevations = (req: Request, res: Response): void => {
    const id = req.params.id;
    if (isNaN(Number(id))) {
        res.status(400).send('id provided is not a number')
    }
    pool.query(queries.getReservations, [id], (error: Error, result: any): any => {
        if (error) {
            console.error('error getting resrevation', error)
            return res.status(500).send('error getting reservation')
        }
        res.status(200).json(result.rows);
    });
}


const cancellationFees = (req: Request, res: Response): void => {
    const id = req.params.id;

    if (isNaN(Number(id))) {
        res.status(400).json({ error: "Invalid reservation ID" });
        return;
    }

    // Step 1: Fetch time_id and other details
    pool.query(queries.getActivityTime, [id], (error, timeResult) => {
        if (error || timeResult.rows.length === 0) {
            res.status(404).json({ error: "Reservation not found or invalid data" });
            return;
        }

        const { activity_time_id } = timeResult.rows[0];
        console.log("Time Result:", timeResult.rows[0]);

        // Step 2: Fetch date information using activity_time_id
        pool.query(queries.getActivityDate, [activity_time_id], (error, dateResult) => {
            if (error || dateResult.rows.length === 0) {
                res.status(404).json({ error: "Date information not found" });
                return;
            }

            const { activity_date, full_refund_days, partial_refund_days, partial_refund_rate } =
                dateResult.rows[0];
            console.log("Date Result:", dateResult.rows[0]);

            // Step 3: Calculate refund
            if (!activity_date) {
                res.status(500).json({ error: "Activity date is missing" });
                return;
            }

            const activityTimeStamp = new Date(activity_date);
            const currentDate = new Date();
            const differenceInHours =
                (activityTimeStamp.getTime() - currentDate.getTime()) / (1000 * 3600);

            let refund = 0;
            if (differenceInHours > full_refund_days * 24) refund = 100;
            else if (differenceInHours > partial_refund_days * 24) refund = partial_refund_rate;

            // Return the refund and time difference
            res.status(200).json({ refund, differenceInHours });
        });
    });
};



export default { makeReserevation, getReserevations, cancellationFees };