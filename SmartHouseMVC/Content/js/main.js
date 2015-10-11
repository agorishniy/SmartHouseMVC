window.onload = function () {
    // set same hieght left and right colum
    sameCol();

    // set name of new device for send to server
    $('.btn-add').click(function () {
        this.href = this.href.replace("xxx", $(".name-of-new-device").val());
    });

    $('.device-div-on-off-cmd-btn').click(sendOnOff);
    $('.btn-down').click(sendDown);
    $('.btn-up').click(sendUp);
};

// set same hieght left and right colum
function sameCol() {
    $('.left-col').height($('.right-col').height() + 9);
}

function setOnClick() {
    $('.device-div-on-off-cmd-btn .btn-down .btn-up').unbind();
    $('.device-div-on-off-cmd-btn').click(sendOnOff);
    $('.btn-down').click(sendDown);
    $('.btn-up').click(sendUp);
}

function sendOnOff(event) {
    event.preventDefault();
    $(this).closest('.device-status').load("/Home/AjaxOnOff",
                                            { id: $(this).attr('data-id'), sType: $(this).attr('data-type') },
                                            function () {
                                                setOnClick();
                                                sameCol();
                                            });
};

function sendDown(event) {
    event.preventDefault();
    $(this).closest('.device-status').load("/Home/AjaxDown",
                                            { id: $(this).attr('data-id'), sType: $(this).attr('data-type'), sParam: $(this).attr('data-param') },
                                            function () {
                                                setOnClick();
                                            });
};

function sendUp(event) {
    event.preventDefault();
    $(this).closest('.device-status').load("/Home/AjaxUp",
                                            { id: $(this).attr('data-id'), sType: $(this).attr('data-type'), sParam: $(this).attr('data-param') },
                                            function () {
                                                setOnClick();
                                            });
};