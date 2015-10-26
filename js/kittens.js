// JavaScript for CRUD Challenge
// Check out Bootbox http://bootboxjs.com/
// Thumbs up and down are glyphicons


// Initialize Parse App 
Parse.initialize('S7SwwjBTgEyZnJjjZ6V9YB5HItXoT3alIxzEQCKi','izqCDsoySYLvJ9nsPlCpwvSxRzMpEgv39FQpMHz3');

var Kittens = Parse.Object.extend('Kittens');

$('form').submit(function(){

    var kittens = new Kittens();

    $(this).find('.form-control').each(function(){
        kittens.set($(this).attr('id'),$(this).val())
        $(this).val('');
    });

    // kittes.set('stars',$("#star").raty());

    kittens.save(null,{
        success:function(){
            getData();
        }
    });

    return false;
})

var getData = function (){
    var query = new Parse.Query(Kittens);

    query.exists('reviewText');



    query.find({
        success:function(response){
            buildList(response);
        }
    });
}

var buildList = function (data){
    console.log('buildList: ' , data);
    $('ol').empty();
    
    data.forEach(function(d){
        addItem(d);
    })

}

var addItem = function (item){
    var title = item.get('reviewTitle');
    var review = item.get ('reviewText');

    var well =$('<div class="well well-sm"><h3>'+ title +'</h3>'+review+'</div>')
    $('ol').append(well);
    





    // var li = $('<li>Title: ' + title + 'Text: ' + review + '</li>');
     
    
}

getData();
