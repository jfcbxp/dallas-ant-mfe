import { ProgressSpinner } from 'primereact/progressspinner';
import { LoadingContainer } from './styles';

export default function LoadingComponent() {
	return (
		<LoadingContainer>
			<ProgressSpinner></ProgressSpinner>
		</LoadingContainer>
	);
}
