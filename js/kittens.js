// JavaScript for CRUD Challenge
// Check out Bootbox http://bootboxjs.com/

// Initialize Parse App 
Parse.initialize('S7SwwjBTgEyZnJjjZ6V9YB5HItXoT3alIxzEQCKi','izqCDsoySYLvJ9nsPlCpwvSxRzMpEgv39FQpMHz3')

var Kittens = Parse.Object.extend('Kittens');

$('form').submit(function(){
    
    var kittens = new Kittens();

    kittens.set('review-title' , $("#review-title").val());

    // $(this).find('input').each(function(){
    //     kittens.set($(this).attr('id'),$(this).val())
    //     $(this).val('');
    // });

    kittens.save(null,{
        success:function(){
            getData()
        }
    });

    return false;
})

var getData = function (){
    var query = new Parse.Query(Kittens);

    query.notEqualTo('review-text','');


    query.find({
        success:function(response){
            buildList(response);
        }
    });
}

var buildList = function (data){
    $('ol').empty();

    data.forEach(function(d){
        addItem;
    })

}

var addItem = function (item){
    var title = item.get('review-title');
    var review = item.get ('review-text');

    var li = $('<li>Title: ' + title + 'Text: ' + review + '</li>');

    

}

getData();
