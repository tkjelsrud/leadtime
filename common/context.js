// GLOBAL
var memory = {'items': {}, 'ppl': {}};


function showError(err) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerText += err;
    
    //TODO: Handle many messages without beeing hidden too early or messages overwritten
    setTimeout(function() {document.getElementById("error").style.display = "none";}, 3000);
  }
  
  function updateContext() {
    let ctx = getSessionCtx();
    let sel = document.getElementById("ctxSelect");
    let cList = getKnownCtx();
    for(i = 0; i < cList.length; i++) {
      let opt = document.createElement('option');
      opt.value = cList[i];
      opt.innerHTML = cList[i];
      if(cList[i] == ctx)
        opt.selected = true;
      sel.appendChild(opt);
    }
    
    document.getElementById("lnkGrid").href = "index.html?" + getSessionCtx();
    document.getElementById("lnkTime").href = "timeline.html?" + getSessionCtx();
    document.getElementById("lnkRead").href = "readme.html?" + getSessionCtx();
  }

  function getSessionCtx() {
    return window.location.search.substring(1);
  }
  
  function getKnownCtx() {
    let cList = localStorage.getItem("ctxList");

    return (cList === null ? new Array() : cList.split(","));
  }

  function addCtxToKnownList() {
    let ctx = getSessionCtx();

    if(ctx != "") {
      let cList = localStorage.getItem("ctxList");
      if(cList === null)
        localStorage.setItem("ctxList", ctx);
      else {
        let cList = getKnownCtx();
        if(!cList.includes(ctx)) {
          cList.push(ctx);
          localStorage.setItem("ctxList", cList.join(','));
        }
      }
    }
  }

  
  
function jsonParse(data) {
  try {
    jsn = JSON.parse(data);
  } catch (e) {
    return null;
  }
  return jsn;
}
  
function validJiraItem(jsn) {
  if(!("fields" in jsn)) return false;
  if(!("changelog" in jsn)) return false;
  
  return true;
}

function storeJiraItem(jkey, jsn) {
  localStorage.setItem(jkey, JSON.stringify(jsn));
}
  
function storeItemIndex() {
  localStorage.setItem("items" + getSessionCtx(), Object.keys(memory.items).join(";"));
}
  
function getApiLink() {
  let link = localStorage.getItem("apiLink");
  if(!link)
    return "#";
  return link;
}

function loadStore() {
  let ind = localStorage.getItem("items" + getSessionCtx());
  if(!ind)
    return false;
  
  ind = ind.split(";");
  
  for(let i = 0; i < ind.length; i++) {
    let data = localStorage.getItem(ind[i]);
    let jsn  = jsonParse(data);
    if(jsn) {
      if(validJiraItem(jsn)) {
        memory.items[jsn.key] = jsn;
        //showError("Loaded " + jsn.key);
      }
    }
  }
}

function deleteStoreKey(key) {
  localStorage.removeItem(key);
  delete memory.items[key];
  storeItemIndex();
}