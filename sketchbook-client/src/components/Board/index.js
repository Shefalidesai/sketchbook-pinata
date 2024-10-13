import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { CANVAS_TOOLS } from "@/constants";
import { actionItemClick } from '@/slice/menuSlice'

import { socket } from "@/socket";

const Board = () => {
    const dispatch = useDispatch()
    const canvasRef = useRef(null)
    const drawHistory = useRef([])
    const pointerHistory = useRef(0)
    const startDrawing = useRef(false)
    const {activeMenuItem, actionMenuItem} = useSelector((state) => state.menu)
    const {color, size} = useSelector((state) => state.toolbox[activeMenuItem])


    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        if (actionMenuItem === CANVAS_TOOLS.DOWNLOAD) {
            const URL = canvas.toDataURL()
            const anchor = document.createElement('a')
            anchor.href = URL
            anchor.download = 'sketch.jpg'
            console.log(anchor);
            uploadToPinata(anchor);
            anchor.click()
        } else  if (actionMenuItem === CANVAS_TOOLS.UNDO || actionMenuItem === CANVAS_TOOLS.REDO) {
            if(pointerHistory.current > 0 && actionMenuItem === CANVAS_TOOLS.UNDO) pointerHistory.current -= 1
            if(pointerHistory.current < drawHistory.current.length - 1 && actionMenuItem === CANVAS_TOOLS.REDO) pointerHistory.current += 1
            const imageData = drawHistory.current[pointerHistory.current]
            context.putImageData(imageData, 0, 0)
        }
        dispatch(actionItemClick(null))
    }, [actionMenuItem, dispatch])

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        const changeConfig = (color, size) => {
            context.strokeStyle = color
            context.lineWidth = size
        }

        const handleChangeConfig = (config) => {
            console.log("config", config)
            changeConfig(config.color, config.size)
        }
        changeConfig(color, size)
        socket.on('changeConfig', handleChangeConfig)

        return () => {
            socket.off('changeConfig', handleChangeConfig)
        }
    }, [color, size])

    // before browser pain
    useLayoutEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const beginPath = (x, y) => {
            context.beginPath()
            context.moveTo(x, y)
        }

        const drawLine = (x, y) => {
            context.lineTo(x, y)
            context.stroke()
        }
        const handleMouseDown = (e) => {
            startDrawing.current = true
            beginPath(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
            socket.emit('beginPath', {x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY})
        }

        const handleMouseMove = (e) => {
            if (!startDrawing.current) return
            drawLine(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
            socket.emit('drawLine', {x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY})
        }

        const handleMouseUp = (e) => {
            startDrawing.current = false
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            drawHistory.current.push(imageData)
            pointerHistory.current = drawHistory.current.length - 1
        }

        const handleBeginPath = (path) => {
            beginPath(path.x, path.y)
        }

        const handleDrawLine = (path) => {
            drawLine(path.x, path.y)
        }

        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseup', handleMouseUp)

        canvas.addEventListener('touchstart', handleMouseDown)
        canvas.addEventListener('touchmove', handleMouseMove)
        canvas.addEventListener('touchend', handleMouseUp)


        socket.on('beginPath', handleBeginPath)
        socket.on('drawLine', handleDrawLine)

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseup', handleMouseUp)

            canvas.removeEventListener('touchstart', handleMouseDown)
            canvas.removeEventListener('touchmove', handleMouseMove)
            canvas.removeEventListener('touchend', handleMouseUp)

            socket.off('beginPath', handleBeginPath)
            socket.off('drawLine', handleDrawLine)
        }
    }, [])


    const uploadToPinata = async (anchor) => {
        const token = process.env.NEXT_PUBLIC_PINATA_JWT;
    
        const form = new FormData();
        const blob = await fetch(anchor.href).then(anchor => anchor.blob()); // Convert data URL to Blob
        const file = new File([blob], 'sketch.jpg', { type: 'image/jpeg' });
        form.append("file", file);
          
        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`, 
                //'Content-Type': 'multipart/form-dat
            },
            body: form            
        };
       
        
        try {
            const response = await fetch('https://uploads.pinata.cloud/v3/files', options);
            const data = await response.json();
            if (response.ok) {
                console.log("Upload successful:", data);
                return data; 
            } else {
                console.error("Error uploading to Pinata:", data);
            }
        } catch (error) {
            console.error("Error uploading to Pinata:", error);
        }
    };


    return (<canvas ref={canvasRef}></canvas>
    )
}

export default Board;
