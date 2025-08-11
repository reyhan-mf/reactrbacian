import React from 'react'

export default function CreateIcon() {
    return( <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect
              width="24"
              height="24"
              stroke="none"
              fill="#000000"
              opacity="0"
            />

            <g transform="matrix(1 0 0 1 12 12)">
              <path
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fill: "rgba(243, 240, 240, 1)",
                  fillRule: "evenodd",
                  opacity: 1
                }}
                transform=" translate(-12, -12)"
                d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                strokeLinecap="round"
              />
            </g>
          </svg>)
}