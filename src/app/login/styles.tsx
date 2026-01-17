import styled from 'styled-components';

export const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background-color: ${({ theme }) => theme.colors.background};
	padding: ${({ theme }) => theme.spacing.large};
`;

export const LoginLogoContainer = styled.div`
	margin-bottom: ${({ theme }) => theme.spacing.medium};
	text-align: center;
	span {
		font-size: 2.5rem;
		font-weight: bold;
		color: ${({ theme }) => theme.colors.primary};
	}
`;

export const LoginTitle = styled.h1`
	text-align: center;
	font-size: 16px;
	color: ${({ theme }) => theme.colors.logoText};
	margin-bottom: ${({ theme }) => theme.spacing.xlarge};
	font-weight: bolder;
`;

export const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.medium};
`;
