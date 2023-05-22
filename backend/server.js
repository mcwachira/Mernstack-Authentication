import express from 'express'
import dotenv from 'dotenv'


dotenv.config
const PORT =process.env.PORT || 8001

const app = express()


app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(PORT, () => console.group(`Server started on port ${PORT}`))
