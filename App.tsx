import { useEffect, useState } from 'react';
import { ColorValue, View } from 'react-native';
import CalendarPicker, { CustomDateStyle } from 'react-native-calendar-picker'
import * as Calendar from 'expo-calendar'
import { ListWeekdays, ListMonths } from './src/constants/Constants';
import DropDown from './src/components/DropDown';
import InformationDate from './src/components/InformationDate';
import { styles } from './src/styles/CommonStyles';

export default function App() {
  
  const firstWorkshiftColor = '#FF0000'
  const secondWorkshiftColor = '#F300FF'
  const thirdWorkshiftColor = '#0044FF'
  const freeSundayColor = '#9FFF89'

  const [selectedWorkshift, setSelectedWorkshift] = useState('1')
  const [isFirstWeak, setIsFirstWeak] = useState('1')
  const [stylesDate, setStylesDate] = useState<CustomDateStyle[]>()
  const [date, setDate] = useState<Date>(new Date)

  let counterDays: number = 0

  const getMondayWeek = (d: Date): Date => {
    d = new Date(d)
    const day = d.getDay()
    const diff = d.getDate() - day + (day == 0 ? -6 : 1)
    const monday = new Date(d.setDate(diff))
    return monday
  }

  const addDays = (date: Date, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  const currentMonday = getMondayWeek(new Date())

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
      }
    })();
    
    refreshStylesDate()
  }, [selectedWorkshift, isFirstWeak, date]);


  const refreshStylesDate = () => {
    const stylesDates: CustomDateStyle[] = []
    let startDays = -1
    if (isFirstWeak === '2') {
      startDays = 0
      for (let d = 0; d < 8; d++) {
        const newDate = addDays(currentMonday, -d)
        stylesDates.push({
            date: newDate,
            style: { backgroundColor: getWorkshiftColor(newDate.getDay(), d) },
            textStyle: { color: 'white' }
          })
      }
    }
    setStylesDate(stylesDates)

    for (let d = startDays; d < 360; d++) {
      const newDate = addDays(currentMonday, d)
      stylesDates.push({
          date: newDate,
          style: { backgroundColor: getWorkshiftColor(newDate.getDay(), d) },
          textStyle: { color: 'white' },
        })
      
    }
    setStylesDate(stylesDates)
  }

  const getWorkshiftColor = (day: number, counter: number): ColorValue => {
    
    counterDays += 1
    
    if (day === 0) {
      return freeSundayColor
    }

    if (selectedWorkshift === '1') {
      if (counterDays <= 14) {
        return firstWorkshiftColor
      } 
      
      if (counterDays <= 28) {
        return thirdWorkshiftColor
      }
       
      if (counterDays <= 42) {
        if (counterDays === 42) {
          counterDays = 0
        }
        return secondWorkshiftColor
      }

    } else if (selectedWorkshift === '2') {
      if (counterDays <= 14) {
        return secondWorkshiftColor
      } 
      
      if (counterDays <= 28) {
        return firstWorkshiftColor
      }
      
      if (counterDays <= 42) {
        if (counterDays === 42) {
          counterDays = 0
        }
        return thirdWorkshiftColor
      }
    } else if (selectedWorkshift === '3') {
      if (counterDays <= 14) {
        return thirdWorkshiftColor
      } 
      
      if (counterDays <= 28) {
        return secondWorkshiftColor
      }
      
      if (counterDays <= 42) {
        if (counterDays === 42) {
          counterDays = 0
        }
        return firstWorkshiftColor
      }
    }
    return 'black'
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>

        <DropDown 
          titleText='Turno' 
          items={['Primero', 'Segundo', 'Tercero']} 
          selectedValue={selectedWorkshift}
          onValueChange={(itemValue, itemIndex) =>
            {
              setSelectedWorkshift(itemValue)
            }
          }/>
        
        <DropDown 
          titleText='Semana' 
          items={['Primera', 'Segunda']} 
          selectedValue={isFirstWeak}
          onValueChange={(itemValue, itemIndex) =>
            {
              setIsFirstWeak(itemValue)
            }
          }/>
        
      </View>

      <CalendarPicker 
        todayTextStyle={{color: 'white', fontSize: 18, fontWeight: 'bold'}}
        todayBackgroundColor={'transparent'}
        selectedDayStyle={{backgroundColor: 'white'}}
        customDatesStyles={stylesDate}
        previousTitle='Anterior'
        nextTitle='Próximo'
        weekdays={ListWeekdays}
        months={ListMonths}
        onDateChange={(newDate) => {
          setDate(newDate)
        }}/>
      
      <View style={styles.infoContainer}>
        <InformationDate text='Primero' backgroundColor={firstWorkshiftColor} />
        <InformationDate text='Segundo' backgroundColor={secondWorkshiftColor} />
        <InformationDate text='Tercero' backgroundColor={thirdWorkshiftColor} />
      </View>
    </View>
  )
}
