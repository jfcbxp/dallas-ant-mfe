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
	zonePoints?: {
		zone1: number;
		zone2: number;
		zone3: number;
		zone4: number;
		zone5: number;
	};
}

const getZoneColor = (
	hr: number,
	userZones?: {
		zone1: { min: number; max: number };
		zone2: { min: number; max: number };
		zone3: { min: number; max: number };
		zone4: { min: number; max: number };
		zone5: { min: number; max: number };
	},
): string => {
	if (userZones) {
		if (hr >= userZones.zone1.min && hr <= userZones.zone1.max) return '#4299e1';
		if (hr >= userZones.zone2.min && hr <= userZones.zone2.max) return '#48bb78';
		if (hr >= userZones.zone3.min && hr <= userZones.zone3.max) return '#ed8936';
		if (hr >= userZones.zone4.min && hr <= userZones.zone4.max) return '#f56565';
		if (hr >= userZones.zone5.min && hr <= userZones.zone5.max) return '#c53030';
	}
	if (hr < 100) return '#4299e1';
	if (hr < 120) return '#48bb78';
	if (hr < 140) return '#ed8936';
	if (hr < 170) return '#f56565';
	return '#c53030';
};

const getPercentage = (hr: number): number => {
	const maxHr = 220;
	return Math.min(Math.round((hr / maxHr) * 100), 100);
};

export const AthleteCard: React.FC<AthleteCardProps> = ({ data, athleteName, isPoints = false, zonePoints }) => {
	const zoneColor = getZoneColor(data.heartRate, data.user?.zones);
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
				<HeartRateZoneBar
					heartRate={data.heartRate}
					userZones={data.user?.zones}
					zonePoints={zonePoints}
				/>
			</HeartRateDisplay>
		</CardContainer>
	);
};
