//<!-- Javascript for Domoticz frontpage -->
//<!-- Create popup -->
function lightbox_open(id, timeout, txt) {
    window.scrollTo(0, 0);
    if (typeof txt !== 'undefined') {
        $('#popup_' + id).html('<div>' + txt + '</div>');
    }
    $('#popup_' + id).fadeIn('fast');
    $('#fade').fadeIn('fast');
    return setTimeout(function () {
        lightbox_close(id);
    }, timeout);
}
//<!-- Close popup -->
function lightbox_close(id) {
    $('#popup_' + id).fadeOut('fast');
    $('#fade').fadeOut('fast');
}

function stringpad(string, maxlength) {
    string = string.toString();
    return string.length < maxlength ? stringpad("0" + string, maxlength) : string;
}

//<!-- Main Frontpage function -->
function RefreshData() {
    clearInterval($.refreshTimer);

    var jurl = $.domoticzurl + "/json.htm?type=devices&plan=" + $.roomplan + "&jsoncallback=?";
    $.getJSON(jurl,
        {
            format: "json"
        },
    function(data) {
        var today = new Date();

        if (typeof data.result != 'undefined') {
            $.each(data.result, function(i, item) {
                for (var ii = 0, len = $.PageArray.length; ii < len; ii++) {
                    if ($.PageArray[ii][0] === item.idx) {      // Domoticz idx number
                        var vtype = $.PageArray[ii][1];         // Domoticz type (like Temp, Humidity)
                        var vlabel = $.PageArray[ii][2];        // cell number from HTML layout
                        var vdesc = $.PageArray[ii][3];         // description
                        var lastseen = $.PageArray[ii][4];      // Display lastseen or not
                        var vplusmin = $.PageArray[ii][5];      // minplus buttons
                        var vattr = $.PageArray[ii][6] || '';   // extra css attributes
                        var valarm = $.PageArray[ii][7];        // alarm value to turn text to red
                        var vdata = item[vtype];                // current value
                        var vstatus = item["Status"];           // current status
                        var vls = item["LastUpdate"];           // Last Seen
                        var vdataSuffix = '';                   // The extra info after the raw value (%, W, kWh, Lux...)
                        var lastSeenArray = getLastSeen(item["LastUpdate"]);
                        var vdate = '';
                        var switchclick='';

                        //Added by GZ used for last seen to only show day if <> today
                        var thisday = (new Date()).toISOString().slice(0,10);

                        var vdimmercurrent = item["LevelInt"];	// What is the dim level int
                        var vdimmervalue = item["Level"];		// What is the dim level
                        if (typeof vdata == 'undefined') {
                            vdata = "?!";
                            vdata = item.idx;
                        } else {
                            // remove too much text
                            vdata = new String(vdata).split(" Level:",1)[0];
                            vdata = new String(vdata).replace("Set","On");
                            //EDB: remove this here, will be done later
                            //vdata = new String(vdata).split("m3",1)[0];
                            vdata = new String(vdata).replace("true","protected");
                            //Added by GZ to only show date if <> today, see below
                            vdate = new String(vls).split(" ",2)[0];
                        }

                        alarmcss='';

                        //Check whether we want to add the last seen to the block
                        if (lastseen == '1') {
                            if (thisday == vdate) {
                                $('#ls_' + vlabel).html(lastSeenArray["time"]);                                 // Show only the time if last change date = today
                            } else {
                                $('#ls_' + vlabel).html(lastSeenArray["time"] + ' | ' + lastSeenArray["date"]); // Change this 'Last Seen' into something you like
                            }
                        } else if (lastseen == '2') {
                            $('#ls_' + vlabel).html(lastSeenArray["time"]);// Show only the time
                        }

                        //Dimmer
                        if (vtype == 'Level' && item.SwitchType == 'Dimmer') {
                            var min = '';
                            if (vplusmin > 0) {
                                if (vdata == txt_off) {
                                    if (vplusmin == 1) { //Normal dimmer
                                        var hlp = '<span onclick="SwitchToggle('+item.idx+',\'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')"; style='+alarmcss+'>'+ vdata+'</span>';
                                    }
                                    //var plus = "<img src=icons/up_off.png align=right vspace=12 onclick=ChangeStatus('plus',txt_off," + item.idx + ","+ vdimmercurrent+")>"; //align=right replaced by hspace and vspace
                                    //var min = "<img src=icons/down_off.png align=left vspace=12 onclick=ChangeStatus('min',txt_off," + item.idx + ","+ vdimmercurrent+")>" //allign=left
                                    var plus = ""; //no buttons when switch is off
                                    var min = ""; //no buttons when switch is off
                                }
                                else {
                                    if (item.MaxDimLevel == 100) {
                                        //vdata = o_dimmer;
                                        vdimmervalue = Math.round(vdimmervalue / 10)*10; //round to ten
                                        vdata = vdimmervalue; //show current dim value
                                        var hlp = '<span onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"; style='+alarmcss+'>'+ vdata+'</span>';
                                        var plus = "<img src=icons/up.png align=right vspace=12 onclick=BlindChangeStatus('plus'," + vdata + "," + item.idx + ")>";
                                        var min = "<img src=icons/down.png align=left vspace=12 onclick=BlindChangeStatus('min'," + vdata + "," + item.idx + ")>";
                                        //console.log(vdata + " | " + item.idx);
                                    } else {
                                        //vdata2 = vdimmervalue; //used for ChangeStatus
                                        //vdimmervalue = Math.round(vdimmervalue / 5)*5; //round to ten
                                        vdata = vdimmervalue; //show current dim value
                                        var hlp = '<span onclick="SwitchToggle('+item.idx+',\'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"; style='+alarmcss+'>'+ vdata+'</span>';
                                        var plus = "<img src=icons/up.png align=right vspace=12 onclick=ChangeStatus('plus'," + vdata + "," + item.idx + ","+ vdimmercurrent+")>"; //align=right replaced by hspace and vspace
                                        var min = "<img src=icons/down.png align=left vspace=12 onclick=ChangeStatus('min'," + vdata + "," + item.idx + ","+ vdimmercurrent+")>" //align=left
                                    }
                                }
                            }
                            vdata = min.concat(hlp,plus);
                            //console.log(vdata);
                        }

                        switch (item.SwitchType) {
                            //Push On gives wrong(undesired) status
                            //case "Push On Button":
                            //    vdata = 'Off'
                            case "Doorbell":
                                if (item.Data.substr(0, 2) == doorbell_status) {
                                    //lightbox_open('camera1', 15400);
                                    vdata = "Tringgg";
                                    //vdesc=new String(vdesc).replace( "Deurbel", "Deurbel");
                                } else {
                                    vdata = item.Data;
                                }
                                break;
                            case "Push On Button":
                                // always show off state
                                switchclick = 'onclick="SwitchToggle('+ item.idx +', \'On\');lightbox_open(\'switch\', ' + switch_on_timeout + ', ' + txt_switch_on + ')"';
                                alarmcss = color_off;
                                vdata = icon_off;
                                break;
                            case "On/Off":
                                if (vplusmin == 0) {
                                    if (vstatus == 'Off') {
                                        alarmcss = color_off;
                                        vdata = txt_off; //show text from frontpage_settings
                                    } else {
                                        alarmcss = color_on;
                                        vdata = txt_on; //show text from frontpage_settings
                                    }
                                }
                                if (vdata == 'Off') {
                                    switchclick = 'onclick="SwitchToggle('+ item.idx +', \'On\');lightbox_open(\'switch\', ' + switch_on_timeout + ', ' + txt_switch_on + ')"';
                                    alarmcss = color_off;
                                    vdata = icon_off;
                                } else if (vdata == 'On') {
                                    switchclick = 'onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', ' + switch_off_timeout + ', ' + txt_switch_off + ')"';
                                    alarmcss = color_on;
                                    vdata = icon_on;
                                }
                                if (item.Protected == true) {
                                    vdesc = vdesc + '<img src=icons/lock-closed_w.png align=right style="margin:1.5px 3px 0px -10px">';
                                    switchclick = 'onClick="lightbox_open(\'protected\', ' + switch_protected_timeout + ', ' + txt_switch_protected + ');"';
                                }
                                break;
                            case 'Selector':
                                // Since level names are encoded the names are retrieved from the 'Description' if set.
                                // Format to use: e.g. Off|Dicht|Half open|Volledig open
                                vdata = item['Level']; //get current level
                                var levelNames = item['Description'].split("|"); //get all levels
                                var countLevels = item['Description'].split("|").length-1; //count the number of levels
                                var levelIndex = item['Level'] / 10;
                                if (levelIndex < countLevels) {
                                    var LevelName = levelNames[levelIndex].substr(0, 8);
                                    if (LevelName == 'Off') {
                                        LevelName = txt_off;
                                    }
                                }
                                else {
                                    LevelName = '?'
                                }
                                // EDB: removed selector part, because the min/plus is not working and the text is too long
                                // if(lvlindex == 0) { //switch is off
                                //    //var hlp = '<span onclick=BlindChangeStatus('plus', vdata, item.idx);lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')"; style='+alarmcss+'>'+ vdata+'</span>';
                                    //allow button to switch on
                                //    var hlp = '<span onclick="BlindChangeStatus(\'plus\', '+vdata+', '+item.idx+');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')"; style="font-size: 20px;">'+LevelName+'</span>';
                                //    var plus = ""; //no up when switch is off
                                //    var min = ""; //no down when switch is off
                                //    //var plus = "<img src=icons/up_off.png align=right vspace=12 width=30 onclick=BlindChangeStatus('plus'," +vdata+ "," + item.idx + ")>";
                                //    //var min = "<img src=icons/down_off.png align=left vspace=12 width=30>";
                                //}
                                //else { //switch is on
                                //    if (lvlindex == countlevels) { //max level, don't allow plus button to go to next level which isn't there
                                //        var plus = "<img src=icons/up.png align=right vspace=12 width=30>";
                                //    }
                                //    else {
                                //        var plus = "<img src=icons/up.png align=right vspace=12 width=30 onclick=BlindChangeStatus('plus'," +vdata+ "," + item.idx + ")>";
                                //    }
                                //    var min = "<img src=icons/down.png align=left vspace=12 width=30 onclick=BlindChangeStatus('min'," +vdata+ "," + item.idx + ")>";
                                //    //var hlp = '<span style='+vattr+'>'+LevelName+'</span>';
                                //    //allow button to switch off
                                //    var hlp = '<span onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"; style="font-size: 18px;">'+LevelName+'</span>';
                                //}
                                //console.log(vdata);
                                //vdata = min.concat(hlp,plus);
                                
                                vdata = '<span style="font-size: 18px;">'+LevelName+'</span>';
                                break;
                            case "Blinds":
                                var hlp = '<img src=icons/sun_stop_d.png hspace=15 vspace=10 onclick="SwitchToggle('+item.idx+', \'Stop\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_stop+')">';

                                if(vdata == 'Closed') {
                                    var up = '<img src=icons/sun_up_off.png hspace=15 vspace=10 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
                                    var down = '<img src=icons/sun_down_on.png hspace=15 vspace=10 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
                                    vdesc = vdesc + " | " + txt_zonon; //Change description text
                                }
                                if (vdata == 'Open') {
                                    var up = '<img src=icons/sun_up_on.png hspace=15 vspace=10 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
                                    var down = '<img src=icons/sun_down_off.png hspace=15 vspace=10 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
                                    vdesc = vdesc + " | " + txt_zonoff; //Change description text
                                }
                                if (vdata == 'Stopped') {
                                    var up = '<img src=icons/sun_up_off.png hspace=15 vspace=10 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
                                    var down = '<img src=icons/sun_down_on.png hspace=15 vspace=10 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
                                    vdesc = vdesc + " | " + txt_zonstopped; //Change description text
                                }
                                vdata = down.concat(hlp, up);
                                break;

                            case "Blinds Inverted":
                                if(vdata == 'Closed') {
                                    var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_down+')">';
                                    var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_up+')">';
                                }
                                if (vdata == 'Open') {
                                    var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_down+')">';
                                    var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_up+')">';
                                }
                                vdata = down.concat(up);
                                break;

                            case "Blinds Percentage":
                            case "Blinds Percentage Inverted":
                                var plus = "<img src=icons/up.png  vspace=12 hspace=4 width=30 onclick=BlindChangeStatus('plus'," + item.LevelInt + "," + item.idx + ")>";
                                var min = "<img src=icons/down.png  vspace=12 hspace=4 width=30 onclick=BlindChangeStatus('min'," + item.LevelInt + "," + item.idx + ")>";

                                var iconClosed = '/images/blinds48.png';
                                var iconOpen = '/images/blindsopen48sel.png';
                                if (item.Status == 'Closed') {
                                    iconClosed = '/images/blinds48sel.png';
                                    iconOpen = '/images/blindsopen48.png';
                                }

                                var downAction = 'On';
                                var upAction = 'Off';
                                if (item.SwitchType == "Blinds Percentage Inverted") {
                                    downAction = 'Off';
                                    upAction = 'On';
                                }

                                var down = '<img src=' + $.domoticzurl + iconClosed + ' hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'' + downAction + '\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
                                var up = '<img src=' + $.domoticzurl + iconOpen + ' hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'' + upAction + '\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';

                                vdesc = new String(vdesc).replace(vdesc, vdesc + "<span style='color:#1B9772;font-size:20px;'> " + item.Level + "&#37;</span>");
                                vdata = min.concat(down, up, plus);
                                break;
                        }

                        switch (item.SubType) {
                            case "Percentage":
                                vdata = new String(vdata).split("%",1)[0];
                                vdata = Math.round(vdata);
                                vdataSuffix = "<sup class='subscript'> %</sup>";
                                break;
                            case "Lux":
                                vdata = new String(vdata).replace("Lux", "");
                                vdataSuffix = "<sup class='subscript'>Lux</sup>";
                                break;
                        }

                        // set celsius, %, mm, W, kWh
                        switch (vtype) {
                            case "SetPoint":
                                //Thermostat
                                if (vplusmin > 0) {
                                    var hlp = '<span style=' + vattr + '>' + vdata + '</span>';
                                    var plus = "<img src=icons/up.png align=right vspace=12 width=30 onclick=ChangeTherm('plus'," +vplusmin+ "," + item.idx + ","+ vdata+","+ valarm+")>";
                                    var min = "<img src=icons/down.png align=left vspace=12 width=30 onclick=ChangeTherm('min'," +vplusmin+ "," + item.idx + ","+ vdata+","+ valarm+")>";
                                    vdata = min.concat(hlp,plus);
                                }
                                break;
                            case "Barometer":
                                vdataSuffix = "<sup class='subscript'> hPa</sup>";
                                break;
                            case "Speed":
                                vdataSuffix = "<sup class='subscript'> m/s</sup>";
                                break;
                            case "Visibility":
                                vdataSuffix = "<sup class='subscript'> KM</sup>";
                                break;
                            case "Temp":
                                if (vdata < 0) {
                                    alarmcss = temp_freeze_color;
                                }
                                vdataSuffix = "<sup class='superscript'> &#176;C</sup>";
                                break;
                            case "Humidity":
                                if(vdata > humidity_max){ // It's humid, font color will change
                                    alarmcss = humidity_max_color;
                                }
                                vdataSuffix = "<sup class='subscript'> %</sup>";
                                break;
                            case "Rain":
                                vdataSuffix = "<sup class='subscript'> mm</sup>";
                                break;
                            case "DirectionStr":
                                // Replace S from South to Z from Zuiden, E to O using regex
                                direction = new String(vdata).replace(/E/gi, "O").replace( /S/gi, "Z");
                                vdata = "<img src='icons/arrow-gray.png' width='20px' style='-webkit-transform: rotate(" + (item.Direction + 90) + "deg);'>&nbsp;";
                                vdata += direction;
                                vdata += " " + item.Speed +  "<sup class='subscript'> m/s</sup>";
                                break;
                            case "Usage":
                                vdata = new String(vdata).replace( " Watt","");
                                vdataSuffix = "<sup class='subscript'> W</sup>";
                                break;
                            case "CounterToday":
                                if (vdata.endsWith(" kWh")) {
                                    vdata = new String(vdata).replace( " kWh","");
                                    vdataSuffix = "<sup class='subscript'> kWh</sup>";
                                }
                                if (vdata.endsWith(" m3")) {
                                    vdata = new String(vdata).replace( " m3","");
                                    vdataSuffix = "<sup class='subscript'> m3</sup>";
                                }
                                break;
                            case "Data":
                                if (vdata.endsWith(" Watt")) {
                                    vdata = new String(vdata).replace( " Watt","");
                                    vdataSuffix = "<sup class='subscript'> W</sup>";
                                }
                                if (vdata.endsWith(" m3")) {
                                    vdata = new String(vdata).replace( " m3","");
                                    vdataSuffix = "<sup class='subscript'> m3</sup>";
                                }
                                if (vdata.endsWith(" km")) {
                                    vdata = new String(vdata).replace( " km","");
                                    vdataSuffix = "<sup class='subscript'> km</sup>";
                                }
                                break;
                        }

                        // if alarm threshold is defined, make value red
                        if (typeof valarm != 'undefined') {
                            alarmcss = '';
                            if (vdata > valarm) {
                                alarmcss = ';color:red;';
                            }
                        }

                        $('#' + vlabel).html( '<div ' + switchclick + ' style="' + vattr + ';' + alarmcss + '">' + vdata + vdataSuffix + '</div>');
                        $('#desc_' + vlabel).html(vdesc);
                    }

                    switch ($.PageArray[ii][1]) {
                        case "Link":
                            //var vtype=    $.PageArray[ii][1];     // Domoticz type (like Temp, Humidity)
                            var vlabel=     $.PageArray[ii][2];     // cell number from HTML layout
                            var vdata=      $.PageArray[ii][3];     // description (link in this case
                            var vdesc =     '';
                            //var vattr=    $.PageArray[ii][6];     // extra css attributes
                            var valarm=     $.PageArray[ii][7];     // alarm value to turn text to red
                            //var vdata=    item[vtype];            // current value
                            $('#' + vlabel).html('<div>' + vdata + '</div>');
                            $('#desc_' + vlabel).html(vdesc);
                            break;
                        case "Tijd": //Special nummer, tijd in cell (test)
                            //var vtype =   $.PageArray[ii][1];     // Domoticz type (like Temp, Humidity)
                            var vlabel =    $.PageArray[ii][2];     // cell number from HTML layout
                            var vdata =     currentTime();          // Get present time
                            var vdesc =     '';
                            var vattr =     $.PageArray[ii][5];     // extra css attributes
                            var valarm =    $.PageArray[ii][6];     // alarm value to turn text to red
                            //var vdata =   item[vtype];            // current value
                            $('#' + vlabel).html('<div style=' + vattr + '>' + vdata + '</div>');
                            $('#desc_' + vlabel).html(vdesc);
                            break;

                        case "Desc":
                            var vlabel =    $.PageArray[ii][2];     // cell number from HTML layout
                            var vdesc =     $.PageArray[ii][3];     // show text in bottom
                            var lastseen =  $.PageArray[ii][4];     // show last seen
                            var vls =       item["LastUpdate"];     // Last Seen
                            //$('#'+vlabel).html( '<div style='+vattr+'>'+vdata+'</div>');
                            $('#desc_' + vlabel).html(vdesc);
                            break;
                    };
                }
            });
       }
    });
    
    var jurl=$.domoticzurl+"/json.htm?type=scenes&plan="+$.roomplan+"&jsoncallback=?";
$.getJSON(jurl,
{
format: "json"
},

	function(data) {
	if (typeof data.result != 'undefined') {
		$.each(data.result, function(i,item){
		for( var ii = 0, len = $.PageArray_Scenes.length; ii < len; ii++ ) {
		if( $.PageArray_Scenes[ii][0] === item.idx ) {	// Domoticz idx number
			var vtype=      $.PageArray_Scenes[ii][1];		// Domotitcz type (like Temp, Humidity)
			var vlabel=     $.PageArray_Scenes[ii][2];		// cell number from HTML layout
			var vdesc=      $.PageArray_Scenes[ii][3];		// description
			var lastseen= 	$.PageArray_Scenes[ii][4];		// Display lastseen or not
			//var vattr=    $.PageArray_Scenes[ii][5];		// extra css attributes
			var valarm=     $.PageArray_Scenes[ii][6];		// alarm value to turn text to red
			var vdata=      item[vtype];					// current value
			var vls= 		item["LastUpdate"];				// Last Seen
		
		if (typeof vdata == 'undefined') {
			vdata="?!";
		}
		else {
			//remove too much text
			vdata=new String(vdata).split("Watt",1)[0];
			vdata=new String(vdata).split("kWh",1)[0];
			vdata=new String(vdata).split("m3",1)[0];
			vdata=new String(vdata).split("km",1)[0];
			vdate=new String(vls).split(" ",2)[0];
		}
	
		var dateString = item["LastUpdate"];	// 'Last Seen' string used to convert into a nicer date/time 
		var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
		var dateArray = reggie.exec(dateString);
		var dateObject = new Date(
			(+dateArray[1]),
			(+dateArray[2])-1, // Careful, month starts at 0!
			(+dateArray[3]),
			(+dateArray[4]),
			(+dateArray[5]),
			(+dateArray[6])
		);
		var convStringDate = dateObject.toString ( 'd MMM' );		// the part of the 'Last Seen' that creates the DATE, original dd-MM-yyyy
		var convStringDate = convStringDate.replace('Mar', 'Mrt'); 	// replace some months to NL abbrev
		var convStringDate = convStringDate.replace('May', 'Mei'); 	// replace some months to NL abbrev
		var convStringDate = convStringDate.replace('Oct', 'Okt'); 	// replace some months to NL abbrev
		var convStringTime = dateObject.toString ( 'HH:mm' );		// the part of the 'Last Seen' that creates the TIME
		
		//Added by GZ used for last seen to only show day if <> today
		var thisday = new Date();
		var dd = thisday.getDate().toString();
		var mm = thisday.getMonth()+1;
		var yyyy = thisday.getFullYear();
		if (dd<10) {
			dd='0'+dd
		}
		if (mm<10) {
			mm='0'+mm
		}
		var thisday = yyyy+"-"+mm+"-"+dd;
		//End
		
		//Check wether we want to add the last seen to the block
		if (lastseen == '1') {
			if (thisday == vdate) {
				$('#ls_'+vlabel).html(convStringTime) 						// Show only the time if last change date = today
			}
			else {
				$('#ls_'+vlabel).html(convStringTime+' | '+convStringDate)	// Change this 'Last Seen' into something you like
			}
		}
		if (lastseen == '2') {
			$('#ls_'+vlabel).html(convStringTime)						// Show only the time
		}
		
		// create switchable value when item is scene
		var switchclick='';
		alarmcss='';
		if (vdata == 'Off'  || vdata == 'Mixed' ) {
			switchclick = 'onclick="SceneToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')"';
			alarmcss=';color:#E24E2A;';
			// EDB: vdata = txt_off;
			vdata = icon_off;
		}
		if (vdata == 'On' ) {
			switchclick = 'onclick="SceneToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"';
			alarmcss=';color:#1B9772;';
			// EDB: vdata = txt_on;
			vdata = icon_on;
		}

		// if alarm threshold is defined, make value red
		if (typeof valarm != 'undefined') {
			alarmcss='';
		if ( eval(vdata + valarm)) {  // note orig:  vdata > alarm
			alarmcss=';color:red;';
		}
		}

		// if extra css attributes
		if (typeof vattr == 'undefined') {
			$('#'+vlabel).html('<div '+switchclick+' style='+alarmcss+'>'+vdata+'</div>');
		}
		else {
			$('#'+vlabel).html( '<div '+switchclick+' style='+vattr+alarmcss+'>'+vdata+'</div>');
		}
		$('#desc_'+vlabel).html(vdesc);
		}
		}
		});
	}
}
);
    // EDB: temp disabled
    $.refreshTimer = setInterval(RefreshData, pageRefreshTime);
}

function DomoticzAction(idx, param, switchcmd, level)
{
    var url = $.domoticzurl+"/json.htm?type=command&param=" + param + "&idx=" + idx + "&switchcmd=" + switchcmd;
    if (level != null) {
        url += "&level=" + level;
    }
    $.ajax({
        url: url,
        async: false,
        dataType: 'json',
        success: function() {
            console.log('Domoticz action ' + switchcmd + " on idx " + idx + " successful");
        },
        error: function() {
            console.log('ERROR in: Domoticz action ' + switchcmd + " on idx " + idx + " successful");
        }
    });
    RefreshData();
}

//Switch state off a scene/group
function SceneToggle(idx, switchcmd)
{
    DomoticzAction(idx, "switchscene", switchcmd, null);
}

//switch state of a switch
function SwitchToggle(idx, switchcmd)
{
    DomoticzAction(idx, "switchlight", switchcmd, null);
}

//switch dimmer and set level
function SwitchDimmer(idx, level)
{
    DomoticzAction(idx, "switchlight", "Set%20Level", level);
}

//Dimmer, only works with 1-16 dimmer for now
function ChangeStatus(OpenDicht, level, idx, currentlevel)
{
    //When switched off return to previous level, no matter if plus or min pressed
    if (level == txt_off) {
        if (currentlevel == 1) {
            currentlevel++;
        }
        DomoticzAction(idx, "switchlight", "Set%20Level", currentlevel);
    } else {
        level = level * 1;
        //console.log(OpenDicht,level);
        if (OpenDicht == "plus")
        {
            var d = ((level + 10) / 100 * 16) + 0.5;
            //console.log("in plus",d,level);
            if(d > 16) {
                d = 16;
            }
            DomoticzAction(idx, "switchlight", "Set%20Level", d);
        } else {
            var d = ((level - 0.1) / 100 * 16);
            //console.log("in min",d,level);
            if( d < 0 ) {
                d = 0;
            }
            DomoticzAction(idx, "switchlight", "Set%20Level", d);
        }
    }
}

// blinds percentage
function BlindChangeStatus(OpenDicht, levelInt, idx)
{
    var d = 0;
    if (OpenDicht == "plus") {
        var d = levelInt + 2;
        if(d > 16) {
            d = 16;
        }
    } else {
        var d = levelInt - 2;
        if( d < 1 ) {
            d = 1;
        }
    }
    DomoticzAction(idx, "switchlight", "Set%20Level", d);
}

//Thermostat
function ChangeTherm(dimtype, stepsize, idx, currentvalue, thermmax)
{
    newvalue='';
    //console.log(dimtype,stepsize,idx,currentvalue,thermmax)
    if (dimtype == 'plus') {
        if ((currentvalue + stepsize) > thermmax){
            newvalue = thermmax;
        } else {
            newvalue = currentvalue + stepsize;
        }
    }
    else if (dimtype == 'min'){
        if (currentvalue < stepsize){
            newvalue = 1;
        } else {
            newvalue = currentvalue - stepsize;
        }
    }
    $.ajax({
        url: $.domoticzurl + "/json.htm?type=command&param=udevice" + "&idx=" + idx + "&nvalue=0&svalue=" + newvalue,
        async: false,
        dataType: 'json',
        success: function(){
            console.log('SUCCES');
        },
        error: function(){
            console.log('ERROR');
        }
    });
    RefreshData();
}

//Return current time: dd-mm-yyyy hh:mm
function currentTime()
{
    var today = new Date();
    var h = stringpad(today.getHours().toString().trim(), 2);
    var m = stringpad(today.getMinutes().toString().trim(), 2);
    var s = stringpad(today.getSeconds().toString().trim(), 2);

   //Change the day to reflect your preferred translation
   var day = new Array();
      day[0] = "Zondag";
      day[1] = "Maandag";
      day[2] = "Dinsdag";
      day[3] = "Woensdag";
      day[4] = "Donderdag";
      day[5] = "Vrijdag";
      day[6] = "Zaterdag";
   var day = day[today.getDay()];
   
   //haal datum op
   var datum = today.getDate().toString();
   datum = datum.trim();

   //haal maand op
   var month = new Array();
     month[0] = "januari";
     month[1] = "februari";
     month[2] = "maart";
     month[3] = "april";
     month[4] = "mei";
     month[5] = "juni";
     month[6] = "juli";
     month[7] = "augustus";
     month[8] = "september";
     month[9] = "oktober";
     month[10] = "november";
     month[11] = "december";
   var month = month[today.getMonth()];

   //haal jaar op
   var year = today.getFullYear();
   
   var ret_str = day + " " + datum + " " + month + " " + year + "<br />" + h + ":" + m + "";
   return ret_str;
}

function getLastSeen(dateString)
{
    var lastSeenArray = [];
    var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    var dateArray = reggie.exec(dateString);
    var dateObject = new Date(
        (+dateArray[1]),
        (+dateArray[2])-1, // Careful, month starts at 0!
        (+dateArray[3]),
        (+dateArray[4]),
        (+dateArray[5]),
        (+dateArray[6])
    );
    var convStringDate = dateObject.toString('d MMM');              // the part of the 'Last Seen' that creates the DATE, original dd-MM-yyyy
    var convStringDate = convStringDate.replace('Mar', 'Mrt');      // replace some months to NL abbrev
    var convStringDate = convStringDate.replace('May', 'Mei');      // replace some months to NL abbrev
    lastSeenArray["date"] = convStringDate.replace('Oct', 'Okt');   // replace some months to NL abbrev
    lastSeenArray["time"] = dateObject.toString ('HH:mm');          // the part of the 'Last Seen' that creates the TIME

    return lastSeenArray;
}

