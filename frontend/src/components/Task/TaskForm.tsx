import type { ITask } from "@/interfaces/ITask";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import type { IBoard } from "@/interfaces/IBoards";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { api } from "@/services/apiService";

interface ITaskProps {
	board: IBoard;
	hidden: boolean;
	toggleHidden: Function;
	newTaskCallback: Function;
}

export default function TaskForm({
	board,
	hidden,
	toggleHidden,
	newTaskCallback,
}: ITaskProps) {
	const blankTask = {
		title: "",
		description: "",
		limitDate: undefined,
		board: { id: board.id },
	};
	const [task, setTask] = useState<ITask>(blankTask);

	function onCancel() {
		toggleHidden();
		setTask(blankTask);
	}

	async function onSave() {
		try {
			const result = await api.post("/tasks", task);
			newTaskCallback(result.data);
			onCancel();
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}

	return (
		<div
			className='border rounded-lg p-3 flex flex-col gap-2'
			hidden={hidden}
		>
			<div className='flex justify-between items-start gap-4'>
				<div className='flex-1'>
					<>
						<Input
							value={task.title}
							placeholder='Título'
							onChange={(e) =>
								setTask({
									...task,
									title: e.target.value,
								})
							}
							className='mb-2'
						/>
						<Textarea
							placeholder='Descrição da tarefa'
							value={task.description}
							onChange={(e) =>
								setTask({
									...task,
									description: e.target.value,
								})
							}
						/>
						<Label className='my-2'>Estimativa</Label>
						<Input
							type='date'
							value={
								task.limitDate
									? new Date(task.limitDate)
											.toISOString()
											.split("T")[0]
									: ""
							}
							onChange={(e) =>
								setTask({
									...task,
									limitDate: new Date(e.target.value),
								})
							}
							className='mb-2'
						/>
					</>
				</div>

				<div className='flex gap-2'>
					<>
						<Button size='sm' onClick={onSave}>
							Salvar
						</Button>
						<Button
							variant='ghost'
							size='sm'
							onClick={onCancel}
							className='cursor-pointer'
						>
							Cancelar
						</Button>
					</>
				</div>
			</div>
		</div>
	);
}
