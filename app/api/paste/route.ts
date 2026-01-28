import {kv} from "@vercel/kv";
import {nanoid} from "nanoid";

export async function POST (req:Request)
{
    const { content } = await req.json();

    if(!content)
    {
        return new Response("Content is required",{status:400});
    }

    const id = nanoid(6);
    await kv.set(id,content);

    return Response.json({id,content});
}