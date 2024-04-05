import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Value from "./src/components/Value";
import Progress from "./src/components/ProgressBar";
import useHealthData from './src/hooks/useHealthData';
import React from 'react';

const STEPS_GOAL = 10000;

export default function App() {

  const { steps, flights, distance } = useHealthData(new Date(2024, 3, 4));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Step Counter</Text>
      <StatusBar hidden />
      <Progress step={steps} steps={STEPS_GOAL} height={30} />
      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()}/>
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`}/>
        <Value label="Flights Climbed" value={flights.toString()}/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 20,
  },
  values: { 
    flexDirection: 'row', 
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 75,
  },
  text: {
    fontSize: 32,
    color: 'white',
    alignSelf: 'center',
    padding: 50,
  },
});
