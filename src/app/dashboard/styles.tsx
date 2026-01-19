import styled from 'styled-components';

export const DashboardContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #0a1628 0%, #1a2942 100%);
	padding: 24px;
`;

export const Header = styled.header`
	display: flex;
	align-items: center;
	gap: 20px;
	margin-bottom: 32px;
	padding-bottom: 20px;
	border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

export const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const LogoIcon = styled.div`
	width: 60px;
	height: 60px;
	background: linear-gradient(135deg, #4299e1, #3182ce);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32px;
`;

export const LogoText = styled.div`
	color: #4299e1;
	font-size: 28px;
	font-weight: bold;
`;

export const Title = styled.h1`
	color: #fff;
	font-size: 24px;
	font-weight: 600;
	flex: 1;
`;

export const CardsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 24px;
	margin-bottom: 32px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

export const StatsBar = styled.div`
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	align-items: center;
	background: rgba(255, 255, 255, 0.05);
	padding: 20px;
	border-radius: 12px;
	backdrop-filter: blur(10px);
`;

export const StatItem = styled.div<{ $color: string }>`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 20px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 8px;
	border-left: 4px solid ${({ $color }) => $color};
`;

export const StatLabel = styled.div`
	color: rgba(255, 255, 255, 0.7);
	font-size: 14px;
`;

export const StatValue = styled.div`
	color: #fff;
	font-size: 20px;
	font-weight: bold;
`;

export const StatRange = styled.div`
	color: rgba(255, 255, 255, 0.5);
	font-size: 12px;
`;

export const AverageDisplay = styled.div`
	margin-left: auto;
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 24px;
	background: rgba(66, 153, 225, 0.2);
	border-radius: 8px;
	border: 2px solid #4299e1;
`;

export const AverageIcon = styled.div`
	font-size: 32px;
`;

export const AverageInfo = styled.div``;

export const AverageLabel = styled.div`
	color: rgba(255, 255, 255, 0.7);
	font-size: 12px;
`;

export const AverageValue = styled.div`
	color: #fff;
	font-size: 28px;
	font-weight: bold;
`;
