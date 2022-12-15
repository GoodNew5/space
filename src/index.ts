import './main.scss'

const dragger = () => {
  const dragZoneEl = document.querySelector<HTMLElement>('.galaxy__zone--js')
  const dragTarget = document.querySelector<HTMLElement>('.galaxy__zone-ufo--js')
  const dragWrapper = document.querySelector<HTMLElement>('.galaxy--js')

  let isDragReady = false

  if (dragTarget && dragZoneEl && dragWrapper) {
    const setDraggable = (state: boolean) => {
      if (state) {
        dragTarget.style.position = 'absolute'
        dragTarget.style.zIndex = '10'
        document.body.append(dragTarget)
        return
      }

      dragWrapper.append(dragTarget)
      dragTarget.style.zIndex = ''
      dragTarget.style.left = ''
      dragTarget.style.top = ''
      dragTarget.style.bottom = ''
    }

    const onMouseDown = (event: MouseEvent) => {
      const shiftX = event.clientX - dragTarget?.getBoundingClientRect().left
      const shiftY = event.clientY - dragTarget.getBoundingClientRect().top
      isDragReady = true

      const moveAt = (pageX: number, pageY: number) => {
        if (!isDragReady) return

        let cordX = pageX - shiftX
        let cordY = pageY - shiftY
        const dragZoneClientWidth = dragZoneEl.clientWidth
        const dragTargetClientWidth = dragTarget.clientWidth
        const dragZoneClientHeight = dragZoneEl.clientHeight
        const dragTargetClientHeight = dragTarget.clientHeight
        const leftSideRestrict = cordX < 0
        const topSideRestrict = cordY < 0
        const rightSideRestrict = cordX + dragTargetClientWidth >= dragZoneClientWidth
        const bottomSideRestrict = cordY + dragTargetClientHeight >= dragZoneClientHeight

        if (leftSideRestrict) {
          cordX = 0
        }

        if (rightSideRestrict) {
          cordX = dragZoneClientWidth - dragTargetClientWidth
        }

        if (topSideRestrict) {
          cordY = 0
        }

        if (bottomSideRestrict) {
          cordY = dragZoneClientHeight - dragTargetClientHeight
        }

        dragTarget.style.left = `${cordX}px`
        dragTarget.style.top = `${cordY}px`
      }

      if (isDragReady) {
        setDraggable(true)
      }

      moveAt(event.pageX, event.pageY)

      const onMouseMove = (event: MouseEvent) => {
        moveAt(event.pageX, event.pageY)
      }

      const onMouseUp = () => {
        isDragReady = false
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    const onResize = () => {
      setDraggable(false)
    }

    window.addEventListener('resize', onResize)
    dragTarget.addEventListener('dragstart', () => false)
    dragTarget.addEventListener('mousedown', onMouseDown)
  }
}

dragger()
