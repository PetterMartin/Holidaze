import { Link } from "@tanstack/react-router";
import { useAuth } from "../../context/auth/Auth";
import { BiLogOutCircle } from "react-icons/bi";

export default function LogoutButton() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        logout();
    };

    return (
        <>
            <Link to="/" className="flex items-center justify-between px-4 w-full logout-button hover:bg-gray-100/50 p-3 text-rose-500" onClick={handleLogout}>
            <p>Logout</p>
                <BiLogOutCircle className="text-xl" />
            </Link>
        </>
    );
}