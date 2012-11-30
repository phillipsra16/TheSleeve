/*
 * This script manages retrieving the beer entries from the api and displaying them
 *
 * <TODO> Create an html template and insert beer entries into that template
 *
 */

// When doc loads
$(document).ready(function() {
    beers = new Array(); //Array to store beer entries
    get_beers('year_round');
    //console.log(beers);
    $('.year_round').click(function() {
        get_beers_id($(this).attr('id'));
    });
    $('.seasonal').click(function() {
        get_beers_id($(this).attr('id'));
    });
    $('.one_off').click(function() {
        get_beers_id($(this).attr('id'));
    });
});

function get_beers(season) {
    console.log('beer'); 
    clear_beer();
    /* Post an ajax get request to the api. Upon success, execute a callback function
     * to parse the json, make beer_entry objects out of it, and insert into beers array.
     * Upon completion of that, call display_beer_entries method
     */
    $.ajax({
        type: "GET",
        url: "http://student.cs.appstate.edu/~3440/Sleeve/TheSleeve/api/index.php/beer/"+season+"/desc", //Makin a url from pseason param
        datatype: 'json',
        success: function(data) {
            console.log(data);
            returned_json = JSON.parse(data);
            $.each(returned_json, function(key, item) {
                //console.log(item.Date);
                this_entry = new beer_entry(item.Name, item.Style, item.OG, item.FG, item.ABV, item.IBU, item.Description, item.Season, item.image);
                //console.log(this_entry);
                beers.push(this_entry);
            });
        //console.log(beers);
        display_beer_entries();
        //display_picture();
        }
    });
}

function get_beers_id(id) {
    console.log('beer'); 
    clear_beer();
    /* Post an ajax get request to the api. Upon success, execute a callback function
     * to parse the json, make beer_entry objects out of it, and insert into beers array.
     * Upon completion of that, call display_beer_entries method
     */
    $.ajax({
        type: "GET",
        url: "http://student.cs.appstate.edu/~3440/Sleeve/TheSleeve/api/index.php/beer/"+id, //Makin a url from pseason param
        datatype: 'json',
        success: function(data) {
            returned_json = JSON.parse(data);
            $.each(returned_json, function(key, item) {
                //console.log(item.Date);
                this_entry = new beer_entry(item.Name, item.Style, item.OG, item.FG, item.ABV, item.IBU, item.Description, item.Season, item.image);
                //console.log(this_entry);
                beers.push(this_entry);
            });
        //console.log(beers);
        display_beer_entries();
        //display_picture();
        }
    });
}

// beer_entry class definition
function beer_entry (name, style, og, fg, abv, ibu, description, season, image) {
    this.beer_name = name; //console.log(this.beer_date);
    this.beer_style = style; //console.log(this.beer_name);
    this.beer_og = og; //console.log(this.beer_entry);
    this.beer_fg = fg; //console.log(this.beer_fg);
    this.beer_abv = abv; //console.log(this.beer_abv);
    this.beer_ibu = ibu; //console.log(this.beer_ibu);
    this.beer_description = description; //console.log(this.beer_description);
    this.beer_season = season; //console.log(this.beer_season);
    this.beer_image = image;
}

// Loop over beer entries and call html constructor strings
function display_beer_entries() {
    //console.log(beers);
    // Grab the blog entry template, and call this anonymous method
    $.get('../html/templates/beer_entry.htm', function(template) {
        $.each(beers, function(i, entry) {
            var $tpl = $('<div />').html(template); // Make a detached DOM object
            /*DEPRECATED
            var title_string = construct_title(entry);
            var entry_string = construct_entry(entry);
            $tpl.find('.beer_name').html(title_string);
            $tpl.find('.lead').html(entry_string);*/
            //console.log(title_string);
            fill_template(entry,$tpl);
            //console.log($tpl.find('#beer_og').html());
            $('#beer_container').append($tpl.html());
            //console.log(this);
        });
    });
}

function clear_beer() {
    $('#beer_container').children().each( function() {
            $(this).remove();
    });
    beers = new Array();
    console.log('CLEARED');
}

function fill_template(beer, $template) {
    $template.find('#beer_og').append(beer.beer_og);
    $template.find('#beer_fg').append(beer.beer_fg);
    $template.find('#beer_abv').append(beer.beer_abv);
    $template.find('#beer_name').append(beer.beer_name);
    $template.find('#beer_description').append(beer.beer_description);
    $template.find('#beer_style').append(beer.beer_style);
    // Dat regex
    var image_path = beer.beer_image.replace(/\"/g,'"');
    //console.log(image_path);
    $template.find('#beer_image').attr('src', image_path);
    $template.find('#beer_ibu').append(beer.beer_ibu);
    //return $template;
}

/*
 * START OF DEPRECATED METHODS



// For the entry param, create an html string to sensibly display 
// beer entry title
function construct_title(entry) {
    var title = "<p><h1>";
    title += entry.beer_name + "</h2><br>";
//    title += "&#09;&#09;";
    title += "Style: " + entry.beer_style;
    title += "<br>";
    title += "Description: " + entry.beer_description;
    title += "</p><span></span><span></span>";
    //console.log(entry);
    return title;
}

// For the entry param, create an html string to sensibly display 
// beer entry
// <TODO> Insert into template
function construct_entry(entry) {
    var beer_post = "<p>";
    beer_post += "OG: " + entry.beer_og;
    beer_post += "<br>FG: " + entry.beer_fg;
    beer_post += "<br>ABV: " + entry.beer_abv;
    beer_post += "<br>IBUs: " + entry.beer_ibu;
    beer_post += "<br>Season: " + entry.beer_season;
    beer_post += "</p><hr width='50%' size='3'>";
    return beer_post;
}

function display_picture() {
    $('#beer_picture').html("<img src='../img/pliny-the-elder.jpg' alt='Pliny the Elder'></img>")
}
*/
