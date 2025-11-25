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
    const wheel = document.querySelector('.ticket-wheel__items');
    const wheelItems = wheel ? Array.prototype.slice.call(wheel.querySelectorAll('.ticket-wheel__item')) : [];
    const ticketStep = wheelItems.length > 0 ? 360 / wheelItems.length : 360;
    const prevControl = document.querySelector('.wheel-control--prev');
    const nextControl = document.querySelector('.wheel-control--next');

    function openDialog() {
        if (!bookingDialog) return;
        if (typeof bookingDialog.showModal === 'function') {
            bookingDialog.showModal();
        } else {
            bookingDialog.setAttribute('open', 'true');
        }
    }

    function closeDialog() {
        if (!bookingDialog) return;
        if (typeof bookingDialog.close === 'function') {
            bookingDialog.close();
        } else {
            bookingDialog.removeAttribute('open');
        }
    }

    if (openBookingButton) {
        openBookingButton.addEventListener('click', openDialog);
    }

    if (dialogCloseButton) {
        dialogCloseButton.addEventListener('click', closeDialog);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeDialog);
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !bookingDialog.hidden) {
            closeDialog();
        }
    });
    if (ticketTypeSelect) {
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
    let activeIndex = 0;
    let activeTicketType = ticketTypeSelect ? ticketTypeSelect.value : 'Weekend-Pass';

    function resolveTicketType(value) {
        return ticketTypes[value] || ticketTypes['Weekend-Pass'];
    }

    function parseQuantity() {
        const quantityText = selectedTicketCount ? selectedTicketCount.textContent : '1';
        const parsed = parseInt(quantityText ? quantityText : '1', 10);
        return isNaN(parsed) ? 1 : parsed;
    }

    function updateSummary() {
        const ticketConfig = resolveTicketType(activeTicketType);
        const quantity = parseQuantity();
        const total = quantity * ticketConfig.price;
        if (selectedTicketTypeLabel) {
            selectedTicketTypeLabel.textContent = ticketConfig.label;
        }
        if (previewTicketType) {
            previewTicketType.textContent = ticketConfig.label;
        }
        if (totalDisplay) {
            totalDisplay.textContent = '€' + total.toLocaleString('en-GB');
        }
    }

    function positionWheelItems() {
        if (!wheel) return;
        const radius = wheel.offsetWidth / 2 - 45;
        wheelItems.forEach((item, index) => {
            const offsetIndex = ((index - activeIndex) + wheelItems.length) % wheelItems.length;
            const angleDegrees = offsetIndex * ticketStep - 90;
            const angleRadians = (angleDegrees * Math.PI) / 180;
            const x = Math.cos(angleRadians) * radius;
            const y = Math.sin(angleRadians) * radius;
            item.style.transform = 'translate(-50%, -50%) translate(' + x + 'px, ' + y + 'px)';
        });
    }
    if (wheelItems.length > 0) {
        positionWheelItems();
    }

    function stepWheel(direction) {
        if (wheelItems.length === 0) return;
        const nextIndex = (activeIndex + direction + wheelItems.length) % wheelItems.length;
        setActiveTicket(nextIndex);
    }

    if (prevControl) prevControl.addEventListener('click', () => stepWheel(-1));
    if (nextControl) nextControl.addEventListener('click', () => stepWheel(1));

    function setActiveTicket(index) {
        if (!wheelItems[index]) return;
        wheelItems.forEach((item, idx) => {
            const isActive = idx === index;
            item.classList.toggle('is-active', isActive);
            item.setAttribute('aria-checked', String(isActive));
            item.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        activeIndex = index;
        const dataQuantity = wheelItems[activeIndex].getAttribute('data-quantity');
        const quantity = parseInt(dataQuantity ? dataQuantity : '1', 10);
        if (selectedTicketCount) {
            selectedTicketCount.textContent = String(quantity);
        }
        updateSummary();
        positionWheelItems();
    }

    wheelItems.forEach((item, index) => {
        item.addEventListener('click', () => setActiveTicket(index));
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveTicket(index);
            }
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                stepWheel(-1);
            }
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                stepWheel(1);
            }
        });
    });
    window.addEventListener('resize', () => {
        positionWheelItems();
    });
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!emailInput || !emailInput.value) {
                if (emailInput) emailInput.focus();
                return;
            }
            const holdingMessage = 'Online payments open soon. Submit your email and we will send a secure checkout link.';
            if (paymentStatus) {
                paymentStatus.textContent = holdingMessage;
            } else {
                alert(holdingMessage);
            }
        });
    }
    setActiveTicket(activeIndex);
    updateSummary();


})();