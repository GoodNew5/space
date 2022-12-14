import './main.scss'

const dragger = () => {
  const dragZoneEl = document.querySelector<HTMLElement>('.galaxy__zone--js')
  const dragTarget = document.querySelector<HTMLElement>('.galaxy__zone-ufo--js')
  const dragWrapper = document.querySelector<HTMLElement>('.galaxy--js')

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
      const shiftX = event.clientX - dragTarget.getBoundingClientRect().left
      const shiftY = event.clientY - dragTarget.getBoundingClientRect().top

      const moveAt = (pageX: number, pageY: number) => {
        const cordX = pageX - shiftX
        const cordY = pageY - shiftY
        const leftSideRestrict = cordX >= 0
        const topSideRestrict = cordY >= 0
        const rightSideRestrict = cordX + dragTarget.offsetWidth <= dragZoneEl.offsetWidth
        const bottomSideRestrict = cordY + dragTarget.offsetHeight <= dragZoneEl.offsetHeight

        if (leftSideRestrict && rightSideRestrict && topSideRestrict && bottomSideRestrict) {
          dragTarget.style.left = `${cordX}px`
          dragTarget.style.top = `${cordY}px`
        }
      }

      setDraggable(true)
      moveAt(event.pageX, event.pageY)

      const onMouseMove = (event: MouseEvent) => {
        moveAt(event.pageX, event.pageY)
      }

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        dragTarget.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      dragTarget.addEventListener('mouseup', onMouseUp)
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
