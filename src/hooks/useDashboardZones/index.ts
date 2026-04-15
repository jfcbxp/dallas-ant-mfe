import { useMemo } from 'react';
import { ZoneStats, HeartRateData } from '@/types/heartRate';
import { LessonResult } from '@/types/lessonResult';

interface UseDashboardZonesParams {
	isActive: boolean;
	resultData?: LessonResult;
	pulseirasData: HeartRateData[];
}

export const useDashboardZones = ({ isActive, resultData, pulseirasData }: UseDashboardZonesParams): ZoneStats[] => {
	return useMemo(() => {
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
					color: '#aa36ed',
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
			{ zone: 'Z4', label: 'Intenso', color: '#aa36ed' },
			{ zone: 'Z5', label: 'Máximo', color: '#c53030' },
		];

		return zoneLabels.map((zoneLabel) => {
			let count = 0;
			pulseirasData.forEach((d) => {
				const userZones = d.user?.zones;
				if (userZones) {
					const zoneKey = zoneLabel.zone.toLowerCase() as keyof typeof userZones;
					const zone = userZones[zoneKey];
					if (zone && d.heartRate >= zone.min && d.heartRate <= zone.max) {
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
};
