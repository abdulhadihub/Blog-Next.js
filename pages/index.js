import Head from 'next/head'
import { PostCard, Categories, PostWidget, Navbar } from '../components'
import { getPosts } from '../services'
import { FeaturedPosts } from '../sections'


export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Abdul Hadi | Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous" />
      </Head>
      <Navbar posts={posts} />
      <div className="container mx-auto px-10 my-8">
        <FeaturedPosts />
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-8 col-span-1'>
            {posts.map((post) => <PostCard post={post.node} key={post.title} />)}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className='lg:sticky relative top-8'>
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }

}