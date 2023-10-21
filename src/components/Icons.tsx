import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { IconProps } from 'react-native-vector-icons/Icon'

import React from 'react'
import { useTheme } from 'react-native-paper'

export const Icons = (props: IconProps) => <MaterialIcon {...props} />

const withIconProps = (
  WrappedIconComponent: React.ComponentType<IconProps>,
  name: string,
) => {
  // eslint-disable-next-line react/display-name
  return (
    props: Omit<IconProps, 'name'> & { name?: string; active?: boolean },
  ) => {
    const theme = useTheme()

    return (
      <WrappedIconComponent
        name={name}
        {...props}
        color={
          props.active ? theme.colors.primary : theme.colors.surfaceVariant
        }
      />
    )
  }
}

const withFontAV5Icon = (name: string) => withIconProps(FontAwesome5Icon, name)
const withMaterialIcon = (name: string) => withIconProps(MaterialIcon, name)
const withFeatherIcon = (name: string) => withIconProps(FeatherIcon, name)

export const LikeIcon = withFontAV5Icon('thumbs-up')

export const CommentIcon = withMaterialIcon('chat')

export const MoveVertical = withFeatherIcon('move-vertical')

export const CloseIcon = withFeatherIcon('x')

export const ImgCloseIcon = withMaterialIcon('close')
