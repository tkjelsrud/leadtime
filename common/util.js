function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

  
function shortDate(dateStr) {
    return (new Date(dateStr)).toLocaleDateString('no-nb'); 
  }
    
  function getColor(value){
    //value from 0 to 1
    var hue=((1-value)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
  }
    
  function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
          tokens,
          re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
  
    return params;
  }

  function getMonthStr(mIndex) {
    mIndex = mIndex % 12;
    //const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
    return month[mIndex];
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
