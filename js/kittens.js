// JavaScript for CRUD Challenge
// Check out Bootbox http://bootboxjs.com/

// Initialize Parse App 
Parse.initialize('S7SwwjBTgEyZnJjjZ6V9YB5HItXoT3alIxzEQCKi','izqCDsoySYLvJ9nsPlCpwvSxRzMpEgv39FQpMHz3')

var Kittens = Parse.Object.extend('Kittens');

$('form').submit(function(){
    var kittens = new Kittens();

    $(this).find('input').each(function(){
        kittens.set($(this).attr('id'),$(this).val())
        $(this).val('');
    });

    kittens.save(null,{
        success:function(){
            getData()
        }
    });

    return false;
})

var getData = function (){
    var query = new Parse.Query(Kittens);


    query.find({
        success:function(response){
            buildList(response);
        }
    });






}

var buildList = function (data){}

var addItem = function (item){}
