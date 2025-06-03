import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import messages from "@/constants/messages";
import type { IBoard } from "@/interfaces/IBoards";
import type { ITask } from "@/interfaces/ITask";
import TaskItem from "@/components/Task/TaskItem";
import TaskForm from "@/components/Task/TaskForm";
import { api } from "@/services/apiService";

interface TasksModalProps {
	board: IBoard;
}

export function TasksModal({ board }: TasksModalProps) {
	const [open, setOpen] = useState(false);
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [newTaskForm, setNewTaskForm] = useState<boolean>(true);

	async function getTasks() {
		try {
			const result = await api.get("/tasks", {
				params: {
					boardId: board.id,
				},
			});
			setTasks(result.data);
		} catch (error) {}
	}

	function toggleHiddenNewTaskForm() {
		setNewTaskForm(!newTaskForm);
	}

	function addNewTask(task: ITask) {
		setTasks([...tasks, task]);
	}

	function updateTasks(editedTask: ITask) {
		const actualTasks = tasks.filter((task) => task.id !== editedTask.id);
		setTasks([...actualTasks, editedTask]);
	}

	function removeTask(deletedTask: ITask) {
		const actualTasks = tasks.filter((task) => task.id !== deletedTask.id);
		setTasks(actualTasks);
	}

	useEffect(() => {
		getTasks();
	}, [board.id]);

	const sortedTasks = tasks.sort((a, b) => {
		if (!a.limitDate) return 1;
		if (!b.limitDate) return -1;
		return (
			new Date(a.limitDate).getTime() - new Date(b.limitDate).getTime()
		);
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Card
					key={board.id}
					className='h-48 w-full p-4 flex flex-col justify-between shadow-md'
				>
					<div>
						<CardTitle className='text-xl'>{board.name}</CardTitle>
					</div>
					<Button variant='outline' size='sm'>
						Ver tarefas
					</Button>
				</Card>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto px-8'>
				<DialogHeader>
					<section className='flex justify-between'>
						<div>
							<DialogTitle>
								{messages.tasks.modal_title}
							</DialogTitle>
							<DialogDescription>{board.name}</DialogDescription>
						</div>
						<Button
							onClick={() => toggleHiddenNewTaskForm()}
							className='cursor-pointer'
						>
							Criar tarefa
						</Button>
					</section>
				</DialogHeader>

				<TaskForm
					board={board}
					hidden={newTaskForm}
					toggleHidden={toggleHiddenNewTaskForm}
					newTaskCallback={addNewTask}
				/>

				<div className='grid gap-4 mt-4'>
					{sortedTasks.length === 0 ? (
						<p className='text-sm text-muted-foreground'>
							Não há tarefas cadastradas.
						</p>
					) : (
						sortedTasks.map((task) => (
							<TaskItem
								key={task.id}
								task={task}
								deleteCallback={removeTask}
								updateCallback={updateTasks}
							/>
						))
					)}
				</div>

				<DialogFooter className='mt-4'>
					<DialogClose asChild>
						<Button
							variant='outline'
							onClick={() => setOpen(false)}
						>
							{messages.main.cancel}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
