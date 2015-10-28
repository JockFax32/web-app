// JavaScript for CRUD Challenge
// Check out Bootbox http://bootboxjs.com/
// Thumbs up and down are glyphicons


// Initialize Parse App 
Parse.initialize('S7SwwjBTgEyZnJjjZ6V9YB5HItXoT3alIxzEQCKi','izqCDsoySYLvJ9nsPlCpwvSxRzMpEgv39FQpMHz3');

var Kittens = Parse.Object.extend('Kittens');

$('#starInput').raty({   
});


$('form').submit(function(){

    var kittens = new Kittens();
    var numStars = $("#starInput").raty('score');
    
    kittens.set('stars',numStars);

    $(this).find('.form-control').each(function(){
        kittens.set($(this).attr('id'),$(this).val())
        $(this).val(''); 

    });

    kittens.save(null,{
        success:function(){
            getData();
        }
    });
    numStars.raty('stars');
    return false;
})

var getData = function (){
    var query = new Parse.Query(Kittens);
    query.exists('reviewText','stars');
    query.find({
        success:function(response){
            buildList(response);
        }
    });
}

var buildList = function (data){
    $('ol').empty();
    data.forEach(function(d){
        addItem(d);
    })
}

var addItem = function (item){
    var rating = item.get('stars');
    var title = item.get('reviewTitle');
    var review = item.get ('reviewText');
    
    // $('#starReview').raty({

    // var well =$('<div class="well well-sm"><div id="starReview"><h3>'
    //             + title +'</h3>'+
    //             '<p>'+review +'</p>'+ 
    //             '</div>');
    var pastReveiw =$('<div id="starReview">'+($('#starReview').raty())+'</div>');




    
//'<div id="starReview">'+ ($("#star").raty('score',rating))+ '</div>'+

    $('ol').append(pastReveiw);
    //wrap the well div around the raty?
    
}

getData();
