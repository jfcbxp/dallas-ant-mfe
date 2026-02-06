import React from 'react';
import { ZoneBarContainer, ZoneSegment, ZoneLabel, ZoneLabelContainer } from './HeartRateZoneBar.styles';

interface HeartRateZoneBarProps {
	heartRate: number;
	maxHeartRate?: number;
	userZones?: {
		zone1: { min: number; max: number };
		zone2: { min: number; max: number };
		zone3: { min: number; max: number };
		zone4: { min: number; max: number };
		zone5: { min: number; max: number };
	};
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

const getCurrentZone = (hr: number, userZones?: HeartRateZoneBarProps['userZones']): number => {
	if (userZones) {
		if (hr >= userZones.zone1.min && hr <= userZones.zone1.max) return 0;
		if (hr >= userZones.zone2.min && hr <= userZones.zone2.max) return 1;
		if (hr >= userZones.zone3.min && hr <= userZones.zone3.max) return 2;
		if (hr >= userZones.zone4.min && hr <= userZones.zone4.max) return 3;
		if (hr >= userZones.zone5.min && hr <= userZones.zone5.max) return 4;
	}
	return ZONES.findIndex((zone) => hr >= zone.min && hr < zone.max);
};

export const HeartRateZoneBar: React.FC<HeartRateZoneBarProps> = ({ heartRate, maxHeartRate = 220, userZones, zonePoints }) => {
	const currentZoneIndex = getCurrentZone(heartRate, userZones);
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
