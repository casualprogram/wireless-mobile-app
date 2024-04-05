import { Animated, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';

type ProgressProps = {
    step: number;
    steps: number;
    height?: number
};

const Progress = ({step, steps, height = 30}: ProgressProps) => {
    const [width, setWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const reactive = useRef(new Animated.Value(-1000)).current;
  
    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: reactive,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, []);
  
    useEffect(() => {
      if(step > steps) {
        step = steps;
      }
      if(step === 0) {
        step = 800;
      }
      reactive.setValue((-width + (width * step) / steps));
    }, [step, width]);
  
    return ( 
      <>
        <Text 
            style={{
                fontSize: 18, 
                marginBottom: 8, 
                color: 'white'
            }}
        >
            {step} / {steps}
        </Text>
        <View 
          onLayout={e => {
            const newWidth = e.nativeEvent.layout.width;
            setWidth(newWidth);
          }}
          style={{
            height, 
            backgroundColor: 'rgba(15, 10, 222, 0.5)', 
            borderRadius: height, 
            overflow: 'hidden'
          }}
        >
          <Animated.View 
            style={{
              height,
              width: '100%',
              borderRadius: height,
              backgroundColor: 'rgba(15, 10, 222, 1.0)',
              position: 'absolute',
              left: 0,
              top: 0,
              transform: [
                {
                  translateX: animatedValue,
                },
              ],
            }}
          />
          <AntDesign
            name="arrowright"
            size={height}
            color="black"
            style={{
                position: 'absolute',
                alignSelf: 'auto'
            }}

          />
        </View> 
      </>
    )
  }
  
export default Progress;