import styled from 'styled-components';

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background};
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	transition: box-shadow 0.2s ease-in-out;

	&:hover {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
	}
`;

export const CardHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: ${({ theme }) => theme.spacing.medium};
	border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

export const CardBody = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: ${({ theme }) => theme.spacing.medium};
	gap: ${({ theme }) => theme.spacing.medium};
`;

export const CardIconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;

	flex-shrink: 0;
	i {
		color: white;
		font-size: 1.25rem;
	}
`;

export const CardInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

export const CardTitle = styled.span`
	font-size: 0.875rem;
	font-weight: bolder;
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: 4px;
	margin-left: ${({ theme }) => theme.spacing.small};
`;

export const CardSubtitle = styled.span`
	font-size: 0.875rem;
	font-weight: bolder;
	color: ${({ theme }) => theme.colors.textLight};
`;

export const CardValueContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex-shrink: 0;
	margin-left: ${({ theme }) => theme.spacing.small};
`;

export const CardAmount = styled.span`
	font-size: 0.875rem;
	font-weight: bolder;
	color: ${({ theme }) => theme.colors.textLight};
	margin-bottom: 4px;
	font-style: italic;
	text-decoration: line-through;
`;

export const CardBalance = styled.span`
	font-size: 0.875rem;
	font-weight: bolder;
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: 4px;
`;

export const CardItemCount = styled.span`
	font-size: 0.75rem;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.textLight};
	margin-bottom: 4px;
`;
