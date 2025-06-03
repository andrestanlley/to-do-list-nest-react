import messages from "@/constants/messages";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import doLogout from "@/services/user/doLogout";

export default function Header() {
	const navigator = useNavigate();

	function handleLogout() {
		doLogout();
		navigator("/");
	}
	
	return (
		<div className='bg-purple-600 flex justify-between items-center px-4 h-12'>
			<h1 className='text-white text-2xl'>{messages.main.appName}</h1>
			<Button
				variant='link'
				className='text-white cursor-pointer'
				onClick={handleLogout}
			>
				{messages.main.logout}
			</Button>
		</div>
	);
}
