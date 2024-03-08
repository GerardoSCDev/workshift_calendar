import { View, Text } from "react-native"
import { IInformationData } from "../interfaces/Interfaces"
import { styles } from "../styles/CommonStyles"

const InformationDate = ({text, backgroundColor}: IInformationData) => {
    return (
      <View style={styles.blockInfoContainer}>
        <Text>{text}</Text>
        <View style={[styles.infoIconColor, {backgroundColor}]}></View>
      </View>
    )
  }

  export default InformationDate