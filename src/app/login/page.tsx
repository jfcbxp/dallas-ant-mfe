'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo_grande from '../../../public/logo_grande.png';
import Cgc from '@/components/inputs/cgc';
import Button from '@/components/buttons/button';
import useIsMobile from '@/hooks/useIsMobile';
import { fetchLogin } from '../../services/fetchLogin';
import { LoginContainer, LoginForm, LoginLogoContainer, LoginTitle } from './styles';
import { useAuthContext } from '@/contexts/AuthContext';
import Password from '@/components/inputs/password';

export default function LoginPage() {
	const [cgc, setCgc] = useState('');
	const [senha, setSenha] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { token, setToken } = useAuthContext();
	const router = useRouter();
	const isMobile = useIsMobile();

	useEffect(() => {
		if (token) router.push('/orders');
	}, [router, token]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		fetchLogin(cgc, senha).then((response) => {
			setIsLoading(false);
			if (response && !response.startsWith('Failed to fetch')) {
				setToken(response);
			} else {
				alert(response);
			}
		});
	};

	return (
		<LoginContainer>
			<div style={{ width: isMobile ? '100%' : '400px' }}>
				<LoginLogoContainer>
					<Image
						alt='logo_grande'
						src={logo_grande}
						height={75}></Image>
				</LoginLogoContainer>
				<LoginTitle>Portal do Revendedor Rommanel-PA</LoginTitle>

				<LoginForm onSubmit={handleSubmit}>
					<Cgc
						value={cgc}
						onChange={(e) => setCgc(e.value)}
					/>
					<Password
						value={senha}
						onChange={(e) => setSenha(e.target.value.trim())}
					/>
					<Button
						label='Entrar'
						loading={isLoading}
						disabled={cgc.replaceAll('_', '').length < 11 || senha.length < 6}
					/>
				</LoginForm>
			</div>
		</LoginContainer>
	);
}
