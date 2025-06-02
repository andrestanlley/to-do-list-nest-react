import Button from "../../components/Button";
import InputText from "../../components/InputText";
import { useState } from "react";
import doLogin from "../../services/doLogin";
import { useNavigate } from "react-router-dom";

function Login() {
	const [login, setLogin] = useState({ email: "", password: "" });
	const navigator = useNavigate();

	async function handleLogin() {
		const result = await doLogin(login);
		if (!result) return;
		navigator("/home");
	}

	return (
		<div className='flex h-screen w-full'>
			<div className='w-1/2 bg-purple-800 flex items-center justify-center flex-col'>
				<h1 className='text-white text-4xl font-bold'>myTasks</h1>
				<span className='text-white p-16 text-justify'>
					Organize suas tarefas de forma simples e eficiente.
					Adicione, edite e marque como concluídas todas as suas
					atividades do dia. Comece agora e aumente sua produtividade!
				</span>
			</div>

			<div className='w-1/2 bg-gray-100 flex flex-col justify-center items-center p-12 rounded-l-3xl shadow-lg'>
				<h1 className='text-3xl font-semibold mb-8 text-gray-800'>
					Entrar
				</h1>

				<InputText
					field='Email'
					onChangeCallback={(e) => setLogin({ ...login, email: e })}
				/>
				<InputText
					field='Senha'
					type='password'
					onChangeCallback={(e) =>
						setLogin({ ...login, password: e })
					}
				/>
				<Button text='Entrar' onClickCallback={handleLogin} />
			</div>
		</div>
	);
}

export default Login;
