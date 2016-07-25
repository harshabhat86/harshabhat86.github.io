
document.addEventListener("DOMContentLoaded", function(event) {
  //Load the products 
  productsModule.get(generateSearchOption);
  
  
  document.getElementById('search').addEventListener('keyup',function(){
    //Search for any string search
    var prods = productsModule.search(document.getElementById('search').value, document.getElementById('searchOptions').value);
    
    renderProducts(prods);
  });
  
});

renderProducts = function(prods){

  var prods = prods || productsModule.getAllProducts(); 
  
  var tableTemplate = _.template(
    "<% _.each(prods, function(prod, idx) { %>"+
    "<tr class='prodListContainer' id='prod_<%= idx %>'><td class='prodList prod-name'><%= prod.name %></td> "+
    "<td class='prodList prod-url'><%= prod.url %></td> "+
    "<td class='prodList prod-type'><%= prod.type %></td> </tr>"+
    "<% }); %>"
  );
  
  var resultCount = _.template("<%=size%> products listed");
  
  
  document.getElementById('resultCount').innerHTML =  resultCount({ size: prods.length });
  var tableHeader = "<table id='productsTable'>    <tr>      <th>Name</th>      <th>URL</th>      <th>Type</th>    </tr>";
  document.getElementById('productsDiv').innerHTML =tableHeader+ tableTemplate({prods:prods})+"</table>";

}

var generateSearchOption = function(){
  var selectOptionTemplate = _.template("<option value='<%=option%>' <%option==='All'?'selected = selected':''%> ><%=option%></option>");
  
  var searchOptions = _.reduce(productsModule.getSearchOptions(), function(str,value){
    
    return str+= selectOptionTemplate({option:value});
  },'');
  
  document.getElementById('searchOptions').innerHTML = searchOptions;
  renderProducts();
}