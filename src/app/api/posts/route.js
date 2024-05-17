import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

const POST_PER_PAGE = 5;

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const cat = searchParams.get("cat") || null;

    const query = {
        include: { user: true },
        where: {},
    };

    if (cat) {
        query.where.catSlug = cat;
    } else {
        const skip = POST_PER_PAGE * (page - 1);
        query.take = POST_PER_PAGE;
        query.skip = skip;
    }

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({ where: query.where }),
        ]);
        return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
    }
};

export const POST = async (req) => {
    const session = await getAuthSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
        );
    }

    try {
        const body = await req.json();
        const postCount = await prisma.post.count();
        const post = await prisma.post.create({
            data: { ...body, userEmail: session.user.email, slug: `post-${postCount + 1}`, },
        });

        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};