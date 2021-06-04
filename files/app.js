var deviceData;

const fetchJson = async () => {
    const response = await fetch('macs.json');

    if (response.status !== 200)
        throw new Error('Could not fetch devices');

    const data = await response.json();
    return data;
}

fetchJson()
    .then(data =>{
        console.log('data: ', data);
        deviceData = data;

        for (const p in deviceData) {
            var listItem = document.createElement("li"); // Create li element
            var listItemText = document.createTextNode(deviceData[p]["name"]); // Create text for the li
            console.log(deviceData[p]["name"]);
            listItem.appendChild(listItemText); // Add text to the li
            document.getElementById('devices').appendChild(listItem); // Add li to the ul
            listItem.onclick = () => {window.location.href = `/wake_device?mac_address=${deviceData[p]["mac"]}`}; // Add click functionality to li

            var div = document.createElement('div');
            var divText = document.createTextNode('Remove Device');
            div.appendChild(divText);
            listItem.appendChild(div); // Add div to li to appear on hover
        }
    })
    .catch(err => console.log('error: ', err));


