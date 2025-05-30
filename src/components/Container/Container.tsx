import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native";
import { styles } from "./Container.styles";

type Props = {
  children: ReactNode
}

export default function Container({ children }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  )
}