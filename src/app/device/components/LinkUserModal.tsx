'use client';

import { Device } from '@/types/device';
import { User } from '@/types/user';
import {
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalTitle,
	CloseButton,
	SelectedDeviceInfo,
	FormGroup,
	FormLabel,
	FormSelect,
	LinkButton,
	ErrorMessage,
	SuccessMessage,
} from '../Device.styles';

interface LinkUserModalProps {
	isOpen: boolean;
	selectedDevice: Device | undefined;
	users: User[];
	selectedUserId: string;
	isLinking: boolean;
	isSuccess: boolean;
	isError: boolean;
	error: Error | null;
	canLinkDevice: boolean;
	onClose: () => void;
	onUserSelect: (userId: string) => void;
	onLink: () => void;
}

export function LinkUserModal({
	isOpen,
	selectedDevice,
	users,
	selectedUserId,
	isLinking,
	isSuccess,
	isError,
	error,
	canLinkDevice,
	onClose,
	onUserSelect,
	onLink,
}: LinkUserModalProps) {
	if (!isOpen) return null;

	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalHeader>
					<ModalTitle>Vincular Usuário</ModalTitle>
					<CloseButton onClick={onClose}>×</CloseButton>
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
						onChange={(e) => onUserSelect(e.target.value)}>
						<option value=''>-- Selecione um usuário --</option>
						{users.map((user) => (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>
						))}
					</FormSelect>

					{users.length === 0 && <ErrorMessage>Nenhum usuário disponível para vincular</ErrorMessage>}
				</FormGroup>

				<FormGroup>
					<LinkButton onClick={onLink} disabled={!canLinkDevice || isLinking}>
						{isLinking ? 'Vinculando...' : 'Vincular Dispositivo'}
					</LinkButton>

					{isSuccess && <SuccessMessage>✓ Dispositivo vinculado com sucesso!</SuccessMessage>}

					{isError && <ErrorMessage>✗ Erro ao vincular: {error?.message || 'Tente novamente'}</ErrorMessage>}
				</FormGroup>
			</ModalContent>
		</ModalOverlay>
	);
}
