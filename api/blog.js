$(document).ready(function() {
blogs = new Array();
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

function blog_entry (date1, name, entry) {
    this.blog_date = date1; //console.log(this.blog_date);
    this.blog_title = name; //console.log(this.blog_name);
    this.blog_entry = entry; //console.log(this.blog_entry);
}

function display_blog_entries() {
    console.log(blogs);
    $.each(blogs, function(i, entry) {
        var title_string = construct_title(entry);
        var entry_string = construct_entry(entry);
        //console.log(title_string);
        $('div .blog_entry').append(title_string);
        $('div .blog_entry').append(entry_string);
    });
}

function construct_title(entry) {
    var title = "<p>";
    title += entry.blog_title;
    title += "<br>";
    title += entry.blog_date;
    title += "</p><span></span><span></span>";
    console.log(entry);
    return title;
}

function construct_entry(entry) {
    var blog_post = "<p>";
    blog_post += entry.blog_entry;
    blog_post += "</p><hr width='50%' size='3'>";
    return blog_post;
}
