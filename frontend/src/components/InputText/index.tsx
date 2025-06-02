interface IInputText {
	field: string;
	type?: string;
	placeholder?: string;
	onChangeCallback?: (value: string) => void;
}

export default function InputText({
	field,
	placeholder,
	type = "text",
	onChangeCallback = console.log,
}: IInputText) {
	return (
		<>
			<label
				htmlFor={field}
				className='self-start mb-2 text-gray-700 font-medium'
			>
				{field}
			</label>
			<input
				type={type}
				onChange={(e) => onChangeCallback(e.target.value)}
				id={field}
				className='w-full mb-6 p-3 bg-red rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600'
				placeholder={placeholder ?? field}
			/>
		</>
	);
}
