// Table configuration (keep as dynamic as possible)
let config = {
  'filters': ["xo.fields.issuetype.name=='Epic'"],
  'columns': [
    {'title': "Key", 'eval': "xo.key", 'class': 'narrow', 'style': 'apiLink'},
    {'title': "Title", 'eval': "xo.fields.summary"},
    //{'title': "Type", 'eval': "xo.fields.issuetype.name", 'class': 'narrow'},
    {'title': "Note", 'eval': "xo.note", 'class': 'edit weak', 'saveTo': 'note'},
    {'title': "TFam", 'eval': "jiraTechFamilies(xo)", 'class': 'narrow'},
    {'title': "Status", 'eval': "xo.fields.status.name", 'class': 'narrow'},
   // {'title': "Reporter", 'eval': "xo.fields.reporter.emailAddress", 'class': 'narrow'},
    {'title': "Assignee", 'eval': "xo.fields.assignee.emailAddress", 'class': 'narrow weak'},
   // {'title': "Labels", 'eval': "xo.fields.labels.join(' ')"},
    {'title': "Data", 'eval': "xo.fields.description.length + ' ' + xo.fields.attachment.length + 'A'", 'class': 'narrow weak'},
    {'title': "Social", 'eval': "jiraSocialCount(xo)", 'class': 'narrow weak'},
   // {'title': "History", 'eval': "jiraHistory(xo)"},
    {'title': "Size", 'eval': "xo.fields.customfield_13409.value", 'class': 'narrow weak'},
    {'title': "Leadtime", 'eval': "jiraLeadtime(xo)", 'class': "narrow"},
    {'title': "LT VD", 'eval': "jiraEpicLeadtime(xo, 'Value Definition')", 'class': "narrownum", 'sum': true, 'style': 'dayScale'},
    {'title': "LT ES", 'eval': "jiraEpicLeadtime(xo, 'Explore solutions')", 'class': "narrownum", 'sum': true, 'style': 'dayScale'},
    {'title': "LT SH", 'eval': "jiraEpicLeadtime(xo, 'Specify How')", 'class': "narrownum", 'sum': true, 'style': 'dayScale'},
    {'title': "LT DL", 'eval': "jiraEpicLeadtime(xo, 'Development Lifecycle')", 'class': "narrownum", 'sum': true, 'style': 'dayScale'},
    {'title': "ELinks", 'eval': "jiraEpicLinks(xo).val.split(' ').length", 'class': "narrownum weak"},
    {'title': "Rel stories", 'eval': "jiraFindStories(xo).val.length", 'class': "narrownumn weak"},
    {'title': "Data age", 'eval': "Math.floor(((new Date()) - new Date(xo.storeDate)) / (1000*60*60*24)) + 'd'", 'class': "narrownum weak"}
  ]
};
  
let configStory = {
  'filters': ["xo.fields.issuetype.name!='Epic'"],
  'columns': [
    {'title': "Key", 'eval': "xo.key", 'class': 'narrow'},
    {'title': "Title", 'eval': "xo.fields.summary"},
    {'title': "Type", 'eval': "xo.fields.issuetype.name", 'class': 'narrow'},
    {'title': "Status", 'eval': "xo.fields.status.name", 'class': 'narrow'},
    {'title': "Assignee", 'eval': "xo.fields.assignee.emailAddress", 'class': 'narrow'},
    {'title': "Labels", 'eval': "xo.fields.labels.join(' ')"},
    {'title': "Data", 'eval': "xo.fields.description.length + ' ' + xo.fields.attachment.length + 'A'", 'class': 'narrow'},
    {'title': "Social", 'eval': "jiraSocialCount(xo)", 'class': 'narrow'},
    {'title': "Sprints", 'eval': "xo.fields.customfield_10100"},
    {'title': "History", 'eval': "jiraHistory(xo)"},
    {'title': "Leadtime", 'eval': "jiraLeadtime(xo)", 'class': "narrow"},
    {'title': "LT Ana", 'eval': "jiraEpicLeadtime(xo, 'Analysis')", 'class': "narrownum", 'sum': true, 'style': 'dayScale'},
    {'title': "LT Dev", 'eval': "jiraEpicLeadtime(xo, 'In Progress')", 'class': "narrownum", 'sum': true, 'style': 'dayScale'},
    {'title': "LT SIT", 'eval': "jiraEpicLeadtime(xo, 'SIT')", 'class': "narrownum", 'sum': true, 'style': 'dayScale'},
    {'title': "LT UAT", 'eval': "jiraEpicLeadtime(xo, 'UAT')", 'class': "narrownum", 'sum': true, 'style': 'dayScale'},
    {'title': "LT RPr", 'eval': "jiraEpicLeadtime(xo, 'Ready for production')", 'class': "narrownum", 'sum': true, 'style': 'dayScale'}
  ]
};
