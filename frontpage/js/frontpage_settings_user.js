// ############################################################################################################
// #### vvvvv   USER VALUES below vvvvv   #######
// ############################################################################################################

$(document).ready(function () {
    $.roomplan = 10;	// define roomplan in Domoticz and create items below.
    $.domoticzurl = "http://homeserver:8081";
	//format: idx, value, label, description, lastseen(1 when lastseen is wanted, 2 is only time), plusmin button or protected (0 for empty, 1 for buttons, 2 for volume of Sonos, 4 for protected, 5 for zwave dimmer, 6 for protected when on), [override css], [alarm value]
    $.PageArray = [
//        ['0', 'Desc',               'cell_p1_1',    'Woonkamer', '0', '0'], //Desc means show the sub cell_p1_s
//        ['98', 'Temp',              'cell_p1_1a',   'Woonkamer', '1', '0'], //Lastseen only from cell_p1__a possible
//        ['154', 'Humidity',         'cell_p1_1b',   'Woonkamer', '0', '0'],
        // ['0', 'Desc',               'cell_p1_1',    'Binnen / buiten', '0', '0'],
        ['578', 'Temp',              'cell_p1_1',    'Buiten', '1', '0'],
        ['0', 'Desc',               'cell_p1_2',    'Badkamer', '0', '0'],
        ['125', 'Temp',             'cell_p1_2a',   'Badkamer', '1', '0'],
        ['125', 'Humidity',         'cell_p1_2b',   'Badkamer', '0', '0'],
        ['0', 'Desc',               'cell_p1_3',    'Elektra', '0', '0'],
        ['72', 'Usage',             'cell_p1_3a',   'Elektra', '1', '0'],
        ['72', 'CounterToday',      'cell_p1_3b',   'Elektra', '0', '0'],
        // ['0', 'Desc',               'cell_p1_4',    'min / max', '0', '0'],
        ['73', 'CounterToday',      'cell_p1_4',    'Gas', '1', '0'],

        ['98', 'Temp',              'cell_p1_5',    'Huiskamer', '1', '0'],
        ['97', 'SetPoint',          'cell_p1_6',    'Thermostaat', '0', '1'],
        ['114', 'Data',             'cell_p1_7',    'Elektra min', '1', '0'],
        ['115', 'Data',             'cell_p1_8',    'Elektra max', '1', '0'],
        
        ['353', 'Status',           'cell_p1_9',    'Oppas', '0', '1'],
        ['17',  'Status',           'cell_p1_10',   'Ventilatie', '0', '1'],
        ['670', 'Status',           'cell_p1_11',   'Openhaard', '0', '1'],
        ['14',  'Status',           'cell_p1_12',   'Kerstboom', '0', '1'],
        
        ['484', 'Status',           'cell_p1_13',   'Garagedeur', '2', '0'],
        ['558', 'Status',           'cell_p1_14',   'Rolluik', '0', '1'],
        ['503', 'Data',             'cell_p1_15',   'Erwin', '1', '0'],
        ['504', 'Data',             'cell_p1_16',   'Liesbeth', '1', '0'],
    
        // page 2
        ['752', 'Status',           'cell_p2_1',    'Boekenkast Uit', '0', '1'],
        ['565', 'Status',           'cell_p2_2',    'Boekenkast Dim', '0', '1'],
        ['748', 'Status',           'cell_p2_3',    'Boekenkast Normaal', '0', '1'],
        ['564', 'Status',           'cell_p2_4',    'Boekenkast Fel', '0', '1'],

        ['750', 'Status',           'cell_p2_5',    'Eettafel Uit', '0', '1'],
        ['433', 'Status',           'cell_p2_6',    'Eettafel Dim', '0', '1'],
        ['434', 'Status',           'cell_p2_7',    'Eettafel Normaal', '0', '1'],
        ['435', 'Status',           'cell_p2_8',    'Eettafel Fel', '0', '1'],

        ['751', 'Status',           'cell_p2_9',    'Voortafel Uit', '0', '1'],
        ['430', 'Status',           'cell_p2_10',   'Voortafel Dim', '0', '1'],
        ['431', 'Status',           'cell_p2_11',   'Voortafel Normaal', '0', '1'],
        ['432', 'Status',           'cell_p2_12',   'Voortafel Fel', '0', '1'],

        ['13',  'Status',           'cell_p2_13',   'Lamp achter', '0', '1'],
        ['621', 'Status',           'cell_p2_14',   'Lamp speaker', '0', '1'],
        ['651', 'Status',           'cell_p2_15',   'Staande lamp', '0', '1'],
        ['498', 'Status',           'cell_p2_16',   'Lamp banken', '0', '1']
        
    ];
    $.PageArray_Scenes = [
        // ['1', 'Status',        'cell_p1_11',    'Lampen kamer', '0', '1']
        // ['7', 'Status',        'cell_p1_13',   'Lamp achtertuin', '1', '0'],
    ];

// ############################################################################################################
// #### ^^^^^   USER VALUES above ^^^^^   #######
// ############################################################################################################

    RefreshData();
});
