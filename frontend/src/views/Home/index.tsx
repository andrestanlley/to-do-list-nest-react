import { useEffect, useState } from "react";
import type { IBoard } from "../../interfaces/IBoards";
import getBoardsByUser from "../../services/getBoardsByUser";
import { api } from "../../services/apiService";

export default function Home() {
	const [boards, setBoards] = useState<IBoard[]>([]);

	async function fetchBoards() {
		try {
            console.log(api.defaults.headers.common['Authorization']);
			const res = await getBoardsByUser();
			setBoards(res.data);
		} catch (error) {
			console.error("Erro ao buscar boards:", error);
		}
	}

	useEffect(() => {
		fetchBoards();
	}, []);

	return (
		<>
			<div>Pessoal</div>
			{boards.map((board) => (
				<div key={board.id}>{board.name}</div>
			))}
		</>
	);
}
