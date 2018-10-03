m.directive('actualite', function(){
    var directiveDef = {
        controller: function($scope){

        },
        template: `
        <div>
            <h2>Actualite</h2>
            <div class='container'>
                <div class="well">
                    <div class="media">
                        <a class="pull-left" href="#">
                        [photo de l'article]
                        </a>
                        <div class="media-body">
                        <h4 class="media-heading">Titre de l'article</h4>
                            <p class="text-right">By nom de l'auteur</p>
                            <p>paragraphe de l'article</p>
                            <ul class="list-inline list-unstyled">
                                <li><span><i class="glyphicon glyphicon-calendar"></i> date de l'article </span></li>
                            <li>|</li>
                            <span><i class="glyphicon glyphicon-comment"></i> clique sur les commentaires</span>
                            <li>|</li>
                            <li>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star-empty"></span>
                            </li>
                            <li>|</li>
                            <li>
                                <span><i class="fab fa-facebook-square"></i></span>
                                <span><i class="fab fa-twitter-square"></i></span>
                                <span><i class="fab fa-google-plus-square"></i></span>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `

    }
    return directiveDef

})

