import React from 'react'

import IFrame from 'components/IFrame/IFrame'

const Youtube = ({ id, url, relatedVideos = false }) => {
  const aspectRatio = 9 / 16

  let embedUrl
  if (id) {
    embedUrl = new URL(`https://youtube.com/embed/${id}`)
  } else if (url) {
    embedUrl = new URL()
    const providedUrl = new URL(url)
    providedUrl.searchParams.forEach((value, key) => {
      switch (key) {
        case 'v':
          embedUrl.path = `https://youtube.com/embed/${value}`
          break
        case 't:':
          embedUrl.searchParams.set('start', toSeconds(value))
          break
        default:
          embedUrl.searchParams.set(key, value)
      }
    })
  } else {
    throw new Error('Please provide either a video `id` or a full `url`.')
  }

  if (!relatedVideos) {
    embedUrl.searchParams.set('rel', 0)
  }

  return <IFrame src={embedUrl} aspectRatio={aspectRatio} allowFullscreen />
}

const toSeconds = str => {
  const hoursMinutesSeconds = str.match(/(\d{2})/g)
  return hoursMinutesSeconds.reduceRight(
    (seconds, digits, i) => seconds + parseInt(digits, 10) * Math.pow(60, i)
  )
}

export default Youtube
