import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import {
    initialize,
    requestPermission,
    readRecords,
} from 'react-native-health-connect';

const permissions: HealthKitPermissions = {
    permissions: {
    read: [
        AppleHealthKit.Constants.Permissions.Steps, 
        AppleHealthKit.Constants.Permissions.FlightsClimbed,
        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
    },
};

const useHealthData = (date: Date) => {
    const [hasPermissions, setHasPermission] = useState(false);
    const [steps, setSteps] = useState(0);
    const [flights, setFlights] = useState(0);
    const [distance, setDistance] = useState(0);

    // ios healthkit
    useEffect(() => {
        if(Platform.OS != 'ios') {
            return;
        }
        
        AppleHealthKit.isAvailable((err, isAvailable) => {
            if(err) {
                console.log('Error checking availability');
                return;
            }
            if(!isAvailable) {
                console.log('Apple Health not available');
                return;
            }
            AppleHealthKit.initHealthKit(permissions, (err) => {
                if(err) {
                    console.log("Error getting permissions");
                    return;
                }
                setHasPermission(true);
            });
        });
    }, []);

    useEffect(() => {
        if(!hasPermissions) {
            return;
        }

        const options: HealthInputOptions = {
            date: date.toISOString(),
            includeManuallyAdded: false,
        };
        
        AppleHealthKit.getStepCount(options, (err, results) => {
            if(err) {
                console.log("Error getting steps.");
                return;
            }
            setSteps(results.value);
        });

        AppleHealthKit.getFlightsClimbed(options, (err, results) => {
            if(err) {
                console.log("Error getting flights climbed.");
                return;
            }
            setFlights(results.value);
        });

        AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
            if(err) {
                console.log("Error getting distance.");
                return;
            }
            setDistance(results.value);
        });
    }, [hasPermissions]);

    // Android health connect

    const readSampleData = async () => {
        // initialize the client
        const isInitialized = await initialize();
        if(!isInitialized) {
            return;
        }
      
        // request permissions
        const grantedPermissions = await requestPermission([
          { accessType: "read", recordType: "Steps" },
          { accessType: "read", recordType: "FloorsClimbed" },
          { accessType: "read", recordType: "Distance" }
        ]);
      
        // check if granted
      
        const result = await readRecords('Steps', {
          timeRangeFilter: {
            operator: 'between',
            startTime: '2023-01-09T12:00:00.405Z',
            endTime: '2023-01-09T23:53:15.405Z',
          },
        });
        console.log(result);
    };

    useEffect(() => {
        if(Platform.OS != 'android') {
            return;
        }
        readSampleData();
    });

    return {
        steps,
        flights,
        distance,
    };
};

export default useHealthData;