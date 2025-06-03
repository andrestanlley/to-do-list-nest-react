import messages from "@/constants/messages";
import { Button } from "../ui/button";

export default function Header() {
	return (
		<div className='bg-purple-600 flex justify-between items-center px-4 h-12'>
			<h1 className="text-white text-2xl">{messages.main.appName}</h1>
			<Button variant="link" className="text-white">{messages.main.logout}</Button>
		</div>
	);
}
