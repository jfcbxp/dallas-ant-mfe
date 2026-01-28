'use client';

import React, { useMemo } from 'react';
import { usePulseiras } from '@/hooks/usePulseiras';
import { useLessonStatus } from '@/hooks/useLessonStatus';
import { useLessonResult } from '@/hooks/useLessonResult';
import { AthleteCard } from './components/AthleteCard';
import { Podium } from './components/Podium';
import { ZoneStats } from '@/types/heartRate';
import Image from 'next/image';
import logo from '../../../public/logo_grande.png';
import {
	DashboardContainer,
	Header,
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
} from './styles';

export default function DashboardPage() {
	const { data: lessonStatus } = useLessonStatus();
	const isActive = lessonStatus?.status === 'ACTIVE';
	const { data: pulseirasData = [] } = usePulseiras();
	const { data: resultData, isLoading } = useLessonResult(!isActive);

	const zoneStats: ZoneStats[] = useMemo(() => {
		if (!isActive && resultData) {
			return [
				{
					zone: 'Z1',
					label: 'Leve',
					range: '',
					color: '#4299e1',
					count: resultData.deviceResults.reduce((sum, d) => sum + d.zones.zone1, 0),
				},
				{
					zone: 'Z2',
					label: 'Moderado',
					range: '',
					color: '#48bb78',
					count: resultData.deviceResults.reduce((sum, d) => sum + d.zones.zone2, 0),
				},
				{
					zone: 'Z3',
					label: 'Aeróbico',
					range: '',
					color: '#ed8936',
					count: resultData.deviceResults.reduce((sum, d) => sum + d.zones.zone3, 0),
				},
				{
					zone: 'Z4',
					label: 'Intenso',
					range: '',
					color: '#f56565',
					count: resultData.deviceResults.reduce((sum, d) => sum + d.zones.zone4, 0),
				},
				{
					zone: 'Z5',
					label: 'Máximo',
					range: '',
					color: '#c53030',
					count: resultData.deviceResults.reduce((sum, d) => sum + d.zones.zone5, 0),
				},
			];
		}

		const zones = [
			{ zone: 'Z1', label: 'Leve', range: '60-60%', color: '#4299e1', min: 0, max: 60 },
			{ zone: 'Z2', label: 'Moderado', range: '★ 3-13', color: '#48bb78', min: 60, max: 103 },
			{ zone: 'Z3', label: 'Aeróbico', range: '★ 3-103', color: '#ed8936', min: 103, max: 130 },
			{ zone: 'Z4', label: 'Intenso', range: '★ 3-100', color: '#f56565', min: 130, max: 174 },
			{ zone: 'Z5', label: 'Máximo', range: '1-174', color: '#c53030', min: 174, max: 999 },
		];

		return zones.map((z) => ({
			...z,
			count: pulseirasData.filter((d) => d.heartRate >= z.min && d.heartRate < z.max).length,
		}));
	}, [isActive, resultData, pulseirasData]);

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
				<Image
					alt='logo'
					src={logo}
				/>
			</Header>

			{isActive ? (
				<CardsGrid>
					{pulseirasData.map((item, index) => (
						<AthleteCard
							key={item.deviceId}
							data={item}
							athleteName={item.user?.name || `Atleta ${index + 1}`}
							zone={`ZONE ${item.stickId}`}
						/>
					))}
				</CardsGrid>
			) : (
				resultData && <Podium deviceResults={resultData.deviceResults} />
			)}

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
							{stat.range && <StatRange>{stat.range}</StatRange>}
						</div>
					</StatItem>
				))}

				<AverageDisplay $isActive={isActive}>
					<AverageIcon>{isActive ? '💙' : '🏆'}</AverageIcon>
					<AverageInfo>
						<AverageLabel $isActive={isActive}>{isActive ? 'Aula Ativa' : 'Aula Encerrada'}</AverageLabel>
					</AverageInfo>
				</AverageDisplay>
			</StatsBar>
		</DashboardContainer>
	);
}
