import styled from 'styled-components';

export const StyledChip = styled.div<{ status: string }>`
	font-size: 0.85rem;
	font-weight: bolder;
	height: 20px;
	padding: 2px 8px;
	border-radius: ${({ theme }) => theme.borderRadius.small} !important;
	color: ${({ theme, status }) => {
		if (status === 'Pago Parcialmente') {
			return theme.colors.infoText;
		}
		if (status === 'Pago') {
			return theme.colors.success;
		}
		return theme.colors.textLight;
	}};

	.p-chip-label {
		line-height: 1.2;
	}
`;
