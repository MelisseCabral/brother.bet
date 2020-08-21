#!/usr/bin/env bash
# install the latest version of Chrome and the Chrome Driver


#Copy the lines and paste on linux terminal.
#Step 1:
apt-get update && apt-get install -y libnss3-dev

#Step 2:

version=$(curl http://chromedriver.storage.googleapis.com/LATEST_RELEASE)
wget -N http://chromedriver.storage.googleapis.com/${version}/chromedriver_linux64.zip
#Step 3:

unzip chromedriver_linux64.zip -d /usr/local/bin
chmod +x /usr/local/bin/chromedriver

#Step 4:
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

#Step 5:
sudo reboot
