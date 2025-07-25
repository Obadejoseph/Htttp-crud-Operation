const studentDb = require('./db.json');
const http = require('http');
PORT = 8080;
const fs = require('fs');

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const uuid = require('uuid').v4();
    if (url === '/create-student' && method === 'POST') {
        let body = '';
        req.on('data', (chunks) => {
            body += chunks
            console.log("this is the body of the chunk:", body);
        });
            // const data = JSON.parse(body);

            req.on('end', () => {
                const data = JSON.parse(body);


                const student = {
                    id: uuid,
                    name: data.name,
                    gender: data.occupation,
                    age: data.age

                };
                studentDb.push(student)
                fs.writeFile('./db/database.json', JSON.stringify(studentDb, null, 2), 'utf-8', (error, data) => {
                    if (error) {
                        res.writeHead(400, { "content-type": "text/plain" });
                        res.end('Bad request')
                    } else {
                        res.writeHead(201, { "content-type": "application/json" });
                        res.end(JSON.stringify({
                            message: "student created successfully",
                            data: student
                        }))
                    }
                })
    b        });


    }
    else if (url.startsWith('/students') && method === 'GET') {
        if (studentDb.length < 1) {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end('no Student found')
        } else {
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: 'All student below',
                total: studentDb.length,
                data: studentDb
            }))
        }
    } else if (url.startsWith('/students') && method === "GET") {
        const id = url.split('/')[2];
        const student = studentDb.find((e) => {
            return e.id === id
        });
        if (!student) {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end('student not found')
        } else {
            res.writeHead(200, { "content-type": "application-json" });
            res.end(JSON.stringify({
                message: 'student below',
                data: student
            }))
        }

    }
    else if (url.startsWith('/update-student') && method === 'PATCH') {
        let body = '';
        res.on('data', (chunks) => {
            body += chunks

        });
        req.on('end', ()=> {
            const update = JSON.parse(body);
            const id = url.split('/')[2];
            const student = studentDb.findIndex((e) => e.id === student.id);

            if (index !== -1) {
                studentDb[index] = student
            };
            fs.writeFile('./db/database.json', JSON.stringify(studentDb, null, 2), 'utf-8', (error,data) =>{
                if (error) {
                    res.writeHead(500, {"content-type":"text/plain"});
                    res.end('Error updating student');
                }else {
                    res.writeHead(200, {"content-type":""})
                }
            })
        })



    }
})

server.listen(PORT, () => {
    console.log(`server is running on Port:${PORT}`)
});