export async function POST(req) {
    try {
      const body = await req.json();
  
      const { name, email, message } = body;
  
      // Do something with the data (e.g., save to DB, send email)
      console.log('Received contact data:', { name, email, message });
  
      return Response.json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error(error);
      return new Response('Server error', { status: 500 });
    }
  }
  