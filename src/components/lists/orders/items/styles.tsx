import styled from 'styled-components';

export const StyledDivider = styled.div`
	margin: ${({ theme }) => theme.spacing.large} 0;
	border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

export const SectionTitle = styled.h2`
	font-size: 0.875rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.textLight};
	margin: 0 0 ${({ theme }) => theme.spacing.medium};
	border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
	padding-bottom: ${({ theme }) => theme.spacing.small};
`;

export const ItemListContainer = styled.div`
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	padding: ${({ theme }) => theme.spacing.small};
	overflow: auto;
	margin-bottom: ${({ theme }) => theme.spacing.medium};
	max-height: 50vh;
`;

export const ItemContainer = styled.div`
	display: flex;
	align-items: flex-start;
	gap: ${({ theme }) => theme.spacing.medium};
`;

export const ItemInfo = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;

	div:first-child {
		display: flex;
		flex-direction: column;
		gap: ${({ theme }) => theme.spacing.small};
	}
	div:first-child p:first-child {
		font-size: smaller;
		color: ${({ theme }) => theme.colors.text};
	}
	div:first-child p:last-child {
		font-size: small;
		color: ${({ theme }) => theme.colors.textLight};
	}

	div:last-child {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
	}
	div:last-child p:first-child {
		font-size: 0.75rem;
		color: ${({ theme }) => theme.colors.textLight};
	}
	div:last-child p:nth-child(2) {
		font-size: 0.875rem;
		color: ${({ theme }) => theme.colors.text};
	}
	div:last-child p:last-child {
		font-weight: bold;
		color: ${({ theme }) => theme.colors.primary};
	}
`;
