"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = () => {
		authClient.signIn.email(
			{
				email,
				password,
			},
			{
				onSuccess: () => {
					window.alert("Success!");
				},
				onError: () => {
					window.alert("Error!");
				},
			}
		);
	};

	const onSubmit = () => {
		authClient.signUp.email(
			{
				email,
				name,
				password,
			},
			{
				onSuccess: () => {
					window.alert("Success!");
				},
				onError: () => {
					window.alert("Error!");
				},
			}
		);
	};

	const { data: session } = authClient.useSession();

	if (session) {
		return (
			<div className="flex flex-col p-4 gap-y-4">
				<p>Logged in as {session.user.name}</p>
				<Button onClick={() => authClient.signOut()}>Sign Out</Button>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-col gap-y-10">
				{/* sign up */}
				<div className="flex flex-col gap-2 p-4">
					<Input
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={onSubmit}>Create User</Button>
				</div>
				{/* sign in */}
				<div className="flex flex-col gap-2 p-4">
					<Input
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={onLogin}>Login</Button>
				</div>
			</div>
		</>
	);
}
