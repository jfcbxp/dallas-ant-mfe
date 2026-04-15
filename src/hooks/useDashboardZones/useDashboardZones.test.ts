import { renderHook } from '@testing-library/react';
import { useDashboardZones } from './index';
import { LessonResult } from '@/types/lessonResult';

describe('useDashboardZones', () => {
	it('returns 5 zones with count=0 when pulseirasData=[] and isActive=true', () => {
		const { result } = renderHook(() => useDashboardZones({ isActive: true, pulseirasData: [] }));
		expect(result.current).toHaveLength(5);
		result.current.forEach((zone) => expect(zone.count).toBe(0));
	});

	it('returns zones summed from resultData when isActive=false', () => {
		const resultData: LessonResult = {
			lessonId: 'l1',
			totalDevices: 2,
			totalPoints: 100,
			duration: 60,
			deviceResults: [
				{
					deviceId: 1,
					user: { id: 'u1', name: 'Alice', gender: 'F', weight: 60, height: 165, birthDate: '1990-01-01', createdAt: '', updatedAt: '' },
					totalHeartRateRecords: 10,
					zones: { zone1: 2, zone2: 3, zone3: 1, zone4: 2, zone5: 2 },
					points: 50,
					avgHeartRate: 140,
				},
				{
					deviceId: 2,
					user: { id: 'u2', name: 'Bob', gender: 'M', weight: 80, height: 180, birthDate: '1985-01-01', createdAt: '', updatedAt: '' },
					totalHeartRateRecords: 10,
					zones: { zone1: 1, zone2: 1, zone3: 3, zone4: 3, zone5: 2 },
					points: 50,
					avgHeartRate: 155,
				},
			],
		};

		const { result } = renderHook(() => useDashboardZones({ isActive: false, resultData, pulseirasData: [] }));

		expect(result.current).toHaveLength(5);
		expect(result.current[0].count).toBe(3); // zone1: 2+1
		expect(result.current[1].count).toBe(4); // zone2: 3+1
		expect(result.current[2].count).toBe(4); // zone3: 1+3
		expect(result.current[3].count).toBe(5); // zone4: 2+3
		expect(result.current[4].count).toBe(4); // zone5: 2+2
	});
});
