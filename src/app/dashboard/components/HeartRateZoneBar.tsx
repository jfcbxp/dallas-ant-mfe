import React from 'react';
import { ZoneBarContainer, ZoneSegment, ZoneLabel, ZoneLabelContainer } from './HeartRateZoneBar.styles';

interface HeartRateZoneBarProps {
	heartRate: number;
	maxHeartRate?: number;
	zonePoints?: {
		zone1: number;
		zone2: number;
		zone3: number;
		zone4: number;
		zone5: number;
	};
}

const ZONES = [
	{ min: 0, max: 100, label: 'Z1', color: '#4299e1', colorName: 'Azul' },
	{ min: 100, max: 120, label: 'Z2', color: '#48bb78', colorName: 'Verde' },
	{ min: 120, max: 140, label: 'Z3', color: '#ed8936', colorName: 'Laranja' },
	{ min: 140, max: 170, label: 'Z4', color: '#f56565', colorName: 'Vermelho' },
	{ min: 170, max: 220, label: 'Z5', color: '#c53030', colorName: 'Vermelho Escuro' },
];

const getCurrentZone = (hr: number): number => {
	return ZONES.findIndex((zone) => hr >= zone.min && hr < zone.max);
};

export const HeartRateZoneBar: React.FC<HeartRateZoneBarProps> = ({ heartRate, maxHeartRate = 220, zonePoints }) => {
	const currentZoneIndex = getCurrentZone(heartRate);
	const percentage = Math.min((heartRate / maxHeartRate) * 100, 100);

	const zoneValues = zonePoints ? [zonePoints.zone1, zonePoints.zone2, zonePoints.zone3, zonePoints.zone4, zonePoints.zone5] : null;

	return (
		<div>
			<ZoneBarContainer>
				{ZONES.map((zone, index) => (
					<ZoneSegment
						key={zone.label}
						$color={zone.color}
						$isActive={index === currentZoneIndex}
						$percentage={percentage}
						$zoneIndex={index}></ZoneSegment>
				))}
			</ZoneBarContainer>

			<ZoneLabelContainer>
				{ZONES.map((zone, index) => (
					<ZoneLabel key={zone.label}>
						{zone.label}
						{zoneValues && ` (${zoneValues[index]})`}
					</ZoneLabel>
				))}
			</ZoneLabelContainer>
		</div>
	);
};
