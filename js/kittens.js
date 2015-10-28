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
// Gather data from query 
var buildList = function (data){
    $('ol').empty();
    data.forEach(function(d){
        addItem(d);
    })
}
// Add past reviews with popularity ratings
var addItem = function (item){
    //Get Parse data
    var rating = item.get('stars');
    var title = item.get('reviewTitle');
    var review = item.get ('reviewText');
    var likes = item.get('likes');
    var dislikes=item.get('dislikes');
    var avScore = 0;
    
    //Sets new posts to 0  
    if(likes==undefined){
        likes = 0; 
    };
    if (dislikes==undefined){
        dislikes = 0;
    }
    
    var well =$('<div class="well well-sm"><div class ="row"><div class="col-xs-4 ratyStars"/><div class="col-xs-6 header"><h3>'
                + title +'</h3></div>'+ '<div class="col-xs-2 theThumbs"></div></div>'+
                '<p>'+review +'</p>'+
                '<p id= "feedback">' + likes + " people enjoyed this reivew and "+ dislikes + " people hated it." + '</p>' +
                '</div>');
    var pastReview = $('<div id="starReview">').raty({
        score: rating,
        readOnly: true
    });
    var button = $('<button class="btn-xs btn-danger"><span  class ="glyphicon  glyphicon-remove"></span></button>');
    button.on('click',function(){
        item.destroy({
            success: function(){
                getData()
            }
        });

    })

    var thumbsUp = $('<button class ="glyphicon glyphicon-thumbs-up" id="thumbs"></button>');
    thumbsUp.on('click',function(){
        item.increment("likes");
        item.save({
            success: function(){
                getData()
            }});
    });
    var thumbsDown = $('<button class= "glyphicon glyphicon-thumbs-down" id ="thumbs"></button>');
    thumbsDown.on('click', function(){
        item.increment("dislikes");
        item.save({
            success: function(){
                getData()
            }});
    });


    var avQuery = new Parse.Query(Kittens);
    avQuery.find().then(function(results){
        var sum =0;
        for (var i =0; i < results.length; ++i){
        sum += results[i].get('rating');
    };
        avScore = (sum / results.length);
    });
    console.log(avScore);


    // var sum =0;
    // for (var i =0; i < item.length; ++i){
    //     sum += item[i].get('rating');
    // }
    // var avScore= Number((sum / item.length));

    

    var avReview =$('#starAvReview').raty({
        score: avScore,
        readOnly: true

    }) 


    $('ol').append(well);
    $(well).find('.ratyStars').prepend(pastReview);
    $(well).find('.theThumbs').append(thumbsUp, thumbsDown);
    $(well).append(button);
    $('#starAvReview').append(avReview);
    $('#starAvReview').prepend("Average Reviews: ");
}

getData();
