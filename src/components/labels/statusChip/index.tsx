import { StyledChip } from './styles';

export interface Properties {
	status: string;
}

export default function StatusChip(properties: Readonly<Properties>) {
	return (
		<StyledChip status={properties.status}>
			<span>{properties.status}</span>
		</StyledChip>
	);
}
