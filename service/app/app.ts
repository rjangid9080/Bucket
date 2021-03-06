import express, { Express } from 'express';
import morgan from 'morgan';
import cookie from 'cookie-parser';

class Bucket {
    public app: Express;
    private configuration(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(morgan('tiny'))
        this.app.use(cookie())
    }
    constructor() {
        this.app = express();
        this.configuration();
    }

}

export default new Bucket().app;