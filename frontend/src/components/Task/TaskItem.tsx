import type { ITask } from "@/interfaces/ITask";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { api } from "@/services/apiService";

interface ITaskProps {
	task: ITask;
	deleteCallback: Function;
	updateCallback: Function;
	// completeCallback: Function;
}

export default function TaskItem({
	task,
	deleteCallback,
	updateCallback,
}: ITaskProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [updateTask, setUpdateTask] = useState<ITask>(task);

	function onToggleComplete(taskId: string) {
		console.log("concluir", taskId);
	}

	function onCancel() {
		setIsEditing(false);
		setUpdateTask(task);
	}

	function onEdit() {
		setIsEditing(true);
	}

	async function sendUpdateTask() {
		try {
			const result = await api.put("/tasks/" + updateTask.id, updateTask);
			updateCallback(result.data);
			setIsEditing(false);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}

	async function onDelete(taskId: string) {
		try {
			await api.delete("/tasks/" + taskId);
			toast.success("Tarefa removida");
			deleteCallback(task);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}

	return (
		<div
			key={task.id}
			className='border rounded-lg p-3 flex flex-col gap-2'
		>
			<div className='flex justify-between items-start gap-4'>
				<div className='flex-1'>
					{isEditing ? (
						<>
							<Input
								value={updateTask?.title}
								onChange={(e) =>
									setUpdateTask({
										...updateTask,
										title: e.target.value,
									})
								}
								className='mb-2'
							/>
							<Textarea
								value={updateTask?.description}
								onChange={(e) =>
									setUpdateTask({
										...updateTask,
										description: e.target.value,
									})
								}
							/>
							<Label className='my-2'>Estimativa</Label>
							<Input
								type='date'
								value={
									updateTask.limitDate
										? new Date(updateTask.limitDate)
												.toISOString()
												.split("T")[0]
										: ""
								}
								onChange={(e) =>
									setUpdateTask({
										...updateTask,
										limitDate: new Date(e.target.value),
									})
								}
								className='mb-2'
							/>
						</>
					) : (
						<>
							<h4 className='font-semibold'>{task.title}</h4>
							<p className='text-sm text-muted-foreground'>
								{task.description}
							</p>
							<p className='text-xs text-gray-500'>
								{task.limitDate
									? new Date(
											task.limitDate
									  ).toLocaleDateString()
									: "Sem estimativa"}
							</p>
						</>
					)}
				</div>

				<div className='flex gap-2'>
					{isEditing ? (
						<>
							<Button
								size='sm'
								onClick={sendUpdateTask}
								className='cursor-pointer'
							>
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
					) : (
						<>
							<Button
								variant={
									task.finished ? "secondary" : "outline"
								}
								className='cursor-pointer'
								size='sm'
								onClick={() => onToggleComplete(task.id!)}
							>
								{task.finished ? "Desconcluir" : "Concluir"}
							</Button>
							<Button
								className='cursor-pointer'
								variant='outline'
								size='sm'
								onClick={onEdit}
							>
								Editar
							</Button>
							<Button
								className='cursor-pointer'
								variant='destructive'
								size='sm'
								onClick={() => onDelete(task.id!)}
							>
								Apagar
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
