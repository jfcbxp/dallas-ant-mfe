import React from 'react';
import { DeviceResult } from '@/types/lessonResult';
import {
	PodiumContainer,
	PodiumTitle,
	MainTitle,
	SubTitle,
	TrophyIcon,
	PodiumStage,
	PodiumPlace,
	PlaceLabel,
	PlayerCard,
	PlayerAvatar,
	PlayerName,
	PlayerPoints,
	PointsLabel,
	PodiumBase,
} from './Podium.styles';

interface PodiumProps {
	deviceResults: DeviceResult[];
}

export const Podium: React.FC<PodiumProps> = ({ deviceResults }) => {
	// Sort players by points (descending) and get top 3
	const topPlayers = [...deviceResults].sort((a, b) => b.points - a.points).slice(0, 3);

	// If we don't have at least 1 player, show a message
	if (topPlayers.length === 0) {
		return (
			<PodiumContainer>
				<PodiumTitle>
					<MainTitle>SESSÃO CONCLUÍDA</MainTitle>
					<SubTitle>HALL DA FAMA</SubTitle>
				</PodiumTitle>
				<div style={{ color: '#fff', fontSize: '18px' }}>Nenhum resultado disponível</div>
			</PodiumContainer>
		);
	}

	const getPlayerInitials = (name: string) => {
		const names = name.trim().split(' ');
		if (names.length === 1) {
			return names[0].substring(0, 2).toUpperCase();
		}
		return (names[0][0] + names[names.length - 1][0]).toUpperCase();
	};

	const getPlaceText = (position: number) => {
		switch (position) {
			case 1:
				return '1º LUGAR';
			case 2:
				return '2º LUGAR';
			case 3:
				return '3º LUGAR';
			default:
				return `${position}º LUGAR`;
		}
	};

	return (
		<PodiumContainer>
			<PodiumTitle>
				<MainTitle>SESSÃO CONCLUÍDA</MainTitle>
				<SubTitle>HALL DA FAMA</SubTitle>
				<TrophyIcon>🏆</TrophyIcon>
			</PodiumTitle>

			<PodiumStage>
				{topPlayers.map((player, index) => {
					const position = index + 1;
					return (
						<PodiumPlace
							key={player.deviceId}
							$position={position}>
							<PlaceLabel $position={position}>{getPlaceText(position)}</PlaceLabel>
							<PlayerCard $position={position}>
								<PlayerAvatar>{getPlayerInitials(player.user.name)}</PlayerAvatar>
								<PlayerName>{player.user.name}</PlayerName>
								<PlayerPoints>
									{player.points}
									<PointsLabel>pts</PointsLabel>
								</PlayerPoints>
							</PlayerCard>
							<PodiumBase $position={position} />
						</PodiumPlace>
					);
				})}
			</PodiumStage>
		</PodiumContainer>
	);
};
