import TimeText from '@/components/Text/TimeText'
import UserAvatar from '@/components/UserAvatar'
import { Pressable, View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { ImageList } from '@/components/Image/ImageList'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { useHoleSearchRoute } from '@/hooks/route/useHoleSearchRoute'
import { Badges } from '@/components/Badges'
import { Tag } from '@/pages/hole/post/components/HolePostAddTags'
import { Svg } from '@/components/Svg/Svg'
import Like from '@/assets/svg/Like.svg'
import Message from '@/assets/svg/Message.svg'
import Other from '@/assets/svg/Other.svg'
import { useState } from 'react'
import { ActionsSheet, SheetItem } from '@/components/ActionsSheet'
import { DeleteHoleRequest } from '@/apis/hole'
import { Toast } from '@/utils/toast'
import { useHoleList } from '@/query/hole'

interface Props {
  data: IHole
  onPress?: () => any
}

const HoleInfoHeader = ({ data }: Props) => {
  const [showSheet, setShowSheet] = useState(false)
  const { refetchQueries } = useHoleList()

  const deleteFunc = async (id: string) => {
    const res = await DeleteHoleRequest({ id })

    if (res) {
      console.log(res)
      Toast.success('删除成功~')
      refetchQueries()
    }
  }

  const sheetList: SheetItem[] = [
    { title: '删除', onPress: () => deleteFunc(data.id) },
    { title: '举报', onPress: () => Toast.info({ text1: '功能正在开发中' }) },
  ]

  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row space-x-2 items-center">
        <UserAvatar url={data.user.avatar} size={35}></UserAvatar>
        <View>
          <Text className="color-primary font-medium text-xl">#{data.id}</Text>
          <TimeText time={data.createAt}></TimeText>
        </View>
      </View>
      <Pressable
        onPress={() => setShowSheet(true)}
        className={'w-8 h-8 flex flex-row justify-end'}
      >
        <Svg SvgComponent={Other} size={20}></Svg>
      </Pressable>
      {/*<HoleActionSheet isOpen={showSheet} onClose={() => setShowSheet(false)} />*/}
      <ActionsSheet
        isOpen={showSheet}
        onClose={() => setShowSheet(false)}
        SheetList={sheetList}
      />
    </View>
  )
}

const HoleInfoBody = ({ data }: Props) => {
  const { goResult } = useHoleSearchRoute()

  return (
    <View className="flex">
      {data.title !== '' ? (
        <View>
          <Text variant={'titleMedium'} className={'font-bold'}>
            {data.title}
          </Text>
        </View>
      ) : (
        <></>
      )}

      <View>
        <EmojiableText
          body={data.body}
          numberOfLines={3}
          variant={'bodyMedium'}
          style={{ color: 'rgba(0, 0, 0, .75)', lineHeight: 25 }}
        />
      </View>
      {data.imgs?.length ? (
        <View className={'flex flex-row flex-wrap w-full mt-1'}>
          <ImageList imgs={data.imgs} />
        </View>
      ) : (
        <></>
      )}
      {data.tags?.length ? (
        <View className="mt-2">
          <Badges
            data={data.tags}
            onPress={(tag: Tag) => {
              console.log(tag)
              goResult(tag.body)
            }}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}

const HoleInfoBottom = ({ data }: Props) => {
  const iconsList = [
    {
      value: data.favoriteCount,
      element: <Svg SvgComponent={Like} size={18} active={data.isLiked} />,
    },
    {
      value: data.commentCounts,
      element: <Svg SvgComponent={Message} size={18} color={'#686E87'} />,
    },
  ]

  return (
    <View className="flex flex-row space-y-1 py-2">
      {iconsList.map((icon, index) => (
        <View
          key={index}
          className="flex flex-row items-center  space-x-2 mr-6"
        >
          {icon.element}
          <Text className="text-[#686E87]">{icon.value}</Text>
        </View>
      ))}
    </View>
  )
}

export const HoleInfo = ({ data, onPress }: Props) => {
  return (
    <View className="bg-white mt-2 rounded-2xl overflow-hidden">
      <TouchableRipple onPress={onPress}>
        <View className="flex-col space-y-3 px-4 py-2">
          <View>
            <HoleInfoHeader data={data}></HoleInfoHeader>
          </View>

          <View>
            <HoleInfoBody data={data}></HoleInfoBody>
          </View>

          <View>
            <HoleInfoBottom data={data}></HoleInfoBottom>
          </View>
        </View>
      </TouchableRipple>
    </View>
  )
}
