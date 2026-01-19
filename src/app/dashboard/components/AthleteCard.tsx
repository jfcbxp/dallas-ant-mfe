import React from 'react';
import { HeartRateData } from '@/types/heartRate';
import {
	CardContainer,
	CardHeader,
	Avatar,
	AthleteInfo,
	AthleteName,
	ZoneLabel,
	HeartRateDisplay,
	HeartRateCircle,
	HeartRateValue,
	HeartRateUnit,
	PercentageDisplay,
} from './AthleteCard.styles';

interface AthleteCardProps {
	data: HeartRateData;
	athleteName: string;
	zone: string;
}

const getZoneColor = (hr: number): string => {
	if (hr < 60) return '#4299e1'; // Z1 - Azul
	if (hr < 103) return '#48bb78'; // Z2 - Verde
	if (hr < 130) return '#ed8936'; // Z3 - Laranja
	if (hr < 174) return '#f56565'; // Z4 - Vermelho
	return '#c53030'; // Z5 - Vermelho escuro
};

const getZoneName = (hr: number): string => {
	if (hr < 60) return 'Z1 - Leve';
	if (hr < 103) return 'Z2 - Moderado';
	if (hr < 130) return 'Z3 - Aeróbico';
	if (hr < 174) return 'Z4 - Intenso';
	return 'Z5 - Máximo';
};

const getPercentage = (hr: number): number => {
	const maxHr = 220;
	return Math.min(Math.round((hr / maxHr) * 100), 100);
};

export const AthleteCard: React.FC<AthleteCardProps> = ({ data, athleteName, zone }) => {
	const zoneColor = getZoneColor(data.heartRate);
	const zoneName = getZoneName(data.heartRate);
	const percentage = getPercentage(data.heartRate);
	const initials = athleteName
		.split(' ')
		.map((n) => n[0])
		.join('')
		.substring(0, 2);

	return (
		<CardContainer $zoneColor={zoneColor}>
			<CardHeader>
				<Avatar>{initials}</Avatar>
				<AthleteInfo>
					<AthleteName>{athleteName}</AthleteName>
					<ZoneLabel>{zone}</ZoneLabel>
				</AthleteInfo>
			</CardHeader>

			<HeartRateDisplay>
				<HeartRateCircle
					$zoneColor={zoneColor}
					$percentage={percentage}>
					<HeartRateValue>
						{data.heartRate}
						<HeartRateUnit>bpm</HeartRateUnit>
					</HeartRateValue>
				</HeartRateCircle>
				<PercentageDisplay>{percentage}%</PercentageDisplay>
			</HeartRateDisplay>
		</CardContainer>
	);
};
