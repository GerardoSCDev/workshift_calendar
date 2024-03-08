import { StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      marginTop: 100,
      gap: 30
    },
    inputsContainer: {
      flex: 0,
      flexDirection: 'row',
      width: '100%',
      gap: 10
    },
    inputContainer: {
      flex: 1,
      height: 65,
      backgroundColor: '#C883FF',
      borderRadius: 10,
      padding: 5
    },
    inputLabel: {
      color: 'white',
      fontSize: 18,
      paddingLeft: 15
    },
    input: {
      flex: 1,
      color: 'white',
      marginTop: -10,
    },
    infoContainer: {
      flex: 1,
      flexDirection: 'row'
    },
    blockInfoContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    infoIconColor: {
      width: 30, 
      height: 30,
      borderRadius: 30,
    }
  })