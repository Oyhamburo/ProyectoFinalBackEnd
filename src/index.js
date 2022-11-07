import express from "express"
// import { Router } from "./routers/index.routes/js"
// import { indexRoute } from "./routers/index.routes.js"
import { ProductRouter } from "./routers/index.routes.js"
const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use("/", express.static(path.join(__dirname, "../public"))); //! STATIC FILES

app.use("/api/products", ProductRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))