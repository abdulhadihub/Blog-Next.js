import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services'
import { getRecentPosts, getSimilarPosts } from '../services'



const Navbar = ({ slug }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    const [relatedPosts, setRelatedPosts] = useState([]);
    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }
    }, [slug])

    // Burger Menu Toggle
    const [state, setState] = useState(false);
    let toggleActive = () => {
        setState(!state);
    }
    let addListClass = state ? "toggle_menu" : "";
    let menuListClass = `nav_menu_list ${addListClass}`;

    let addNavClass = state ? "shown" : ""
    let navClass = `nav_container ${addNavClass}`

    return (
        <>
            <nav className={navClass}>
                <div className="link_container">
                    <Link href="/">
                        <a>
                            <h1 className="logo_text"><span className="text_primary">Abdul</span>Hadi</h1>
                        </a>
                    </Link>
                </div>
                <div className="menu_icons" onClick={toggleActive}>
                    <i className="fas fa-bars"></i>
                    <i className="fas fa-times"></i>
                </div>
                <div className="nav_menu" id="navbarCollapse">
                    <div className={menuListClass}>
                        <ul>
                            <li><Link href="/"><span className="nav_item active">Home</span></Link></li>
                            <li><Link href="/"><span className="nav_item">About</span></Link></li>
                            <li><span className="nav_item dropdown">Categories<i className="fas fa-angle-down"></i></span>
                                <ul className='sub_menu'>
                                    {categories.map((category) => (
                                        <li><Link key={category.slug} href={`/category/${category.slug}`}>
                                            <a>
                                                <span className="">
                                                    {category.name}
                                                </span>
                                            </a>
                                        </Link>
                                            <ul className='sub_menu'>
                                                {relatedPosts.map((post) => (
                                                    <li>
                                                        <Link key={post.title} href={`/post/${post.slug}`}>
                                                            <a>
                                                                <span className="">
                                                                    {post.title}
                                                                </span>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {/* {categories.map((category) => (
                                <li><Link key={category.slug} href={`/category/${category.slug}`}>
                                    <span className="nav_item drop_down">
                                        {category.name}
                                    </span>
                                </Link>
                                    <ul>
                                        {relatedPosts.map((post) => (
                                            <li><Link href={`/post/${post.slug}`} key={post.title} className="">
                                                <span> {post.title}</span>
                                            </Link></li>
                                        ))}
                                    </ul>
                                </li>
                            ))} */}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
