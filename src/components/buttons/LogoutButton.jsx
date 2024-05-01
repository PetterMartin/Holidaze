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
            <Link to="/" className="flex gap-4 w-full logout-button hover:bg-gray-100/50 p-3 whitespace-nowrap text-rose-500" onClick={handleLogout}>
                <div>Logout</div>
                <BiLogOutCircle className="text-xl me-8" />
            </Link>
        </>
    );
}