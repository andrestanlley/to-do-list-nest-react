import { useEffect, useState } from "react";
import type { IBoard } from "@/interfaces/IBoards";
import { toast } from "sonner";
import { BoardsModal } from "@/components/Modal/Boards";
import { TasksModal } from "@/components/Modal/Tasks";
import { api } from "@/services/apiService";

export default function Home() {
	const [boards, setBoards] = useState<IBoard[]>([]);

	async function fetchBoards() {
		try {
			const res = await api.get("/boards");
			setBoards(res.data);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}

	function updateBoards(board: IBoard) {
		setBoards([...boards, board]);
	}

	useEffect(() => {
		fetchBoards();
	}, []);

	return (
		<>
			<div className='grid grid-cols-4 gap-4 p-4 bg-purple-200 h-screen'>
				{boards.map((board) => (
					<TasksModal key={board.id} board={board} />
				))}

				<BoardsModal updateBoardsCallback={updateBoards} />
			</div>
		</>
	);
}
