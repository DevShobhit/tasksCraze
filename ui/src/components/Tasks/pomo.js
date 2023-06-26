import { AlarmIcon, StopWatchIcon } from '../../utilities/customIcons'

const renderpomo = (active, completed, total) => {
  return (
    <div>
      {new Array(total).fill(null).map((_, idx) => {
        if (idx < completed) {
          return (
            <span key={idx}>
              <AlarmIcon style={{ color: 'teal' }} />
            </span>
          )
        } else if (idx === completed && active) {
          return (
            <span key={idx}>
              <StopWatchIcon style={{ color: '#ff9529' }} />
            </span>
          )
        } else {
          return (
            <span key={idx}>
              <AlarmIcon style={{ color: '#bbb' }} />
            </span>
          )
        }
      })}
    </div>
  )
}

export default renderpomo
