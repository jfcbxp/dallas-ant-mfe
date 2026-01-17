import { InputMaskProps } from 'primereact/inputmask';
import { Container, HelperTextContainer, Label, StyledInputMask } from './styles';

export default function Cgc(properties: Readonly<InputMaskProps>) {
	const rawCgc = (properties.value || '').replace(/\D/g, '');
	const charCount = rawCgc.length;

	const getMaskAndPlaceholder = (value: string) => {
		if (value.length > 11) {
			return {
				mask: '99.999.999/9999-99',
				placeholder: '11.111.111/1111-11',
				maxLength: 14,
				slotChar: '__.___.___/____-__',
			};
		}
		return {
			mask: '999.999.999-999',
			placeholder: '111.111.111-11',
			maxLength: 11,
			slotChar: '___.___.___-__ ',
		};
	};

	const { mask, placeholder, maxLength, slotChar } = getMaskAndPlaceholder(rawCgc);

	const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		if (!rawCgc) {
			event.target.setSelectionRange(0, 0);
		}
	};

	const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;

		if (document.activeElement === input && !rawCgc) {
			input.setSelectionRange(0, 0);
		}
	};

	return (
		<Container>
			<Label htmlFor='cpf'>CPF/CNPJ</Label>
			<StyledInputMask
				{...properties}
				mask={mask}
				placeholder={placeholder}
				onFocus={handleOnFocus}
				onClick={handleOnClick}
				required
				autoClear={false}
				unmask={true}
				slotChar={slotChar}
			/>
			<HelperTextContainer>
				<span>Campo obrigatório</span>
				<span>
					{charCount}/{maxLength}
				</span>
			</HelperTextContainer>
		</Container>
	);
}
