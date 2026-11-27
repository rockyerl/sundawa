'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface HeroOrbitVideoProps {
    src: string
    fallbackSrc: string
    alt: string
    reducedMotion: boolean
}

const VERTEX_SHADER = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
    v_uv = vec2((a_pos.x + 1.0) * 0.5, 1.0 - (a_pos.y + 1.0) * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

// GPU luma-key shader: pure black (#000) becomes 100% transparent alpha while preserving
// saturated dark blue globe, gold orbit ring, and pure white SUNDAWA typography cleanly.
const FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D u_tex;
varying vec2 v_uv;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    float maxCh = max(c.r, max(c.g, c.b));
    float alpha = smoothstep(0.055, 0.165, maxCh);
    // Recover clean un-darkened edge color for semi-transparent anti-aliased border pixels
    vec3 rgb = alpha > 0.001 ? clamp(c.rgb / mix(1.0, alpha, 0.35), 0.0, 1.0) : vec3(0.0);
    gl_FragColor = vec4(rgb * alpha, alpha);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
    }
    return shader
}

export default function HeroOrbitVideo({ src, fallbackSrc, alt, reducedMotion }: HeroOrbitVideoProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoReady, setVideoReady] = useState(false)
    const [webglFailed, setWebglFailed] = useState(false)

    useEffect(() => {
        if (reducedMotion) return
        const canvas = canvasRef.current
        const video = videoRef.current
        if (!canvas || !video) return

        const gl = canvas.getContext('webgl', {
            alpha: true,
            premultipliedAlpha: true,
            antialias: true,
            powerPreference: 'default',
        })
        if (!gl) {
            const frame = window.requestAnimationFrame(() => setWebglFailed(true))
            return () => window.cancelAnimationFrame(frame)
        }

        const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
        const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
        if (!vs || !fs) {
            const frame = window.requestAnimationFrame(() => setWebglFailed(true))
            return () => window.cancelAnimationFrame(frame)
        }

        const program = gl.createProgram()
        if (!program) return
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const frame = window.requestAnimationFrame(() => setWebglFailed(true))
            return () => window.cancelAnimationFrame(frame)
        }

        gl.useProgram(program)

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW,
        )

        const posLoc = gl.getAttribLocation(program, 'a_pos')
        gl.enableVertexAttribArray(posLoc)
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

        const tex = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        gl.clearColor(0, 0, 0, 0)

        let rafId = 0
        let disposed = false
        let hasSignaledReady = false

        const renderFrame = () => {
            if (disposed) return
            if (!document.hidden && video.readyState >= 2 && video.videoWidth > 0) {
                if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
                    canvas.width = video.videoWidth
                    canvas.height = video.videoHeight
                    gl.viewport(0, 0, canvas.width, canvas.height)
                }

                gl.clear(gl.COLOR_BUFFER_BIT)
                gl.bindTexture(gl.TEXTURE_2D, tex)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
                gl.drawArrays(gl.TRIANGLES, 0, 6)

                if (!hasSignaledReady) {
                    hasSignaledReady = true
                    setVideoReady(true)
                }
            }
            rafId = window.requestAnimationFrame(renderFrame)
        }

        video.play().catch(() => {
            // Autoplay blocked — static fallback remains visible cleanly
        })
        rafId = window.requestAnimationFrame(renderFrame)

        return () => {
            disposed = true
            window.cancelAnimationFrame(rafId)
            gl.deleteTexture(tex)
            gl.deleteBuffer(buffer)
            gl.deleteProgram(program)
            gl.deleteShader(vs)
            gl.deleteShader(fs)
        }
    }, [reducedMotion, src])

    if (reducedMotion || webglFailed) {
        return (
            <div style={{ width: 290, maxWidth: '100%', filter: 'drop-shadow(0 24px 32px rgba(0,0,0,0.45))' }}>
                <Image
                    src={fallbackSrc}
                    alt={alt}
                    width={500}
                    height={500}
                    className="object-contain"
                    priority
                    sizes="290px"
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
        )
    }

    return (
        <div
            style={{
                position: 'relative',
                width: 360,
                maxWidth: '100%',
                aspectRatio: '16 / 9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 22px 30px rgba(0,0,0,0.45))',
            }}
        >
            {/* Hidden video source decoded by GPU */}
            <video
                ref={videoRef}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
            />

            {/* Instant transparent fallback until first WebGL frame renders */}
            {!videoReady && (
                <div style={{ position: 'absolute', width: 280, maxWidth: '75%' }}>
                    <Image
                        src={fallbackSrc}
                        alt={alt}
                        width={500}
                        height={500}
                        className="object-contain"
                        priority
                        sizes="280px"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            )}

            {/* True-alpha GPU-keyed 60fps canvas */}
            <canvas
                ref={canvasRef}
                role="img"
                aria-label={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    opacity: videoReady ? 1 : 0,
                    transition: 'opacity 0.25s ease-out',
                }}
            />
        </div>
    )
}
