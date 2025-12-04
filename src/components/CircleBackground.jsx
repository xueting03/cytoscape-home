export function CircleBackground({ color, className = '', ...props }) {
  return (
    <div 
      className={className}
      style={{ color: color }}
      {...props}
    >
      <img 
        src="/images/svg/circle-background.svg" 
        alt="" 
        aria-hidden="true"
        style={{ width: '558px', height: '558px' }}
      />
    </div>
  )
}
