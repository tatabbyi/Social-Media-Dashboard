(() => {
    const openBookingButton = document.getElementById('open-booking');
    const bookingDialog = document.getElementById('booking-dialog');
    const dialogCloseButton = bookingDialog ? bookingDialog.querySelector('.dialog-close') : null;
    const backdrop = document.querySelector('.backdrop');

    function openDialog(){
        if(!bookingDialog) return;
        if(typeof bookingDialog.showModal === 'function'){
            bookingDialog.showModal();
        }else {
            bookingDialog.setAttribute('open', 'true');
        }
    }

    function closeDialog(){
        if(!bookingDialog) return;
        if(typeof bookingDialog.close ===  'function'){
            bookingDialog.close();
        }else{
            bookingDialog.removeAttribute('open');
        }
    }

    if(openBookingButton) {
        openBookingButton.addEventListener('click', openDialog);
    }

    if(dialogCloseButton){
        dialogCloseButton.addEventListener('click', closeDialog);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeDialog);
    }
})();