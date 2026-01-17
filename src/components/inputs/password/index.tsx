import { InputTextProps } from 'primereact/inputtext';
import { Container, HelperTextContainer, Label, StyledPassword } from './styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CSSProperties, useState } from 'react';
import theme from '@/styles/theme';

export default function Password(properties: Readonly<InputTextProps>) {
	const [visible, setVisible] = useState(false);
	return (
		<Container>
			<Label htmlFor='senha'>Senha</Label>
			<StyledPassword
				{...properties}
				type={visible ? 'text' : 'password'}
			/>
			{visible ? (
				<FaEyeSlash
					size={24}
					color={theme.colors.primary}
					onClick={() => setVisible(!visible)}
					style={styles.icon}
				/>
			) : (
				<FaEye
					size={24}
					color={theme.colors.primary}
					onClick={() => setVisible(!visible)}
					style={styles.icon}
				/>
			)}
			<HelperTextContainer>
				<span>Campo obrigatório</span>
			</HelperTextContainer>
		</Container>
	);
}

const styles: { [key: string]: CSSProperties } = {
	icon: {
		position: 'absolute',
		alignSelf: 'flex-end',
		marginTop: 38,
		marginRight: '0.75rem',
		cursor: 'pointer',
	},
};
