const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if (type === 'success') {
    return (
      <div className="notification-success">
        {message}
      </div>
    )
  }
  if (type === 'error') {
    return (
      <div className="notification-error">
        {message}
      </div>
    )
  }

}

export default Notification