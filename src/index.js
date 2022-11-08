import express from "express"
import { ProductRouter,CartRouter,indexRouter } from "./routers/index.routes.js"
const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)
app.use("/api", indexRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))