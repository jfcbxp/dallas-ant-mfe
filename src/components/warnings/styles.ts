import styled from 'styled-components';

export const WarningWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	background-color: ${({ theme }) => theme.colors.info};
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	padding: ${({ theme }) => theme.spacing.medium};
	margin-bottom: ${({ theme }) => theme.spacing.large};
	border: 1px solid #bee5eb;
`;

export const IconWrapper = styled.div`
	margin-right: ${({ theme }) => theme.spacing.medium};
	color: ${({ theme }) => theme.colors.infoText};
	flex-shrink: 0;
	margin-top: 2px;

	svg {
		width: 20px;
		height: 20px;
		fill: ${({ theme }) => theme.colors.infoText};
	}
`;

export const Text = styled.p`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.infoText};
	line-height: 1.4;
`;
