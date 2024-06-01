import express from 'express'



import DB_connection from './DB/connection.js'
import { config } from 'dotenv'
import { globalResponse } from './src/middlewares/globalResponse.js'
import productrouter from './src/modules/Product/product.routes.js'
import authrouter from'./src/modules/auth/auth.routes.js'
import userrouter from'./src/modules/User/user.routes.js'
import commentrouter from './src/modules/Comment/comment.routes.js'
import replyrouter from './src/modules/Reply/reply.routes.js'
import likerouter from './src/modules/Likes/likes.routes.js'
config({ path: './config/dev.config.env' })

const app = express()
const port = process.env.PORT

app.use(express.json())
DB_connection()
app.use('/auth',authrouter)
app.use('/user',userrouter)
app.use('/product',productrouter);
app.use('/comment',commentrouter)
app.use('/like',likerouter)
app.use('/reply',replyrouter);
app.use(globalResponse)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
