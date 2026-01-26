'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo_grande from '../../../public/logo_grande.png';
import { useRegister } from '@/hooks/useRegister';
import { usePulseiras } from '@/hooks/usePulseiras';
import {
	RegisterContainer,
	RegisterWrapper,
	RegisterHeader,
	LogoContainer,
	RegisterTitle,
	RegisterSubtitle,
	RegisterForm,
	FormSection,
	SectionTitle,
	FormGrid,
	FormGroup,
	FormLabel,
	FormInput,
	FormSelect,
	PulseiraSelector,
	PulseiraBadge,
	ButtonContainer,
	SubmitButton,
	CancelButton,
	ErrorMessage,
	SuccessMessage,
	LoadingSpinner,
} from './styles';

interface FormData {
	name: string;
	email: string;
	phone: string;
	cpf: string;
	height: string;
	weight: string;
	age: string;
	gender: string;
	pulseiraDeviceId: number | null;
}

export default function RegisterPage() {
	const router = useRouter();
	const { data: pulseiras = [] } = usePulseiras();
	const { mutate: register, isPending, isError, error, isSuccess } = useRegister();

	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		cpf: '',
		height: '',
		weight: '',
		age: '',
		gender: 'M',
		pulseiraDeviceId: null,
	});

	const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				router.push('/dashboard');
			}, 2000);
		}
	}, [isSuccess, router]);

	const validateForm = (): boolean => {
		const errors: Partial<FormData> = {};

		if (!formData.name.trim()) errors.name = true;
		if (!formData.email.trim() || !formData.email.includes('@')) errors.email = true;
		if (!formData.phone.trim()) errors.phone = true;
		if (!formData.cpf.trim() || formData.cpf.replace(/\D/g, '').length < 11) errors.cpf = true;
		if (!formData.height || parseFloat(formData.height) <= 0) errors.height = true;
		if (!formData.weight || parseFloat(formData.weight) <= 0) errors.weight = true;
		if (!formData.age || parseInt(formData.age) <= 0 || parseInt(formData.age) > 150) errors.age = true;
		if (!formData.pulseiraDeviceId) errors.pulseiraDeviceId = true;

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleInputChange = (field: keyof FormData, value: string | number) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
		setFormErrors((prev) => ({
			...prev,
			[field]: undefined,
		}));
	};

	const handlePulseiraSelect = (deviceId: number) => {
		setFormData((prev) => ({
			...prev,
			pulseiraDeviceId: prev.pulseiraDeviceId === deviceId ? null : deviceId,
		}));
		setFormErrors((prev) => ({
			...prev,
			pulseiraDeviceId: undefined,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		register({
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			cpf: formData.cpf,
			height: parseFloat(formData.height),
			weight: parseFloat(formData.weight),
			age: parseInt(formData.age),
			gender: formData.gender,
			pulseiraDeviceId: formData.pulseiraDeviceId || 0,
		});
	};

	const handleCancel = () => {
		router.push('/dashboard');
	};

	const isFormValid =
		formData.name &&
		formData.email &&
		formData.phone &&
		formData.cpf &&
		formData.height &&
		formData.weight &&
		formData.age &&
		formData.pulseiraDeviceId;

	return (
		<RegisterContainer>
			<RegisterWrapper>
				<RegisterHeader>
					<LogoContainer>
						<Image
							alt='logo_grande'
							src={logo_grande}
							height={75}
						/>
					</LogoContainer>
					<RegisterTitle>Criar Conta</RegisterTitle>
					<RegisterSubtitle>Cadastre-se e vinculte sua pulseira de monitoramento</RegisterSubtitle>
				</RegisterHeader>

				<RegisterForm onSubmit={handleSubmit}>
					{/* Personal Information */}
					<FormSection>
						<SectionTitle>Informações Pessoais</SectionTitle>
						<FormGrid>
							<FormGroup className='full'>
								<FormLabel htmlFor='name'>Nome Completo *</FormLabel>
								<FormInput
									id='name'
									type='text'
									placeholder='João Silva'
									value={formData.name}
									onChange={(e) => handleInputChange('name', e.target.value)}
								/>
								{formErrors.name && <ErrorMessage>Nome é obrigatório</ErrorMessage>}
							</FormGroup>

							<FormGroup>
								<FormLabel htmlFor='email'>Email *</FormLabel>
								<FormInput
									id='email'
									type='email'
									placeholder='joao@example.com'
									value={formData.email}
									onChange={(e) => handleInputChange('email', e.target.value)}
								/>
								{formErrors.email && <ErrorMessage>Email válido é obrigatório</ErrorMessage>}
							</FormGroup>

							<FormGroup>
								<FormLabel htmlFor='cpf'>CPF *</FormLabel>
								<FormInput
									id='cpf'
									type='text'
									placeholder='000.000.000-00'
									value={formData.cpf}
									onChange={(e) => handleInputChange('cpf', e.target.value)}
								/>
								{formErrors.cpf && <ErrorMessage>CPF válido é obrigatório</ErrorMessage>}
							</FormGroup>

							<FormGroup>
								<FormLabel htmlFor='phone'>Telefone *</FormLabel>
								<FormInput
									id='phone'
									type='tel'
									placeholder='(11) 98765-4321'
									value={formData.phone}
									onChange={(e) => handleInputChange('phone', e.target.value)}
								/>
								{formErrors.phone && <ErrorMessage>Telefone é obrigatório</ErrorMessage>}
							</FormGroup>
						</FormGrid>
					</FormSection>

					{/* Physical Information */}
					<FormSection>
						<SectionTitle>Informações Físicas</SectionTitle>
						<FormGrid>
							<FormGroup>
								<FormLabel htmlFor='gender'>Gênero *</FormLabel>
								<FormSelect
									id='gender'
									value={formData.gender}
									onChange={(e) => handleInputChange('gender', e.target.value)}>
									<option value='M'>Masculino</option>
									<option value='F'>Feminino</option>
									<option value='O'>Outro</option>
									<option value='N'>Prefiro não informar</option>
								</FormSelect>
							</FormGroup>

							<FormGroup>
								<FormLabel htmlFor='age'>Idade *</FormLabel>
								<FormInput
									id='age'
									type='number'
									placeholder='30'
									min='1'
									max='150'
									value={formData.age}
									onChange={(e) => handleInputChange('age', e.target.value)}
								/>
								{formErrors.age && <ErrorMessage>Idade válida é obrigatória</ErrorMessage>}
							</FormGroup>

							<FormGroup>
								<FormLabel htmlFor='height'>Altura (cm) *</FormLabel>
								<FormInput
									id='height'
									type='number'
									placeholder='175'
									min='100'
									max='250'
									step='0.1'
									value={formData.height}
									onChange={(e) => handleInputChange('height', e.target.value)}
								/>
								{formErrors.height && <ErrorMessage>Altura válida é obrigatória</ErrorMessage>}
							</FormGroup>

							<FormGroup>
								<FormLabel htmlFor='weight'>Peso (kg) *</FormLabel>
								<FormInput
									id='weight'
									type='number'
									placeholder='75'
									min='20'
									max='300'
									step='0.1'
									value={formData.weight}
									onChange={(e) => handleInputChange('weight', e.target.value)}
								/>
								{formErrors.weight && <ErrorMessage>Peso válido é obrigatório</ErrorMessage>}
							</FormGroup>
						</FormGrid>
					</FormSection>

					{/* Pulseira Selection */}
					<FormSection>
						<SectionTitle>Vincular Pulseira *</SectionTitle>
						<FormLabel>Selecione sua pulseira ANT+:</FormLabel>
						{pulseiras.length > 0 ? (
							<PulseiraSelector>
								{pulseiras.map((pulseira) => (
									<PulseiraBadge
										key={pulseira.deviceId}
										type='button'
										$isSelected={formData.pulseiraDeviceId === pulseira.deviceId}
										onClick={() => handlePulseiraSelect(pulseira.deviceId)}>
										Device {pulseira.deviceId}
										<small>{pulseira.heartRate} bpm</small>
									</PulseiraBadge>
								))}
							</PulseiraSelector>
						) : (
							<div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginTop: '8px' }}>
								Nenhuma pulseira disponível. Certifique-se de que sua pulseira está conectada.
							</div>
						)}
						{formErrors.pulseiraDeviceId && <ErrorMessage>Selecione uma pulseira para continuar</ErrorMessage>}
					</FormSection>

					{/* Messages */}
					{isError && (
						<ErrorMessage style={{ marginBottom: '20px' }}>Erro ao registrar: {error?.message || 'Tente novamente'}</ErrorMessage>
					)}

					{isSuccess && <SuccessMessage style={{ marginBottom: '20px' }}>Registro realizado com sucesso! Redirecionando...</SuccessMessage>}

					{/* Buttons */}
					<ButtonContainer>
						<CancelButton
							type='button'
							onClick={handleCancel}
							disabled={isPending}>
							Voltar
						</CancelButton>
						<SubmitButton
							type='submit'
							disabled={!isFormValid || isPending}>
							{isPending ? (
								<>
									<LoadingSpinner /> Criando conta...
								</>
							) : (
								'Criar Conta'
							)}
						</SubmitButton>
					</ButtonContainer>
				</RegisterForm>
			</RegisterWrapper>
		</RegisterContainer>
	);
}
