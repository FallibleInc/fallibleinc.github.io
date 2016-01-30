/**
 * Created by sitesh on 26/01/16.
 */

function getLink(label, url, img) {
    //var companyUrl = document.createElement('td');
    //companyUrl.setAttribute('align', 'center');
    //companyUrl.setAttribute('width', '33%');

    var td = document.createElement('td');
    td.width = '33%';
    
    if ('N/A' !== url) {
        var link = document.createElement('a');
        link.setAttribute('href', url);

        var icon = document.createElement('img');
        icon.setAttribute('src', 'images/' + img);

        //img.appendChild(document.createTextNode(label));

        link.appendChild(icon);
        td.appendChild(link);
    }

    return td;
}

function populateTable(dataset) {
    var table = document.getElementById('container').getElementsByTagName('tbody')[0];

    dataset = dataset.split('\n');

    for (var index = 0; index < dataset.length; index++) {
        data = dataset[index].split(',');

        console.log(data);
        if (data.length < 6) continue;

        var company = document.createElement('td');
        company.appendChild(document.createTextNode(data[0]));

        //var companyDetails = document.createElement('table');
        //companyDetails.setAttribute('width', '100%');

        //var companyName = document.createElement('tr');
        //var companyTitle = document.createElement('td');
        //companyTitle.appendChild(document.createTextNode(data[0]));
        //companyTitle.setAttribute('colspan', 3);
        //companyName.appendChild(companyTitle);

        //var companyLinks = document.createElement('tr');
        var companyLinks = document.createElement('td');
        
        companyLinks.appendChild(getLink('Facebook', data[5], 'facebook.png'));
        companyLinks.appendChild(getLink('Website', data[4], 'link-variant.png'));
        companyLinks.appendChild(getLink('Twitter', data[6], 'twitter.png'));

        //companyDetails.appendChild(companyName);
        //companyDetails.appendChild(companyLinks);

        //company.appendChild(companyDetails);

        var category = document.createElement('td');
        category.appendChild(document.createTextNode(data[1]));
        category.setAttribute('align', 'center');

        var funding = document.createElement('td');
        funding.appendChild(document.createTextNode(accounting.formatMoney(data[2], '$', 0)));
        funding.setAttribute('align', 'center');

        var security = document.createElement('td');
        
        var securityStrength = parseInt(data[3]);
        
        var strengthDiv = document.createElement('div');
        strengthDiv.setAttribute('align', 'center');
        strengthDiv.appendChild(document.createTextNode(securityStrength + '%'));
        security.appendChild(strengthDiv);

        var secDiv = document.createElement('div');
        secDiv.title = securityStrength;
        secDiv.setAttribute('class', 'progressbar');
        
        var progressSecDiv = document.createElement('div');
        progressSecDiv.style.width = securityStrength + '%';
                
        var greenShare = 2 * Math.max(0, securityStrength - 50);
        var redShare = 100 - greenShare;
        
        progressSecDiv.style.background = 'rgb(' + parseInt(2.55 * redShare) + ', ' + parseInt(2.55 * greenShare) + ', ' + 0 + ')';
        
        secDiv.appendChild(progressSecDiv);
        security.appendChild(secDiv);

        var dataRow = document.createElement('tr');
        dataRow.appendChild(company);
        dataRow.appendChild(companyLinks);
        dataRow.appendChild(category);
        dataRow.appendChild(funding);
        dataRow.appendChild(security);

        table.appendChild(dataRow);
    }

    $('#container').DataTable({
        "paging": false,
        "order": [[ 3, "desc" ]],
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search"
        }
    });
}

function generateTable() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "data/security_master.csv", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (200 === rawFile.status || 0 === rawFile.status) {
                var allText = rawFile.responseText;
                populateTable(allText);
            }
        }
    };
    rawFile.send(null);

}