//открытие модального окна 
export function openModalWindow(modalWindow, escCloseListener, mouseDownListener, mouseUpListener){
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keyup', event => escCloseListener.call(this, event, modalWindow, escCloseListener, mouseDownListener, mouseUpListener));
  document.addEventListener('mousedown', mouseDownListener);
  document.addEventListener('mouseup', event => mouseUpListener.call(this, event, escCloseListener, mouseDownListener, mouseUpListener));
}

//закрытие модального окна 
export function closeModalWindow(modalWindow, escCloseListener, mouseDownListener, mouseUpListener) {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', escCloseListener);
  document.removeEventListener('mousedown', mouseDownListener);
  document.removeEventListener('mouseup', mouseUpListener);
}

//esc
export function closeModalWindowEscape (event, modalWindow, escCloseListener, mouseDownListener, mouseUpListener){
  if (event.key === 'Escape') {
    closeModalWindow(modalWindow, escCloseListener, mouseDownListener, mouseUpListener);
  }
}

//overlay
export function overlayMouseDown(event){
  if(!event.target.classList.contains('popup_is-opened')) return;
  event.target.isClickOnThis = true;
}

export function overlayMouseUp(event, escCloseListener, mouseDownListener, mouseUpListener){
  if (event.target.isClickOnThis && event.target.classList.contains('popup_is-opened')) {
    event.preventDefault();
    closeModalWindow(event.target, escCloseListener, mouseDownListener, mouseUpListener);
  }

  event.target.isClickOnThis = false;
}
