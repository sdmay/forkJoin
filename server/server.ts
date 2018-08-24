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
app.get('/api/news/:news/:year', (req, res) => {
    console.log(req.params.news);
    console.log(req.params.year);
});
app.get('/api/rating/:car/:source', (req, res) => {
    console.log(req.params);
    if (req.params.car === 'Honda' ) {
        if (req.params.source === 'cnn') {
            res.send({car: req.params.car,
                source: 'cnn',
                rating: 9
                });
                // {cnn: {rating: 6);
        }
        if (req.params.source === 'fox') {
            res.send({car: req.params.car,
                source: 'fox',
                rating: 8
                });
        }
        if (req.params.source === 'forbes') {
            res.send({car: req.params.car,
                source: 'forbes',
                rating: 4
                });
        }
        // res.send({car: 'akbashdbdbha'});
    }
    if (req.params.car === 'Toyota' ) {
        if (req.params.source === 'cnn') {
            res.send({car: req.params.car,
                source: 'cnn',
                rating: 8
                });
        }
        if (req.params.source === 'fox') {
            res.send({car: req.params.car,
                source: 'fox',
                rating: 6
                });
        }
        if (req.params.source === 'forbes') {
            res.send({car: req.params.car,
                source: 'forbes',
                rating: 9
                });
        }
    }
    if (req.params.car === 'Chevrolet' ) {
        if (req.params.source === 'cnn') {
            res.send({car: req.params.car,
                source: 'cnn',
                rating: 3
                });
        }
        if (req.params.source === 'fox') {
            res.send({car: req.params.car,
                source: 'fox',
                rating: 5
                });
        }
        if (req.params.source === 'forbes') {
            res.send({car: req.params.car,
                source: 'forbes',
                rating: 7
                });
        }
    }
    if (req.params.car === 'Ford' ) {
        if (req.params.source === 'cnn') {
            res.send({car: req.params.car,
                source: 'cnn',
                rating: 9
                });
        }
        if (req.params.source === 'fox') {
            res.send({car: req.params.car,
                source: 'fox',
                rating: 8
                });
        }
        if (req.params.source === 'forbes') {
            res.send({car: req.params.car,
                source: 'forbes',
                rating: 7
                });
        }
    }

});
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
    console.log('Listening');
});
export default app;
