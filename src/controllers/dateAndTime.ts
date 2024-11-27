import { Request, Response } from 'express';
import { Pool, PoolClient } from 'pg';
import pool from '../../db';
import queries from '../queries/dateAndTime.ts';
const addActivityDate = (req: Request, res: Response): void => {
    const activityId = req.params.id; // Extract `id` from the route parameter
    const { date, full_refund_days, partial_refund_days, partial_refund_rate } = req.body; // Extract data from the body

    // Input validation
    if (
        !activityId ||
        isNaN(Number(activityId)) ||
        !date ||
        !full_refund_days ||
        !partial_refund_days ||
        !partial_refund_rate
    ) {
        res.status(400).send("Invalid input data");
        return;
    }

    console.log("Adding activity date with:", {
        activityId,
        date,
        full_refund_days,
        partial_refund_days,
        partial_refund_rate
    });

    pool.query(
        queries.addDate,
        [activityId, date, full_refund_days, partial_refund_days, partial_refund_rate],
        (error: Error, result: any) => {
            if (error) {
                console.error("Error inserting activity date:", error);
                res.status(500).send("Error inserting activity date");
                return;
            }

            res.status(201).json({
                message: "Activity date added successfully",
                activityDateId: result.rows[0].id
            });
        }
    );
};

const addTime = (req: Request, res: Response): void => {
    const activityDateId = Number(req.params.id); // Convert `id` from params to number
    const { time, max_capacity, current_capacity } = req.body; // Extract data from body

    // Validate input
    if (!activityDateId || isNaN(activityDateId)) {
        res.status(400).send("Invalid activityDateId in URL parameter");
        return;
    }

    if (!time || typeof time !== "string") {
        res.status(400).send("Invalid or missing 'time' in request body");
        return;
    }

    if (!max_capacity || typeof max_capacity !== "number") {
        res.status(400).send("Invalid or missing 'max_capacity' in request body");
        return;
    }

    if (current_capacity === undefined || typeof current_capacity !== "number") {
        res.status(400).send("Invalid or missing 'current_capacity' in request body");
        return;
    }

    console.log("Adding activity time with:", {
        activityDateId,
        time,
        max_capacity,
        current_capacity
    });

    // Query to insert time
    pool.query(
        queries.addTime,
        [activityDateId, time, max_capacity, current_capacity],
        (error: Error, result: any) => {
            if (error) {
                console.error("Error inserting activity time:", error);
                res.status(500).send("Error inserting activity time");
                return;
            }

            res.status(201).json({
                message: "Activity time added successfully",
                activityTimeId: result.rows[0].id
            });
        }
    );
};

const getDatesAndTimes = (req: Request, res: Response): void => {
    const id = req.params.id;

    // Check if the provided `id` is valid
    if (!id || isNaN(Number(id))) {
         res.status(400).send('Invalid activity ID');
    }

    console.log("Executing query:", queries.getDatesAndTimes, "With ID:", id);

    pool.query(queries.getDatesAndTimes, [id], (error: Error, result: any): void => {
        if (error) {
            console.error("Error getting dates and times:", error);
             res.status(500).send('Error getting dates and times');
        }

        // If no results found, return 404
        if (result.rows.length === 0) {
            res.status(404).send('No dates and times found for the given activity ID');
        }

        // Return the results
        res.status(200).json(result.rows);
    });
};


export default {  getDatesAndTimes,addActivityDate,addTime };



