import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services'


const Navbar = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    return (
        <>
            <nav className="nav_container">
                <div className="link_container">
                    <Link href="/">
                        <h1 className="logo_text"><span className="text_primary">Abdul</span>Hadi</h1>
                    </Link>
                </div>
                <div className="menu_icons">
                    <i className="fas fa-bars"></i>
                    <i className="fas fa-times"></i>
                </div>
                <div className="nav_menu" id="navbarCollapse">
                    <div className="nav_menu_list">
                        <ul>
                            <li><Link href="/"><span className="nav_item active">Home</span></Link></li>
                            <li><Link href="/"><span className="nav_item">About</span></Link></li>
                            <li><span className="nav_item dropdown">Categories<i className="fas fa-angle-down"></i></span>
                                <ul className='sub_menu'>
                                    {categories.map((category) => (
                                        <li><Link key={category.slug} href={`/category/${category.slug}`}>
                                            <span className="">
                                                {category.name}<i className="fas fa-angle-down"></i>
                                            </span>
                                        </Link>
                                            <ul className='sub_menu'>
                                                <li><Link href="/"><span className="nav_item dropdown_items dropdown">item-1</span></Link></li>
                                                <li><Link href="/"><span className="nav_item dropdown_items dropdown">item-2</span></Link></li>
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {categories.map((category) => (
                                <li><Link key={category.slug} href={`/category/${category.slug}`}>
                                    <span className="nav_item drop_down">
                                        {category.name}
                                    </span>
                                </Link>
                                    <ul>
                                        {/* {relatedPosts.map((post) => (
                                            <li><Link href={`/post/${post.slug}`} key={post.title} className="">
                                                <span> {post.title}</span>
                                            </Link></li>
                                        ))} */}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
