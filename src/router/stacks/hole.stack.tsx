import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HoleDetail } from '@/pages/hole/HoleDetail'
import { HolePost } from '@/pages/hole/HolePost'

const HoleStack = createNativeStackNavigator()

const HoleStacks = () => {
  return (
    <HoleStack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: '#fff',
        statusBarStyle: 'dark',
      }}
    >
      <HoleStack.Screen
        name={'detail'}
        component={HoleDetail}
      ></HoleStack.Screen>
      <HoleStack.Screen name={'post'} component={HolePost}></HoleStack.Screen>
    </HoleStack.Navigator>
  )
}

export default HoleStacks
