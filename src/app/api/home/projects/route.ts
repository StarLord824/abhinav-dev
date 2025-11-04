export async function GET() {
    return new Response("Not implemented yet");
}

export async function PUT(request: Request) {
    const body = await request.json();
    console.log(body)
    return new Response("Not implemented yet");
}

export async function DELETE(request: Request) {
    const body = await request.json();
    console.log(body)
    return new Response("Not implemented yet");
}