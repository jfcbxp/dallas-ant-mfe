'use client';

import { useMemo } from 'react';
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

		const zoneLabels = [
			{ zone: 'Z1', label: 'Leve', color: '#4299e1' },
			{ zone: 'Z2', label: 'Moderado', color: '#48bb78' },
			{ zone: 'Z3', label: 'Aeróbico', color: '#ed8936' },
			{ zone: 'Z4', label: 'Intenso', color: '#f56565' },
			{ zone: 'Z5', label: 'Máximo', color: '#c53030' },
		];

		return zoneLabels.map((zoneLabel) => {
			let count = 0;
			pulseirasData.forEach((d) => {
				const userZones = d.user?.zones;
				if (userZones) {
					const zoneKey = zoneLabel.zone.toLowerCase() as keyof typeof userZones;
					const zone = userZones[zoneKey];
					if (d.heartRate >= zone.min && d.heartRate <= zone.max) {
						count++;
					}
				}
			});
			return {
				...zoneLabel,
				range: '',
				count,
			};
		});
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
