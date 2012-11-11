function ajax_query(var query)
{
    var ajaxRequest();
    try {
        ajaxRequest = new XMLHttpRequest();
    } catch (e) 
    {
        //Something went wrong
        alert("Something went wrong");
        return false;
    }
    ajaxRequest.onreadystatechange = function()
    {
        if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200)
            document.alert(ajaxRequest.responseText);
    }
    ajaxRequest.open("GET","sql_access.php?q="+query,true);
    ajaxRequest.send();
}
