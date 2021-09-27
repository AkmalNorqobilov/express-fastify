import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import ConnectMongoDBSession from 'connect-mongodb-session';
dotenv.config();
import mongoose from 'mongoose';

const MongodbSession = ConnectMongoDBSession(session);
const store = new MongodbSession({
    uri: `${process.env.MONGODB_URI}`,
    collection: 'session'
});


import { connectDb } from './helpers/db/connect.db';
import path from 'path';
import flash from 'express-flash';
import session from 'express-session';
connectDb();
const app = express();
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(flash())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', async (request: Request, response: Response) => {
    request.flash("salom", "assalomu alaykum hammaga");
    request.flash("vada", "flaskdjfoqwierjwqerk")
    // request.session.salom= "falsdkjfsdf"
    if(request.session){

    }
    request.session.save((err)=>{
        // request.session.save()
    });
    console.log(request.session);
    
    request.session.save()
    
    response.render('index');
});

app.get('/token', async(req, res)=>{
    // req.view
    req.session.views+=22;
    // const user = await mongoose.get()('sessions').findOne({_id: req.sessionID});
    
    
    res.send(req.session)
});

app.listen(3001);