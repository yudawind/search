$(document).ready(function () {
    $('#search').keyup(function() {
        srch = $('#search').val(); // строка из поиска
        srch = srch.replace(/"/g, '');
        srcharr = srch.split(' '); // масив из слов поиска
        srchmin = [];
        for (b=0;b<srcharr.length;b++){// масив с исключениями
            srcharr[b] += '';
            vrr = srcharr[b].charAt(0);
            trr = [];
            if (vrr == '-'){
                srcharr[b]=srcharr[b].replace(/-/, '');
                srchmin.push(srcharr[b]);
                trr.push(b);
                srcharr.splice(b,1);
                b--;
            }
        }
        if (srch != ''){ //обнуляем результат
            $.getJSON("players.json", function(data){ //получаем данные с сервера
                var items = [];
                for (i=0;i<data.length;i++){ // формируем результаты
                    val = data[i];
                    strdpsk = (val['name']+' '+val['position']+' '+val['nationality']+' '+val['id']+' '+val['jerseyNumber']+' '+val['dateOfBirth']+' '+val['contractUntil']+' '+val['marketValue']);
                    per = 0;
                    for (c=0;c<srchmin.length;c++){ // исключаем минус слова
                        myRe = new RegExp(srchmin[c],'ig');
                        if (myRe.exec(strdpsk)){
                            per = 1;
                            break;
                        }
                    }
                    if (per == 1) continue;
                    genstrok = '';
                    for (c=0;c<srcharr.length;c++){ // формируем список ответов
                        myRe = new RegExp(srcharr[c],'ig');
                        if (myRe.exec(strdpsk)){
                            if (c==0) genstrok = '<li>'+
                                '<h2>'+val['name']+'</h2>'+
                                '<p>'+'<b> id: </b>'+val['id']+
                                '<b> nationality: </b>'+val['nationality']+
                                '<b> position: </b>'+val['position']+
                                '<br>'+'<b>marketValue: </b>'+val['marketValue']+
                                '<b> id: </b>'+val['id']+
                                '<br>'+'<b>jerseyNumber: </b>'+val['jerseyNumber']+
                                '<b> dateOfBirth: </b>'+val['dateOfBirth']+
                                '<br>'+'<b>contractUntil: </b>'+val['contractUntil']+
                                '</p>'+'</li>';
                        } else {
                            genstrok = '';
                            break;
                        }
                    }
                    items.push(genstrok);
                }
                spisok = $('<ul/>', {'class': 'my-new-list', html: items.join('')});
                $('#result').html(spisok); // вставляем на страницу
            });
        } else $('#result').html(''); // очищаем результат если поиск пустой
    });
});