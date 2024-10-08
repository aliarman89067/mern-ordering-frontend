import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function MobileNavLinks() {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to={"/order-status"}
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Order Status
      </Link>
      <Link
        to={"/manage-restaurent"}
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Manage Restaurent
      </Link>
      <Link
        to={"/user-profile"}
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center font-bold px-3 hover:bg-orange-500"
      >
        Log Out
      </Button>
    </>
  );
}
