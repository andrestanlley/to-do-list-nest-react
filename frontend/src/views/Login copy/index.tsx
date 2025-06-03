import Button from "../../components/Button";
import { Button as SButton } from "@/components/ui/button";
import InputText from "../../components/InputText";
import { useState } from "react";
import doLogin from "../../services/user/doLogin";
import { useNavigate } from "react-router-dom";
import text from "../../constants/messages";

function Login() {
	const [login, setLogin] = useState({ email: "", password: "" });
	const navigator = useNavigate();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const result = await doLogin(login);
		if (!result) return;
		navigator("/home");
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
					{messages.signin.entrar}
				</h1>
				<form onSubmit={handleLogin}>
					<InputText
						field='Email'
						onChangeCallback={(e) =>
							setLogin({ ...login, email: e })
						}
					/>
					<InputText
						field='Senha'
						type='password'
						onChangeCallback={(e) =>
							setLogin({ ...login, password: e })
						}
					/>
					<Button text='Entrar' />
				</form>
				<SButton variant='link'>Registrar</SButton>
			</div>
		</div>
	);
}

export default Login;
