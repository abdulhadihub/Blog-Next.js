import React from 'react';
import { useRouter } from 'next/router';
import { getCategories, getCategoryPost, getPosts } from '../../services';
import { PostCard, Categories, Loader, Navbar } from '../../components';
import Head from 'next/head'

const CategoryPost = ({ posts, navPosts }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <>
            <Head>
                <title>Abdul Hadi | Blog</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous" />
            </Head>
            <Navbar posts={navPosts} />
            <div className="container mx-auto px-10 my-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        {posts.map((post, index) => (
                            <PostCard key={index} post={post.node} />
                        ))}
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
    const posts = await getCategoryPost(params.slug);
    const navPosts = (await getPosts()) || [];

    return {
        props: { posts, navPosts },
    };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
    const categories = await getCategories();
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
}