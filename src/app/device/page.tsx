'use client';

import { useState, useEffect } from 'react';
import { useAvailableDevices } from '@/hooks/useAvailableDevices';
import { useUsersList } from '@/hooks/useUsersList';
import { useLinkDevice } from '@/hooks/useLinkDevice';
import {
	LinkDeviceContainer,
	LinkDeviceWrapper,
	PageHeader,
	PageTitle,
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
	SidebarSection,
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
} from './styles';

export default function LinkDevicePage() {
	const { data: devices = [], isLoading: devicesLoading } = useAvailableDevices();
	const { data: users = [], isLoading: usersLoading } = useUsersList();
	const { mutate: linkDevice, isPending: isLinking, isError, error, isSuccess } = useLinkDevice();

	const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
	const [selectedUserId, setSelectedUserId] = useState<string>('');

	useEffect(() => {
		if (isSuccess) {
			setSelectedDeviceId(null);
			setSelectedUserId('');
			setTimeout(() => {
				// Success message will auto-hide after a few seconds
			}, 2000);
		}
	}, [isSuccess]);

	const handleSelectDevice = (deviceId: number) => {
		setSelectedDeviceId(selectedDeviceId === deviceId ? null : deviceId);
	};

	const handleLinkDevice = () => {
		if (selectedDeviceId !== null && selectedUserId) {
			linkDevice({ deviceId: selectedDeviceId, userId: selectedUserId });
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
					<PageTitle>Vincular Pulseira a Usuário</PageTitle>
					<PageSubtitle>Selecione um dispositivo e escolha o usuário para vincular</PageSubtitle>
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
										$isSelected={selectedDeviceId === device.deviceId}
										onClick={() => handleSelectDevice(device.deviceId)}>
										<DeviceHeader>
											<DeviceId>Device #{device.deviceId}</DeviceId>
											<DeviceStatus $hasUser={false}>Disponível</DeviceStatus>
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

					{/* Sidebar */}
					<SidebarSection>
						<SectionTitle>Vincular Usuário</SectionTitle>

						{selectedDevice && (
							<SelectedDeviceInfo>
								Selecionado: <strong>Device #{selectedDevice.deviceId}</strong>
								<br />
								{selectedDevice.heartRate !== undefined && `${selectedDevice.heartRate} bpm`}
							</SelectedDeviceInfo>
						)}

						<FormGroup>
							<FormLabel htmlFor='user-select'>Selecione o Usuário *</FormLabel>
							<FormSelect
								id='user-select'
								value={selectedUserId}
								onChange={(e) => setSelectedUserId(e.target.value)}
								disabled={!selectedDeviceId}>
								<option value=''>-- Selecione um usuário --</option>
								{users.map((user) => (
									<option
										key={user.id}
										value={user.id}>
										{user.name}
									</option>
								))}
							</FormSelect>

							{!selectedDeviceId && <ErrorMessage>Selecione um dispositivo primeiro</ErrorMessage>}

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

						<div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '16px', textAlign: 'center' }}>
							<p>1. Selecione um dispositivo na lista</p>
							<p>2. Escolha um usuário</p>
							<p>3. Clique para vincular</p>
						</div>
					</SidebarSection>
				</ContentWrapper>
			</LinkDeviceWrapper>
		</LinkDeviceContainer>
	);
}
