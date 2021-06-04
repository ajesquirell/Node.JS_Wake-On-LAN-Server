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

        for (const p in deviceData) /*for (p = 0; p < Object.keys(deviceData).length; p++)*/{
            console.log(p);
            var listItem = document.createElement("li"); // Create li element
            var listItemText = document.createTextNode(deviceData[p]["name"]); // Create text for the li
            console.log(deviceData[p]["name"]);
            listItem.appendChild(listItemText); // Add text to the li
            document.getElementById('devices').appendChild(listItem); // Add li to the ul

            // Wake Device Button
            var div = document.createElement('div');
            div.classList.add('wake');
            var divText = document.createTextNode('Wake');
            div.appendChild(divText);
            listItem.appendChild(div); // Add div to li to appear on hover
            div.onclick = () => {window.location.href = `/wake_device?mac_address=${deviceData[p]["mac"]}`}; // Wake this mac_addr
            
            // Remove Device Button
            var div = document.createElement('div');
            div.classList.add('remove');
            var divText = document.createTextNode('Remove');
            div.appendChild(divText);
            listItem.appendChild(div); // Add div to li to appear on hover
            div.onclick = () => {window.location.href = `/remove_device?objNum=${p}`}; // Remove this object number

        }
    })
    .catch(err => console.log('error: ', err));


