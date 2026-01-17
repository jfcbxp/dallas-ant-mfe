import { InputMask } from 'primereact/inputmask';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledInputMask = styled(InputMask)`
	padding: ${({ theme }) => theme.spacing.medium};
	border: 1px solid ${({ theme }) => theme.colors.inputBorder};
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	font-size: 1rem;
	color: ${({ theme }) => theme.colors.text};
	background-color: ${({ theme }) => theme.colors.background};
	width: 100%;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.primary};
		box-shadow: 0 0 0 2px rgba(93, 58, 123, 0.2);
	}

	&::placeholder {
		color: ${({ theme }) => theme.colors.placeholder};
	}
`;

export const HelperTextContainer = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 0.75rem;
	color: ${({ theme }) => theme.colors.textLight};
	margin-top: ${({ theme }) => theme.spacing.small};
`;

export const Label = styled.label`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.textLight};
	margin-bottom: ${({ theme }) => theme.spacing.small};
`;
