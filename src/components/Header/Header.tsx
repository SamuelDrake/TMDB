import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

const Header: React.FC = () => {
    return (
        <nav className="sticky top-0 z-50 bg-gray-950">
            <ul className="flex gap-16 p-4 justify-center text-white text-xl">
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.POPULAR}>Popular</Link>
                </li>
                <li>
                    <Link to={ROUTES.TOPRATED}>Top Rated</Link>
                </li>
                <li>
                    <Link to={ROUTES.UPCOMING}>Upcoming</Link>
                </li>
                <li>
                    <Link to={ROUTES.FAVORITES}>My Favorites</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
