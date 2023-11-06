import { Text, View, StyleSheet,Image } from 'react-native';
import { OnboardFlow } from 'react-native-onboard';
import { useTheme } from 'react-native-paper';
export function OnBoardScreen() {
  const themes = useTheme()
  return (
    <View style={styles.container}>
      <OnboardFlow primaryColor={themes.colors.primary} pages={[
        {
          title: '欢迎来到农大树洞！',
          subtitle: '在树洞中展示并记录你的生活',
          imageUri:  Image.resolveAssetSource(require('../../assets/onBoard/_6376de33-0028-4285-b471-09a8a9bc5314.jpg')).uri,
          primaryButtonTitle: '下一步'
        },
        {
          title: '随机漫步',
          subtitle: '看看大家在树洞里发了什么？',
          imageUri: Image.resolveAssetSource(require('../../assets/onBoard/_074cc015-06cd-4058-b38d-2f9dbdaa316d.jpg')).uri,
          primaryButtonTitle: '下一步',
        },
        {
          title: '农大树洞',
          subtitle: '启动树洞，发表你的第一个文章吧',
          imageUri: Image.resolveAssetSource(require('../../assets/onBoard/_9a019c15-0b4d-49d8-9bee-dbcfacf91d95.jpg')).uri,
          primaryButtonTitle: '启动!',
        }
      ]}
      type='fullscreen' // Change to either 'fullscreen', 'bottom-sheet', or 'inline'
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
