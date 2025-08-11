export default function TrashIcon({
  color = "#f5f5f5ff",
  width = 24,
  height = 24,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <path
        d="M10 2 9 3H4v2h16V3h-5l-1-1h-4zM5 7v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7H5z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: color,
          fillRule: "nonzero",
          opacity: 1,
        }}
      />
    </svg>
  );
}
