window.onload = function () {
    // set same hieght left and right colum
    sameCol();

    // set name of new device for send to server
    $('.btn-add').click(function () {
        this.href = this.href.replace("xxx", $(".name-of-new-device").val());
    });

    $('.device-div-on-off-cmd-btn').on('click', sendOnOff);
    $('.btn-down').on('click', sendDown);
    $('.btn-up').on('click', sendUp);
};

// set same hieght left and right colum
function sameCol() {
    $('.left-col').height($('.right-col').height() + 9);
}

function setOnClick() {
    $('.device-div-on-off-cmd-btn').off();
    $('.btn-down').off();
    $('.btn-up').off();

    $('.device-div-on-off-cmd-btn').on('click', sendOnOff);
    $('.btn-down').on('click', sendDown);
    $('.btn-up').on('click', sendUp);
}

function sendOnOffAjax(event) {
    event.preventDefault();
    $(this).closest('.device-status').load("/Home/AjaxOnOff",
                                            { id: $(this).attr('data-id'), sType: $(this).attr('data-type') },
                                            function () {
                                                setOnClick();
                                                sameCol();
                                            });
};

function sendOnOff(event) {
    event.preventDefault();
    var imgBtn = $(this).children("img");
    var divStatus = $(this).closest(".device-status");
    var divState = $(this).closest(".device-status").children(".div-state");
    var divOnOff = $(this).closest(".device-div-on-off");
    var sType = $(this).attr('data-type');
    var id = $(this).attr('data-id');

    $.ajax({
        url: "/api/values/" + sType + "/" + id,
        type: "GET",
        success: function (dev) {
            if (dev.State == true) {
                imgBtn.attr('src', '../Content/images/btn_on.png');
                divState.children("span").html("State: ON");
            } else {
                imgBtn.attr('src', '../Content/images/btn_off.png');
                divState.children("span").html("State: OFF");
            }
            switch (sType) {
                case "Lamp":
                    if (dev.State == true) {
                        divState.children("img").attr('src', '../Content/images/lamp_on.png');
                    } else {
                        divState.children("img").attr('src', '../Content/images/lamp_off.png');
                    }
                    break;
                case "Fan":
                    if (dev.State == true) {
                        divState.children("img").attr('src', '../Content/images/fan_' + dev.Speed.Value + '.gif');

                        divOnOff.before('<div class="div-status-block div-speed"></div>');
                        var divSpeed = divStatus.find('.div-speed');
                        divSpeed.append('<div class="div-param-text"><span class="device-status-name">Speed</span></div>');
                        divSpeed.append('<div class="div-param-btn"></div>');
                        var divBtn = divSpeed.find('.div-param-btn');
                        divBtn.append('<a class="btn-down" href="" data-id="' + id + '" data-type="' + sType + '" data-param="Speed"><img class="device-div-speed-img" src="../Content/images/btn_down.png" /></a>');
                        divBtn.append('<img class="device-div-speed-state" src="../Content/images/val_' + dev.Speed.Value + '.png")" />');
                        divBtn.append('<a class="btn-up" href="" data-id="' + id + '" data-type="' + sType + '" data-param="Speed"><img class="device-div-speed-img" src="../Content/images/btn_up.png" /></a>');

                        divBtn.children('.btn-down').on('click', sendDown);
                        divBtn.children('.btn-up').on('click', sendUp);

                    } else {
                        divStatus.children('.div-speed').remove();
                        divState.children("img").attr('src', '../Content/images/fan_stop.png');
                    }
                    break;
                case "Louvers":
                    if (dev.State == true) {
                        divState.children("img").attr('src', '../Content/images/louvers_' + dev.Open.Value + '.png');

                        divOnOff.before('<div class="div-status-block div-open"></div>');
                        var divOpen = divStatus.find('.div-open');
                        divOpen.append('<div class="div-param-text"><span class="device-status-name">Open: ' + 50 * dev.Open.Value + '%</span></div>');
                        divOpen.append('<div class="div-param-btn"></div>');
                        var divBtn = divOpen.find('.div-param-btn');
                        divBtn.append('<a class="btn-down" href="" data-id="' + id + '" data-type="' + sType + '" data-param="Open"><img class="device-div-speed-img" src="../Content/images/btn_down.png" /></a>');
                      //  divRight.append('<img class="device-div-speed-state" src="../Content/images/val_' + dev.Open.Value + '.png")" />');
                        divBtn.append('<a class="btn-up" href="" data-id="' + id + '" data-type="' + sType + '" data-param="Open"><img class="device-div-speed-img" src="../Content/images/btn_up.png" /></a>');

                        divBtn.children('.btn-down').on('click', sendDown);
                        divBtn.children('.btn-up').on('click', sendUp);

                    } else {
                        divStatus.children('.div-open').remove();
                        divState.children("img").attr('src', '../Content/images/louvers_stop.png');
                    }
                    break;
                case "Tv":
                    if (dev.State == true) {
                        divState.children("img").attr('src', '../Content/images/tv_' + getNameOfChannel(dev.Channel) + '.png');

                        divOnOff.before('<div class="div-status-block div-volume"></div>');
                        var divVolume = divStatus.find('.div-volume');
                        divVolume.append('<div class="div-param-text"><span class="device-status-name">Volume</span></div>');
                        divVolume.append('<div class="div-param-btn"></div>');
                        var divBtn = divVolume.find('.div-param-btn');
                        divBtn.append('<a class="btn-down" href="" data-id="' + id + '" data-type="' + sType + '" data-param="Volume"><img class="device-div-speed-img" src="../Content/images/btn_down.png" /></a>');
                        divBtn.append('<img class="device-div-speed-state" src="../Content/images/val_' + dev.Volume.Value + '.png")" />');
                        divBtn.append('<a class="btn-up" href="" data-id="' + id + '" data-type="' + sType + '" data-param="Volume"><img class="device-div-speed-img" src="../Content/images/btn_up.png" /></a>');

                        divBtn.children('.btn-down').on('click', sendDown);
                        divBtn.children('.btn-up').on('click', sendUp);


                        divOnOff.before('<div class="div-status-block div-program"></div>');
                        var divProgram = divStatus.find('.div-program');
                        divProgram.append('<div class="div-param-text"><span class="device-status-name">Program</span><img class="device-div-prog-state" src="../Content/images/icon_' + getNameOfChannel(dev.Channel) + '.png")" /></div>');
                        divProgram.append('<div class="div-param-btn"></div>');
                        var divBtn = divProgram.find('.div-param-btn');
                        divBtn.append('<a class="btn-down" href="" data-id="' + id + '" data-type="' + sType + '" data-param="Program"><img class="device-div-speed-img" src="../Content/images/btn_down.png" /></a>');
                        divBtn.append('<a class="btn-up" href="" data-id="' + id + '" data-type="' + sType + '" data-param="Program"><img class="device-div-speed-img" src="../Content/images/btn_up.png" /></a>');

                        divBtn.children('.btn-down').on('click', sendDown);
                        divBtn.children('.btn-up').on('click', sendUp);
                    } else {
                        divStatus.children('.div-program').remove();
                        divStatus.children('.div-volume').remove();
                        divState.children("img").attr('src', '../Content/images/tv_stop.png');
                    }
                    break;
            }
            sameCol();
        }
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


function getNameOfChannel(channel) {
    switch (channel) {
        case 0: return "ictv";
        case 1: return "inter";
        case 2: return "ukraine";
        case 3: return "discovery";
        case 4: return "m1";
        case 5: return "football";
    }
}
