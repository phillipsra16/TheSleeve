/*
 * This script manages retrieving the blog entries from the api and displaying them
 *
 * <TODO> Create an html template and insert blog entries into that template
 *
 */

// When doc loads
$(document).ready(function() {
    blogs = new Array(); //Array to store blog entries
    
    /* Post an ajax get request to the api. Upon success, execute a callback function
     * to parse the json, make blog_entry objects out of it, and insert into blogs array.
     * Upon completion of that, call display_blog_entries method
     */
    $.ajax({
        type: "GET",
        url: "http://student.cs.appstate.edu/~3440/Sleeve/TheSleeve/api/index.php/blog",
        datatype: 'json',
        success: function(data) {
            returned_json = JSON.parse(data);
            $.each(returned_json, function(key, item) {
                //console.log(item.Date);
                this_entry = new blog_entry(item.Date, item.Title, item.Entry);
                //console.log(this_entry);
                blogs.push(this_entry);
            });
        //console.log(blogs);
        display_blog_entries();
        }
    });
});

// Blog_entry class definition
function blog_entry (date1, name, entry) {
    this.blog_date = date1; //console.log(this.blog_date);
    this.blog_title = name; //console.log(this.blog_name);
    this.blog_entry = entry; //console.log(this.blog_entry);
}

// Loop over blog entries and call html constructor strings
function display_blog_entries() {
    console.log(blogs);
    // Grab the blog entry template, and call this anonymous method
    $.get('../html/templates/blog_container.htm', function(template) {
        var $tpl = $('<div />').html(template); //Make a detached DOM object called $tpl
        $.each(blogs, function(i, entry) { //For each blogetry
            var title_string = construct_title(entry); //Construct title string
            var entry_string = construct_entry(entry); //These will soon be deprecated
            $tpl.find('.entry_title').html(title_string); //Insert titlestring into entry_title class
            $tpl.find('.lead').html(entry_string); //Insert entry_string into lead class (lead is a bootstrap thing)
            $('.blog_entry').append($tpl.html()); //Append that motherfucker
            console.log(this);
        });
    });
}


// For the entry param, create an html string to sensibly display 
// blog entry title
// <TODO> Insert into template
function construct_title(entry) {
    var title = "<p>";
    title += entry.blog_title;
    title += "<br>";
    title += entry.blog_date;
    title += "</p><span></span><span></span>";
    console.log(entry);
    return title;
}

// For the entry param, create an html string to sensibly display 
// blog entry
// <TODO> Insert into template
function construct_entry(entry) {
    var blog_post = "<p>";
    blog_post += entry.blog_entry;
    blog_post += "</p><hr width='50%' size='3'>";
    return blog_post;
}
