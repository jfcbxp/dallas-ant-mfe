'use client';

import { useState, useEffect } from 'react';
import { useAvailableDevices } from '@/hooks/useAvailableDevices';
import { useUsersList } from '@/hooks/useUsersList';
import { useLinkDevice } from '@/hooks/useLinkDevice';
import { useLessonStatus } from '@/hooks/useLessonStatus';
import { startLesson } from '@/services/startLesson';
import { endLesson } from '@/services/endLesson';
import {
	LinkDeviceContainer,
	LinkDeviceWrapper,
	PageHeader,
	PageSubtitle,
	ContentWrapper,
	DevicesSection,
	SectionTitle,
	DevicesList,
	DeviceCard,
	DeviceHeader,
	DeviceId,
	DeviceStatus,
	DeviceInfo,
	InfoItem,
	FormGroup,
	FormLabel,
	FormSelect,
	SelectedDeviceInfo,
	LinkButton,
	LoadingContainer,
	Spinner,
	EmptyState,
	ErrorMessage,
	SuccessMessage,
	LessonControlButtons,
	StartButton,
	EndButton,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalTitle,
	CloseButton,
} from './styles';

export default function LinkDevicePage() {
	const { data: devices = [], isLoading: devicesLoading } = useAvailableDevices();
	const { data: users = [], isLoading: usersLoading } = useUsersList();
	const { mutate: linkDevice, isPending: isLinking, isError, error, isSuccess } = useLinkDevice();
	const { data: lessonStatus } = useLessonStatus();

	const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
	const [selectedUserId, setSelectedUserId] = useState<string>('');
	const [isStarting, setIsStarting] = useState(false);
	const [isEnding, setIsEnding] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (isSuccess) {
			setSelectedDeviceId(null);
			setSelectedUserId('');
			setIsModalOpen(false);
			setTimeout(() => {
				// Success message will auto-hide after a few seconds
			}, 2000);
		}
	}, [isSuccess]);

	const handleSelectDevice = (deviceId: number) => {
		setSelectedDeviceId(deviceId);
		setIsModalOpen(true);
	};

	const handleLinkDevice = () => {
		if (selectedDeviceId !== null && selectedUserId) {
			linkDevice({ deviceId: selectedDeviceId, userId: selectedUserId });
		}
	};

	const handleStartLesson = async () => {
		setIsStarting(true);
		try {
			await startLesson();
		} catch (err) {
			console.error('Error starting lesson:', err);
		} finally {
			setIsStarting(false);
		}
	};

	const handleEndLesson = async () => {
		setIsEnding(true);
		try {
			await endLesson();
		} catch (err) {
			console.error('Error ending lesson:', err);
		} finally {
			setIsEnding(false);
		}
	};

	const selectedDevice = devices.find((d) => d.deviceId === selectedDeviceId);
	const canLinkDevice = selectedDeviceId !== null && selectedUserId && !isLinking;

	const isLoading = devicesLoading || usersLoading;

	if (isLoading) {
		return (
			<LinkDeviceContainer>
				<LinkDeviceWrapper>
					<LoadingContainer>
						<Spinner />
						<p>Carregando dispositivos e usuários...</p>
					</LoadingContainer>
				</LinkDeviceWrapper>
			</LinkDeviceContainer>
		);
	}

	return (
		<LinkDeviceContainer>
			<LinkDeviceWrapper>
				<PageHeader>
					<PageSubtitle>Selecione um dispositivo e escolha o usuário para vincular</PageSubtitle>
					<LessonControlButtons>
						<StartButton
							onClick={handleStartLesson}
							disabled={lessonStatus?.status === 'ACTIVE' || isStarting}>
							{isStarting ? 'Iniciando...' : 'Iniciar Aula'}
						</StartButton>
						<EndButton
							onClick={handleEndLesson}
							disabled={lessonStatus?.status !== 'ACTIVE' || isEnding}>
							{isEnding ? 'Finalizando...' : 'Finalizar Aula'}
						</EndButton>
					</LessonControlButtons>
				</PageHeader>

				<ContentWrapper>
					{/* Devices List */}
					<DevicesSection>
						<SectionTitle>Dispositivos Disponíveis</SectionTitle>

						{devices.length > 0 ? (
							<DevicesList>
								{devices.map((device) => (
									<DeviceCard
										key={device.deviceId}
										$isSelected={false}
										onClick={() => handleSelectDevice(device.deviceId)}>
										<DeviceHeader>
											<DeviceId>Device #{device.deviceId}</DeviceId>
											<DeviceStatus $hasUser={!!device.user}>{device.user ? 'Vinculado' : 'Disponível'}</DeviceStatus>
										</DeviceHeader>

										<DeviceInfo>
											{device.heartRate !== undefined && (
												<InfoItem>
													<strong>Heart Rate</strong>
													<span>{device.heartRate} bpm</span>
												</InfoItem>
											)}
											{device.beatTime !== undefined && (
												<InfoItem>
													<strong>Beat Time</strong>
													<span>{device.beatTime}ms</span>
												</InfoItem>
											)}
											{device.beatCount !== undefined && (
												<InfoItem>
													<strong>Beat Count</strong>
													<span>{device.beatCount}</span>
												</InfoItem>
											)}
											{device.serialNumber !== undefined && (
												<InfoItem>
													<strong>Serial</strong>
													<span>{device.serialNumber}</span>
												</InfoItem>
											)}
											{device.stickId !== undefined && (
												<InfoItem>
													<strong>Stick ID</strong>
													<span>{device.stickId}</span>
												</InfoItem>
											)}
											{device.receivedAt && (
												<InfoItem>
													<strong>Última Leitura</strong>
													<span>{new Date(device.receivedAt).toLocaleTimeString('pt-BR')}</span>
												</InfoItem>
											)}
											{device.user && (
												<>
													<div
														style={{
															gridColumn: '1 / -1',
															borderTop: '1px solid rgba(255, 255, 255, 0.1)',
															paddingTop: '12px',
															marginTop: '12px',
														}}>
														<strong
															style={{
																color: 'rgba(255, 255, 255, 0.9)',
																fontSize: '12px',
																textTransform: 'uppercase',
																display: 'block',
																marginBottom: '8px',
															}}>
															Usuário Vinculado
														</strong>
													</div>

													<InfoItem>
														<strong>Nome</strong>
														<span>{device.user.name}</span>
													</InfoItem>

													{device.user.gender && (
														<InfoItem>
															<strong>Gênero</strong>
															<span>{device.user.gender === 'M' ? 'Masculino' : device.user.gender === 'F' ? 'Feminino' : 'Outro'}</span>
														</InfoItem>
													)}

													{device.user.height && (
														<InfoItem>
															<strong>Altura</strong>
															<span>{device.user.height} cm</span>
														</InfoItem>
													)}

													{device.user.weight && (
														<InfoItem>
															<strong>Peso</strong>
															<span>{device.user.weight} kg</span>
														</InfoItem>
													)}

													{device.user.birthDate && (
														<InfoItem>
															<strong>Data de Nascimento</strong>
															<span>{new Date(device.user.birthDate).toLocaleDateString('pt-BR')}</span>
														</InfoItem>
													)}
												</>
											)}{' '}
										</DeviceInfo>
									</DeviceCard>
								))}
							</DevicesList>
						) : (
							<EmptyState>
								<p>Nenhum dispositivo disponível no momento</p>
								<p style={{ fontSize: '12px', marginTop: '8px' }}>Verifique se as pulseiras estão conectadas e tentando se comunicar</p>
							</EmptyState>
						)}
					</DevicesSection>
				</ContentWrapper>

				{isModalOpen && (
					<ModalOverlay onClick={() => setIsModalOpen(false)}>
						<ModalContent onClick={(e) => e.stopPropagation()}>
							<ModalHeader>
								<ModalTitle>Vincular Usuário</ModalTitle>
								<CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
							</ModalHeader>

							{selectedDevice && (
								<SelectedDeviceInfo>
									Selecionado: <strong>Device #{selectedDevice.deviceId}</strong>
									<br />
									{selectedDevice.heartRate !== undefined && `${selectedDevice.heartRate} bpm`}
								</SelectedDeviceInfo>
							)}

							<FormGroup>
								<FormLabel htmlFor='user-select-modal'>Selecione o Usuário *</FormLabel>
								<FormSelect
									id='user-select-modal'
									value={selectedUserId}
									onChange={(e) => setSelectedUserId(e.target.value)}>
									<option value=''>-- Selecione um usuário --</option>
									{users.map((user) => (
										<option
											key={user.id}
											value={user.id}>
											{user.name}
										</option>
									))}
								</FormSelect>

								{users.length === 0 && <ErrorMessage>Nenhum usuário disponível para vincular</ErrorMessage>}
							</FormGroup>

							<FormGroup>
								<LinkButton
									onClick={handleLinkDevice}
									disabled={!canLinkDevice || isLinking}>
									{isLinking ? 'Vinculando...' : 'Vincular Dispositivo'}
								</LinkButton>

								{isSuccess && <SuccessMessage>✓ Dispositivo vinculado com sucesso!</SuccessMessage>}

								{isError && <ErrorMessage>✗ Erro ao vincular: {error?.message || 'Tente novamente'}</ErrorMessage>}
							</FormGroup>
						</ModalContent>
					</ModalOverlay>
				)}
			</LinkDeviceWrapper>
		</LinkDeviceContainer>
	);
}
