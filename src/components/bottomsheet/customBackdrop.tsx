import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useRecoilState } from "recoil";
import { isBottomFilter } from "../../atom";
import { StyleSheet, TouchableOpacity } from "react-native";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  //바털필터 제거
  const [isOpen, setIsOpen] = useRecoilState(isBottomFilter);
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#rgba(0, 0, 0, 0.58)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <Animated.View style={containerStyle} onTouchEnd={() => setIsOpen(false)} />
  );
};

export default CustomBackdrop;
