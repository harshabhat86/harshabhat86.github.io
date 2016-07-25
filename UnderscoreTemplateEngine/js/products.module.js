//The module to fetch the products and take care of getting and setting them in the app.
var productsModule = (function() {
    
  var products = []; //Nobody can modify products directly.
  
  var setProducts = function(prod){
    products = prod;
  };
  
  var getProducts = function(callback){
    var __URL__ = '/js/data/products.json';
    var xhr = new XMLHttpRequest();

    xhr.onload = function(e) {
      // var arraybuffer = xhr.response; // not responseText
      setProducts(xhr.response.products);
      callback();
    }
    xhr.open("GET", __URL__);
    xhr.responseType = "json";
    xhr.send();
  };
  
  var search = function(searchString, searchOption) {
    if (!searchString ){
      return products;
    }
    var searchResult = _.filter(products,function(product){
      searchString = searchString.toUpperCase();
      if (searchOption ==='All'){
        return product.name.toUpperCase().indexOf(searchString) >=0 ||
               product.url.toUpperCase().indexOf(searchString) >=0 ||
               product.type.toUpperCase().indexOf(searchString) >=0 ;
      }else{
        return product[searchOption].toUpperCase().indexOf(searchString) >=0 ;
      }
      
      
    });
      
    return searchResult;
  };
  
  var getAllProducts = function(){
    return products;
  };
  
  var getSearchOptions = function(){
    //Assuming that all the objects in the products array are of the same type.
    var keyArray = _.keys(products[0]);
    keyArray.unshift('All');
    return keyArray;
  };

  return {
    set: setProducts,
    get: getProducts,
    search: search,
    getAllProducts: getAllProducts,
    getSearchOptions: getSearchOptions
  };
})();
