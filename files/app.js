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
            var listItem = document.createElement("li");
            var text = document.createTextNode(deviceData[p]["name"]);
            console.log(deviceData[p]["name"]);
            listItem.appendChild(text);
            document.getElementById('devices').appendChild(listItem);
            listItem.onclick = () => {window.location.href = `/wake_device?mac_address=${deviceData[p]["mac"]}`};
        }
    })
    .catch(err => console.log('error: ', err));


