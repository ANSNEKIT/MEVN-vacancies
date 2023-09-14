import { connect } from 'mongoose'
const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

const url = `mongodb+srv://vacancies:${password}@cluster0.lhqo7c7.mongodb.net/${dbName}?retryWrites=true&w=majority`
export const startConnection = async () => {
    try {
        await connect(url)
        console.log('db connected OK')
    } catch (error) {
        console.log('DB error', error)
    }
}
