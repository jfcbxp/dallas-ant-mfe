import styled from 'styled-components';

export const ZoneBarContainer = styled.div`
	display: flex;
	gap: 4px;
	width: 100%;
	height: 24px;
	border-radius: 12px;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.05);
	padding: 2px;
	box-sizing: border-box;
	margin-top: 24px;
`;

export const ZoneSegment = styled.div<{
	$color: string;
	$isActive: boolean;
	$percentage: number;
	$zoneIndex: number;
}>`
	flex: 1;
	height: 100%;
	border-radius: 8px;
	background-color: ${({ $color, $isActive }) => ($isActive ? $color : `${$color}40`)};
	transition: all 0.3s ease;
	position: relative;
	opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};
	box-shadow: ${({ $isActive, $color }) => ($isActive ? `0 0 8px ${$color}60` : 'none')};

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
		border-radius: 8px;
		pointer-events: none;
	}
`;

export const ZoneLabelContainer = styled.div`
	display: flex;
	gap: 4px;
	margin-top: 8px;
	padding: 0 2px;
	width: 100%;
	box-sizing: border-box;
`;

export const ZoneLabel = styled.div`
	flex: 1;
	text-align: center;
	color: rgba(255, 255, 255, 0.7);
	font-size: 11px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;
