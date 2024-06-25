import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Ensure this import is correct

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, this is your TypeScript Express server!');
});

app.get('/api/data', (req: Request, res: Response) => {
    const data = {
        message: 'Data from the server',
        timestamp: new Date().toISOString()
    };
    res.json(data);
});

app.use((req: Request, res: Response) => {
    res.status(404).send('404: Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
