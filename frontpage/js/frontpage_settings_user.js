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
        ['0', 'Desc',               'cell_p1_1',    'Binnen / buiten', '0', '0'],
        ['98', 'Temp',              'cell_p1_1a',   'Binnen / buiten', '1', '0'],
        ['99', 'Temp',              'cell_p1_1b',   'Binnen / buiten', '0', '0'],
        ['0', 'Desc',               'cell_p1_2',    'Badkamer', '0', '0'],
        ['125', 'Temp',             'cell_p1_2a',   'Badkamer', '1', '0'],
        ['125', 'Humidity',         'cell_p1_2b',   'Badkamer', '0', '0'],
        ['0', 'Desc',               'cell_p1_3',    'Elektra', '0', '0'],
        ['72', 'Usage',             'cell_p1_3a',   'Elektra', '1', '4'],
        ['72', 'CounterToday',      'cell_p1_3b',   'Elektra', '0', '4'],
        ['0', 'Desc',               'cell_p1_4',    'min / max', '0', '0'],
        ['114', 'Data',             'cell_p1_4a',   'min / max', '1', '4'],
        ['115', 'Data',             'cell_p1_4b',   'min / max', '0', '4'],

        ['97', 'SetPoint',          'cell_p1_5',    'Thermostaat', '0', '1'],
        ['0', 'SunBoth',            'cell_p1_6',    'SunBoth', '1', '4'],
        ['17', 'Status',            'cell_p1_7',    'Ventilatie', '0', '1'],
        ['33', 'Status',            'cell_p1_8',    'Power Cube', '0', '1'],
        
        ['565', 'Status',           'cell_p1_9',    'Kast Dim', '0', '1'],
        ['564', 'Status',           'cell_p1_10',   'Kast Fel', '0', '1'],
        ['', '',                    'cell_p1_11',   '-', '0', '1'],
        ['353', 'Status',           'cell_p1_12',   'Oppas', '0', '1'],
        
        ['484', 'Status',           'cell_p1_13',   'Garagedeur', '2', '8'],
        ['73', 'CounterToday',      'cell_p1_14',   'Gas vandaag', '1', '4'],
        ['503', 'Data',             'cell_p1_15',   'Erwin', '1', '4'],
        ['504', 'Data',             'cell_p1_16',   'Liesbeth', '1', '4'],
    
        // page 2
        ['269', 'Status',           'cell_p2_1',    'Overloop', '0', '1'],
        ['339', 'Status',           'cell_p2_2',    'Overloop nacht', '0', '1'],
        ['522', 'Status',           'cell_p2_3',    'Boekenkast', '0', '1'],
        ['353', 'Status',           'cell_p2_4',    'Oppas', '0', '1'],

        ['429', 'Status',           'cell_p2_5',    'Eettafel ->', '0', '1'],
        ['433', 'Data',             'cell_p2_6',    'Dim', '0', '1'],
        ['434', 'Data',             'cell_p2_7',    'Normaal', '0', '1'],
        ['435', 'Data',             'cell_p2_8',    'Fel', '0', '1'],

        ['428', 'Status',           'cell_p2_9',    'Voortafel ->', '0', '1'],
        ['430', 'Status',           'cell_p2_10',   'Dim', '0', '1'],
        ['431', 'Status',           'cell_p2_11',   'Normaal', '0', '1'],
        ['432', 'Status',           'cell_p2_12',   'Fel', '0', '1'],

        ['13',  'Status',           'cell_p2_13',   'Lamp achter', '0', '1'],
        ['45',  'Status',           'cell_p2_14',   'Lamp speaker', '0', '1'],
        ['7',   'Status',           'cell_p2_15',   'Staande lamp', '0', '1'],
        ['498', 'Status',           'cell_p2_16',   'Lamp banken', '0', '1']

    ];
    $.PageArray_Scenes = [
        ['1', 'Status',        'cell_p1_11',    'Lampen kamer', '0', '1']
        // ['7', 'Status',        'cell_p1_13',   'Lamp achtertuin', '1', '0'],
    ];

// ############################################################################################################
// #### ^^^^^   USER VALUES above ^^^^^   #######
// ############################################################################################################

    RefreshData();
});
