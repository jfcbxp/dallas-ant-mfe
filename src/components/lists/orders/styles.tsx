import styled from 'styled-components';

export const DateHeader = styled.h2`
	font-size: 1rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text};
	margin-top: ${({ theme }) => theme.spacing.large};
	margin-bottom: ${({ theme }) => theme.spacing.medium};
`;
