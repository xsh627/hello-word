let timer = setInterval(function () {
  let $video = document.querySelector('.player-wrapper').querySelector('video')
  let $pop = document.querySelector('.scoring-wrapper')
  console.log('$video===', $video)
  console.log('$video.currentTime===', $video.currentTime)
  console.log('$video.duration===', $video.duration)
  if ($video.currentTime === $video.duration) {
      let $activeItem = document.querySelector('.res-item.active')
      let $nextItem = $activeItem.nextSibling
      console.log('$activeItem===', $activeItem)
      console.log('$nextItem===', $nextItem)
      if ($nextItem) {
          console.log('click now!!!')
          $nextItem.querySelector('.res-name').click()
      } else {
          clearInterval(timer)
      }
  }
  // 判断是否显示状态
  if ($pop.offsetWidth > 0) {
    let $ratingWrapper = $pop.querySelector('.rating')
    if ($ratingWrapper) {
      let $lastItem = $ratingWrapper.children[4]
      if ($lastItem) {
        $lastItem.click()
        $pop.querySelector('.scoring-wrapper').querySelector('.commit').querySelector('button').click()
      }
    }
  }
}, 1000*60*10)
