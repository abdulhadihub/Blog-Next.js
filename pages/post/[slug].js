import React from 'react';
import { getPosts, getPostDetails } from '../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader, Navbar } from '../../components';
import { useRouter } from 'next/router'
import Head from 'next/head'

const PostDetails = ({ posts, post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />
    }

    return (
        <>
            <Head>
                <title>Abdul Hadi | Blog</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous" />
            </Head>
            <Navbar posts={posts} />
            <div className='container mx-auto px-10 my-8'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                    <div className='col-span-1 lg:col-span-8'>
                        <PostDetail post={post} />
                        <Author author={post.author} />
                        <CommentsForm slug={post.slug} />
                        <Comments slug={post.slug} />
                    </div>
                    <div className='col-span-1 lg:col-span-4'>
                        <div className='relative lg:sticky top-8'>
                            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetails;

export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug)
    const posts = (await getPosts()) || [];

    return {
        props: { post: data, posts }
    }

}

export async function getStaticPaths() {
    const posts = await getPosts();

    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true,
    }
}