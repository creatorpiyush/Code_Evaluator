const express = require('express')

const app = express()
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(__dirname + '/public'))

function decryptQueryParams(req, res, next) {

    // TODO: decrypt all query params as per our logic

    // console.log(req.query.code)

    function decrypt() {
        return req.query.code.replace(/([a-z]+)|([A-Z]+)/g, function(match, chr) {
            return chr ? match.toUpperCase() : match.toLowerCase();
        });
    }
    req.query.code = decrypt()
    next()
}

function decodeQueryBase64(req, res, next) {
    for (let q in req.query) {
        let data = req.query[q]
        data = new Buffer(data, 'base64').toString('ascii')
        req.query[q] = data
    }
    next()
}

app.get('/eval', decryptQueryParams, decodeQueryBase64, (req, res) => {
    // TODO: eval the code actually
    let code = ``
    code = req.query.code
        // console.log(code)
    res.send('<b>OUTPUT : </b>' + `${eval(code)}`)
})

app.listen(4545, () => {
    console.log('server started on http://localhost:4545')
})