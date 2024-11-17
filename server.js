const http = require('http')
const fs = require('fs')

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}   
const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const server = http.createServer(async (request, response) => { // request - запрос, response - ответ
    /* колбэк вызывается каждый раз, когда приходит request (запрос) */
    switch (request.url) {
        case '/home':
            try {
                const data = await readFile('./pages/home1234.html')
                response.write(data)            
                response.end()
            } catch(err) {
                response.write('Something went wrong...')            
                response.end()
            }
            break
        case '/user':
            const data = {
                userId: 1,
                userName: 'macheten',
                password: 'qwerty123'
            } 
            response.write(JSON.stringify(data))
            response.end()
            break
        case '/about':
            response.write('AboutUs')
            response.end()
            break
        default:
            response.write('404 not found')
            response.end()
    }
})

server.listen(3333) // сервер доступен по порту 3333
