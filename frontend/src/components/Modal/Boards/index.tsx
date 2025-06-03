import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import messages from "@/constants/messages";
import { useAppContext } from "@/contexts/AppContext";
import { api } from "@/services/apiService";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function BoardsModal() {
	const { setBoards } = useAppContext();
	const [newBoardName, setNewBoardName] = useState<string>("Pessoal");
	const [open, setOpen] = useState<boolean>(false);

	async function addBoard(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const result = await api.post("/boards", { name: newBoardName });
			toast(messages.boards.create_sucess);
			setBoards((prev) => [...prev, result.data]);
			setOpen(false);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}
	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Card
					onClick={() => setOpen(true)}
					className='w-full p-4 flex items-center justify-center border-dashed border-2 text-muted-foreground h-full  cursor-pointer'
				>
					<Plus size={24} />
					<span>Adicionar novo quadro</span>
				</Card>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<form onSubmit={addBoard}>
					<DialogHeader>
						<DialogTitle>{messages.boards.modal_title}</DialogTitle>
						<DialogDescription>
							{messages.boards.modal_span}
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4'>
						<div className='grid gap-3 mt-2'>
							<Input
								id='name-1'
								name='name'
								defaultValue={newBoardName}
								onChange={(e) =>
									setNewBoardName(e.target.value)
								}
							/>
						</div>
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
						<Button type='submit'>{messages.main.create}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
