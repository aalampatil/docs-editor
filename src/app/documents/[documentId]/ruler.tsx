'use client'
import { ArrowBigDownIcon } from "lucide-react"
import { useState, useRef } from "react";

const markers = Array.from({ length: 91 }, (_, i) => i) // array of 91 empty slots

export const Ruler = () => {

  const [leftMargin, setLeftMargin] = useState(56)
  const [rightMargin, setRightMargin] = useState(56)

  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)

  const rulerRef = useRef<HTMLDivElement>(null); //refernce

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true)
  }
  //mousedown to activate dragging
  const handleRightMouseDown = () => {
    setIsDraggingRight(true)
  }

  //movement of mouse over main div
  const handleMouseMove = (e: React.MouseEvent) => {
    console.log(e);

    const rulerMaxWidth = 816;
    const minSpaceBwPointers = 100;

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container")
      if (container) {
        const containerRect = container.getBoundingClientRect()
        const relativeX = e.clientX - containerRect.left;
        const rawPositon = Math.max(0, Math.min(rulerMaxWidth, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = rulerMaxWidth - rightMargin - minSpaceBwPointers;
          const newLeftPosition = Math.min(rawPositon, maxLeftPosition)
          setLeftMargin(newLeftPosition)
        } else if (isDraggingRight) {
          const maxRightPosition = rulerMaxWidth - (leftMargin + minSpaceBwPointers);
          const newRightPosition = Math.max(rulerMaxWidth - rawPositon, 0)
          const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition)
          setRightMargin(constrainedRightPosition)
        }
      }
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    console.log("up", e.currentTarget)
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
  }

  const handleLeftDoubleClick = () => {
    setLeftMargin(56)
  }
  const handleRightDoubleClick = () => {
    setRightMargin(56)
  }

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-[816px] mx-auto h-6 flex items-end relative select-none print:hidden border-b">
      <div
        id="ruler-container"
        className=" w-full h-full relative "
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-full"
        >
          <div
            className="relative h-full w-204"
          >
            {markers.map((marker) => {
              const position = (marker * 816) / 90.2;
              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {
                    marker % 10 === 0 && (
                      <>
                        <div className="absolute bottom-0 w-px h-3 bg-red-500  " />
                        <span className="absolute bottom-2 text-[10px] text-neutral-500 tranform -translate-x-1/2 pb-px">{marker / 10 + 1}</span>
                      </>
                    )
                  }
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <>
                      <div className=" absolute bottom-0 w-px h-2 bg-green-600" />
                      <span className="absolute bottom-2 text-[7px] text-neutral-500 tranform -translate-x-1/2 pb-px">{marker / 10 + 1}</span>
                    </>
                  )}
                  {marker % 5 !== 0 && (
                    <>
                      <div className=" absolute bottom-0 w-px h-1 bg-purple-500" />
                      <span className="absolute bottom-2 text-[5px] text-neutral-500 tranform -translate-x-1/2 pb-px">{marker / 10 + 1}</span>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isDragging,
  isLeft,
  onDoubleClick,
  onMouseDown

}: MarkerProps) => (
  <div
    className="absolute top-0 w-4 h-full cursor-ew-resize z-5 group -ml-2"
    style={{
      [isLeft ? "left" : "right"]: ` ${position}px `
    }}
    onMouseDown={onMouseDown}
    onDoubleClick={onDoubleClick}
  >
    <ArrowBigDownIcon />
    <div className="absolute left-3 top-4 transform -translate-x-1/2 s"
      style={{
        height: "100vh",
        width: "1px",
        transform: "scaleX(0.5)",
        backgroundColor: "green",
        display: isDragging ? "block" : "none"
      }} />
  </div>
)



