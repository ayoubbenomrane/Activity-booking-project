import { Request, Response } from 'express';
import pool from '../../db';
import queries from '../queries/getQueries.ts';


const getByLocation = (req: Request, res: Response): any => {
    const id = req.params.id;
    if (!isNaN(Number(id))) {
        res.status(400).send('id provided is not a number')
    }
    pool.query(queries.getByLocation, [id], (error: Error, results: any): any => {
        if (error) {
            return res.status(500).send('Error getting experiences: ');
        }
        res.status(200).json(results.rows);
    })
}


const getByCountry = (req: Request, res: Response): any => {
    const id = req.params.id;
    if (!isNaN(Number(id))) {
        res.status(400).send('id provided is not a number')
    }
    pool.query(queries.getByCountry, [id], (error: Error, results: any): any => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error getting experiences: ');
        }
        res.status(200).json(results.rows);
    })

}
const getByCategory = (req: Request, res: Response): any => {
    const id = req.params.id;
    if (!isNaN(Number(id))) {
        res.status(400).send('id provided is not a number')
    }
    pool.query(queries.getByCategory, [id], (error: Error, results: any): any => {
        if (error) {
            return res.status(500).send('Error getting experiences: ');
        }
        res.status(200).json(results.rows);
    })

}
const getByInterest = (req: Request, res: Response): any => {
    const id = req.params.id;
    if (!isNaN(Number(id))) {
        res.status(400).send('id provided is not a number')
    }
    pool.query(queries.getByInterest, [id], (error: Error, results: any): any => {
        if (error) {
            return res.status(500).send('Error getting experiences: ');
        }
        res.status(200).json(results.rows);
    })

}
const getByPrice = (req: Request, res: Response): any => {
    let { min_price, max_price } = req.params;
    if (min_price === null) { min_price = '0'; }
    if (max_price === null) { max_price = '9999'; }
    pool.query(queries.getByPrice, [min_price, max_price], (error: Error, results: any): any => {
        if (error) {
            return res.status(500).send('Error getting experiences: ');
        }
        res.status(200).json(results.rows);
    })


}

export default { getByLocation, getByCountry, getByCategory, getByInterest, getByPrice }