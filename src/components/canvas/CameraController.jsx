// src/components/canvas/CameraController.jsx

import { useEffect, useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import gsap from 'gsap'

export const CameraController = () => {
  const { camera, controls } = useThree()
  const pages = usePortfolioStore((state) => state.pages)
  const view = usePortfolioStore((state) => state.view)
  const activePageId = usePortfolioStore((state) => state.activePageId)
  const hoverPoint = usePortfolioStore((state) => state.hoverPoint)

  // Fetch responsive coordinates
  const r = usePortfolioStore((state) => state.hexSize)
  const hexWidth = Math.sqrt(3) * r

  // Calculate the Bounding Box of all mapped pages
  const bounds = useMemo(() => {
    const minV = pages.reduce((acc, p) => ({ x: Math.min(acc.x, p.vCoord.x), y: Math.min(acc.y, p.vCoord.y) }), { x: Infinity, y: Infinity })
    const maxV = pages.reduce((acc, p) => ({ x: Math.max(acc.x, p.vCoord.x), y: Math.max(acc.y, p.vCoord.y) }), { x: -Infinity, y: -Infinity })

    return {
      minX: (minV.x - 1) * hexWidth,
      maxX: (maxV.x + 1) * hexWidth,
      minZ: (minV.y - 1) * 1.5 * r,
      maxZ: (maxV.y + 1) * 1.5 * r
    }
  }, [pages, hexWidth, r])

  // THE FIX: Dynamically scale the panning margin based on hex size!
  // This prevents wandering into the void when hexes are very small.
  const padding = r * 6

  useFrame((state, delta) => {
    if (!controls) return

    // THE FIX: Slightly tighten the maximum altitude (from 45 down to 35)
    // This ensures the camera can never get high enough to see the physical edge of the rendered grid geometry.
    controls.minDistance = r * 6
    controls.maxDistance = r * 35

    // Joystick Camera Drive
    if (view === 'GRID') {
      const isCursorInside = usePortfolioStore.getState().isCursorInside

      if (isCursorInside) {
        const edgeThreshold = 0.92

        let panX = 0
        let panZ = 0

        if (state.pointer.x > edgeThreshold) panX = 1
        if (state.pointer.x < -edgeThreshold) panX = -1

        if (state.pointer.y > edgeThreshold) panZ = -1
        if (state.pointer.y < -edgeThreshold) panZ = 1

        if (panX !== 0 || panZ !== 0) {
          const panSpeed = 25.0 * delta
          const len = Math.sqrt(panX * panX + panZ * panZ)

          camera.position.x += (panX / len) * panSpeed
          camera.position.z += (panZ / len) * panSpeed
          controls.target.x += (panX / len) * panSpeed
          controls.target.z += (panZ / len) * panSpeed
        }
      }
    }

    // Clamp panning targets using our new dynamic padding
    controls.target.x = Math.max(bounds.minX - padding, Math.min(bounds.maxX + padding, controls.target.x))
    controls.target.z = Math.max(bounds.minZ - padding, Math.min(bounds.maxZ + padding, controls.target.z))

    // Sustain absolute spatial awareness in the store
    usePortfolioStore.setState({ lastCameraPos: camera.position.clone() })

    controls.update()
  })

  // GSAP Triggers
  useEffect(() => {
    if (!controls) return

    if (view === 'FOCUSING' && activePageId) {
      const currentPages = usePortfolioStore.getState().pages
      const page = currentPages.find((p) => p.id === activePageId)
      if (!page) {
        usePortfolioStore.setState({ view: 'ZOOMED', isTransitioning: false })
        return
      }

      const hexWidth = Math.sqrt(3) * r
      const modRow = ((page.vCoord.y % 2) + 2) % 2
      const worldX = (page.vCoord.x + modRow * 0.5) * hexWidth
      const worldZ = page.vCoord.y * 1.5 * r

      const tCamX = worldX
      const tCamY = r * 10 // Dynamic zoom-in altitude
      const tCamZ = worldZ
      const tLookX = worldX
      const tLookY = 0
      const tLookZ = worldZ

      const flightDuration = usePortfolioStore.getState().flightDuration
      controls.enabled = false

      if (controls) {
        gsap.to(controls.target, {
          x: tLookX,
          y: tLookY,
          z: tLookZ,
          duration: flightDuration,
          ease: 'power2.inOut'
        })
      }

      gsap.to(camera.position, {
        x: tCamX,
        y: tCamY,
        z: tCamZ,
        duration: flightDuration,
        ease: 'power2.inOut',
        onUpdate: () => controls?.update(),
        onComplete: () => {
          controls.enabled = true
          if (usePortfolioStore.getState().view === 'FOCUSING') {
            usePortfolioStore.setState({ view: 'GROWING' })
          }
        }
      })
    } else if (view === 'GRID' && !activePageId) {
      controls.enabled = true
      usePortfolioStore.setState({ isTransitioning: false })
    }
  }, [view, activePageId, camera, controls, r])

  const targetZoom = usePortfolioStore((state) => state.targetZoom)

  useEffect(() => {
    if (targetZoom !== null && controls) {
      usePortfolioStore.setState({ isTransitioning: true })

      // Make sure manual zooming respects our tightened boundaries (r * 6 to r * 35)
      const clampedZoom = Math.max(r * 6, Math.min(r * 35, targetZoom))

      gsap.to(camera.position, {
        y: clampedZoom,
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: () => controls.update(),
        onComplete: () => {
          usePortfolioStore.setState({ targetZoom: null, isTransitioning: false })
        }
      })
    }
  }, [targetZoom, camera, controls, r])

  const targetPan = usePortfolioStore((state) => state.targetPan)

  useEffect(() => {
    if (targetPan && controls) {
      usePortfolioStore.setState({ isTransitioning: true })

      gsap.to(controls.target, {
        x: targetPan.x,
        z: targetPan.z,
        duration: 0.8,
        ease: 'power2.out'
      })

      gsap.to(camera.position, {
        x: targetPan.x,
        z: targetPan.z,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => controls.update(),
        onComplete: () => {
          usePortfolioStore.setState({ targetPan: null, isTransitioning: false })
        }
      })
    }
  }, [targetPan, camera, controls])

  return null
}