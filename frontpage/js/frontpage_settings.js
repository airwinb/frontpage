// <!-- Change the text for on/off switches -->
var icon_on = '<img src=icons/on.png>';
var icon_off = '<img src=icons/off.png>';
var txt_on = 'Aan';
var txt_off = 'Uit';
var txt_zonon = 'Uit'; //<!-- Dicht -->
var txt_zonoff = 'In'; //<!-- Open -->
var txt_zonstopped = 'Gestopt';
var txt_zonstop = '| |';
//<!-- var txt_dim_plus = ' + '; -->
//<!-- var txt_dim_min = ' - '; -->

// <!-- Change the text displayed in PopUps -->
var txt_switch_protected = '\'Schakelaar is beveiligd\'';
var txt_switch_on = '\'Inschakelen\'';
var txt_switch_off = '\'Uitschakelen\'';
var txt_blind_up = '\'Zonnescherm uit\'';
var txt_blind_down = '\'Zonnescherm in\'';
var txt_blind_stop = '\'Zonnescherm stoppen\'';

var vplusmin_type_presence = 7;
var txt_presence_home = 'Thuis';
var txt_presence_away = 'Weg';

var vplusmin_type_contact = 8;
var txt_contact_open = 'Open';
var txt_contact_closed = 'Dicht';

// <!-- Change the timeout of the PopUp -->
var switch_protected_timeout = '1500';
var switch_on_timeout = '1500';
var switch_off_timeout = '1500';
var camera_doorbell_timeout = '15400';

//<!-- Value for ZWave dimmer when on-->
var idx_zdimmer = '252';
var z_dimmer = '';
var z_whichdimmer = '';
//var o_dimmer = '80'; //value 80 is for light in garden
//var o_whichdimmer = '';

//<!-- Set values so colors can change -->
var temp_freeze = '0';
var temp_freeze_color = ';color:#0090ff;';
var humidity_max = '70';
var humidity_max_color = ';color:#0090ff;';
var CPUmem_max = '95';
var mem_max_color = ';color:red;';
var CPUusage_max = '50';
var cpu_max_color = ';color:red;';
var color_on = ';color:#1B9772;';
var color_off = ';color:#E24E2A;';
var show_sonos_volume = true; //<!-- show Sonos volume in desc text -->

// <!-- Change idx of special items -->
var idx_CPUmem = '11';
var idx_HDDmem = '13';
var idx_CPUusage = '9999';
var idx_CPUtemp = '1100';
var idx_SunState = '66';
var idx_IsDonker = '66'; //<!-- for day night css -->
var idx_FibaroWP = '1100';
var idx_Alarm = '109';
var idx_Rainmeter = '39';
var idx_Temp1 = '18';
var idx_Temp2 = '22';
var idx_Temp3 = '178';
var idx_Temp_buiten = '247';
var idx_Tempf = '154';
var idx_Iphone5s = '214';
var idx_Telefoon_m = '185';
var idx_Voordeur = '23'; //'207';
var idx_Garagedeur = '27'; //'208';
var idx_WindRichting = '100';
var idx_WindSnelheid = '101';
var idx_BewegingF = '145';
var idx_LuxF = '147';
var idx_ZonV = '110';
var idx_ZonA = '111';
var idx_Barometer = '49';
var idx_Visibility = '53';
var idx_Usage1 = '140';
var idx_Usage2 = '142';
var idx_UsageTot1 = '181';
var idx_UsageTot2 = '182';
var idx_Pi = '218';
var idx_PC = '216';
var idx_TV = '240';

var idx_water_meter = '1100';
var idx_doorbell = '1100';
var idx_electricity_today = '1100';
var idx_gas_today = '1100';
var idx_ram_usage = '1100';
var idx_cpu_usage = '1100';

var IsNight = false; // 'No';
var pageRefreshTime = 8000;

//<!-- Text for vdesc -->
var desc_alarm_off = 'Alarm uit';
var desc_alarm_home = 'Alarm aan (thuis)';
var desc_alarm_away = 'Alarm aan (weg)';
var desc_sunrise = 'Zon op';
var desc_sunset = 'Zon onder';
var desc_showsunboth = ''; // used to show sunrise and sunset in vdesc
var txt_sunboth = '';
var txt_sunset = 'Zon onder';
var txt_sunrise = 'Zon op';
var var_sunrise = '';
var var_sunset = '';
var desc_protected = '<img src=icons/lock-closed_w.png align=right style="margin:1.5px 3px 0px -10px">'; //shows lock picture if device is protected or when plusmin is 4

//<!-- This triggers the camera PopUp when the doorbell is pressed -->
//<!-- Text could be 'On', 'Group On' or 'Chime' -->
var doorbell_status = 'On';
var idx_doorbell = '200'; //dummy switch which goes on when doorbell rings, goes off after 10 seconds
var doorbell_cmd = "lightbox_open('camera1', 15400);";
