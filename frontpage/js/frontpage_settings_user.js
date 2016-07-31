// ############################################################################################################
// #### vvvvv   USER VALUES below vvvvv   #######
// ############################################################################################################

$(document).ready(function () {
    $.roomplan = 10;	// define roomplan in Domoticz and create items below.
    $.domoticzurl = "http://192.168.1.102/domotica";
	//format: idx, value, label, description, lastseen(1 when lastseen is wanted, 2 is only time), plusmin button or protected (0 for empty, 1 for buttons, 2 for volume of Sonos, 4 for protected, 5 for zwave dimmer, 6 for protected when on), [override css], [alarm value]
    $.PageArray = [
        ['0', 'Desc',               'cell_p1_1',    'Woonkamer', '0', '0'], //Desc means show the sub cell_p1_s
        ['98', 'Temp',              'cell_p1_1a',   'Woonkamer', '1', '0'], //Lastseen only from cell_p1__a possible
        ['154', 'Humidity',         'cell_p1_1b',   'Woonkamer', '0', '0'],
        ['0', 'Desc',               'cell_p1_2',    'Badkamer', '0', '0'],
        ['125', 'Temp',             'cell_p1_2a',   'Badkamer', '1', '0'],
        ['125', 'Humidity',         'cell_p1_2b',   'Badkamer', '0', '0'],
        ['99', 'Temp',              'cell_p1_3',    'Buiten', '0', '0'],
        ['0', 'SunBoth',            'cell_p1_4',    'SunBoth', '1', '4'],

        ['97', 'SetPoint',          'cell_p1_5',    'Thermostaat', '0', '1'],
        ['252', 'Level',            'cell_p1_6',    'Aanrecht licht', '1', '5'],
        ['17', 'Status',            'cell_p1_7',    'Ventilatie', '1', '1'],
        ['0', 'Level',              'cell_p1_8',    '', '0', '0'], // see scenes below
        
        ['260', 'Status',           'cell_p1_9',    'Garagedeur', '2', '8'],
        ['73', 'CounterToday',      'cell_p1_10',   'Gas vandaag', '1', '4'],
        ['33', 'Status',            'cell_p1_11',   'Power Cube', '0', '1'],
        ['8', 'Status',             'cell_p1_12',   'Garage lader', '0', '1'],
        
        ['72', 'Usage',             'cell_p1_13',   'Elektra nu', '1', '4'],
        ['72', 'CounterToday',      'cell_p1_14',   'Elektra vandaag', '1', '4'],
        ['114', 'Data',             'cell_p1_15',   'Elektra min', '1', '4'],
        ['115', 'Data',             'cell_p1_16',   'Elektra max', '1', '4'],
    
        ['0', '',               'cell_p2_1',    '', '0', '0'],
        ['0', '',               'cell_p2_2',    '', '0', '0'],
        ['0', '',               'cell_p2_3',    '', '0', '0'],
        ['0', '',               'cell_p2_4',    '', '0', '0'],

        ['270', 'Status',             'cell_p2_5',    'Eettafel ->', '0', '1'],
        ['273', 'Data',               'cell_p2_6',    'Relax', '0', '1'],
        ['274', 'Data',               'cell_p2_7',    'Normaal', '0', '1'],
        ['275', 'Data',               'cell_p2_8',    'Fel', '0', '1'],

        ['271', 'Status',             'cell_p2_9',    'Voortafel ->', '0', '1'],
        ['276', 'Data',               'cell_p2_10',   'Relax', '0', '1'],
        ['277', 'Data',               'cell_p2_11',   'Normaal', '0', '1'],
        ['272', 'Data',               'cell_p2_12',   'Fel', '0', '1'],


        ['248', 'Selector',               'cell_p2_13',   'Voortafel', '0', '1'],
        ['0', '',               'cell_p2_14',   '', '0', '0'],
        ['0', '',               'cell_p2_15',   '', '0', '0'],
        ['0', '',               'cell_p2_16',   '', '0', '0']

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
