import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { FiShoppingBag, FiUser, FiLogOut } from "react-icons/fi";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/products" className="flex items-center">
            <FiShoppingBag className="h-6 w-6 mr-2" />
            <span className="font-bold">Shop</span>
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <FiUser className="h-5 w-5 mr-2" />
                {user.username}
              </span>
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-900"
                data-testid="logout-button"
              >
                <FiLogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
