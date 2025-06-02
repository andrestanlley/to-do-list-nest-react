interface IButton {
	text: string;
	type?: "submit" | "reset" | "button" | undefined;
	onClickCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
	text,
	type = "submit",
	onClickCallback,
}: IButton) {
	return (
		<>
			<button
				type={type}
				className='w-full bg-purple-700 text-white py-3 rounded hover:bg-purple-800 transition-colors font-semibold cursor-pointer'
				onClick={onClickCallback}
			>
				{text}
			</button>
		</>
	);
}
