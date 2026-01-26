'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/useRegister';
import {
	RegisterContainer,
	RegisterWrapper,
	RegisterHeader,
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
	ButtonContainer,
	SubmitButton,
	CancelButton,
	ErrorMessage,
	SuccessMessage,
	LoadingSpinner,
} from './styles';

interface FormData {
	name: string;
	height: string;
	weight: string;
	birthDate: string;
	gender: string;
}

type FormErrors = Partial<Record<keyof FormData, boolean>>;

export default function RegisterPage() {
	const router = useRouter();
	const { mutate: register, isPending, isError, error, isSuccess } = useRegister();

	const [formData, setFormData] = useState<FormData>({
		name: '',
		height: '',
		weight: '',
		birthDate: '',
		gender: 'M',
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({});

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				router.push('/register');
			}, 2000);
		}
	}, [isSuccess, router]);

	const validateForm = (): boolean => {
		const errors: FormErrors = {};

		if (!formData.name.trim()) errors.name = true;
		if (!formData.height || Number.parseFloat(formData.height) <= 0) errors.height = true;
		if (!formData.weight || Number.parseFloat(formData.weight) <= 0) errors.weight = true;
		if (!formData.birthDate || !isValidBirthDate(formData.birthDate)) errors.birthDate = true;

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const maskBirthDate = (value: string): string => {
		const numbers = value.replaceAll(/\D/g, '');
		if (numbers.length <= 2) return numbers;
		if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
		return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
	};

	const isValidBirthDate = (dateString: string): boolean => {
		const regex = /^\d{2}\/\d{2}\/\d{4}$/;
		if (!regex.test(dateString)) return false;

		const [day, month, year] = dateString.split('/').map(Number);
		const date = new Date(year, month - 1, day);

		const isValidDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
		const age = new Date().getFullYear() - year;
		const isValidAge = age >= 0 && age <= 150;

		return isValidDate && isValidAge;
	};

	const convertBirthDateToISO = (dateString: string): string => {
		const [day, month, year] = dateString.split('/');
		return `${year}-${month}-${day}`;
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		register({
			name: formData.name,
			height: Number.parseFloat(formData.height),
			weight: Number.parseFloat(formData.weight),
			birthDate: convertBirthDateToISO(formData.birthDate),
			gender: formData.gender,
		});
	};

	const handleCancel = () => {
		router.push('/register');
	};

	const isFormValid = formData.name && formData.height && formData.weight && formData.birthDate;
	return (
		<RegisterContainer>
			<RegisterWrapper>
				<RegisterHeader>
					<RegisterTitle>Criar Conta</RegisterTitle>
					<RegisterSubtitle>Cadastre-se</RegisterSubtitle>
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
								<FormLabel htmlFor='birthDate'>Data de Nascimento *</FormLabel>
								<FormInput
									id='birthDate'
									type='text'
									placeholder='DD/MM/YYYY'
									maxLength={10}
									value={formData.birthDate}
									onChange={(e) => handleInputChange('birthDate', maskBirthDate(e.target.value))}
								/>
								{formErrors.birthDate && <ErrorMessage>Data de nascimento válida é obrigatória (DD/MM/YYYY)</ErrorMessage>}
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
