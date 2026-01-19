import styled from 'styled-components';

export const CardContainer = styled.div<{ $zoneColor: string }>`
	background: linear-gradient(135deg, #0a1628 0%, #1a2942 100%);
	border-radius: 16px;
	padding: 20px;
	position: relative;
	overflow: hidden;
	border: 2px solid ${({ $zoneColor }) => $zoneColor};
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at top right, ${({ $zoneColor }) => $zoneColor}20, transparent 70%);
		pointer-events: none;
	}
`;

export const CardHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 16px;
	position: relative;
	z-index: 1;
`;

export const Avatar = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: linear-gradient(135deg, #4a5568, #2d3748);
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-weight: bold;
	font-size: 18px;
	border: 2px solid rgba(255, 255, 255, 0.2);
`;

export const AthleteInfo = styled.div`
	flex: 1;
`;

export const AthleteName = styled.div`
	color: #fff;
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 4px;
`;

export const ZoneLabel = styled.div`
	color: rgba(255, 255, 255, 0.7);
	font-size: 12px;
`;

export const HeartRateDisplay = styled.div`
	position: relative;
	z-index: 1;
	text-align: center;
	margin: 20px 0;
`;

export const HeartRateCircle = styled.div<{ $zoneColor: string; $percentage: number }>`
	width: 140px;
	height: 140px;
	margin: 0 auto;
	border-radius: 50%;
	background: conic-gradient(
		${({ $zoneColor }) => $zoneColor} ${({ $percentage }) => $percentage * 3.6}deg,
		rgba(255, 255, 255, 0.1) ${({ $percentage }) => $percentage * 3.6}deg
	);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: linear-gradient(135deg, #0a1628, #1a2942);
	}
`;

export const HeartRateValue = styled.div`
	position: relative;
	z-index: 1;
	color: #fff;
	font-size: 48px;
	font-weight: bold;
	line-height: 1;
`;

export const HeartRateUnit = styled.span`
	font-size: 16px;
	font-weight: normal;
	margin-left: 4px;
`;

export const PercentageDisplay = styled.div`
	color: #fff;
	font-size: 24px;
	font-weight: 600;
	margin-top: 8px;
`;
