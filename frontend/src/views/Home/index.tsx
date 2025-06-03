import { useEffect } from "react";
import { toast } from "sonner";
import { BoardsModal } from "@/components/Modal/Boards";
import { api } from "@/services/apiService";
import Container from "@/components/Container";
import { useAppContext } from "@/contexts/AppContext";
import { getTokenFromCookie } from "@/services/getTokenCookie";
import { useNavigate } from "react-router-dom";
import { BoardListModal } from "@/components/Modal/Boards/list";

export default function Home() {
	const navigator = useNavigate();
	const hasLogged = getTokenFromCookie();
	const { boards, setBoards } = useAppContext();

	async function fetchBoards() {
		try {
			const res = await api.get("/boards");
			setBoards(res.data);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}

	useEffect(() => {
		if (!hasLogged) {
			navigator("/");
			return;
		}
		fetchBoards();
	}, []);

	return (
		<Container>
			<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-purple-200 h-screen auto-rows-[300px]'>
				{boards.map((board) => (
					<BoardListModal key={board.id} board={board} />
				))}

				<BoardsModal />
			</div>
		</Container>
	);
}
