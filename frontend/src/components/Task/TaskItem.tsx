import type { ITask } from "@/interfaces/ITask";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { api } from "@/services/apiService";
import { useAppContext } from "@/contexts/AppContext";
import { GrValidate } from "react-icons/gr";
import { CiCircleMinus } from "react-icons/ci";
import { FaRegEdit, FaTrash } from "react-icons/fa";

interface ITaskProps {
	task: ITask;
	boardId: string;
}

export default function TaskItem({ task, boardId }: ITaskProps) {
	const { setTasks } = useAppContext();
	const [isEditing, setIsEditing] = useState(false);
	const [updateTask, setUpdateTask] = useState<ITask>(task);

	function onCancel() {
		setIsEditing(false);
		setUpdateTask(task);
	}

	function onEdit() {
		setIsEditing(true);
	}

	function updateTasks(editedTask: ITask) {
		setTasks((prev) =>
			prev.map((task) => (task.id === editedTask.id ? editedTask : task))
		);
	}

	function removeTask(deletedTask: ITask) {
		setTasks((prev) => prev.filter((task) => task.id !== deletedTask.id));
	}

	async function sendUpdateTask() {
		try {
			const result = await api.put("/tasks/" + updateTask.id, {
				...updateTask,
				board: { id: boardId },
			});
			updateTasks(result.data);
			setIsEditing(false);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}

	async function onDelete(taskId: string) {
		try {
			await api.delete(`/tasks/${boardId}/${taskId}`);
			toast.success("Tarefa removida");
			removeTask(task);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}

	async function onToggle() {
		try {
			await api.put("tasks/toggle/" + task.id, {
				...task,
				board: {
					id: boardId,
				},
			});
			updateTasks({ ...task, finished: !task.finished });
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}

	function getBgColor() {
		if (!task.limitDate) return;

		const now = new Date();
		const limitDate = new Date(task.limitDate);
		const threeDaysFromNow = new Date(now);
		threeDaysFromNow.setDate(now.getDate() + 3);

		if (task.finished) return "bg-green-50";
		if (limitDate >= threeDaysFromNow) return;
		if (limitDate < now) return "bg-red-100";

		return;
	}

	return (
		<div
			key={task.id}
			className={`border rounded-lg p-3 flex flex-col gap-2 ${getBgColor()}`}
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
								onChange={(e) => {
									if (!e.target.value) return "";
									const date = new Date(e.target.value);
									date.setHours(date.getHours() + 3);
									setUpdateTask({
										...task,
										limitDate: date,
									});
								}}
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
									? new Date(task.limitDate)
											.toISOString()
											.split("T")[0]
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
								onClick={() => onToggle()}
							>
								{task.finished ? (
									<CiCircleMinus />
								) : (
									<GrValidate />
								)}
							</Button>
							<Button
								className='cursor-pointer'
								variant='outline'
								size='sm'
								onClick={onEdit}
							>
								<FaRegEdit />
							</Button>
							<Button
								className='cursor-pointer'
								variant='destructive'
								size='sm'
								onClick={() => onDelete(task.id!)}
							>
								<FaTrash />
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
