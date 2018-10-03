m.directive('rechercheBar', function(){
    var directiveDefs = {
        controller: function($scope){

        },
        template: `
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <h1>Expandable Search Form</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-md-offset-3">
                    <form action="" class="search-form">
                        <div class="form-group has-feedback">
                            <label for="search" class="sr-only">Search</label>
                            <input type="text" class="form-control" name="search" id="search" placeholder="search">
                            <span class="glyphicon glyphicon-search form-control-feedback"></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `

    }
    return directiveDefs

})

