export function enableTouchSimulation() {
    if ('ontouchstart' in window) return // 已有 touch 直接返回

    let activeTouch: Touch | null = null

    // ---- pointerdown → touchstart ----
    const onPointerDown = (e: PointerEvent) => {
        activeTouch = new Touch({
            identifier: Date.now(),
            target: e.target as EventTarget,
            clientX: e.clientX,
            clientY: e.clientY,
            pageX: e.pageX,
            pageY: e.pageY
        })

        const event = new TouchEvent('touchstart', {
            bubbles: true,
            cancelable: true,
            touches: [activeTouch],
            targetTouches: [activeTouch],
            changedTouches: [activeTouch]
        })

        ;(e.target as HTMLElement).dispatchEvent(event)
    }

    // ---- pointermove → touchmove ----
    const onPointerMove = (e: PointerEvent) => {
        if (!activeTouch) return

        activeTouch = new Touch({
            identifier: activeTouch.identifier,
            target: activeTouch.target,
            clientX: e.clientX,
            clientY: e.clientY,
            pageX: e.pageX,
            pageY: e.pageY
        })

        const event = new TouchEvent('touchmove', {
            bubbles: true,
            cancelable: true,
            touches: [activeTouch],
            targetTouches: [activeTouch],
            changedTouches: [activeTouch]
        })

        ;(activeTouch.target as HTMLElement).dispatchEvent(event)
    }

    // ---- pointerup / pointercancel → touchend ----
    const onPointerUp = (e: PointerEvent) => {
        if (!activeTouch) return

        const event = new TouchEvent('touchend', {
            bubbles: true,
            cancelable: true,
            touches: [],
            targetTouches: [],
            changedTouches: [activeTouch]
        })

        ;(activeTouch.target as HTMLElement).dispatchEvent(event)
        activeTouch = null
    }

    // ---- 添加事件监听 ----
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('pointermove', onPointerMove, true)
    document.addEventListener('pointerup', onPointerUp, true)
    document.addEventListener('pointercancel', onPointerUp, true)

    // ---- 返回一个方法，用于移除监听 ----
    return function disableTouchSimulation() {
        document.removeEventListener('pointerdown', onPointerDown, true)
        document.removeEventListener('pointermove', onPointerMove, true)
        document.removeEventListener('pointerup', onPointerUp, true)
        document.removeEventListener('pointercancel', onPointerUp, true)
    }
}
