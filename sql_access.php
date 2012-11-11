<?php
    //Handler for connecting to database
    function connect()
    {
        //Setup of connection variable
        global $con = mysql_connect("localhost","root","sleeve");
        //If connection fails, throw error
        if (!$con)
            die('Could not connect :' . mysql.error());
        //Connect
        mysql_select_db("sleeve", $con);
    }

    function query($query_body)
    {
        //Ensure connection
        if (!$con)
            connect();
        //Query
        $con->query($query_body);
        //Set query return as array to values
        $values = array();
        //Return encoded json
        return json_encode($values);
    }

    function disconnect()
    {
        mysql_close();
    }
?>
