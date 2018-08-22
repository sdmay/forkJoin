import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
// app.set('port', process.env.PORT || 3000);

// app.get('/', (req, res) => {
//     res.sendfile(path.join(__dirname))
// })
app.get('/api/libra', (req, res) => {
    res.send({horo: ' LIBRAS are the best, arent we!!!!'});
});
app.get('/api/not-libra', (req, res) => {
    res.send({horo: 'HA HA HA You are not a libra!'});
});
app.get('/api/users/:id', (req, res) => {
    let name = '';
    console.log(req.params.id);
    if (+req.params.id === 1) {
        name = 'George';
    }
    if (+req.params.id === 2) {
        name = 'Bob';
    }
    if (+req.params.id === 3) {
        name = 'James';
    }
    if (+req.params.id === 4) {
        name = 'Herman';
    }
    res.send({first_name: name});
});
app.listen(3000, () => {
    console.log('listentig');
});
export default app;
