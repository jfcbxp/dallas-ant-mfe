import { Calendar } from 'primereact/calendar';
import { styled } from 'styled-components';

export const StyledCalendar = styled(Calendar)`
	max-width: 170px;

	& input[type='text'] {
		width: 100%;
		box-sizing: border-box;
		padding: 8px 12px;
		border: 1px solid ${({ theme }) => theme.colors.inputBorder || '#ccc'};

		font-size: 1rem;
		font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		background: ${({ theme }) => theme.colors.background || '#fff'};
		color: ${({ theme }) => theme.colors.text || '#000'};
	}

	& input[type='text']:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.primary || '#888'};
		box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.1);
	}
`;
