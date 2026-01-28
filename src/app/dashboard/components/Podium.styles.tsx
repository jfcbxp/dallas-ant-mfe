import styled from 'styled-components';

export const PodiumContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
	margin-bottom: 32px;
`;

export const PodiumTitle = styled.div`
	text-align: center;
	color: #fff;
`;

export const MainTitle = styled.h1`
	font-size: 36px;
	font-weight: bold;
	margin: 0 0 8px 0;
	text-transform: uppercase;
	letter-spacing: 2px;
`;

export const SubTitle = styled.h2`
	font-size: 28px;
	font-weight: 600;
	margin: 0;
	color: #ed8936;
	text-transform: uppercase;
	letter-spacing: 1.5px;
`;

export const TrophyIcon = styled.div`
	font-size: 80px;
	margin: 20px 0;
	filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
`;

export const PodiumStage = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 20px;
	width: 100%;
	max-width: 900px;
	position: relative;
`;

export const PodiumPlace = styled.div<{ $position: number }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	order: ${({ $position }) => ($position === 1 ? 2 : $position === 2 ? 1 : 3)};
	animation: slideUp 0.6s ease-out ${({ $position }) => $position * 0.2}s backwards;

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const PlaceLabel = styled.div<{ $position: number }>`
	position: absolute;
	top: -30px;
	background: ${({ $position }) =>
		$position === 1
			? 'linear-gradient(135deg, #48bb78, #38a169)'
			: $position === 2
				? 'linear-gradient(135deg, #4299e1, #3182ce)'
				: 'linear-gradient(135deg, #ed8936, #dd6b20)'};
	color: #fff;
	padding: 6px 16px;
	border-radius: 20px;
	font-size: 14px;
	font-weight: bold;
	text-transform: uppercase;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

export const PlayerCard = styled.div<{ $position: number }>`
	background: ${({ $position }) =>
		$position === 1
			? 'linear-gradient(135deg, #48bb78, #38a169)'
			: $position === 2
				? 'linear-gradient(135deg, #4299e1, #3182ce)'
				: 'linear-gradient(135deg, #ed8936, #dd6b20)'};
	border-radius: 16px;
	padding: 24px;
	width: ${({ $position }) => ($position === 1 ? '280px' : '240px')};
	height: ${({ $position }) => ($position === 1 ? '320px' : '280px')};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 16px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
		animation: shimmer 3s infinite;
	}

	@keyframes shimmer {
		0%,
		100% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		50% {
			transform: translate(-30%, -30%) rotate(180deg);
		}
	}

	@media (max-width: 768px) {
		width: ${({ $position }) => ($position === 1 ? '200px' : '160px')};
		height: ${({ $position }) => ($position === 1 ? '260px' : '220px')};
		padding: 16px;
	}
`;

export const PlayerAvatar = styled.div`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.2);
	border: 4px solid rgba(255, 255, 255, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 48px;
	color: #fff;
	font-weight: bold;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
	position: relative;
	z-index: 1;

	@media (max-width: 768px) {
		width: 80px;
		height: 80px;
		font-size: 36px;
	}
`;

export const PlayerName = styled.div`
	color: #fff;
	font-size: 20px;
	font-weight: bold;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 1px;
	position: relative;
	z-index: 1;

	@media (max-width: 768px) {
		font-size: 16px;
	}
`;

export const PlayerPoints = styled.div`
	color: #fff;
	font-size: 48px;
	font-weight: bold;
	position: relative;
	z-index: 1;

	@media (max-width: 768px) {
		font-size: 36px;
	}
`;

export const PointsLabel = styled.span`
	font-size: 20px;
	font-weight: normal;
	opacity: 0.9;

	@media (max-width: 768px) {
		font-size: 16px;
	}
`;

export const PodiumBase = styled.div<{ $position: number }>`
	width: ${({ $position }) => ($position === 1 ? '280px' : '240px')};
	height: ${({ $position }) => ($position === 1 ? '80px' : $position === 2 ? '60px' : '40px')};
	background: ${({ $position }) =>
		$position === 1
			? 'linear-gradient(135deg, #2d7a4f, #1e5a3a)'
			: $position === 2
				? 'linear-gradient(135deg, #2c5f8d, #1e4a6f)'
				: 'linear-gradient(135deg, #a85a2a, #8a4a1f)'};
	border-radius: 8px 8px 0 0;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.2);
	position: relative;

	&::after {
		content: '${({ $position }) => $position}';
		font-size: 48px;
		font-weight: bold;
		color: rgba(255, 255, 255, 0.3);
	}

	@media (max-width: 768px) {
		width: ${({ $position }) => ($position === 1 ? '200px' : '160px')};
		height: ${({ $position }) => ($position === 1 ? '60px' : $position === 2 ? '45px' : '30px')};

		&::after {
			font-size: 36px;
		}
	}
`;

export const ConfettiContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	overflow: hidden;
`;
