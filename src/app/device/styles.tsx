import styled from 'styled-components';

export const LinkDeviceContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #0a1628 0%, #1a2942 100%);
	padding: 40px 20px;
`;

export const LinkDeviceWrapper = styled.div`
	max-width: 1400px;
	margin: 0 auto;
`;

export const PageHeader = styled.div`
	margin-bottom: 40px;
	text-align: center;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const PageTitle = styled.h1`
	color: #fff;
	font-size: 36px;
	font-weight: 700;
	margin: 0 0 8px 0;
`;

export const PageSubtitle = styled.p`
	color: rgba(255, 255, 255, 0.7);
	font-size: 16px;
	margin: 0;
`;

export const ContentWrapper = styled.div`
	display: grid;
	gap: 30px;
`;

export const DevicesSection = styled.div`
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 16px;
	padding: 32px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

export const SectionTitle = styled.h2`
	color: #fff;
	font-size: 18px;
	font-weight: 600;
	margin: 0 0 24px 0;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	border-bottom: 2px solid rgba(66, 153, 225, 0.3);
	padding-bottom: 12px;
`;

export const DevicesList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const DeviceCard = styled.div<{ $isSelected: boolean }>`
	padding: 16px;
	border: 2px solid ${({ $isSelected }) => ($isSelected ? '#4299e1' : 'rgba(255, 255, 255, 0.2)')};
	border-radius: 12px;
	background: ${({ $isSelected }) => ($isSelected ? 'rgba(66, 153, 225, 0.15)' : 'rgba(255, 255, 255, 0.03)')};
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		border-color: #4299e1;
		background: rgba(66, 153, 225, 0.1);
	}
`;

export const DeviceHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
`;

export const DeviceId = styled.div`
	color: #fff;
	font-size: 16px;
	font-weight: 600;
`;

export const DeviceStatus = styled.span<{ $hasUser: boolean }>`
	font-size: 11px;
	font-weight: 600;
	text-transform: uppercase;
	padding: 4px 8px;
	border-radius: 4px;
	background: ${({ $hasUser }) => ($hasUser ? 'rgba(72, 187, 120, 0.2)' : 'rgba(245, 101, 101, 0.2)')};
	color: ${({ $hasUser }) => ($hasUser ? '#48bb78' : '#f56565')};
`;

export const DeviceInfo = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.6);

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

export const InfoItem = styled.div`
	display: flex;
	flex-direction: column;

	strong {
		color: rgba(255, 255, 255, 0.9);
		font-weight: 600;
		margin-bottom: 2px;
	}
`;

export const SidebarSection = styled.div`
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 16px;
	padding: 24px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	height: fit-content;
	position: sticky;
	top: 40px;

	@media (max-width: 1024px) {
		position: static;
	}
`;

export const FormGroup = styled.div`
	margin-bottom: 20px;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const FormLabel = styled.label`
	display: block;
	color: rgba(255, 255, 255, 0.9);
	font-size: 12px;
	font-weight: 600;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export const FormSelect = styled.select`
	width: 100%;
	padding: 10px 12px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.05);
	color: #fff;
	font-size: 14px;
	transition: all 0.3s ease;
	cursor: pointer;

	&:focus {
		outline: none;
		border-color: #4299e1;
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 8px rgba(66, 153, 225, 0.3);
	}

	option {
		background: #1a2942;
		color: #fff;
	}
`;

export const SelectedDeviceInfo = styled.div`
	background: rgba(66, 153, 225, 0.1);
	border: 1px solid rgba(66, 153, 225, 0.3);
	border-radius: 8px;
	padding: 12px;
	margin-bottom: 16px;
	color: rgba(255, 255, 255, 0.8);
	font-size: 13px;
	text-align: center;
`;

export const LinkButton = styled.button`
	width: 100%;
	padding: 12px;
	border: none;
	border-radius: 8px;
	background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 0.5px;

	&:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(66, 153, 225, 0.4);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const LoadingContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 60px 20px;
	color: rgba(255, 255, 255, 0.7);
`;

export const Spinner = styled.div`
	width: 40px;
	height: 40px;
	border: 4px solid rgba(255, 255, 255, 0.2);
	border-top-color: #4299e1;
	border-radius: 50%;
	animation: spin 0.8s linear infinite;
	margin-bottom: 16px;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;

export const EmptyState = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 60px 20px;
	color: rgba(255, 255, 255, 0.5);
	text-align: center;

	p {
		margin: 8px 0 0 0;
		font-size: 14px;
	}
`;

export const ErrorMessage = styled.div`
	color: #f56565;
	font-size: 12px;
	padding: 12px;
	background: rgba(245, 101, 101, 0.1);
	border-left: 2px solid #f56565;
	border-radius: 4px;
	margin-top: 12px;
`;

export const SuccessMessage = styled.div`
	color: #48bb78;
	font-size: 12px;
	padding: 12px;
	background: rgba(72, 187, 120, 0.1);
	border-left: 2px solid #48bb78;
	border-radius: 4px;
	margin-top: 12px;
`;

export const LessonControlButtons = styled.div`
	display: flex;
	gap: 16px;
	margin-top: 20px;
`;

export const StartButton = styled.button`
	padding: 12px 24px;
	border: none;
	border-radius: 8px;
	background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 0.5px;

	&:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(72, 187, 120, 0.4);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const EndButton = styled.button`
	padding: 12px 24px;
	border: none;
	border-radius: 8px;
	background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 0.5px;

	&:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(245, 101, 101, 0.4);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	padding: 20px;
`;

export const ModalContent = styled.div`
	background: rgba(26, 41, 66, 0.98);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 16px;
	padding: 24px;
	max-width: 500px;
	width: 100%;
	max-height: 90vh;
	overflow-y: auto;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding-bottom: 12px;
	border-bottom: 2px solid rgba(66, 153, 225, 0.3);
`;

export const ModalTitle = styled.h2`
	color: #fff;
	font-size: 18px;
	font-weight: 600;
	margin: 0;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export const CloseButton = styled.button`
	background: none;
	border: none;
	color: rgba(255, 255, 255, 0.7);
	font-size: 32px;
	line-height: 1;
	cursor: pointer;
	padding: 0;
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: color 0.3s ease;

	&:hover {
		color: #fff;
	}
`;
