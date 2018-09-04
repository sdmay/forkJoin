import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
const PORT = 3000 || process.env.PORT;
// app.get('/', (req, res) => {
//     res.sendfile(path.join(__dirname))
// })
app.use('/', express.static(path.join(__dirname, '../public')));
// app.use('/', express.static(__dirname));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
app.post('/api/user', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
app.get('/api/rating/:car/:source', (req, res) => {
    console.log(req.params);
    if (req.params.car === 'Honda') {
        if (req.params.source === 'cnn') {
            res.send({
                car: req.params.car,
                source: 'cnn',
                rating: 6
            });
        }
        if (req.params.source === 'car') {
            res.send({
                car: req.params.car,
                source: 'car',
                rating: 9
            });
        }
        if (req.params.source === 'fox') {
            res.send({
                car: req.params.car,
                source: 'fox',
                rating: 7
            });
        }
        if (req.params.source === 'forbes') {
            res.send({
                car: req.params.car,
                source: 'forbes',
                rating: 4
            });
        }
    }
    if (req.params.car === 'Toyota') {
        if (req.params.source === 'cnn') {
            res.send({
                car: req.params.car,
                source: 'cnn',
                rating: 8
            });
        }
        if (req.params.source === 'car') {
            res.send({
                car: req.params.car,
                source: 'car',
                rating: 7
            });
        }
        if (req.params.source === 'fox') {
            res.send({
                car: req.params.car,
                source: 'fox',
                rating: 6
            });
        }
        if (req.params.source === 'forbes') {
            res.send({
                car: req.params.car,
                source: 'forbes',
                rating: 9
            });
        }
    }
    if (req.params.car === 'Chevrolet') {
        if (req.params.source === 'cnn') {
            res.send({
                car: req.params.car,
                source: 'cnn',
                rating: 5
            });
        }
        if (req.params.source === 'car') {
            res.send({
                car: req.params.car,
                source: 'car',
                rating: 6
            });
        }
        if (req.params.source === 'fox') {
            res.send({
                car: req.params.car,
                source: 'fox',
                rating: 7
            });
        }
        if (req.params.source === 'forbes') {
            res.send({
                car: req.params.car,
                source: 'forbes',
                rating: 8
            });
        }
    }
    if (req.params.car === 'Ford') {
        if (req.params.source === 'cnn') {
            res.send({
                car: req.params.car,
                source: 'cnn',
                rating: 9
            });
        }
        if (req.params.source === 'car') {
            res.send({
                car: req.params.car,
                source: 'car',
                rating: 5
            });
        }
        if (req.params.source === 'fox') {
            res.send({
                car: req.params.car,
                source: 'fox',
                rating: 9
            });
        }
        if (req.params.source === 'forbes') {
            res.send({
                car: req.params.car,
                source: 'forbes',
                rating: 6
            });
        }
    }
});
app.listen(PORT, () => {
    console.log('Listening ', PORT);
});
export default app;
