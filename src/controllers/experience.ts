import { Request, Response } from 'express';
import { Pool, PoolClient } from 'pg';
import pool from '../../db'; // Assuming db.js exports the pool
import queries from '../queries/experience.ts';

// Test the connection
// pool.connect((err: Error | undefined, client: PoolClient | undefined, release: (release?: any) => void) => {
//     if (err) {
//         return console.error('Error acquiring client', err.stack);
//     }
//     if (client) {
//         console.log('Connected to database');
//         release(); // Release the client back to the pool
//     }
// });

const getExperiences = (req: Request, res: Response): void => {
    pool.query(queries.getExperiences, (error: Error, results: any) => {
        if (error) {
            console.error('Error getting experiences', error);
            return res.status(500).send('Error getting experiences: ');
        }
        res.status(200).json(results.rows);
    });
    console.log('getting experiences');
};

const getExperienceById = (req: Request, res: Response): void => {
    const id = req.params.id;
    if (isNaN(Number(id))) {
        res.status(400).send('id provided is not a number')
    }
    pool.query(queries.getExperienceById, [id], (error: Error, results: any) => {
        if (error) {
            console.error('Error getting experience', error);
            return res.status(500).send('Error getting experience');
        }
        if (results.rows.length == 0) { return res.status(404).send('ID not found') }
        res.status(200).json(results.rows);
    });
};

const addExperience = (req: Request, res: Response): void => {
    const { name, description, original_price, actual_price, duration, star_rating, destination_id, location_id, activity_provider_id, min_age, max_age } = req.body;
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timePattern.test(duration)) {
        res.status(400).send("duration needs to be a valid time");
    }
    if (isNaN(Number(destination_id))) {
        res.status(400).send('destination id provided is not a number')
    }
    if (isNaN(Number(location_id))) {
        res.status(400).send('location id provided is not a number')
    }
    if (isNaN(Number(activity_provider_id))) {
        res.status(400).send('activity provider id provided is not a number')
    }
    if (isNaN(Number(min_age))) {
        res.status(400).send('minimum age provided is not a number')
    }
    if (isNaN(Number(max_age))) {
        res.status(400).send('maximum age provided is not a number')
    }


    pool.query(queries.addExperience, [name, description, original_price, actual_price, duration, star_rating, destination_id, location_id, activity_provider_id, min_age, max_age], (error: Error, results: any) => {
        if (error) {
            console.error('Error adding experience:', error);
            return res.status(500).send('Error adding experience');
        }
        res.status(201).send('Experience created successfully');
    });
};

const deleteExperience = (req: Request, res: Response): void => {
    const id = req.params.id;
    if (isNaN(Number(id))) {
        res.status(400).send('id provided is not a number')
    }
    // First, check if the experience exists
    pool.query(queries.getExperienceById, [id], (error: Error, results: any) => {
        if (error) {
            console.error('Error checking experience:', error);
            return res.status(500).send('Error checking experience');
        }

        // Check if no experiences were found
        if (results.rows.length === 0) {
            return res.status(404).send("Experience doesn't exist in the database");
        }

        // Experience found, proceed to delete
        pool.query(queries.deleteExperience, [id], (error: Error, results: any) => {
            if (error) {
                console.error('Error deleting experience:', error);
                return res.status(500).send('Error deleting experience');
            }
            res.status(200).send('Experience removed successfully');
        });
    });
};

const updateExperience = (req: Request, res: Response): void => {
    const id = req.params.id;
    const { name, description, original_price, actual_price, duration, star_rating, destination_id, location_id, min_age, max_age } = req.body;

    // Example of how to update each attribute if it's provided in the request
    if (name !== undefined) {
        pool.query(queries.updateName, [id, name], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating name:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }
    if (description !== undefined) {
        pool.query(queries.updateDescription, [id, description], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating description:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }
    if (original_price !== undefined) {
        pool.query(queries.updateOriginalPrice, [id, original_price], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating price:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }
    if (actual_price !== undefined) {
        pool.query(queries.updateActualPrice, [id, actual_price], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating price:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }
    if (duration !== undefined) {
        pool.query(queries.updateDuration, [id, duration], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating duration:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }
    if (star_rating !== undefined) {
        pool.query(queries.updateStarRating, [id, star_rating], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating star rating:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }
    if (destination_id !== undefined) {
        pool.query(queries.updateDestinationId, [id, destination_id], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating destination ID:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }
    if (location_id !== undefined) {
        pool.query(queries.updateLocationId, [id, location_id], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating location ID:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }
    if (min_age !== undefined) {
        pool.query(queries.updateMinAge, [id, min_age], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating min age:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }
    if (max_age !== undefined) {
        pool.query(queries.updateMaxAge, [id, max_age], (error: Error, results: any) => {
            if (error) {
                console.error('Error updating max age:', error);
                return res.status(500).send('Error updating experience');
            }
        });
    }

    res.status(200).send('Experience updated successfully');
};




export default { getExperiences, getExperienceById, addExperience, deleteExperience, updateExperience };
