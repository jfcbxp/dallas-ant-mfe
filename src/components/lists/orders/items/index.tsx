import React from 'react';
import { OrderContent, OrderItemContent } from '@/types/index';
import useIsMobile from '@/hooks/useIsMobile';
import toBRL from '@/utils/toBRL';
import { Image } from 'primereact/image';
import { ProgressBar } from 'primereact/progressbar';
import { ItemContainer, ItemInfo, ItemListContainer, SectionTitle, StyledDivider } from './styles';

export interface Properties {
	order: OrderContent;
	items?: OrderContent['items'];
	isLoading?: boolean;
}

export default function OrderItems(properties: Readonly<Properties>) {
	const isMobile = useIsMobile();
	let contentToRender;

	if (properties.items?.content.length > 0) {
		contentToRender = properties.items.content.map((item: OrderItemContent, index: number) => (
			<React.Fragment key={item.id}>
				<ItemContainer>
					<Image
						alt=''
						src={item.image ? item.image : 'no-image.png'}
						width={isMobile ? '48' : '56'}
						height={isMobile ? '48' : '56'}
						onError={(e) => {
							(e.target as HTMLImageElement).src = 'no-image.png';
						}}
					/>

					<ItemInfo>
						<div>
							<p>{item.id}</p>
							<p>{item.description.length > 32 ? item.description.slice(0, 32) + '...' : item.description}</p>
						</div>
						<div>
							<p>{`${item.quantity} item${item.quantity > 1 ? 's' : ''}`}</p>
							<p>{`${toBRL(item.price)}`}</p>
							<p>{`${toBRL(item.total)}`}</p>
						</div>
					</ItemInfo>
				</ItemContainer>
				{index < (properties.items.content.length ?? 0) - 1 && <StyledDivider style={{ margin: '1rem 0' }} />}
			</React.Fragment>
		));
	} else if (properties.order.quantity == 0) {
		contentToRender = <SectionTitle>O boleto não possui item(s)</SectionTitle>;
	} else {
		contentToRender = (
			<div style={{ position: 'sticky' }}>
				<ProgressBar />
			</div>
		);
	}

	return (
		<ItemListContainer>
			<SectionTitle>{`Fornecido por ${properties.order.branchDescription}`}</SectionTitle>
			{contentToRender}
			<StyledDivider />
		</ItemListContainer>
	);
}
