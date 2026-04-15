'use client';

import { useDevicePage } from '@/hooks/useDevicePage';
import { LinkUserModal } from './components/LinkUserModal';
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
	LoadingContainer,
	Spinner,
	EmptyState,
	LessonControlButtons,
	StartButton,
	EndButton,
	UserSectionDivider,
	UserSectionLabel,
	EmptyStateHint,
} from './Device.styles';

export default function LinkDevicePage() {
	const {
		devices,
		users,
		lessonStatus,
		selectedDevice,
		selectedUserId,
		isStarting,
		isEnding,
		isModalOpen,
		isLoading,
		isLinking,
		isError,
		isSuccess,
		error,
		canLinkDevice,
		handleSelectDevice,
		handleLinkDevice,
		handleStartLesson,
		handleEndLesson,
		handleCloseModal,
		setSelectedUserId,
	} = useDevicePage();

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
													<UserSectionDivider>
														<UserSectionLabel>Usuário Vinculado</UserSectionLabel>
													</UserSectionDivider>
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
											)}
										</DeviceInfo>
									</DeviceCard>
								))}
							</DevicesList>
						) : (
							<EmptyState>
								<p>Nenhum dispositivo disponível no momento</p>
								<EmptyStateHint>Verifique se as pulseiras estão conectadas e tentando se comunicar</EmptyStateHint>
							</EmptyState>
						)}
					</DevicesSection>
				</ContentWrapper>

				<LinkUserModal
					isOpen={isModalOpen}
					selectedDevice={selectedDevice}
					users={users}
					selectedUserId={selectedUserId}
					isLinking={isLinking}
					isSuccess={isSuccess}
					isError={isError}
					error={error}
					canLinkDevice={canLinkDevice}
					onClose={handleCloseModal}
					onUserSelect={setSelectedUserId}
					onLink={handleLinkDevice}
				/>
			</LinkDeviceWrapper>
		</LinkDeviceContainer>
	);
}
