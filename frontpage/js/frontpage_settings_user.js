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
        ['98', 'Temp',              'cell_p1_1',    'Woonkamer', '1', '0'], //Lastseen only from cell_p1__a possible
        ['0', 'Desc',               'cell_p1_2',    'Badkamer', '0', '0'],
        ['125', 'Temp',             'cell_p1_2a',   'Badkamer', '1', '0'],
        ['125', 'Humidity',         'cell_p1_2b',   'Badkamer', '0', '0'],
        ['99', 'Temp',              'cell_p1_3',    'Buiten', '1', '0'],
        ['0', 'SunBoth',            'cell_p1_4',    'SunBoth', '1', '4'],

        ['97', 'SetPoint',          'cell_p1_5',    'Thermostaat', '0', '1'],
        ['344', 'Level',            'cell_p1_6',    'Aanrecht licht', '1', '5'],
        ['17', 'Status',            'cell_p1_7',    'Ventilatie', '0', '1'],
        ['0', 'Level',              'cell_p1_8',    '', '0', '0'], // see scenes below
        
        ['260', 'Status',           'cell_p1_9',    'Garagedeur', '2', '8'],
        ['73', 'CounterToday',      'cell_p1_10',   'Gas vandaag', '1', '4'],
        ['33', 'Status',            'cell_p1_11',   'Power Cube', '0', '1'],
        ['8', 'Status',             'cell_p1_12',   'Kerstboom', '0', '1'],
        
        ['72', 'Usage',             'cell_p1_13',   'Elektra nu', '1', '4'],
        ['72', 'CounterToday',      'cell_p1_14',   'Elektra vandaag', '1', '4'],
        ['114', 'Data',             'cell_p1_15',   'Elektra min', '1', '4'],
        ['115', 'Data',             'cell_p1_16',   'Elektra max', '1', '4'],
    
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
        ['1', 'Status',        'cell_p1_8',    'Lampen kamer', '0', '1']
        // ['7', 'Status',        'cell_p1_13',   'Lamp achtertuin', '1', '0'],
    ];

// ############################################################################################################
// #### ^^^^^   USER VALUES above ^^^^^   #######
// ############################################################################################################

    RefreshData();
});
