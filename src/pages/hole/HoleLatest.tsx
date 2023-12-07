import { StatusBar, View } from 'react-native'
import { useHoleList } from '@/query/hole'
import { useTheme } from 'react-native-paper'
import HoleList from '@/pages/hole/components/list'
import { useIsFocused } from '@react-navigation/native'

export function HoleLatest() {
  const query = useHoleList()
  const theme = useTheme()
  const isFocused = useIsFocused()

  return (
    <View>
      {isFocused ? (
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={theme.colors.background}
        />
      ) : null}
      <HoleList {...query}></HoleList>
    </View>
  )
}
