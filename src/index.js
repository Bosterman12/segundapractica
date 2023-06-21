
import 'dotenv/config'
import express from 'express'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import { __dirname, __filename } from './path.js'
import multer from 'multer'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { info } from 'console'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { userModel } from './models/Users.js'
import { cartModel } from './models/Cart.js'
import { productModel } from './models/Products.js'
import { messageModel } from './models/Messages.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import  FileStore  from 'session-file-store'
import MongoStore from 'connect-mongo'
import './utils/bcrypt.js'
import passport from 'passport'
import routerSession from './routes/session.routes.js'
import userRouter from './routes/users.routes.js'
import initializePassport from './config/passport.js'
import handlebars from 'express-handlebars'




const app = express()
const PORT = 4000
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
}) 


mongoose.connect(process.env.URL_MONGODB_ATLAS)
//mongoose.connect("mongodb+srv://bandialejandro:Bocha101@cluster0.b47bksn.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("DB is connected"))
.catch((error) => console.log("error en MongoDB Atlas:", error))

/*const resultado1 = await productModel.paginate({category: "fiambre"}, {limit: 8, page: 1})
console.log(resultado1)*/




const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)})

app.engine('handlebars', engine({
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {eq: function(a, b, options){
        if(a===b){
            return options.fn(this);
        }
        else{
            return options.inverse(this)
        }
    }}
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
const upload = (multer({storage:storage}))
app.use(cookieParser(process.env.COOKIE_SECRET))

/*app.use(session({
    secret: process.env.SESSION_SECRET,
    resave : true,
    saveUninitialized : true
}))*/



console.log(__dirname)

const io = new Server(server, {cors: {origin:"*"} })
const mensajes = []

io.on ('connection', (socket) => {
    console.log("Cliente conectado")
    socket.on("mensaje", info =>{
        console.log(info)
        //mensajes.push(info)
        //io.emit("mensajes", mensajes)
    })
    socket.on("nuevoProducto", (prod) => {
        console.log(prod)
    })
})

app.use((req, res, next) => {
    req.io = io
     next()

})
/*
io.on('connection', (socket) => {
    console.log("Cliente conectado")

    socket.on('mensaje', info =>{
        console.log(info)
        
        
    })

    socket.on('user', info =>{
        console.log(info)

        socket.emit("confirmacionAcceso", "Acceso concedido")

    })

        socket.broadcast.emit("mensaje-socket-propio", "Datos jugdores")
        

})
*/







/*
app.get('/', (req, res) => {
    const tutor = {
        nombre: "Luciana",
        email: "lu@lu.com",
        rol: "Tutor"
    }

    const cursos = [
        { numero: 123, nombre: "Programacion Backend", dia: "LyM", horario: "Noche" },
        { numero: 456, nombre: "React", dia: "S", horario: "Mañana" },
        { numero: 789, nombre: "Angular", dia: "MyJ", horario: "Tarde" }
    ]

    res.render('home', {//Primer parametro indico la vista a utilizar
        titulo: "51225 Backend",
        mensaje: "Hola, buenos dias",
        user: tutor,
        isTutor: tutor.rol === "Tutor",
        cursos: cursos
        
    })
})



/*app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})*/

/*await userModel.create([{
    first_name: "Leo", last_name: "Messi", email: "goat@messi.com", gender: "m", password: "1234"
},
{
    first_name: "Angel", last_name: "Di Maria", email: "fideo@dimaria.com", gender: "m", password: "5678"
},
{
    first_name: "dibu", last_name: "Martinez", email: "tecomo@hermano.com", gender: "m", password: "9012"
},
])*/

/*await productModel.create([{
    title:"Jamon cocido",
    description:"Paladini",
    code:"JC2",
    category:"fiambre",
    price:1600,
    stock:20,
    status:true,
    tumbnail:[]
},
{
    title:"Cantimpalo",
    description:"Cagnoli",
    code:"CA1",
    category:"fiambre",
    price:500,
    stock:20,
    status:true,
    tumbnail:[]
},

{
    title:"Queso Gruyere",
    description:"Ilolay",
    code:"Qg1",
    category:"queso",
    price:1500,
    stock:20,
    status:true,
    tumbnail:[]
}

])*/

/*await cartModel.create([
    {
       products: [
           {
               
                id_prod:  "646fb9cc3a6361802b861873"
               ,
                cant: 5
           }
       ]
      
   }
])*/

/*const response = await productModel.find().explain('executionStats')
    console.log(response)*/

/*const product1 = await productModel.findOne({_id: "646ab7810fd7f5adc1cac8c7"})
    console.log(product1)*/

/*const cart1 = await cartModel.findOne({_id: "646fba740a5a59d8b23889a8"}).populate("products.id_prod")
    const cart1JSON = JSON.stringify(cart1)
    console.log(cart1JSON)*/


/*const resultado = await productModel.aggregate([
    
    {
        $match:{category: "fiambre"}
    },
    {
        $group:{_id: "$title",price: {$sum: "$price"}}
    },
    {
        $sort: {price: -1}
    },
    {
        $group: {_id: 1, fiambres: {$push: "$$ROOT"},}
    },
    {
        $project: {
            "_id": 0,
            fiambres: "$fiambres"
        }
    },
    {
        $merge:{
            into:"fiambres"
        }
    }
])

console.log(resultado)*/


//cookies
app.get('/setCookie', (req, res) =>{
    res.cookie('CookieCookie', "Id: 545",{maxAge:3600000, signed: true}).send("Cookie firmada")
    //res.send("Cookie creada")
})

app.get('/getCookie', (req, res) =>{
    res.send(req.signedCookies)
})

app.get('/deleteCookie', (req, res) =>{
    res.clearCookie('CookieCookie').send("Cookie eliminada")
    })

//session

const fileStorage = FileStore(session);
/*app.use(session({
    //app.use(cookieParser())
    store : new fileStorage ({ path:'./sessions', ttl : 100, retries: 0}),
    secret : 'abc123456',
    resave: false,
    saveUninitialized: false
}))*/

app.use(session({
    //app.use(cookieParser())
    store : MongoStore.create({
        //mongoUrl:'mongodb+srv://bandialejandro:Bocha101@cluster0.b47bksn.mongodb.net/?retryWrites=true&w=majority',
        mongoUrl: process.env.URL_MONGODB_ATLAS,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 210,
        //collectionName: 'sessions',
    }),
    //secret : 'secret',
    secret: process.env.SESSION_SECRET,
    //resave: false,
    resave: true,
    //saveUninitialized: false,
    saveUninitialized: true,

    //cookie: {maxAge: 60000}
}))

await mongoose.connect(process.env.URL_MONGODB_ATLAS).then(() => console.log("MongoDB conectado"))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/session', routerSession ,(req, res) =>{
    res.render('sessions/login')
    //res.redirect('api/product')
})
app.use('/user', userRouter /*, (req, res) =>{
    res.render('sessions/register')
}*/) 



app.get('/session', (req, res) =>{
    if(req.session.counter){
        req.session.counter++
        res.send(`Ingresaste ${req.session.counter} veces`)
}else{
    req.session.counter = 1
    res.send(`Hola esta es la primera vez que ingreso`)
} })

app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use( '/api/product' ,express.static(__dirname + '/public'))
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("imagen subida")
})

app.get("/", (req, res) => {
    res.render('index')
})
app.get("/api/product", (req, res) => {
    res.render('home')})