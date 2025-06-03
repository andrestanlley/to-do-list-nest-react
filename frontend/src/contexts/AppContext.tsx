import type { IBoard } from "@/interfaces/IBoards";
import type { ITask } from "@/interfaces/ITask";
import { createContext, useContext, useState, type ReactNode } from "react";

type AppContextType = {
	tasks: ITask[];
	setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
	boards: IBoard[];
	setBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [boards, setBoards] = useState<IBoard[]>([]);

	return (
		<AppContext.Provider value={{ tasks, setTasks, boards, setBoards }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error(
			"useAppContext deve ser usado dentro de um AppProvider"
		);
	}
	return context;
};
