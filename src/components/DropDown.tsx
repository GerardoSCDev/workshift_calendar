import { Picker } from "@react-native-picker/picker"
import { IDropDown } from "../interfaces/Interfaces"
import { Text, View } from 'react-native'
import { styles } from "../styles/CommonStyles"

 const DropDown = ({titleText, items, selectedValue, onValueChange}: IDropDown) => {
    return (
      <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{titleText}</Text>
          <Picker 
            style={styles.input}
            selectedValue={selectedValue}
            onValueChange={onValueChange}>
              {
                items.map((value, key) => {
                  return <Picker.Item key={value} label={value} value={`${key + 1}`} />
                })
              }
          </Picker>
        </View>
    )
  }

  export default DropDown