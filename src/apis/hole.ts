import { HoleListMode } from '@/shared/enum'
import { PaginateAble } from '@/shared/types'
import { request } from '@/utils/request'
import { PostHoleValidator } from '@/shared/validators/hole'

interface Id {
  id: number
}

/**
 * 获取树洞列表
 */
export function GetHoleListRequest(
  params: PaginateAble<{
    mode: HoleListMode
  }>,
) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/hole/list',
    params,
  })
}

/**
 * 创建树洞
 */
export function PostHoleRequest(data: PostHoleValidator) {
  return request<IResponse>({
    method: 'POST',
    url: '/hole/create',
    data,
  })
}

/**
 * 点赞
 */
export function PostLikeHole(data: Id) {
  return request<IResponse>({
    method: 'POST',
    url: '/hole/like',
    data,
  })
}

/**
 * 上传图片
 */
export function UploadHoleImgRequest(imgs: string[]) {
  const data = new FormData()

  for (const img of imgs) {
    // @ts-ignore
    data.append('files', {
      uri: img,
      type: 'image/jpeg',
      name: 'photo.jpg',
    })
  }

  return request<string[]>({
    method: 'POST',
    url: '/oss/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  })
}
