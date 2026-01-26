import styled from 'styled-components';

export const RegisterContainer = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, #0a1628 0%, #1a2942 100%);
	padding: 20px;
`;

export const RegisterWrapper = styled.div`
	width: 100%;
	max-width: 600px;
`;

export const RegisterHeader = styled.div`
	text-align: center;
	margin-bottom: 40px;
`;

export const LogoContainer = styled.div`
	margin-bottom: 20px;
	display: flex;
	justify-content: center;
`;

export const RegisterTitle = styled.h1`
	color: #fff;
	font-size: 32px;
	font-weight: 700;
	margin: 0 0 8px 0;
	text-align: center;
`;

export const RegisterSubtitle = styled.p`
	color: rgba(255, 255, 255, 0.7);
	font-size: 14px;
	margin: 0;
	text-align: center;
`;

export const RegisterForm = styled.form`
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 16px;
	padding: 32px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

export const FormSection = styled.div`
	margin-bottom: 24px;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const SectionTitle = styled.h2`
	color: #fff;
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 16px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	padding-bottom: 8px;
`;

export const FormGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

export const FormGroup = styled.div`
	display: flex;
	flex-direction: column;

	&.full {
		grid-column: 1 / -1;
	}
`;

export const FormLabel = styled.label`
	color: rgba(255, 255, 255, 0.9);
	font-size: 13px;
	font-weight: 600;
	margin-bottom: 6px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export const FormInput = styled.input`
	padding: 10px 12px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.05);
	color: #fff;
	font-size: 14px;
	transition: all 0.3s ease;

	&::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	&:focus {
		outline: none;
		border-color: #4299e1;
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 8px rgba(66, 153, 225, 0.3);
	}
`;

export const FormSelect = styled.select`
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

export const PulseiraSelector = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
	gap: 12px;
	margin-top: 8px;
`;

export const PulseiraBadge = styled.button<{ $isSelected: boolean }>`
	padding: 12px;
	border: 2px solid ${({ $isSelected }) => ($isSelected ? '#4299e1' : 'rgba(255, 255, 255, 0.2)')};
	border-radius: 8px;
	background: ${({ $isSelected }) => ($isSelected ? 'rgba(66, 153, 225, 0.2)' : 'rgba(255, 255, 255, 0.05)')};
	color: #fff;
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	text-align: center;

	&:hover {
		border-color: #4299e1;
		background: rgba(66, 153, 225, 0.15);
	}

	small {
		display: block;
		color: rgba(255, 255, 255, 0.6);
		font-size: 10px;
		margin-top: 4px;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 12px;
	margin-top: 32px;

	@media (max-width: 600px) {
		flex-direction: column;
	}
`;

export const SubmitButton = styled.button`
	flex: 1;
	padding: 12px 24px;
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

export const CancelButton = styled.button`
	flex: 1;
	padding: 12px 24px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 8px;
	background: transparent;
	color: rgba(255, 255, 255, 0.7);
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 0.5px;

	&:hover {
		border-color: rgba(255, 255, 255, 0.5);
		color: #fff;
		background: rgba(255, 255, 255, 0.05);
	}
`;

export const ErrorMessage = styled.div`
	color: #f56565;
	font-size: 12px;
	margin-top: 6px;
	padding: 8px;
	background: rgba(245, 101, 101, 0.1);
	border-left: 2px solid #f56565;
	border-radius: 4px;
`;

export const SuccessMessage = styled.div`
	color: #48bb78;
	font-size: 12px;
	margin-top: 6px;
	padding: 8px;
	background: rgba(72, 187, 120, 0.1);
	border-left: 2px solid #48bb78;
	border-radius: 4px;
`;

export const LoadingSpinner = styled.div`
	display: inline-block;
	width: 16px;
	height: 16px;
	border: 2px solid rgba(255, 255, 255, 0.3);
	border-top-color: #fff;
	border-radius: 50%;
	animation: spin 0.8s linear infinite;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;
