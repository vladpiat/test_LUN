




    $(function () {



        $('#step-1').on('keyup change blur', function (event) {
            var patterntest = this.email.checkValidity()
            if (!patterntest){
                $(this.email).parent().addClass('has-error');
            }else{
                $(this.email).parent().removeClass('has-error');
            }

            if (this.name.value.length === 0 || (this.email.value.length === 0 || !patterntest)){
                $('#button-step-1').attr('disabled', true)
                $('.pug-btn-2').children().addClass('disabled')
            }else{
                $('#button-step-1').attr('disabled', false)
                $('.pug-btn-2').children().removeClass('disabled')

            }

        });

        $(".down-buttons li a").on("click", function() {
            $(".nav-pills li").removeClass("active");
           $(".nav-pills ." + ($(this).parent().attr("class"))).addClass("active");
        });





        function renderCity(rawData){
            var render = ['<option value="">Select a state...</option>'];
            var cities;
            var json = JSON.parse(rawData);


            for (var key in json){
                render.push('<option value="'+ key +'">'+ json[key] +'</option>')

            };

            $.ajax('cities.json').done(function(data){
                cities = data
            });

            $('#select-country').html(render.join());

            $('#select-country').selectize({
                onChange: function(value){
                    var renderCities = [];
                    for (var key in cities){
                        if (+value === +cities[key].country){
                            renderCities.push('<option value="'+ key +'">'+ cities[key].name +'</option>')
                        };

                    };
                    $('#select-city').html(renderCities.join(''));
                    $('#select-city').selectize();
                }
            });
        };

        // $('#select-country').selectize();
        $('#select-city').selectize();

        $.ajax('countries.json').done(renderCity);
            



    }); 