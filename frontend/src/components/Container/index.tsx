import Header from "../Header";

type ContainerProps = {
	children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
