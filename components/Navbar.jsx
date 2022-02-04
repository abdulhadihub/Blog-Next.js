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
                {/* <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="nav_menu" id="navbarCollapse">
                    <div className="nav_menu_list">
                        <ul>

                            <li><Link href="/"><span className="nav_item active">Home</span></Link></li>
                            <li><Link href="/"><span className="nav_item">About</span></Link></li>
                            <li><span className="nav_item drop_down">Categories</span>
                                <ul>
                                    {categories.map((category) => (
                                        <li><Link key={category.slug} href={`/category/${category.slug}`}>
                                            <span className="">
                                                {category.name}
                                            </span>
                                        </Link></li>
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
                                        <li><Link href="/"><span className="">item-1</span></Link></li>
                                        <li><Link href="/"><span className="">item-2</span></Link></li>
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
