function jiraFindStories(xo) {
  // Do a regex in all the text
  let str = JSON.stringify(xo);
  const matches = str.match(/[A-Z]+-[0-9]+/g);

  let unique = matches.filter(onlyUnique);
  
  return {'val': unique};
}


function jiraEpicLeadtime(xo, filter) {
  //Value Definition: 8d, Explore solutions: 32d, Specify How: 143d, Development Lifecycle: 7d, Done: 2 
  let res = new Array();
  if("customfield_12415" in xo.fields) {
    let arr = xo.fields.customfield_12415.split(',');
    //console.log(arr);
    for(let i = 0; i < arr.length; i++) {
      let ph = arr[i].split(':');
      if(ph.length == 2 && ph[0].trim() == filter) {
        //console.log(ph[0] + " -> " + ph[1]);
        let found = ph[1].match(/([0-9]+)d/);
        if(found[1]) {
          //console.log("Match -> " + found[1] + " found " + found);
          return {'val': found[1]};
          
        }
      }
    }
  }
  else {
    return {'val': 'N/A'};
  }

  return {'val': ''};
}

function jiraLeadtime(xo) {
  // Assess if actually done
  let cd = new Date(xo.fields.created);
  let rd = new Date();
  let done = false;
  if(xo.fields.resolutiondate) {
    rd = new Date(xo.fields.resolutiondate);
    done = true;
  }

  return {'val': Math.floor((rd - cd) / (1000*60*60*24)) + "d" + (done ? " (resolved)" : "")};
}
  
function jiraTechFamilies(xo) {
  // Assess if actually done
  let res = new Array();
  for(let i = 0; i < xo.fields.customfield_13515.length; i++) {
    res.push(xo.fields.customfield_13515[i].value);
  }
  
  return {'val': res.join(",")};
}

function jiraSocialCount(xo) {
  // Custom function to count (unique) people involved
  let ppl = {}; 
  ppl = incrVal(ppl, xo.fields.assignee.emailAddress);
  ppl = incrVal(ppl, xo.fields.creator.emailAddress);
  ppl = incrVal(ppl, xo.fields.reporter.emailAddress);
  
  for(let j = 0; j < xo.fields.comment.comments.length; j++) {
    ppl = incrVal(ppl, xo.fields.comment.comments[j].author.emailAddress);
  }
  storePpl(ppl); // also remember across all epics

  return {'val': "ppl:" + Object.keys(ppl).length + " cmt:" + xo.fields.comment.total, 'tip': ppl}
}


function jiraHistory(xo) {
  let res = new Array();
  if(!xo.changelog || !("histories" in xo.changelog))
    return null;
  
  // TODO:
  // add the created timestamp as first data point
  //
  for(let i = 0; i < xo.changelog.histories.length; i++) {
    let hi = xo.changelog.histories[i];
    
    for(let j = 0; j < hi.items.length; j++) {
      let it = hi.items[j];
      if(it.field == "assignee" && it.from == null)
        res.push([shortDate(hi.created), "First assign:" + it.toString]);
      if(it.field == "resolution")
        res.push([shortDate(hi.created), "Resolved:" + it.toString + " "]);
      if(it.field == "status")
        res.push([shortDate(hi.created), "Status:" + it.fromString + "->" + it.toString]);
    }
  }
  return res;
}
  
function jiraEpicLinks(xo) {
  let res = "";
  if(!xo.changelog || !("histories" in xo.changelog))
    return res;
    
  for(let i = 0; i < xo.changelog.histories.length; i++) {
    let hi = xo.changelog.histories[i];
    
    for(let j = 0; j < hi.items.length; j++) {
      let it = hi.items[j];
      if(it.field == "Epic Child")
        res += it.toString + " ";
    }
  }
  return {'val': res};
}

function jiraSubtaskCount(xo) {
  return "" + xo.fields.subtasks.length;
}
