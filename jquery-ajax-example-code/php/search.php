<?php

//A list of cities
$someLists = array(
    'Fruits' => ['banana', 'mango', 'apple', 'plum'],
    'Vegetables' => ['broccoli', 'spinach', 'peas'],
    'SuperFruits' => ['cranberries', 'dragon fruit']
);

//Get the search term from our "q" GET variable.
$search_keyword = isset($_GET['search_keyword']) ? trim($_GET['search_keyword']) : '';

//Array to hold results so that we can
//return them back to our Ajax function.
$results = array();

$keys = array_keys($someLists);
foreach ($someLists as $key => $value) {

    if(stristr($key, $search_keyword)){
        //Add it to the results array.
        $results[$key] = $value;
    }
}

//Display the results in JSON format so that
//we can parse it with JavaScript.
echo json_encode([$results]);
