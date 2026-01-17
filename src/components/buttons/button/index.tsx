import { ButtonProps } from 'primereact/button';
import { StyledButton } from './styles';

interface Properties extends ButtonProps {
	label: string;
	loading?: boolean;
	disabled?: boolean;
}

export default function Button(properties: Readonly<Properties>) {
	return (
		<StyledButton
			{...properties}
			label={properties.loading ? '' : properties.label}
			loading={properties.loading}
			disabled={properties.disabled}
		/>
	);
}
