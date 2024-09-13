import express from "express";
import swaggerUI from "swagger-ui-express"; // Make sure to import swagger-ui-express
import experienceRoutes from './src/routes/experience'; // Ensure this path is correct
import dateAndTimeRoutes from './src/routes/dateAndTime';
import reservationRoutes from './src/routes/reservation_route';
import getRoutes from './src/routes/getRoutes';
import docs from "./src/documentations/experience";
// var docs = require('./src/documentation/experience')

const app = express();

app.use("/apiB2B/apidocs/", swaggerUI.serve, (req: Request, res: any) => {
    let html = swaggerUI.generateHTML(docs);
    res.send(html);
});
app.use(express.json());
app.use('/experiences', experienceRoutes);
app.use('/dateandtime', dateAndTimeRoutes);
app.use('/reservation', reservationRoutes);
app.use('/getactivities', getRoutes);

export default app; // Export the app for use in othr files
