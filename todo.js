(function ($) {
    $.fn.todo = function () {

        const todoBody = '<div class="todo-container"><div class="todo">' +
            '<input type="text" class="textTask" placeholder="Saisissez une tache à effectuer">' +
            '<ul class="tasks"></ul><div><span class="tasksDone">' +
            '</span>/<span class="taskSum"></span> tasks done</div></div></div>';
        $(this).append(todoBody);
        let tasksDone = 0;
        let taskSum = 0;
        $('.tasksDone').html(tasksDone);
        $('.taskSum').html(taskSum);

        $('.tasks').on('click', 'li', function (event) {
            event.preventDefault();
            const target = $(event.target);

            if (target.parent().hasClass('todo-checkbox')) {
                target.toggleClass("fa-check-square fa-square");
                $(this).find('.todo-text').toggleClass('todo-text-check');
                if (target.hasClass('fa-check-square')) {
                    $('.tasksDone').html(++tasksDone);
                } else if (target.hasClass('fa-square')) {
                    $('.tasksDone').html(--tasksDone);
                }
            }

            if (target.hasClass('todo-trash')) {
                $(this).slideUp(1000, function () {
                    this.remove();
                    $('.taskSum').html(--taskSum);
                    if (target.parent().prev().prev().children().hasClass('fa-check-square')) {
                        $('.tasksDone').html(--tasksDone);
                    }
                });
            }
        })

        $('.tasks').on('click', 'span', function (event) {
            $(this).replaceWith('<input type="text" class="textTask mod" value="' + $(this).text() + '">');
        })
        $('.tasks').on('keyup', '.mod', function (event) {
            if (event.keyCode === 13) {
                $(this).replaceWith('<span class="todo-text">' + $(this).val() + '</span>');
            }
        })
        $('.textTask').on('keyup', function (event) {
            if (event.keyCode === 13) {
                if ($(this).val().trim()) {
                    const tmpl =
                        '<li style="display:none;">' +
                        '<a href="#" class="todo-checkbox"><i class="fa fa-square"></i></a>' +
                        '<span class="todo-text">' + $(this).val() + ' </span>' +
                        '<a href="#"><i class="todo-trash fa fa-trash"></i></a>' +
                        '</li>';
                    $('.tasks').append(tmpl);
                    $('li').slideDown(1000);
                    $('.taskSum').html(++taskSum);
                    $(this).val(null);
                } else {
                    alert('Votre entrée est invalide');
                }
            }

        });      
        
        $('.todo').css({
            'border': '1px #2d3436',
            'background-color': '#0984e3',
            'color': '#fff',
            'padding': '10px',
            'border-radius': '8px'
        });       
       
        
            
       

        return this;
    };
})(jQuery);
