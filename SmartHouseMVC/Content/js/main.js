window.onload = function () {
    // set same hieght left and right colum
    $('.left-col').height($('.right-col').height() + 9);

    // set name of new device for send to server
    $('.btn-add').click(function () {
        this.href = this.href.replace("xxx", $(".name-of-new-device").val());
    });
};
