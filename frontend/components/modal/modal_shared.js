export const ModalStyle = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)',
    zIndex          : 10
  },

  content : {
    position        : 'fixed',
    top             : '15%',
    left            : '25%',
    right           : '25%',
    bottom          : '15%',
    minHeight      : '100px',
    minWidth       : '200px',
    border          : '1px solid #ccc',
    borderRadius    : '40px 15px',
    backgroundColor: 'white',
    padding         : '30px',
    zIndex          : 101
  },
  'content:hover' : {
    cursor : 'pointer'
  }
}
