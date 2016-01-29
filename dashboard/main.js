/**
 * Created by sitesh on 26/01/16.
 */

function getLink(label, url, img) {
    var companyUrl = document.createElement('td');
    companyUrl.setAttribute('align', 'center');
    companyUrl.setAttribute('width', '33%');

    if ('N/A' !== url) {
        var link = document.createElement('a');
        link.setAttribute('href', url);

        var icon = document.createElement('img');
        icon.setAttribute('src', 'images/i_' + img);

        //img.appendChild(document.createTextNode(label));

        link.appendChild(icon);
        companyUrl.appendChild(link);
    }

    return companyUrl;
}

function populateTable(dataset) {
    var table = document.getElementById('container').getElementsByTagName('tbody')[0];

    dataset = dataset.split('\n');

    for (var index = 0; index < dataset.length; index++) {
        data = dataset[index].split(',');

        console.log(data);
        if (data.length < 6) continue;

        var company = document.createElement('td');

        var companyDetails = document.createElement('table');
        companyDetails.setAttribute('width', '100%');

        var companyName = document.createElement('tr');
        var companyTitle = document.createElement('td');
        companyTitle.appendChild(document.createTextNode(data[0]));
        companyTitle.setAttribute('colspan', 3);
        companyName.appendChild(companyTitle);

        var companyLinks = document.createElement('tr');
        companyLinks.appendChild(getLink('Facebook', data[5], 'icon_facebook.png'));
        companyLinks.appendChild(getLink('Website', data[4], 'icon_www.png'));
        companyLinks.appendChild(getLink('Twitter', data[6], 'icon_twitter.png'));

        companyDetails.appendChild(companyName);
        companyDetails.appendChild(companyLinks);

        company.appendChild(companyDetails);

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
        progressSecDiv.style.background = 'rgb(' + parseInt(255 * (1 - securityStrength / 100)) + ', ' + parseInt(255 * securityStrength / 100) + ', ' + 0 + ')';
        
        secDiv.appendChild(progressSecDiv);
        security.appendChild(secDiv);


        var dataRow = document.createElement('tr');
        dataRow.appendChild(company);
        dataRow.appendChild(category);
        dataRow.appendChild(funding);
        dataRow.appendChild(security);

        table.appendChild(dataRow);
    }

    $('#container').DataTable({
        "paging": false,
        "order": [[ 2, "desc" ]]
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