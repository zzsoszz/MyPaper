    google.load("search", "1");
    function OnLoad() {
     var searchControl = new google.search.SearchControl();
     var options = new GsearcherOptions();
      options.setExpandMode(GSearchControl.EXPAND_MODE_OPEN);
     options.setRoot(document.getElementById("reslut"));
      var siteSearch = new GwebSearch();
     siteSearch.setUserDefinedLabel("aub.org.cn");
     siteSearch.setSiteRestriction("aub.org.cn");

     searchControl.addSearcher(siteSearch,options);    
      siteSearch = new GwebSearch();
          siteSearch.setUserDefinedLabel("crazycoder.cn");
     siteSearch.setSiteRestriction("crazycoder.cn");
     searchControl.addSearcher(siteSearch,options);
     searchControl.draw(document.getElementById("searchcontrol"));      
    }
    google.setOnLoadCallback(OnLoad);