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
// Retreive data from Parse
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
    // Create well and place bootstrap divs for mobile friendly
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
    // Add user ratings
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
    // Create a new query to find average 
    var avQuery = new Parse.Query(Kittens);
    avQuery.exists('stars');
    avQuery.find().then(function(results){
        var sum =0;
         for (var i =0; i < results.length; ++i){
        sum += results[i].get('stars');
    };
        avScore = (sum / results.length);
        var avReview =$('#starAvReview').raty({
        score: avScore,
        readOnly: true
    }) 
        $('#starAvReview').prepend("Average Reviews: ");
    });

    // Add all elements to the Boostrap well
    $('ol').append(well);
    $(well).find('.ratyStars').prepend(pastReview);
    $(well).find('.theThumbs').append(thumbsUp, thumbsDown);
    $(well).append(button);

}

getData();