'use client';

import React, { useMemo } from 'react';
import { usePulseiras } from '@/hooks/usePulseiras';
import { AthleteCard } from './components/AthleteCard';
import { ZoneStats } from '@/types/heartRate';
import {
	DashboardContainer,
	Header,
	Logo,
	LogoIcon,
	LogoText,
	Title,
	CardsGrid,
	StatsBar,
	StatItem,
	StatLabel,
	StatValue,
	StatRange,
	AverageDisplay,
	AverageIcon,
	AverageInfo,
	AverageLabel,
	AverageValue,
} from './styles';

const athleteNames = ['Bianca J.', 'Lucas O.', 'Mariana S.', 'Jorge C.', 'Fernanda X.', 'Daniel', 'Hugo', 'Sebastiao P.'];

export default function DashboardPage() {
	const { data = [], isLoading } = usePulseiras();

	const zoneStats: ZoneStats[] = useMemo(() => {
		const zones = [
			{ zone: 'Z1', label: 'Leve', range: '60-60%', color: '#4299e1', min: 0, max: 60 },
			{ zone: 'Z2', label: 'Moderado', range: '★ 3-13', color: '#48bb78', min: 60, max: 103 },
			{ zone: 'Z3', label: 'Aeróbico', range: '★ 3-103', color: '#ed8936', min: 103, max: 130 },
			{ zone: 'Z4', label: 'Intenso', range: '★ 3-100', color: '#f56565', min: 130, max: 174 },
			{ zone: 'Z5', label: 'Máximo', range: '1-174', color: '#c53030', min: 174, max: 999 },
		];

		return zones.map((z) => ({
			...z,
			count: data.filter((d) => d.heartRate >= z.min && d.heartRate < z.max).length,
		}));
	}, [data]);

	const averageHR = useMemo(() => {
		if (data.length === 0) return 0;
		return Math.round(data.reduce((sum, d) => sum + d.heartRate, 0) / data.length);
	}, [data]);

	if (isLoading) {
		return (
			<DashboardContainer>
				<div style={{ color: '#fff', textAlign: 'center', paddingTop: '50px' }}>Carregando...</div>
			</DashboardContainer>
		);
	}

	return (
		<DashboardContainer>
			<Header>
				<Logo>
					<LogoIcon>💓</LogoIcon>
					<LogoText>Dallas PULSE</LogoText>
				</Logo>
				<Title>Monitore sua Frequência Cardíaca!</Title>
			</Header>

			<CardsGrid>
				{data.map((item, index) => (
					<AthleteCard
						key={item.deviceId}
						data={item}
						athleteName={athleteNames[index] || `Atleta ${index + 1}`}
						zone={`ZONE ${item.stickId}`}
					/>
				))}
			</CardsGrid>

			<StatsBar>
				{zoneStats.map((stat) => (
					<StatItem
						key={stat.zone}
						$color={stat.color}>
						<div>
							<StatLabel>
								{stat.zone} {stat.label}
							</StatLabel>
							<StatValue>★ {stat.count}</StatValue>
							<StatRange>{stat.range}</StatRange>
						</div>
					</StatItem>
				))}

				<AverageDisplay>
					<AverageIcon>💙</AverageIcon>
					<AverageInfo>
						<AverageLabel>Média FC</AverageLabel>
						<AverageValue>{averageHR}</AverageValue>
					</AverageInfo>
				</AverageDisplay>
			</StatsBar>
		</DashboardContainer>
	);
}
