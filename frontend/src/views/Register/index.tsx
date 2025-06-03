import Button from "../../components/Button";
import InputText from "../../components/InputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/services/apiService";
import messages from "@/constants/messages";

function Register() {
	const navigator = useNavigate();
	const [account, setAccount] = useState({
		name: "",
		email: "",
		password: "",
	});

	async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const result = await api.post("/users", {
				name: account.name,
				email: account.email,
				password: account.password,
			});
			if (result.status === 201) return navigator("/");
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	}

	return (
		<div className='flex h-screen w-full'>
			<div className='w-1/2 bg-purple-800 flex items-center justify-center flex-col'>
				<h1 className='text-white text-4xl font-bold'>myTasks</h1>
				<span className='text-white p-16 text-justify'>
					{messages.signin.welcome_text}
				</span>
			</div>

			<div className='w-1/2 bg-gray-100 flex flex-col justify-center items-center p-12 rounded-l-3xl shadow-lg'>
				<h1 className='text-3xl font-semibold mb-8 text-gray-800'>
					{messages.register.registrar}
				</h1>
				<form onSubmit={handleRegister}>
					<InputText
						field='Nome'
						onChangeCallback={(e) =>
							setAccount({ ...account, name: e })
						}
					/>
					<InputText
						field='Email'
						onChangeCallback={(e) =>
							setAccount({ ...account, email: e })
						}
					/>
					<InputText
						field='Senha'
						type='password'
						onChangeCallback={(e) =>
							setAccount({ ...account, password: e })
						}
					/>
					<Button text='Registrar' />
				</form>
			</div>
		</div>
	);
}

export default Register;
