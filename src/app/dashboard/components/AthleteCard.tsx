import React from 'react';
import { HeartRateData } from '@/types/heartRate';
import {
	CardContainer,
	CardHeader,
	Avatar,
	AthleteInfo,
	AthleteName,
	HeartRateDisplay,
	HeartRateCircle,
	HeartRateValue,
	HeartRateUnit,
} from './AthleteCard.styles';
import { HeartRateZoneBar } from './HeartRateZoneBar';

interface AthleteCardProps {
	data: HeartRateData;
	athleteName: string;
	zone: string;
	isPoints?: boolean;
}

const getZoneColor = (hr: number): string => {
	if (hr < 60) return '#4299e1';
	if (hr < 103) return '#48bb78';
	if (hr < 130) return '#ed8936';
	if (hr < 174) return '#f56565';
	return '#c53030';
};

const getPercentage = (hr: number): number => {
	const maxHr = 220;
	return Math.min(Math.round((hr / maxHr) * 100), 100);
};

export const AthleteCard: React.FC<AthleteCardProps> = ({ data, athleteName, isPoints = false }) => {
	const zoneColor = getZoneColor(data.heartRate);
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
				</AthleteInfo>
			</CardHeader>

			<HeartRateDisplay>
				<HeartRateCircle
					$zoneColor={zoneColor}
					$percentage={percentage}>
					<HeartRateValue>
						{data.heartRate}
						<HeartRateUnit>{isPoints ? 'pts' : 'bpm'}</HeartRateUnit>
					</HeartRateValue>
				</HeartRateCircle>
				<HeartRateZoneBar heartRate={data.heartRate} />
			</HeartRateDisplay>
		</CardContainer>
	);
};
