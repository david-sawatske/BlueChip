export const ModalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,

    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    display           : 'flex',
    alignItems       : 'center',
    justifyContent   : 'center',
    padding            : '0',
    zIndex              : '1'

  },
  content : {
    position                   : 'absolute',
    fontFamily                 : '"Cinzel Decorative", sans-serif',
    left                       : '',
    top                        : '15vmin',
    right                      : '',
    bottom                     : '',
    background                 : '#545E75',
    border                     : '1px solid #ccc',
    overflow                   : 'scroll',
    height                     : '66%',
    WebkitOverflowScrolling    : 'touch',
  },
  'content:hover' : {
    cursor : 'pointer'
  }
}
