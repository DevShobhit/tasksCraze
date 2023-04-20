const express = require('express')
const TaskRoute = require('./routers/tasks')
const UserRoute = require('./routers/user')
const session = require('express-session')
const passport = require('passport')

require('./config/mongoose')
require('./middlewares/passport')

const PORT = process.env.PORT || 3000

const app = express()
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

app.use(TaskRoute)
app.use(UserRoute)

app.use(express.static('ui/build'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../ui', 'build', 'index.html'))
})

app.listen(PORT, () => {
  console.log('SERVER is running fine on PORT: ', PORT)
})
