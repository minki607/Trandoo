import React from 'react'
import Popper from '@material-ui/core/Popper'
import NotificationsIcon from '@material-ui/icons/Notifications'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Badge from '@material-ui/core/Badge'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { calcPosted } from '../util'
import { Link } from 'react-router-dom'

export const Notification = ({ items = [], updateNotifications }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [unread] = React.useState(items.filter(x => !x.opened))
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const handleClickAway = () => {
    setAnchorEl(null)
  }
  const sortNotifications = notifications => {
    const notificationPreSort = notifications.sort((A, B) => {
      const transformedA = new Date(A.createdOn)
      const transformedB = new Date(B.createdOn)
      return transformedA < transformedB
        ? 1
        : transformedA > transformedB
          ? -1
          : 0
    })
    const sorted = notificationPreSort.sort((A, B) => {
      return Boolean(A.createdOn) - Boolean(B.createdOn)
    })
    return sorted.slice(0, 7)

  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div
        style={{
          padding: '0px 15px',
          cursor: 'pointer',
          boxSizing: 'content-box'
        }}>
        <Badge badgeContent={items.filter(x => !x.opened).length} color='secondary'>
          <NotificationsIcon onClick={handleClick} />
        </Badge>
        <Popper open={open} anchorEl={anchorEl}>
          <List
            compoennt='nav'
            elevation={1}
            style={{
              background: 'white',
              border: 'solid 1px rgba(0,0,0,0.1)'
            }}>
            {sortNotifications(items).map(item => {
              const linkTarget = {
                pathname: `/translate/view/${item.translation || item.docOwnerId}`,
                key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
                state: {
                  applied: true
                }
              };

              return (
                <ListItem divider style={item.opened && { backgroundColor: 'rgba(0,0,0,0.04)' }} button key={item._id}>
                  <Link
                    className='overlay'
                    onClick={() => updateNotifications(item.translation || item.docOwnerId)}
                    to={linkTarget}>
                    <ListItemText
                      primary={item.type}
                      secondary={calcPosted(item.createdOn)}
                    />
                  </Link>
                </ListItem>
              )
            }
            )}
          </List>
        </Popper>
      </div>
    </ClickAwayListener >
  )
}
