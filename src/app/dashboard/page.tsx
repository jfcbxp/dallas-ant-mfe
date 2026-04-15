'use client';

import { usePulseiras } from '@/hooks/usePulseiras';
import { useLessonStatus } from '@/hooks/useLessonStatus';
import { useLessonResult } from '@/hooks/useLessonResult';
import { useDashboardZones } from '@/hooks/useDashboardZones';
import { AthleteCard } from './components/AthleteCard';
import { Podium } from './components/Podium';
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
	LoadingMessage,
} from './Dashboard.styles';

export default function DashboardPage() {
	const { data: lessonStatus } = useLessonStatus();
	const isActive = lessonStatus?.status === 'ACTIVE';
	const { data: pulseirasData = [] } = usePulseiras();
	const { data: resultData, isLoading } = useLessonResult(!isActive);

	const zoneStats = useDashboardZones({ isActive, resultData, pulseirasData });

	if (isLoading) {
		return (
			<DashboardContainer>
				<LoadingMessage>Carregando...</LoadingMessage>
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
