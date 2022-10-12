// Bad coding, just moved here, a lot of interdependence with index file
//

function chartSummary() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const colIdx = {LT: 9, VD: 10, ES: 11, SH: 12, DL: 13, TF: 3};
    const MAXI = 9999;
    // Warning, poor code ahead
    // This is just a hack for now to summarize some columns (hard coded)
    let rows = document.getElementsByTagName("table")[0].rows;
    let sums = {
      'LT': {'data': [], 'min': MAXI, 'max': 0, 'avg': 0, 'mean': 0, 'maxId': "", 'meanId': "", 'minId': ""},
      'VD': {'data': [], 'min': MAXI, 'max': 0, 'avg': 0, 'mean': 0, 'maxId': "", 'meanId': "", 'minId': ""},
      'ES': {'data': [], 'min': MAXI, 'max': 0, 'avg': 0, 'mean': 0, 'maxId': "", 'meanId': "", 'minId': ""},
      'SH': {'data': [], 'min': MAXI, 'max': 0, 'avg': 0, 'mean': 0, 'maxId': "", 'meanId': "", 'minId': ""},
      'DL': {'data': [], 'min': MAXI, 'max': 0, 'avg': 0, 'mean': 0, 'maxId': "", 'meanId': "", 'minId': ""}
    };
  
    for(let i = 1; i < rows.length; i++) {
      let lt = parseInt(rows[i].children[colIdx.LT].textContent);
      sums.LT.data.push(lt)
      if(lt > sums.LT.max) {
        sums.LT.max = lt;
        sums.LT.maxId = rows[i].children[0].textContent;
      }
      if(lt < sums.LT.min) {
        sums.LT.min = lt;
        sums.LT.minId = rows[i].children[0].textContent;
      }
  
      if(rows[i].children[colIdx.VD].textContent.trim() != "") {
        let vd = parseInt(rows[i].children[colIdx.VD].textContent);
        sums.VD.data.push(vd)
        if(vd > sums.VD.max) {
          sums.VD.max = vd;
          sums.VD.maxId = rows[i].children[0].textContent;
        }
        if(vd < sums.VD.min) {
          sums.VD.min = vd;
          sums.VD.minId = rows[i].children[0].textContent;
        }
      }
  
      if(rows[i].children[colIdx.ES].textContent.trim() != "") {
        let es = parseInt(rows[i].children[colIdx.ES].textContent);
        sums.ES.data.push(es)
        if(es > sums.ES.max) {
          sums.ES.max = es;
          sums.ES.maxId = rows[i].children[0].textContent;
        }
        if(es < sums.ES.min) {
          sums.ES.min = es;
          sums.ES.minId = rows[i].children[0].textContent;
        }
      }
  
      if(rows[i].children[colIdx.SH].textContent.trim() != "") {
        let sh = parseInt(rows[i].children[colIdx.SH].textContent);
        sums.SH.data.push(sh)
        if(sh > sums.SH.max) {
          sums.SH.max = sh;
          sums.SH.maxId = rows[i].children[0].textContent;
        }
        if(sh < sums.SH.min) {
          sums.SH.min = sh;
          sums.SH.minId = rows[i].children[0].textContent;
        }
      }
  
      if(rows[i].children[colIdx.DL].textContent.trim() != "") {
        let dl = parseInt(rows[i].children[colIdx.DL].textContent);
        sums.DL.data.push(dl)
        if(dl > sums.DL.max) {
          sums.DL.max = dl;
          sums.DL.maxId = rows[i].children[0].textContent;
        }
        if(dl < sums.SH.min) {
          sums.DL.min = dl;
          sums.DL.minId = rows[i].children[0].textContent;
        }
      }
    }
  
    sums.LT.avg = sums.LT.data.reduce((a, b) => a + b, 0) / sums.LT.data.length;
    sums.LT.data.sort(function(a, b){return b-a});
    sums.LT.mean = sums.LT.data[Math.floor(sums.LT.data.length / 2)];
    sums.LT.min = (sums.LT.min == MAXI ? 0 : sums.LT.min); // Avoid writing the max value
  
    // Ok so the following does not work, because table is not sorted...
    //sums.LT.meanId = rows[Math.floor(sums.LT.data.length / 2)].children[0].textContent;
  
    sums.VD.avg = sums.VD.data.reduce((a, b) => a + b, 0) / sums.VD.data.length;
    sums.VD.data.sort(function(a, b){return b-a});
    sums.VD.mean = sums.VD.data[Math.floor(sums.VD.data.length / 2)];
    sums.VD.min = (sums.VD.min == MAXI ? 0 : sums.VD.min);
  
    sums.ES.avg = sums.ES.data.reduce((a, b) => a + b, 0) / sums.ES.data.length;
    sums.ES.data.sort(function(a, b){return b-a});
    sums.ES.mean = sums.ES.data[Math.floor(sums.ES.data.length / 2)];
    sums.ES.min = (sums.ES.min == MAXI ? 0 : sums.ES.min);
  
    sums.SH.avg = sums.SH.data.reduce((a, b) => a + b, 0) / sums.SH.data.length;
    sums.SH.data.sort(function(a, b){return b-a});
    sums.SH.mean = sums.SH.data[Math.floor(sums.SH.data.length / 2)];
    sums.SH.min = (sums.SH.min == MAXI ? 0 : sums.SH.min);
  
    sums.DL.avg = sums.DL.data.reduce((a, b) => a + b, 0) / sums.DL.data.length;
    sums.DL.data.sort(function(a, b){return b-a});
    sums.DL.mean = sums.DL.data[Math.floor(sums.DL.data.length / 2)];
    sums.DL.min = (sums.DL.min == MAXI ? 0 : sums.DL.min);
    
    //console.log(sums);
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Leadtime (total)', 'VD', 'ES', 'SH', 'DL'],
          datasets: [{
              label: 'Min', 
              borderColor: "#e3d2d1",
              data: [sums.LT.min, sums.VD.min, sums.ES.min, sums.SH.min, sums.DL.min]
          },
          {
              label: 'Max',
              borderColor: "#b82921",
              data: [sums.LT.max, sums.VD.max, sums.ES.max, sums.SH.max, sums.DL.max]
          },
          {
              label: 'Avg',
              borderColor: "#507fbf",
              data: [sums.LT.avg, sums.VD.avg, sums.ES.avg, sums.SH.avg, sums.DL.avg]
          },
          {
              label: 'Mean',
              borderColor: "#294294",
              data: [sums.LT.mean, sums.VD.mean, sums.ES.mean, sums.SH.mean, sums.DL.mean]
          }
        
        ]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  suggestedMin: 0,
                  suggestedMax: 500
              }
          },
          plugins: {
              title: {
                  display: true,
                  text: 'Leadtime (' + sums.LT.data.length + ' items)'
              }
          }
      }
  });
  }
  
  function chartPeople() {
    const ctx = document.getElementById('myChartPpl').getContext('2d');
    //
    // memory.ppl
    //
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: Object.keys(memory.ppl),
          datasets: [{
              label: 'PPL', 
              backgroundColor: new Array(Object.keys(memory.ppl).length).fill("").map(x => "#" + Math.floor(Math.random()*16777215).toString(16)),
              data: Object.values(memory.ppl)
          }
        ]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  suggestedMin: 0,
                  suggestedMax: 3
              }
          },
          plugins: {
              title: {
                  display: true,
                  text: 'Fingerprint (' + Object.keys(memory.ppl).length + ' ppl)'
              }
          }
      }
    });
  }

 function chartTeam() {
    const ctx = document.getElementById('myChartTeam').getContext('2d');
    const colIdx = {TF: 3};
    const MAXI = 9999;
    
    let rows = document.getElementsByTagName("table")[0].rows;
    let data = {};
   
    for(let i = 1; i < rows.length; i++) {
      let teams = rows[i].children[colIdx.TF].textContent.split(',');
      for(let j = 0; j < teams.length; j++) {
       	if(teams[j] in data)
          data[teams[j]]++;
        else
          data[teams[j]] = 1;
      }
    }
      
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: Object.keys(data),
          datasets: [{
              label: 'Teams', 
              backgroundColor: new Array(Object.keys(data).length).fill("").map(x => "#" + Math.floor(Math.random()*16777215).toString(16)),
              data: Object.values(data)
          }
        ]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  suggestedMin: 0,
                  suggestedMax: 3
              }
          },
          plugins: {
              title: {
                  display: true,
                  text: 'Teams involved'
              }
          }
      }
    });
  }
