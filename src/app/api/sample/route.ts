import { NextRequest, NextResponse } from "next/server"

export function GET( Request : Request ) {
    return Response.json({
        email : "test@test.com",
        name : "test",
    })
}

export async function POST(Request: NextRequest) {
    const body = await Request.json(); 
    console.log(body);
    return NextResponse.json({
        message : "You are logged in !!"
    })
}

export function PUT(){
    let name="Arpita"
    let surname="Shukla"
    console.log("Hello, My name is"+name+" surname is"+surname)
    console.log(name+" "+surname);
}
//equivalent express code
// app.get("/api/user", (req, res) => {
//     res.send({
//         email : "test@test.com",
//         name : "test",
//     })
// });