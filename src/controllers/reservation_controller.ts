import { Request, Response } from "express";
import pool from '../../db';
import queries from '../queries/reservation_query.ts';

const makeReserevation = (req: Request, res: Response): void => {
    const id = req.params.id;
    if (!isNaN(Number(id))) {
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
    if (!isNaN(Number(id))) {
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
const cancellationFees = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isNaN(Number(id))) {
        res.status(400).send('id provided is not a number')
    }
    const activity_time_id = await pool.query(queries.getActivityTime, [id]);
    if (activity_time_id.rows.length === 0) {
        return res.status(404).json({ error: 'Reservation not found' });
    }
    console.log(activity_time_id.rows[0].activity_time_id)
    let result = await pool.query(queries.getActivityDateId, [activity_time_id.rows[0].activity_time_id]);
    const { date_id, time } = result.rows[0];
    console.log(date_id)
    result = await pool.query(queries.getActivityDate, [date_id]);
    const { activity_date, full_refund_days, partial_refund_days, partial_refund_rate } = result.rows[0];

    const activity_time_stamp = new Date(`${activity_date}T${time}Z`);
    const currentDate = new Date();
    let difference = activity_time_stamp.getTime() - currentDate.getTime();
    difference = difference / (1000 * 3600);
    if (difference > full_refund_days * 24) { return res.status(200).send("100"); }
    else if (difference > partial_refund_days * 24) { return res.status(200).send(partial_refund_rate.toISOString()); }
    else { return res.status(200).send("0"); }


}


export default { makeReserevation, getReserevations, cancellationFees };