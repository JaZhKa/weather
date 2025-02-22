interface TooltipProps {
  x: number;
  y: number;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, content }) => (
  <div
    className="absolute p-2 bg-gray-700 text-white text-xs rounded w-24"
    style={{ left: x, top: y, transform: 'translate(50%, -50%)', zIndex: 20 }}
  >
    {content}
  </div>
);

export default Tooltip;
