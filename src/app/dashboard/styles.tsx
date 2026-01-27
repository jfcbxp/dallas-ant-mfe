import styled from 'styled-components';

export const DashboardContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #0a1628 0%, #1a2942 100%);
	padding: 24px;
	padding-bottom: 140px;
`;

export const Header = styled.header`
	display: flex;
	align-items: left;
	justify-content: left;
	margin-bottom: 32px;
	padding-bottom: 20px;
	border-bottom: 2px solid rgba(255, 255, 255, 0.1);

	img {
		height: 80px;
		width: auto;
		object-fit: contain;
	}
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
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 24px 24px 24px;
	z-index: 100;
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

export const AverageDisplay = styled.div<{ $isActive?: boolean }>`
	margin-left: auto;
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 24px;
	background: ${({ $isActive }) => ($isActive ? 'rgba(72, 187, 120, 0.2)' : 'rgba(237, 137, 54, 0.2)')};
	border-radius: 8px;
	border: 2px solid ${({ $isActive }) => ($isActive ? '#48bb78' : '#ed8936')};
	box-shadow: 0 0 20px ${({ $isActive }) => ($isActive ? 'rgba(72, 187, 120, 0.3)' : 'rgba(237, 137, 54, 0.3)')};
	transition: all 0.3s ease;
`;

export const AverageIcon = styled.div`
	font-size: 32px;
`;

export const AverageInfo = styled.div``;

export const AverageLabel = styled.div<{ $isActive?: boolean }>`
	color: ${({ $isActive }) => ($isActive ? '#48bb78' : '#ed8936')};
	font-size: 14px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 1px;
	text-shadow: 0 0 10px ${({ $isActive }) => ($isActive ? 'rgba(72, 187, 120, 0.5)' : 'rgba(237, 137, 54, 0.5)')};
`;

export const AverageValue = styled.div`
	color: #fff;
	font-size: 28px;
	font-weight: bold;
`;
