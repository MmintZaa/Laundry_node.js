require('./config/config')

const morgan = require('morgan');
const adminRouter = require('./routes/admin');
const registerRouter = require('./routes/register');
// const adminRouter = require('./router/admin');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin: "*",
}));
app.use(express.json({
  limit: '200mb'
}));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '200mb'
  })
);
app.use(
  bodyParser.json({
    extended: true,
    limit: '200mb'
  })
);

app.use(morgan('dev'))

app.use('/admin', adminRouter);
app.use('/register', registerRouter);
// app.use('/admin', adminRouter);

console.log('[success] task 1 start service port : ' + GLOBAL_VALUE.NODE_PORT)
const server = app.listen(GLOBAL_VALUE.NODE_PORT).on('error', err => {
  console.log(err)
})


module.exports = server;
