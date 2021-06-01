# Wake-On-LAN-Server
A custom Wake-on-LAN server made with Node.JS and HTML/CSS/JS. It's goal is to allow my roommates and I to access our desktop PC's when away from the house. It runs on a Raspberry Pi (or other device) connected to the local network.

Originally I just used a custom widget on my phone to SSH into my Raspberry Pi and run a python script that included the wake-on-lan utility and my hard-coded mac address. However, I wanted to extend this functionality to be used by multiple people on my network, so I decided to make this little server.

This application simply wakes PC's from sleep or from the shutdown state. To actually connect and use the PC, I personally use the application "Parsec" for its low latency and committed development team.
