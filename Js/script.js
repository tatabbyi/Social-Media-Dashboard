(() => {
    const openBookingButton = document.getElementById('open-booking');
    const bookingDialog = document.getElementById('booking-dialog');
    const dialogCloseButton = bookingDialog ? bookingDialog.querySelector('.dialog-close') : null;
    const backdrop = document.querySelector('.backdrop');
    const bookingForm = bookingDialog ? bookingDialog.querySelector('form') : null; //form,email input, ticketlabels and display refrences
    const emailInput = document.getElementById('booking-email');
    const selectedTicketCount = document.getElementById('selected-ticket-count');
    const selectedTicketTypeLabel = document.getElementById('selected-ticket-type');
    const totalDisplay = document.getElementById('total');
    const previewTicketType = document.getElementById('preview-ticket-type');
    const paymentStatus = document.getElementById('payment-status');
    const ticketTypeSelect = document.getElementById('ticket-type');
    )

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
    if(ticketTypeSelect) {
        ticketTypeSelect.addEventListener('change', () => {
            activeTicketType = ticketTypeSelect ? ticketTypeSelect.value : 'Weekend-pass';
            updateSummary(); 
        });
    }
const ticketTypes = {
    'Day-Pass': { label: 'Day Pass', price: 75 },
    'Weekend-Pass': { label: 'Weekend Pass', price: 200 },
    'Full-Madness-Pass': { label: 'Full Madness Pass', price: 500 },
    'Camping-Pass': { label: 'Camping Pass', price: 50 },
};
let active Index = 0;
let activeTicketType = ticketTypeSelect ? ticketTypeSelect.value : 'Weekend-pass'; 

})();