import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navList">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/ssr">SSR</Link>
                </li>
                <li>
                    <Link href="/ssg">SSG</Link>
                </li>
                
            </ul>
        </nav>
    );
};

export default Navbar;