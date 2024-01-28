/// <reference lib="dom" />

import {CameraOpts, CropperOptions} from './types'
import {Image as RNImage} from 'react-native-image-crop-picker'
export {openPicker} from './picker.shared'
import {unstable__openModal} from '#/state/modals'

export async function openCamera(_opts: CameraOpts): Promise<RNImage> {
  // const mediaType = opts.mediaType || 'photo' TODO
  throw new Error('TODO')
}

export async function openCropper(opts: CropperOptions): Promise<RNImage> {
  // TODO handle more opts
  return new Promise((resolve, reject) => {
    unstable__openModal({
      name: 'crop-image',
      uri: opts.path,
      onSelect: (img?: RNImage) => {
        if (img) {
          resolve(img)
        } else {
          reject(new Error('Canceled'))
        }
      },
    })
  })
}
